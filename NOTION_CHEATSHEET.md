# 🎯 Notion 集成速查表

## ⚡ 快速命令

```bash
# 测试 Notion 连接
npm run test:notion

# 本地开发
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 🌐 访问地址

### 本地
- Markdown 版本: `http://localhost:4321/life-achievements/games`
- Notion 版本: `http://localhost:4321/life-achievements/games-notion`

### 线上
- Markdown 版本: `https://wmxl.github.io/life-achievements/games`
- Notion 版本: `https://wmxl.github.io/life-achievements/games-notion`

## 📝 环境变量

```bash
# .env
NOTION_TOKEN=ntn_q91894510894HaW1PIo1pf3ThDEaQa8NxPA3veLCF2q7Se
NOTION_GAMES_DB_ID=2e8223bbe5518039b0c1c156ebb70d51
```

## 🔗 关键链接

- Notion Integrations: https://www.notion.so/my-integrations
- GitHub Secrets: https://github.com/wmxl/life-achievements/settings/secrets/actions
- GitHub Actions: https://github.com/wmxl/life-achievements/actions

## 📋 数据库字段（复制粘贴）

### 评分选项（Select）
```
⭐
⭐⭐
⭐⭐⭐
⭐⭐⭐⭐
⭐⭐⭐⭐⭐
```

### 平台选项（Select）
```
PC
Switch
PS5
PS4
Xbox
Mobile
其他
```

### 状态选项（Select）
```
已完成
进行中
已放弃
```

### 常见标签（Multi-select）
```
开放世界
动作
RPG
Roguelike
独立
像素
多人
单人
恐怖
解谜
策略
模拟
赛博朋克
冒险
```

## 🐛 故障排查

### 错误："object_not_found"
**原因**: 数据库未与 Integration 连接
**解决**: Notion 数据库 → `•••` → "Add connections" → 选择 Integration → "Confirm"

### 错误："unauthorized"
**原因**: Token 不正确
**解决**: 重新生成 Token，更新 `.env` 和 GitHub Secrets

### 本地能访问，线上 404
**原因**: 未配置 GitHub Secrets
**解决**: 在 GitHub 仓库设置中添加 `NOTION_TOKEN` 和 `NOTION_GAMES_DB_ID`

### 数据不更新
**原因**: 静态网站需要重新构建
**解决**: 推送代码触发部署，或设置自动定时部署

## 🚀 部署流程

### 首次部署
1. 配置 GitHub Secrets
2. `git add . && git commit -m "集成 Notion" && git push`
3. 等待 2-5 分钟
4. 访问 `https://wmxl.github.io/life-achievements/games-notion`

### 日常更新内容
1. 在 Notion 中添加/修改游戏
2. 触发部署（任选一种）：
   - 推送代码: `git commit --allow-empty -m "更新内容" && git push`
   - GitHub 手动触发: Actions → Deploy to GitHub Pages → Run workflow
   - 自动定时（设置后无需操作）

## 📚 文档索引

| 文档 | 用途 |
|------|------|
| `START_HERE.md` | **从这里开始！** 总览和下一步 |
| `CRITICAL_NOTION_SETUP.md` | **必读！** 连接 Integration |
| `NOTION_QUICKSTART.md` | 30 秒快速开始 |
| `NOTION_SETUP_GUIDE.md` | 完整设置教程 |
| `NOTION_INTEGRATION_GUIDE.md` | 技术实现细节 |
| `NOTION_CHEATSHEET.md` | 本文件 - 速查表 |
| `USAGE.md` | Markdown 版本使用指南 |
| `README.md` | 项目总览 |

## 💡 小技巧

### 批量添加游戏
在 Notion 中准备 CSV 文件，然后导入：
数据库右上角 `•••` → "Merge with CSV"

### 快速添加
数据库底部点击 "+ New" 或快捷键 `Ctrl/Cmd + N`

### 创建模板
在数据库中设置默认值和常用标签

### 查看构建日志
访问 GitHub Actions 页面，点击最新的 workflow run

---

**遇到问题？** 按顺序查看：
1. `START_HERE.md` - 是否完成了所有设置步骤
2. `CRITICAL_NOTION_SETUP.md` - 是否连接了 Integration
3. `npm run test:notion` - 运行测试诊断问题
