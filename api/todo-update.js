// Vercel Serverless Function - 更新今日 Todo
const NOTION_TOKEN = process.env.NOTION_TOKEN;
const TODO_DATABASE_ID = '2e9223bbe551802596d9e26ecbd7e248';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const todo = req.body;

  // 验证日期格式
  if (!todo.date || !/^\d{4}-\d{2}-\d{2}$/.test(todo.date)) {
    return res.status(400).json({ error: 'Invalid date format' });
  }

  try {
    // 查询是否已存在
    const queryResponse = await fetch(
      `https://api.notion.com/v1/databases/${TODO_DATABASE_ID}/query`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${NOTION_TOKEN}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filter: {
            property: '日期',
            title: {
              equals: todo.date,
            },
          },
        }),
      }
    );

    if (!queryResponse.ok) {
      const error = await queryResponse.json();
      console.error('Notion API query error:', error);
      return res.status(queryResponse.status).json({ error: error.message });
    }

    const queryData = await queryResponse.json();
    const properties = {
      '体重': { number: todo.weight || null },
      '备注': {
        rich_text: todo.remark ? [{ text: { content: todo.remark } }] : [],
      },
      '墨墨背单词': { checkbox: todo.momo },
      '俯卧撑一组': { checkbox: todo.pushup },
      '深蹲一组': { checkbox: todo.squat },
      '抓杠3次': { checkbox: todo.pullup },
      '站桩': { checkbox: todo.standing },
    };

    let response;

    if (queryData.results.length > 0) {
      // 更新已存在的页面
      const pageId = queryData.results[0].id;
      response = await fetch(
        `https://api.notion.com/v1/pages/${pageId}`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${NOTION_TOKEN}`,
            'Notion-Version': '2022-06-28',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ properties }),
        }
      );
    } else {
      // 创建新页面
      response = await fetch(
        `https://api.notion.com/v1/pages`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${NOTION_TOKEN}`,
            'Notion-Version': '2022-06-28',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            parent: { database_id: TODO_DATABASE_ID },
            properties: {
              '日期': {
                title: [{ text: { content: todo.date } }],
              },
              ...properties,
            },
          }),
        }
      );
    }

    if (!response.ok) {
      const error = await response.json();
      console.error('Notion API update error:', error);
      return res.status(response.status).json({ error: error.message });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error updating todo:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
