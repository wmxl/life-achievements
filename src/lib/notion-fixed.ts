// Notion API 集成（使用原生 fetch API）

// 游戏数据类型
export interface NotionGame {
  id: string;
  title: string;
  platform: string;
  rating: number;
  completedDate: string;
  status: '已完成' | '进行中' | '已放弃';
  playTime?: number;
  tags: string[];
  steamUrl?: string;
  cover?: string;
  favorite: boolean;
  content: string;
  slug: string;
}

const NOTION_TOKEN = import.meta.env.NOTION_TOKEN;
const GAMES_DATABASE_ID = import.meta.env.NOTION_GAMES_DB_ID;

/**
 * 从 Notion 获取所有游戏（使用原生 fetch）
 */
export async function getGamesFromNotion(): Promise<NotionGame[]> {
  try {
    const response = await fetch(
      `https://api.notion.com/v1/databases/${GAMES_DATABASE_ID}/query`,
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
      return [];
    }

    const data = await response.json();
    const games: NotionGame[] = [];

    for (const page of data.results) {
      if (!('properties' in page)) continue;

      const properties = page.properties;

      // 提取标题
      const title =
        properties['Name']?.type === 'title'
          ? properties['Name'].title[0]?.plain_text || '未命名游戏'
          : '未命名游戏';

      // 提取平台
      const platform =
        properties['平台']?.type === 'select'
          ? properties['平台'].select?.name || 'Unknown'
          : 'Unknown';

      // 提取评分（从星星符号转换为数字）
      let rating = 3;
      if (properties['评分']?.type === 'select') {
        const ratingStr = properties['评分'].select?.name || '';
        rating = (ratingStr.match(/⭐/g) || []).length || 3;
      }

      // 提取完成日期
      const completedDate =
        properties['完成日期']?.type === 'date'
          ? properties['完成日期'].date?.start || new Date().toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0];

      // 提取状态
      let status: '已完成' | '进行中' | '已放弃' = '进行中';
      if (properties['状态']?.type === 'select') {
        const statusStr = properties['状态'].select?.name;
        if (statusStr === '已完成' || statusStr === '进行中' || statusStr === '已放弃') {
          status = statusStr;
        }
      }

      // 提取游戏时长
      const playTime =
        properties['游戏时长']?.type === 'number'
          ? properties['游戏时长'].number || undefined
          : undefined;

      // 提取标签
      const tags =
        properties['标签']?.type === 'multi_select'
          ? properties['标签'].multi_select.map((tag: any) => tag.name)
          : [];

      // 提取 Steam 链接
      const steamUrl =
        properties['Steam链接']?.type === 'url'
          ? properties['Steam链接'].url || undefined
          : undefined;

      // 提取封面
      let cover: string | undefined;
      if (properties['封面']?.type === 'files' && properties['封面'].files.length > 0) {
        const file = properties['封面'].files[0];
        if ('file' in file) {
          cover = file.file.url;
        } else if ('external' in file) {
          cover = file.external.url;
        }
      }

      // 提取是否最爱
      const favorite =
        properties['最爱']?.type === 'checkbox'
          ? properties['最爱'].checkbox
          : false;

      // 提取评价内容
      let content = '';
      if (properties['评价']?.type === 'rich_text') {
        content = properties['评价'].rich_text
          .map((text: any) => text.plain_text)
          .join('');
      }

      // 生成 slug（用于 URL）
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
        .replace(/^-|-$/g, '');

      games.push({
        id: page.id,
        title,
        platform,
        rating,
        completedDate,
        status,
        playTime,
        tags,
        steamUrl,
        cover,
        favorite,
        content,
        slug,
      });
    }

    return games;
  } catch (error) {
    console.error('Error fetching games from Notion:', error);
    return [];
  }
}

/**
 * 获取单个游戏详情（通过 slug）
 */
export async function getGameBySlug(slug: string): Promise<NotionGame | null> {
  const games = await getGamesFromNotion();
  return games.find((game) => game.slug === slug) || null;
}
