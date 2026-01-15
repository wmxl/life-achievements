// Vercel Serverless Function - 获取单个游戏详情
import type { VercelRequest, VercelResponse } from '@vercel/node';

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const GAMES_DATABASE_ID = process.env.NOTION_GAMES_DB_ID;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const { slug } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({ error: 'Invalid slug' });
  }

  try {
    // 获取所有游戏
    const response = await fetch(
      `https://api.notion.com/v1/databases/${GAMES_DATABASE_ID}/query`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${NOTION_TOKEN}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return res.status(response.status).json({ error: error.message });
    }

    const data = await response.json();

    // 查找匹配的游戏
    for (const page of data.results) {
      if (!('properties' in page)) continue;

      const properties = page.properties;
      const title =
        properties['Name']?.type === 'title'
          ? properties['Name'].title[0]?.plain_text || ''
          : '';

      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
        .replace(/^-|-$/g, '');

      if (generatedSlug !== slug) continue;

      // 找到匹配的游戏，提取完整信息
      let platform = 'Unknown';
      if (properties['平台']?.type === 'select') {
        platform = properties['平台'].select?.name || 'Unknown';
      } else if (properties['平台']?.type === 'rich_text' && properties['平台'].rich_text.length > 0) {
        platform = properties['平台'].rich_text[0].plain_text;
      }

      let rating = 3;
      if (properties['评分']?.type === 'select') {
        const ratingStr = properties['评分'].select?.name || '';
        rating = (ratingStr.match(/⭐/g) || []).length || 3;
      } else if (properties['评分']?.type === 'rich_text' && properties['评分'].rich_text.length > 0) {
        const ratingStr = properties['评分'].rich_text[0].plain_text;
        rating = (ratingStr.match(/⭐/g) || []).length || 3;
      }

      const startDate =
        properties['开始日期']?.type === 'date'
          ? properties['开始日期'].date?.start || undefined
          : undefined;

      const completedDate =
        properties['完成日期']?.type === 'date'
          ? properties['完成日期'].date?.start || undefined
          : undefined;

      let status = '进行中';
      if (properties['完成状态']?.type === 'formula') {
        const formulaValue = properties['完成状态'].formula;
        if (formulaValue?.type === 'boolean') {
          status = formulaValue.boolean ? '已完成' : '进行中';
        } else if (formulaValue?.type === 'string' && formulaValue.string) {
          status = formulaValue.string;
        }
      }

      let tags: string[] = [];
      if (properties['标签']?.type === 'multi_select') {
        tags = properties['标签'].multi_select.map((tag: any) => tag.name);
      } else if (properties['标签']?.type === 'rich_text' && properties['标签'].rich_text.length > 0) {
        const tagsStr = properties['标签'].rich_text[0].plain_text;
        tags = tagsStr.split(/[,，]/).map((t: string) => t.trim()).filter((t: string) => t);
      }

      const steamUrl =
        properties['链接']?.type === 'url'
          ? properties['链接'].url || undefined
          : undefined;

      let cover: string | undefined;
      if (properties['封面']?.type === 'files' && properties['封面'].files.length > 0) {
        const file = properties['封面'].files[0];
        if ('file' in file) {
          cover = file.file.url;
        } else if ('external' in file) {
          cover = file.external.url;
        }
      }

      let favorite = false;
      if (properties['最爱']?.type === 'checkbox') {
        favorite = properties['最爱'].checkbox;
      } else if (properties['最爱']?.type === 'rich_text' && properties['最爱'].rich_text.length > 0) {
        const favoriteStr = properties['最爱'].rich_text[0].plain_text;
        favorite = favoriteStr === '是' || favoriteStr === 'true' || favoriteStr === '✓';
      }

      let content = '';
      if (properties['评价']?.type === 'rich_text') {
        content = properties['评价'].rich_text
          .map((text: any) => text.plain_text)
          .join('');
      }

      const game = {
        id: page.id,
        title,
        platform,
        rating,
        startDate,
        completedDate,
        status,
        tags,
        steamUrl,
        cover,
        favorite,
        content,
        slug: generatedSlug,
      };

      res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
      return res.status(200).json({ game });
    }

    return res.status(404).json({ error: 'Game not found' });
  } catch (error: any) {
    console.error('Error fetching game:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
