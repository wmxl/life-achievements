// Vercel Serverless Function - 获取剧集列表
const NOTION_TOKEN = process.env.NOTION_TOKEN;
const SERIES_DATABASE_ID = '2e9223bbe55180ea9a0ae5437dc1a1ac';

export default async function handler(req, res) {
  // 只允许 GET 请求
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await fetch(
      `https://api.notion.com/v1/databases/${SERIES_DATABASE_ID}/query`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${NOTION_TOKEN}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sorts: [
            {
              property: '完成日期',
              direction: 'descending',
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error('Notion API error:', error);
      return res.status(response.status).json({ error: error.message });
    }

    const data = await response.json();
    const seriesList = [];

    for (const page of data.results) {
      if (!('properties' in page)) continue;

      const properties = page.properties;

      // 提取标题
      const title =
        properties['Name']?.type === 'title'
          ? properties['Name'].title[0]?.plain_text || '未命名剧集'
          : '未命名剧集';

      // 提取评分
      let rating = 3;
      if (properties['评分']?.type === 'select') {
        const ratingStr = properties['评分'].select?.name || '';
        rating = (ratingStr.match(/⭐/g) || []).length || 3;
      } else if (properties['评分']?.type === 'rich_text' && properties['评分'].rich_text.length > 0) {
        const ratingStr = properties['评分'].rich_text[0].plain_text;
        rating = (ratingStr.match(/⭐/g) || []).length || 3;
      }

      // 提取开始日期
      const startDate =
        properties['开始日期']?.type === 'date'
          ? properties['开始日期'].date?.start || undefined
          : undefined;

      // 提取完成日期
      const completedDate =
        properties['完成日期']?.type === 'date'
          ? properties['完成日期'].date?.start || undefined
          : undefined;

      // 提取完成状态（Formula）
      let status = '进行中';
      if (properties['完成状态']?.type === 'formula') {
        const formulaValue = properties['完成状态'].formula;
        if (formulaValue?.type === 'boolean') {
          status = formulaValue.boolean ? '已完成' : '进行中';
        } else if (formulaValue?.type === 'string' && formulaValue.string) {
          status = formulaValue.string;
        }
      }

      // 提取标签
      let tags = [];
      if (properties['标签']?.type === 'multi_select') {
        tags = properties['标签'].multi_select.map((tag) => tag.name);
      } else if (properties['标签']?.type === 'rich_text' && properties['标签'].rich_text.length > 0) {
        const tagsStr = properties['标签'].rich_text[0].plain_text;
        tags = tagsStr.split(/[,，]/).map((t) => t.trim()).filter((t) => t);
      }

      // 提取链接
      const seriesUrl =
        properties['链接']?.type === 'url'
          ? properties['链接'].url || undefined
          : undefined;

      // 提取封面
      let cover;
      if (properties['封面']?.type === 'files' && properties['封面'].files.length > 0) {
        const file = properties['封面'].files[0];
        if ('file' in file) {
          cover = file.file.url;
        } else if ('external' in file) {
          cover = file.external.url;
        }
      }

      // 提取是否最爱
      let favorite = false;
      if (properties['最爱']?.type === 'checkbox') {
        favorite = properties['最爱'].checkbox;
      } else if (properties['最爱']?.type === 'rich_text' && properties['最爱'].rich_text.length > 0) {
        const favoriteStr = properties['最爱'].rich_text[0].plain_text;
        favorite = favoriteStr === '是' || favoriteStr === 'true' || favoriteStr === '✓';
      }

      // 提取评价内容
      let content = '';
      if (properties['评价']?.type === 'rich_text') {
        content = properties['评价'].rich_text
          .map((text) => text.plain_text)
          .join('');
      }

      // 生成 slug
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
        .replace(/^-|-$/g, '');

      seriesList.push({
        id: page.id,
        title,
        rating,
        startDate,
        completedDate,
        status,
        tags,
        seriesUrl,
        cover,
        favorite,
        content,
        slug,
      });
    }

    // 设置缓存头（可选，减少 Notion API 调用）
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');

    return res.status(200).json({ series: seriesList });
  } catch (error) {
    console.error('Error fetching series:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
