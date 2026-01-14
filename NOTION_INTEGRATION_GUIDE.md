# 🎯 Notion 集成完成！

## ✅ 已完成的工作

### 1. 安装了 Notion SDK
```bash
npm install @notionhq/client
```

### 2. 创建了 Notion 数据获取模块
- `src/lib/notion.ts` - 封装了所有 Notion API 调用

### 3. 创建了新的页面（使用 Notion 数据）
- `/games-notion` - 游戏列表页（从 Notion 获取）
- `/games-notion/[slug]` - 游戏详情页（从 Notion 获取）

### 4. 配置了环境变量
- `.env` 文件（本地使用）
- GitHub Actions 配置（线上部署）

---

## 🧪 本地测试

### 1. 启动开发服务器

```bash
npm run dev
```

### 2. 访问 Notion 版本的游戏页面

```
http://localhost:4321/life-achievements/games-notion
```

### 3. 如果成功

你应该能看到：
- ✅ 从 Notion 读取的游戏列表
- ✅ 显示你在 Notion 中添加的测试游戏
- ✅ 可以点击查看详情

### 4. 如果失败

检查：
1. `.env` 文件是否存在
2. Token 和 Database ID 是否正确
3. Notion 数据库是否已连接到 Integration
4. 查看终端错误信息

---

## 🚀 线上部署

### 第一步：配置 GitHub Secrets

1. 访问：`https://github.com/wmxl/life-achievements/settings/secrets/actions`

2. 点击 **"New repository secret"**

3. 添加第一个 Secret：
   - **Name**: `NOTION_TOKEN`
   - **Secret**: `ntn_q91894510894HaW1PIo1pf3ThDEaQa8NxPA3veLCF2q7Se`
   - 点击 **"Add secret"**

4. 添加第二个 Secret：
   - **Name**: `NOTION_GAMES_DB_ID`
   - **Secret**: `2e8223bbe5518039b0c1c156ebb70d51`
   - 点击 **"Add secret"**

### 第二步：推送代码

```bash
git add .
git commit -m "集成 Notion API 作为数据源"
git push
```

### 第三步：访问线上页面

部署完成后访问：
```
https://wmxl.github.io/life-achievements/games-notion
```

---

## 📝 使用流程

### 添加新游戏

1. **在 Notion 中添加**
   - 打开 Notion 的 "游戏收藏" 数据库
   - 点击 "New" 按钮
   - 填写表单（标题、平台、评分等）
   - 上传封面图片
   - 写评价
   - 保存

2. **触发部署**

   **方式 A：自动定时**（推荐）
   - 修改 `.github/workflows/deploy.yml`
   - 添加定时触发（如每天一次）

   **方式 B：手动触发**
   ```bash
   git commit --allow-empty -m "更新 Notion 数据"
   git push
   ```

   **方式 C：在 GitHub 手动触发**
   - 访问：`https://github.com/wmxl/life-achievements/actions`
   - 选择 "Deploy to GitHub Pages"
   - 点击 "Run workflow"

3. **等待部署**（2-5 分钟）

4. **查看更新**
   - 访问网站，新游戏就出现了！

---

## 🔄 对比两种数据源

### Markdown 版本（原版）
- URL: `/games`
- 数据源: Git 仓库中的 Markdown 文件
- 特点: 需要编辑代码，有版本控制

### Notion 版本（新版）
- URL: `/games-notion`
- 数据源: Notion 数据库
- 特点: 在 Notion 编辑，体验好

**你可以保留两个版本，也可以只用一个。**

---

## ⚙️ 高级配置

### 1. 设置自动定时部署

修改 `.github/workflows/deploy.yml`，在 `on:` 部分添加：

```yaml
on:
  push:
    branches: [ main ]
  workflow_dispatch:
  schedule:
    - cron: '0 0 * * *'  # 每天 UTC 00:00（北京时间 08:00）
```

这样每天自动从 Notion 拉取最新数据！

### 2. 迁移现有游戏到 Notion

你可以手动将现有的 Markdown 游戏数据复制到 Notion。

### 3. 添加电影和书籍

类似的方式，可以为电影和书籍也创建 Notion 数据库。

---

## 🔐 安全提示

⚠️ **重要**：你的 Token 已经在聊天中暴露，建议：

1. 测试成功后，重新生成 Token
2. 访问：https://www.notion.so/my-integrations
3. 找到你的 Integration
4. 点击 "Regenerate secret"
5. 更新 `.env` 和 GitHub Secrets

---

## 🐛 故障排查

### 本地开发问题

**错误：`NOTION_TOKEN is not defined`**
- 确保 `.env` 文件存在
- 重启开发服务器

**错误：`Failed to fetch from Notion`**
- 检查 Token 是否正确
- 检查 Database ID 是否正确
- 确认数据库已连接到 Integration

**错误：`No games found`**
- 确保 Notion 数据库中有数据
- 检查字段名是否匹配（Name, 平台, 评分等）

### 线上部署问题

**错误：构建失败**
- 检查 GitHub Secrets 是否配置
- 查看 Actions 日志

**页面显示空白**
- Notion API 可能超时
- 检查 Database ID 是否正确

---

## 📚 下一步

- [ ] 本地测试 Notion 集成
- [ ] 配置 GitHub Secrets
- [ ] 推送代码部署
- [ ] 在 Notion 添加更多游戏
- [ ] 设置自动定时部署
- [ ] 添加电影和书籍数据库

---

## 🎉 完成！

现在你可以：
- ✅ 在 Notion 中像填表一样添加游戏
- ✅ 上传封面图片
- ✅ 写详细评价
- ✅ 点击保存后推送部署
- ✅ 几分钟后在网站上看到更新

享受你的新工作流程吧！🎮📝
