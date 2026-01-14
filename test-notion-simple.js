import { Client } from '@notionhq/client';
import dotenv from 'dotenv';

dotenv.config();

const notion = new Client({ auth: process.env.NOTION_TOKEN });

console.log('Testing Notion API...');
console.log('Token:', process.env.NOTION_TOKEN?.substring(0, 10) + '...');
console.log('Database ID:', process.env.NOTION_GAMES_DB_ID);

try {
  // 使用正确的 API 调用方法
  const response = await notion.databases.retrieve({
    database_id: process.env.NOTION_GAMES_DB_ID,
  });

  console.log('\n✅ Success! Database title:', response.title?.[0]?.plain_text || 'No title');
  console.log('\nNow testing query...');

  // 尝试获取页面
  const pages = await notion.pages.query({});
  console.log('Pages query result:', pages);

} catch (error) {
  console.error('\n❌ Error:', error.message);
  console.error('Code:', error.code);
}
