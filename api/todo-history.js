// Vercel Serverless Function - 获取 Todo 历史记录
const NOTION_TOKEN = process.env.NOTION_TOKEN;
const TODO_DATABASE_ID = '2e9223bbe551802596d9e26ecbd7e248';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const limit = parseInt(req.query.limit, 10) || 30;

  try {
    const response = await fetch(
      `https://api.notion.com/v1/databases/${TODO_DATABASE_ID}/query`,
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
              property: '日期',
              direction: 'descending',
            },
          ],
          page_size: limit,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error('Notion API error:', error);
      return res.status(response.status).json({ error: error.message });
    }

    const data = await response.json();
    const history = [];

    for (const page of data.results) {
      if (!('properties' in page)) continue;

      const properties = page.properties;

      const todo = {
        date: properties['日期']?.title?.[0]?.plain_text || '',
        weight: properties['体重']?.number || undefined,
        remark: properties['备注']?.rich_text?.map((t) => t.plain_text).join('') || undefined,
        momo: properties['墨墨背单词']?.checkbox || false,
        pushup: properties['俯卧撑一组']?.checkbox || false,
        squat: properties['深蹲一组']?.checkbox || false,
        pullup: properties['抓杠3次']?.checkbox || false,
        standing: properties['站桩']?.checkbox || false,
      };

      if (todo.date) {
        history.push(todo);
      }
    }

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
    return res.status(200).json(history);
  } catch (error) {
    console.error('Error fetching todo history:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
