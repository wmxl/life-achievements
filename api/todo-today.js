// Vercel Serverless Function - 获取今日 Todo
const NOTION_TOKEN = process.env.NOTION_TOKEN;
const TODO_DATABASE_ID = '2e9223bbe551802596d9e26ecbd7e248';

const HEADERS = {
  'Authorization': `Bearer ${NOTION_TOKEN}`,
  'Notion-Version': '2022-06-28',
  'Content-Type': 'application/json',
};

function parseProperties(properties, date) {
  return {
    date: properties['日期']?.title?.[0]?.plain_text || date,
    weight: properties['体重']?.number || undefined,
    remark: properties['备注']?.rich_text?.map((t) => t.plain_text).join('') || undefined,
    momo: properties['墨墨背单词']?.checkbox || false,
    pushup: properties['俯卧撑一组']?.number ?? 0,
    squat: properties['深蹲一组']?.number ?? 0,
    pullup: properties['抓杠3次']?.number ?? 0,
    standing: properties['站桩']?.number ?? 0,
    pushupNote: properties['俯卧撑备注']?.rich_text?.map((t) => t.plain_text).join('') || '',
    squatNote: properties['深蹲备注']?.rich_text?.map((t) => t.plain_text).join('') || '',
    pullupNote: properties['抓杠备注']?.rich_text?.map((t) => t.plain_text).join('') || '',
    standingNote: properties['站桩备注']?.rich_text?.map((t) => t.plain_text).join('') || '',
  };
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const date = req.query.date || new Date().toISOString().split('T')[0];

  try {
    // 查询今日记录
    const todayResponse = await fetch(
      `https://api.notion.com/v1/databases/${TODO_DATABASE_ID}/query`,
      {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({
          filter: { property: '日期', title: { equals: date } },
        }),
      }
    );

    if (!todayResponse.ok) {
      const error = await todayResponse.json();
      console.error('Notion API error:', error);
      return res.status(todayResponse.status).json({ error: error.message });
    }

    const todayData = await todayResponse.json();
    const todayExists = todayData.results.length > 0;
    const todo = todayExists ? parseProperties(todayData.results[0].properties, date) : null;

    // 今天有记录且备注非全空，直接返回
    const notesEmpty = !todo || (!todo.pushupNote && !todo.squatNote && !todo.pullupNote && !todo.standingNote);
    if (todo && !notesEmpty) {
      res.setHeader('Cache-Control', 'no-cache');
      return res.status(200).json(todo);
    }

    // 今天无记录，或备注全为空 → 查最近一条历史来继承备注
    const latestResponse = await fetch(
      `https://api.notion.com/v1/databases/${TODO_DATABASE_ID}/query`,
      {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({
          sorts: [{ property: '日期', direction: 'descending' }],
          page_size: todayExists ? 2 : 1,
        }),
      }
    );

    if (!latestResponse.ok) {
      res.setHeader('Cache-Control', 'no-cache');
      return res.status(200).json(todo);
    }

    const latestData = await latestResponse.json();
    // 如果今天有记录，最近一条就是今天自己，取第二条；否则取第一条
    const pastResults = todayExists
      ? latestData.results.filter((r) => r.properties['日期']?.title?.[0]?.plain_text !== date)
      : latestData.results;

    if (pastResults.length === 0) {
      res.setHeader('Cache-Control', 'no-cache');
      return res.status(200).json(todo);
    }

    const latest = parseProperties(pastResults[0].properties, date);

    res.setHeader('Cache-Control', 'no-cache');
    return res.status(200).json({
      ...(todo || { date, weight: undefined, remark: undefined, momo: false, pushup: 0, squat: 0, pullup: 0, standing: 0 }),
      pushupNote: latest.pushupNote,
      squatNote: latest.squatNote,
      pullupNote: latest.pullupNote,
      standingNote: latest.standingNote,
      isNew: !todayExists,
    });
  } catch (error) {
    console.error('Error fetching todo:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
