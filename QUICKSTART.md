# ⚡ 快速开始指南

## 🚀 5 分钟快速上手

### 第 1 步：安装依赖（1 分钟）

```bash
cd /Users/admin/MyProject/life-achievements
npm install
```

### 第 2 步：启动开发服务器（1 分钟）

```bash
npm run dev
```

访问 http://localhost:4321 查看网站。

你应该能看到：
- 首页显示 3 个游戏、3 个电影、3 个书籍
- 可以点击查看详情
- 导航栏可以切换不同页面

### 第 3 步：添加你的第一个内容（2 分钟）

#### 方式 1：修改现有示例

编辑 `src/content/games/zelda-botw.md`，改成你自己的游戏。

#### 方式 2：创建新文件

```bash
# 创建新的游戏记录
cat > src/content/games/my-game.md << 'EOF'
---
title: "我的游戏"
platform: "PC"
rating: 5
completedDate: "2025-10-14"
status: "已完成"
playTime: 50
tags: [RPG, 冒险]
favorite: true
---

## 我的评价

这是我最喜欢的游戏！

## 游戏技巧

- 技巧 1
- 技巧 2
EOF
```

保存后，开发服务器会自动刷新，你的新内容就会显示出来！

### 第 4 步：部署到 GitHub Pages（1 分钟）

#### 4.1 配置站点信息

编辑 `astro.config.mjs`：

```javascript
export default defineConfig({
  site: 'https://YOUR-USERNAME.github.io',
  base: '/life-achievements',
});
```

将 `YOUR-USERNAME` 替换为你的 GitHub 用户名。

#### 4.2 推送到 GitHub

```bash
# 如果还没有初始化 git（项目已经初始化过）
# git init
# git add .
# git commit -m "Initial commit"
# git remote add origin https://github.com/YOUR-USERNAME/life-achievements.git

# 推送代码
git push -u origin main
```

#### 4.3 启用 GitHub Pages

1. 进入 GitHub 仓库页面
2. 点击 **Settings** → **Pages**
3. Source 选择 **GitHub Actions**

等待几分钟，GitHub Actions 会自动构建和部署。

完成后访问：`https://YOUR-USERNAME.github.io/life-achievements`

## 🎉 完成！

现在你有了一个功能完整的个人成就展示网站！

## 📝 下一步

### 日常使用流程

```bash
# 1. 编辑内容
vi src/content/games/new-game.md

# 2. 查看效果
npm run dev

# 3. 提交并推送（自动部署）
git add .
git commit -m "添加新游戏"
git push
```

### 添加封面图片

```bash
# 1. 复制图片到 public/images/
cp ~/Downloads/game-cover.jpg public/images/

# 2. 在 Markdown 中引用
# cover: "/images/game-cover.jpg"
```

### 自定义样式

编辑 `src/layouts/Layout.astro`，修改 CSS 变量：

```css
:root {
  --color-primary: #3b82f6;  /* 改成你喜欢的颜色 */
}
```

## 📚 更多文档

- **README.md** - 完整的项目介绍
- **USAGE.md** - 详细使用指南（推荐阅读）
- **PROJECT_SUMMARY.md** - 项目技术总结

## 💡 常见问题

**Q: 如何删除示例数据？**
```bash
rm src/content/games/*.md
rm src/content/movies/*.md
rm src/content/books/*.md
```

**Q: 如何修改网站标题？**
编辑 `src/layouts/Layout.astro` 和 `src/components/Header.astro`。

**Q: 本地预览很慢？**
这是正常的，生产环境会很快。可以用 `npm run build && npm run preview` 测试生产版本。

**Q: 如何添加新的分类？**
查看 `USAGE.md` 中的"添加新的分类（高级）"章节。

## 🆘 遇到问题？

1. 检查 `USAGE.md` 的故障排查章节
2. 运行 `npm run build` 查看详细错误
3. 查看 [Astro 文档](https://docs.astro.build/)
4. 提交 Issue 到项目仓库

---

祝你使用愉快！🎮🎬📚
