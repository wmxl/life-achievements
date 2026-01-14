// Notion 连接测试脚本
import { Client } from '@notionhq/client';
import dotenv from 'dotenv';

// 加载环境变量
dotenv.config();

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const GAMES_DATABASE_ID = process.env.NOTION_GAMES_DB_ID;

console.log('Debug - Client methods:', Object.keys(notion));
console.log('Debug - databases methods:', Object.keys(notion.databases));

console.log('🔍 Notion 连接测试开始...\n');

console.log('📋 环境变量检查:');
console.log('NOTION_TOKEN:', process.env.NOTION_TOKEN ? '✅ 已设置' : '❌ 未设置');
console.log('NOTION_GAMES_DB_ID:', process.env.NOTION_GAMES_DB_ID ? '✅ 已设置' : '❌ 未设置');
console.log('');

async function testConnection() {
  try {
    console.log('🔗 尝试连接 Notion 数据库...');

    const response = await notion.databases.query({
      database_id: GAMES_DATABASE_ID,
      page_size: 5,
    });

    console.log('✅ 连接成功！\n');
    console.log(`📊 数据库中共有 ${response.results.length} 条记录（显示前 5 条）\n`);

    if (response.results.length === 0) {
      console.log('⚠️  数据库为空，请在 Notion 中添加游戏数据');
      return;
    }

    console.log('🎮 游戏列表:\n');

    for (const page of response.results) {
      if (!('properties' in page)) continue;

      const properties = page.properties;

      // 提取标题
      const title =
        properties['Name']?.type === 'title'
          ? properties['Name'].title[0]?.plain_text || '未命名'
          : '未命名';

      // 提取平台
      const platform =
        properties['平台']?.type === 'select'
          ? properties['平台'].select?.name || '未知'
          : '未知';

      // 提取评分
      let rating = '未评分';
      if (properties['评分']?.type === 'select') {
        rating = properties['评分'].select?.name || '未评分';
      }

      // 提取状态
      const status =
        properties['状态']?.type === 'select'
          ? properties['状态'].select?.name || '未知'
          : '未知';

      console.log(`  - ${title} (${platform}) - ${rating} - ${status}`);
    }

    console.log('\n✨ 测试完成！你的 Notion 集成已正确配置！');
    console.log('');
    console.log('🚀 下一步:');
    console.log('   1. 启动开发服务器: npm run dev');
    console.log('   2. 访问: http://localhost:4321/life-achievements/games-notion');
    console.log('');

  } catch (error) {
    console.error('❌ 连接失败！\n');

    if (error.code === 'object_not_found') {
      console.error('错误: 找不到数据库');
      console.error('');
      console.error('可能的原因:');
      console.error('  1. Database ID 不正确');
      console.error('  2. Integration 没有连接到这个数据库');
      console.error('');
      console.error('解决方法:');
      console.error('  1. 打开 Notion 数据库页面');
      console.error('  2. 点击右上角 ••• (三个点)');
      console.error('  3. 选择 "Add connections"');
      console.error('  4. 选择你的 Integration');
      console.error('  5. 点击 "Confirm"');
      console.error('');
    } else if (error.code === 'unauthorized') {
      console.error('错误: 认证失败');
      console.error('');
      console.error('可能的原因:');
      console.error('  1. Token 不正确或已过期');
      console.error('  2. Integration 没有正确配置');
      console.error('');
      console.error('解决方法:');
      console.error('  1. 访问: https://www.notion.so/my-integrations');
      console.error('  2. 检查你的 Integration');
      console.error('  3. 如有必要，重新生成 Token');
      console.error('  4. 更新 .env 文件中的 NOTION_TOKEN');
      console.error('');
    } else {
      console.error('错误详情:', error.message);
      console.error('');
      console.error('请检查:');
      console.error('  1. .env 文件是否存在');
      console.error('  2. NOTION_TOKEN 和 NOTION_GAMES_DB_ID 是否正确');
      console.error('  3. 网络连接是否正常');
      console.error('');
    }

    console.error('📚 更多帮助: 查看 NOTION_SETUP_GUIDE.md');
    process.exit(1);
  }
}

testConnection();
