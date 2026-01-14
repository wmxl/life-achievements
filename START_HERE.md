# 🎉 Notion 集成已完成！

## ✅ 已完成的工作

我已经为你的项目集成了 Notion API，现在你可以在 Notion 中像填表一样管理游戏内容，无需编辑代码！

### 代码修改

1. ✅ 安装了 Notion 客户端库 (`@notionhq/client`)
2. ✅ 创建了 Notion 数据获取模块 (`src/lib/notion.ts`)
3. ✅ 创建了新的页面：
   - `/games-notion` - 游戏列表（从 Notion 获取）
   - `/games-notion/[slug]` - 游戏详情（从 Notion 获取）
4. ✅ 配置了环境变量（`.env` 文件）
5. ✅ 更新了 GitHub Actions 配置（支持线上部署）
6. ✅ 更新了导航栏（可以切换 Markdown/Notion 版本）
7. ✅ 创建了测试脚本 (`npm run test:notion`)
8. ✅ 更新了项目文档

### 你的凭据

- **Token**: `ntn_q91894510894HaW1PIo1pf3ThDEaQa8NxPA3veLCF2q7Se`
- **Database ID**: `2e8223bbe5518039b0c1c156ebb70d51`

这些已经配置在 `.env` 文件中。

---

## ⚠️ 关键下一步（必须完成）

### 当前问题

测试显示：**数据库未与 Integration 连接**

这是 Notion 的权限机制：即使有 Token 和 Database ID，如果数据库没有明确连接到 Integration，API 也无法访问。

### 解决方法（5 个步骤）

#### 1. 打开 Notion 数据库页面

找到 Database ID `2e8223bbe5518039b0c1c156ebb70d51` 对应的页面。

你可以在浏览器中访问（如果是你的工作区）：
```
https://www.notion.so/your-workspace/2e8223bbe5518039b0c1c156ebb70d51
```

或者在 Notion 应用中找到这个数据库。

#### 2. 点击右上角的 `•••` (三个点)

```
┌──────────────────────────────────┐
│  游戏收藏           🔍 Filter ••• │ ← 点这里
└──────────────────────────────────┘
```

#### 3. 选择 "Add connections"

在下拉菜单中找到并点击 **"Add connections"** 或 **"Connections"**。

#### 4. 选择你的 Integration

在弹出的对话框中：
- 搜索你创建的 Integration 名称
- 点击选中
- 点击 **"Confirm"** 确认

#### 5. 验证连接

运行测试命令：

```bash
npm run test:notion
```

**成功的输出应该是：**
```
✅ 连接成功！
📊 数据库中共有 X 条记录
🎮 游戏列表:
  - 游戏名称 (平台) - 评分 - 状态
```

---

## 📋 Notion 数据库字段配置

确保你的 Notion 数据库有以下字段（属性）：

### 必需字段

| 字段名 | Notion 类型 | 说明 | 示例 |
|--------|-------------|------|------|
| Name | Title | 游戏名称 | 塞尔达传说：旷野之息 |
| 平台 | Select | 游戏平台 | PC / Switch / PS5 |
| 评分 | Select | 星星评分 | ⭐⭐⭐⭐⭐ |
| 完成日期 | Date | 完成日期 | 2024-10-14 |
| 状态 | Select | 游戏状态 | 已完成 / 进行中 / 已放弃 |
| 标签 | Multi-select | 游戏标签 | 开放世界, 动作, RPG |

### 可选字段

| 字段名 | Notion 类型 | 说明 |
|--------|-------------|------|
| 游戏时长 | Number | 游戏小时数 |
| Steam链接 | URL | Steam 页面 |
| 封面 | Files | 封面图片 |
| 最爱 | Checkbox | 是否最爱 |
| 评价 | Text | 详细评价 |

**⚠️ 字段名必须完全匹配（包括中文）！**

详细配置指南：查看 `NOTION_SETUP_GUIDE.md`

---

## 🚀 完成后的使用流程

### 本地开发

```bash
# 启动开发服务器
npm run dev
```

访问：
- Markdown 版本：`http://localhost:4321/life-achievements/games`
- **Notion 版本：`http://localhost:4321/life-achievements/games-notion`** ← 新的！

