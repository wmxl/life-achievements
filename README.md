# 🏆 个人成就展示网站

一个基于 Astro 构建的个人成就展示网站，用于记录和展示玩过的游戏、看过的电影、读过的书籍。

## ✨ 特性

- 📝 使用 Markdown + Front Matter 管理数据，便于阅读和版本控制
- 🎨 简洁现代的 UI 设计，响应式布局
- ⚡ 基于 Astro 的静态站点生成，速度快、性能优
- 🚀 通过 GitHub Actions 自动部署到 GitHub Pages
- 📊 自动统计和展示数据分析
- 🏷️ 支持标签、评分、封面等丰富元数据

## 📦 技术栈

- **框架**: [Astro](https://astro.build/) - 静态站点生成器
- **语言**: TypeScript
- **数据源**: Markdown + YAML Front Matter
- **部署**: GitHub Pages + GitHub Actions
- **样式**: 原生 CSS（使用 CSS 变量）

## 🚀 快速开始

### 前置要求

- Node.js 18+
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run dev
```

访问 `http://localhost:4321` 查看网站。

### 构建生产版本

```bash
npm run build
```

构建产物将生成在 `dist/` 目录。

### 预览生产版本

```bash
npm run preview
```

## 📁 项目结构

```
life-achievements/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 自动部署
├── src/
│   ├── content/
│   │   ├── config.ts           # Content Collections 配置
│   │   ├── games/              # 游戏 Markdown 文件
│   │   ├── movies/             # 电影 Markdown 文件
│   │   └── books/              # 书籍 Markdown 文件
│   ├── layouts/
│   │   └── Layout.astro        # 基础页面布局
│   ├── components/
│   │   ├── Header.astro        # 导航栏
│   │   └── Card.astro          # 卡片组件
│   └── pages/
│       ├── index.astro         # 首页
│       ├── games.astro         # 游戏列表页
│       ├── games/[slug].astro  # 游戏详情页
│       ├── movies.astro        # 电影列表页
│       ├── movies/[slug].astro # 电影详情页
│       ├── books.astro         # 书籍列表页
│       └── books/[slug].astro  # 书籍详情页
├── public/
│   └── images/                 # 静态资源（封面图片等）
├── astro.config.mjs            # Astro 配置
├── tsconfig.json               # TypeScript 配置
└── package.json
```

## 📝 如何添加内容

### 添加游戏

在 `src/content/games/` 目录下创建新的 `.md` 文件：

```markdown
---
title: "游戏名称"
platform: "PC/Switch/PS5"
rating: 5
completedDate: "2024-01-01"
status: "已完成"
playTime: 50
tags: [动作, 冒险, RPG]
cover: "/images/game-cover.jpg"
favorite: true
---

## 我的评价

在这里写下你的游戏体验和评价。

## 难忘时刻

- 列出游戏中的精彩瞬间
```

### 添加电影

在 `src/content/movies/` 目录下创建新的 `.md` 文件：

```markdown
---
title: "电影名称"
director: "导演名字"
year: 2024
rating: 5
watchDate: "2024-01-01"
tags: [科幻, 动作]
cover: "/images/movie-poster.jpg"
favorite: true
---

## 观影感受

在这里写下你的观影体验。
```

### 添加书籍

在 `src/content/books/` 目录下创建新的 `.md` 文件：

```markdown
---
title: "书名"
author: "作者名字"
rating: 5
readDate: "2024-01-01"
tags: [小说, 科幻]
cover: "/images/book-cover.jpg"
favorite: true
---

## 阅读感受

在这里写下你的阅读笔记和思考。
```

## 🌐 部署到 GitHub Pages

### 1. 配置 Astro

在 `astro.config.mjs` 中设置你的站点信息：

```javascript
export default defineConfig({
  site: 'https://your-username.github.io',
  base: '/life-achievements',  // 如果仓库名是 your-username.github.io 则省略此行
});
```

### 2. 启用 GitHub Pages

1. 进入 GitHub 仓库的 Settings
2. 找到 Pages 选项
3. Source 选择 "GitHub Actions"

### 3. 推送代码

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

推送后，GitHub Actions 会自动构建并部署网站。

### 4. 访问网站

部署完成后，访问：
- 用户/组织站点：`https://your-username.github.io`
- 项目站点：`https://your-username.github.io/life-achievements`

## 🎨 自定义样式

所有全局样式定义在 `src/layouts/Layout.astro` 中，使用 CSS 变量方便自定义：

```css
:root {
  --color-primary: #3b82f6;      /* 主题色 */
  --color-bg: #ffffff;           /* 背景色 */
  --color-text: #1f2937;         /* 文字色 */
  /* ... 更多变量 */
}
```

## 📊 数据统计

网站会自动统计和展示：

- 游戏/电影/书籍总数
- 平均评分
- 最爱内容数量
- 游戏总时长
- 最近添加的内容

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可

MIT License

## 🙏 致谢

- [Astro](https://astro.build/) - 出色的静态站点生成器
- [GitHub Pages](https://pages.github.com/) - 免费的静态网站托管服务

---

⭐ 如果这个项目对你有帮助，请给它一个 Star！
