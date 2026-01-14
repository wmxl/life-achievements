# ⚡ Notion 集成快速开始

## 🎯 30 秒总结

你现在可以在 Notion 中像填表一样管理游戏内容，无需编辑代码！

---

## ✅ 已完成的集成

### 1. 代码层面
- ✅ 安装了 Notion SDK (`@notionhq/client`)
- ✅ 创建了数据获取模块 (`src/lib/notion.ts`)
- ✅ 创建了 Notion 版本页面
  - `/games-notion` - 游戏列表
  - `/games-notion/[slug]` - 游戏详情
- ✅ 配置了环境变量 (`.env`)
- ✅ 更新了 GitHub Actions 配置

### 2. 你已有的凭据
- Token: `ntn_q91894510894HaW1PIo1pf3ThDEaQa8NxPA3veLCF2q7Se`
- Database ID: `2e8223bbe5518039b0c1c156ebb70d51`

---

## 🚀 立即开始（3 步）

### 第 1 步：在 Notion 配置数据库

你需要确保 Notion 数据库有以下字段：

#### 必需字段
```
Name           (Title)        - 游戏名称
平台           (Select)       - PC / Switch / PS5
评分           (Select)       - ⭐⭐⭐⭐⭐ (1-5 星)
完成日期       (Date)         - 2024-10-14
状态           (Select)       - 已完成 / 进行中 / 已放弃
标签           (Multi-select) - Roguelike, 动作, 像素
```

#### 可选字段
```
游戏时长       (Number)       - 120 (小时)
Steam链接      (URL)          - https://store.steampowered.com/...
封面           (Files)        - 上传封面图片
最爱           (Checkbox)     - ✅ 或 ☐
评价           (Text)         - 详细评价内容
```

**⚠️ 重要**：字段名必须完全匹配（包括中文）！

### 第 2 步：连接 Integration

1. 打开 Notion 的游戏数据库页面
2. 点击右上角 `•••` (三个点)
3. 选择 **"Add connections"**
4. 找到并选择你的 Integration
5. 点击 **"Confirm"**

**不连接就无法访问！**

### 第 3 步：测试

#### 本地测试

开发服务器已经在运行，直接访问：

```
http://localhost:4321/life-achievements/games-notion
```

如果看到游戏列表，说明成功了！🎉

#### 如果看不到数据

1. 检查 Integration 是否已连接（步骤 2）
2. 检查字段名是否完全匹配
3. 查看终端的错误信息
4. 参考 `NOTION_SETUP_GUIDE.md` 详细教程

---

## 🎮 添加第一个游戏

在 Notion 数据库中点击 **"+ New"**，填写：

```
Name:         塞尔达传说：旷野之息
平台:         Switch
评分:         ⭐⭐⭐⭐⭐
完成日期:     2024-01-15
状态:         已完成
游戏时长:     120
标签:         开放世界, 动作, 冒险
最爱:         ✅
评价:         这是我玩过最好的开放世界游戏！
```

保存后刷新页面，新游戏就出现了！

---

## 🌐 部署到线上

### 第 1 步：配置 GitHub Secrets

访问：`https://github.com/wmxl/life-achievements/settings/secrets/actions`

添加两个 Secret：

1. **NOTION_TOKEN**
   ```
   ntn_q91894510894HaW1PIo1pf3ThDEaQa8NxPA3veLCF2q7Se
   ```

2. **NOTION_GAMES_DB_ID**
   ```
   2e8223bbe5518039b0c1c156ebb70d51
   ```

### 第 2 步：推送代码

```bash
git add .
git commit -m "集成 Notion API 作为数据源"
git push
```

### 第 3 步：等待部署（2-5 分钟）

访问：`https://wmxl.github.io/life-achievements/games-notion`

---

## 🔄 日常使用流程

### 添加新游戏

1. **打开 Notion** → 找到游戏数据库
2. **点击 "+ New"** → 填写游戏信息
3. **触发部署**（任选一种）：

   **方式 A：推送空提交**
   ```bash
   git commit --allow-empty -m "更新 Notion 数据"
   git push
   ```

   **方式 B：在 GitHub 手动触发**
   - 访问：`https://github.com/wmxl/life-achievements/actions`
   - 点击 "Deploy to GitHub Pages"
   - 点击 "Run workflow"

   **方式 C：设置自动定时** (推荐)
   - 见下方"自动定时部署"

4. **等待 2-5 分钟** → 网站更新完成！

---

## ⚙️ 自动定时部署（推荐）

每天自动从 Notion 拉取最新数据！

编辑 `.github/workflows/deploy.yml`，修改 `on:` 部分：

```yaml
on:
  push:
    branches: [ main ]
  workflow_dispatch:
  schedule:
    - cron: '0 0 * * *'  # 每天 UTC 00:00 (北京时间 08:00)
```

**设置后效果**：
- 每天早上 8 点自动部署
- 你只需在 Notion 添加内容
- 无需手动触发部署

---

## 📂 两种数据源对比

你现在有两套系统：

### Markdown 版本（原版）
- URL: `/games`
- 数据源: Git 仓库的 `.md` 文件
- 适合: 需要版本控制，技术用户

### Notion 版本（新版）
- URL: `/games-notion`
- 数据源: Notion 数据库
- 适合: 快速编辑，非技术用户

**你可以：**
- 同时保留两个版本
- 或只使用 Notion 版本（更新导航链接）

---

## 🎯 下一步

- [ ] 在 Notion 配置数据库字段
- [ ] 连接 Integration
- [ ] 添加测试游戏
- [ ] 本地验证
- [ ] 配置 GitHub Secrets
- [ ] 推送代码部署
- [ ] 设置自动定时部署
- [ ] 添加更多游戏内容

---

## 📚 参考文档

- `NOTION_SETUP_GUIDE.md` - 详细的 Notion 设置教程
- `NOTION_INTEGRATION_GUIDE.md` - 技术实现说明
- `USAGE.md` - Markdown 版本使用指南
- `README.md` - 项目总览

---

## 🔐 安全提示

⚠️ **你的 Token 已在聊天中暴露！**

测试成功后，建议：
1. 访问：https://www.notion.so/my-integrations
2. 找到你的 Integration
3. 点击 **"Regenerate secret"**
4. 更新 `.env` 和 GitHub Secrets

---

## 🐛 常见问题

### Q: 看不到数据？
- 检查 Integration 是否已连接
- 检查字段名是否完全匹配（区分大小写）
- 查看终端错误信息

### Q: 封面图片不显示？
- 确保上传了图片到 Notion
- 或提供外部图片 URL

### Q: 线上部署失败？
- 检查 GitHub Secrets 是否配置正确
- 查看 Actions 日志

### Q: 免费版 Notion 够用吗？
- 完全够用！
- API 限制：每秒 3 次请求
- 个人网站完全够用

---

## 🎉 完成！

现在享受你的新工作流程：
- ✅ 在 Notion 像填表一样添加内容
- ✅ 上传封面图片
- ✅ 写详细评价
- ✅ 触发部署
- ✅ 几分钟后在网站看到更新

祝你玩得开心！🎮

---

**需要帮助？** 查看 `NOTION_SETUP_GUIDE.md` 获取详细教程！