### 添加游戏内容

1. **在 Notion 中添加**
   - 打开游戏数据库
   - 点击 "+ New"
   - 填写表单（标题、平台、评分等）
   - 上传封面图
   - 写评价
   - 保存

2. **本地预览**
   - 刷新页面，新游戏立即显示！

3. **部署到线上**

   **首次部署前**：
   - 配置 GitHub Secrets（见下方）

   **日常部署**：
   ```bash
   git add .
   git commit -m "更新 Notion 集成"
   git push
   ```

---

## 🌐 部署到 GitHub Pages

### 第一步：配置 GitHub Secrets

访问：`https://github.com/wmxl/life-achievements/settings/secrets/actions`

添加两个 Secret：

**1. NOTION_TOKEN**
```
ntn_q91894510894HaW1PIo1pf3ThDEaQa8NxPA3veLCF2q7Se
```

**2. NOTION_GAMES_DB_ID**
```
2e8223bbe5518039b0c1c156ebb70d51
```

### 第二步：推送代码

```bash
git add .
git commit -m "集成 Notion API"
git push
```

### 第三步：访问线上网站

部署完成后（2-5 分钟）：
```
https://wmxl.github.io/life-achievements/games-notion
```

---

## ⚙️ 设置自动定时部署（推荐）

让网站每天自动从 Notion 拉取最新数据！

编辑 `.github/workflows/deploy.yml`：

```yaml
on:
  push:
    branches: [ main ]
  workflow_dispatch:
  schedule:
    - cron: '0 0 * * *'  # 每天 UTC 00:00 (北京时间 08:00)
```

**效果**：
- 每天早上 8 点自动部署
- 你只需在 Notion 添加内容
- 无需手动触发

---

## 📚 文档导航

- **`CRITICAL_NOTION_SETUP.md`** ← 必读！连接 Integration 的详细教程
- **`NOTION_QUICKSTART.md`** - 30 秒快速开始
- **`NOTION_SETUP_GUIDE.md`** - 完整设置教程（包括数据库字段配置）
- **`NOTION_INTEGRATION_GUIDE.md`** - 技术实现细节
- **`USAGE.md`** - Markdown 版本使用指南
- **`README.md`** - 项目总览

---

## 🔐 安全提示

⚠️ **你的 Token 已在聊天中暴露！**

测试成功后，建议：
1. 访问：https://www.notion.so/my-integrations
2. 找到你的 Integration
3. 点击 **"Regenerate secret"**
4. 更新 `.env` 和 GitHub Secrets

---

## ✅ 完整检查清单

在运行网站之前，确保：

- [x] 已创建 Notion Integration
- [x] 已获取 Token
- [x] 已创建游戏数据库
- [x] 已获取 Database ID
- [x] `.env` 文件包含凭据
- [x] 代码已集成 Notion API
- [ ] **已将数据库连接到 Integration** ← 下一步做这个！
- [ ] 数据库有必需的字段
- [ ] 数据库有至少一条测试数据
- [ ] 运行 `npm run test:notion` 成功
- [ ] 配置了 GitHub Secrets
- [ ] 推送代码部署

---

## 🎯 立即开始

**现在就做这3件事：**

1. **连接 Integration**
   - 打开 Notion 数据库 → 点击 `•••` → "Add connections" → 选择 Integration → "Confirm"

2. **运行测试**
   ```bash
   npm run test:notion
   ```

3. **启动开发服务器**
   ```bash
   npm run dev
   ```
   访问：`http://localhost:4321/life-achievements/games-notion`

---

## 💬 需要帮助？

- Integration 连接问题 → 查看 `CRITICAL_NOTION_SETUP.md`
- 数据库字段配置 → 查看 `NOTION_SETUP_GUIDE.md`
- 快速入门 → 查看 `NOTION_QUICKSTART.md`
- 技术细节 → 查看 `NOTION_INTEGRATION_GUIDE.md`

---

## 🎉 完成后你将拥有

- ✅ 在 Notion 中像填表一样管理游戏
- ✅ 上传封面图片
- ✅ 写详细评价
- ✅ 点击保存后自动同步
- ✅ 无需编辑代码
- ✅ 支持自动定时部署

享受你的新工作流程！🎮📝
