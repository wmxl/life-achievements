# 每日打卡功能说明

## 功能概述

每日打卡功能允许你记录每天的体重、备注和完成的任务清单，数据实时同步到 Notion。

## 已创建的文件

### 1. 后端 API 辅助函数
- `src/lib/notion-todo.ts` - Notion Todo API 集成

### 2. API Endpoints
- `src/pages/api/todo/today.ts` - 获取今日数据
- `src/pages/api/todo/update.ts` - 更新今日数据
- `src/pages/api/todo/history.ts` - 获取历史记录

### 3. 前端页面
- `src/pages/todo.astro` - 今日打卡页面
- `src/pages/todo-history.astro` - 历史记录页面

### 4. 导航更新
- `src/components/Header.astro` - 添加了"打卡"链接

### 5. 环境变量
- `.env` - 添加了 `NOTION_TODO_DB_ID`

## Notion 数据库配置

数据库 ID: `2e9223bbe551802596d9e26ecbd7e248`

### 字段结构

| 字段名 | 类型 | 说明 |
|--------|------|------|
| 日期 | Title | YYYY-MM-DD 格式，主键 |
| 体重 | Number | 体重（kg） |
| 备注 | Rich Text | 今日备注 |
| 墨墨背单词 | Checkbox | 是否完成 |
| 俯卧撑一组 | Checkbox | 是否完成 |
| 深蹲一组 | Checkbox | 是否完成 |
| 抓杠3次 | Checkbox | 是否完成 |
| 站桩 | Checkbox | 是否完成 |

## 使用方法

### 本地开发

1. **启动开发服务器**
   ```bash
   npm run dev
   ```

2. **访问页面**
   - 今日打卡: http://localhost:4321/todo
   - 历史记录: http://localhost:4321/todo-history

### 部署到 Vercel

1. **添加环境变量**
   在 Vercel 项目设置中添加：
   - `NOTION_TOKEN` (已有)
   - `NOTION_GAMES_DB_ID` (已有)
   - `NOTION_TODO_DB_ID` = `2e9223bbe551802596d9e26ecbd7e248`

2. **重新部署**
   推送代码到 GitHub，Vercel 会自动部署

## 功能特点

✅ **实时同步** - 数据直接写入 Notion，刷新即可看到
✅ **每日独立** - 每天自动生成新的记录
✅ **历史查看** - 可查看过去 30 天的打卡记录
✅ **完成率统计** - 自动计算每天的任务完成率
✅ **响应式设计** - 支持手机和电脑访问

## 工作流程

1. **首次打开** - 页面显示空表单
2. **填写数据** - 输入体重、备注，勾选完成的任务
3. **保存** - 点击保存按钮，数据写入 Notion
4. **再次打开** - 自动加载今日已保存的数据
5. **查看历史** - 点击"查看历史"按钮查看过去的记录

## 注意事项

- 日期格式必须为 YYYY-MM-DD
- Notion 数据库中的"日期"字段是 Title 类型，不是 Date 类型
- 每天只能有一条记录（通过日期作为主键保证）
- 环境变量必须正确配置才能访问 Notion API
