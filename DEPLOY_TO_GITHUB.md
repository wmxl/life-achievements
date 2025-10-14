# 🚀 部署到 GitHub Pages 完整指南

## 📋 你的配置

- **GitHub 用户名**: `wmxl`
- **仓库名**: `life-achievements`
- **线上 URL**: `https://wmxl.github.io/life-achievements`
- **本地 URL**: `http://localhost:4321/life-achievements/`
- **路径一致性**: ✅ 完全一致

## ✅ 第一步：验证本地配置

### 1. 检查配置文件

`astro.config.mjs` 已配置为：
```javascript
export default defineConfig({
  site: 'https://wmxl.github.io',
  base: '/life-achievements',
  outDir: './dist',
});
```

### 2. 访问本地网站

开发服务器会自动重启，访问：
```
http://localhost:4321/life-achievements/
```

⚠️ **注意**：必须访问 `/life-achievements/`，直接访问 `/` 会 404。

### 3. 测试所有功能

- [ ] 首页显示正常
- [ ] 点击导航栏（游戏、电影、书籍）
- [ ] 点击卡片查看详情
- [ ] 点击"返回列表"
- [ ] 所有链接都以 `/life-achievements/` 开头

如果本地一切正常，继续下一步！

## 🔧 第二步：准备 GitHub 仓库

### 选项 A：如果仓库已存在

```bash
# 1. 检查当前远程仓库
git remote -v

# 2. 如果需要更新远程地址
git remote set-url origin https://github.com/wmxl/life-achievements.git

# 3. 查看当前分支
git branch

# 4. 如果不是 main 分支，切换或重命名
git branch -M main
```

### 选项 B：如果仓库不存在

1. 访问 https://github.com/new
2. 仓库名输入：`life-achievements`
3. 选择 Public（GitHub Pages 需要）
4. **不要**勾选 "Add a README file"
5. 点击 "Create repository"

然后执行：
```bash
git remote add origin https://github.com/wmxl/life-achievements.git
git branch -M main
```

## 📤 第三步：推送代码

```bash
# 1. 查看当前状态
git status

# 2. 添加所有文件
git add .

# 3. 提交（如果有未提交的改动）
git commit -m "配置部署到 wmxl.github.io/life-achievements"

# 4. 推送到 GitHub
git push -u origin main
```

如果遇到认证问题，可能需要使用 Personal Access Token。

## ⚙️ 第四步：启用 GitHub Pages

### 1. 进入仓库设置

访问：`https://github.com/wmxl/life-achievements/settings/pages`

或者：
1. 打开仓库 `https://github.com/wmxl/life-achievements`
2. 点击 **Settings** 标签
3. 左侧菜单找到 **Pages**

### 2. 配置 Source

在 "Build and deployment" 部分：
- **Source**: 选择 `GitHub Actions`（不是 Deploy from a branch）

应该看到提示：
```
GitHub Actions
Use a workflow file to deploy with GitHub Actions
```

### 3. 等待部署

1. 点击仓库顶部的 **Actions** 标签
2. 你会看到一个名为 "Deploy to GitHub Pages" 的工作流正在运行
3. 点击查看详情，等待完成（通常 1-3 分钟）
4. 绿色勾号 ✅ 表示部署成功

### 4. 检查部署状态

回到 **Settings → Pages**，你会看到：
```
Your site is live at https://wmxl.github.io/life-achievements
```

## 🎉 第五步：访问线上网站

打开浏览器，访问：
```
https://wmxl.github.io/life-achievements
```

测试所有功能：
- [ ] 首页加载正常
- [ ] 统计数据显示正确
- [ ] 可以查看游戏/电影/书籍列表
- [ ] 可以点击查看详情
- [ ] 样式显示正常
- [ ] 所有链接都能正常工作

## 📝 第六步：日常更新流程

每次添加新内容或修改后：

```bash
# 1. 本地测试
npm run dev
# 访问 http://localhost:4321/life-achievements/

# 2. 确认无误后提交
git add .
git commit -m "添加新游戏/电影/书籍"

# 3. 推送
git push

# 4. 等待自动部署（1-3 分钟）
# 5. 访问线上查看更新
```

就是这么简单！推送即部署 🚀

## 🔍 故障排查

### 问题 1：本地访问 404

**症状**：访问 `http://localhost:4321/` 显示 404

**解决**：必须访问 `http://localhost:4321/life-achievements/`

### 问题 2：GitHub Actions 失败

**检查步骤**：
1. 查看 Actions 标签页的错误日志
2. 确认 `.github/workflows/deploy.yml` 文件存在
3. 确认仓库是 Public
4. 确认 Settings → Pages → Source 选择了 "GitHub Actions"

**常见错误**：
- 权限问题：在 Actions 失败页面会有提示
- Node.js 版本：工作流使用 Node 20，应该没问题

### 问题 3：线上页面 404

**可能原因**：
1. 部署还没完成 - 等待几分钟
2. URL 错误 - 确认访问的是 `https://wmxl.github.io/life-achievements`（带 `/life-achievements`）
3. GitHub Pages 未启用 - 检查 Settings → Pages

**解决步骤**：
```bash
# 1. 本地构建测试
npm run build
npm run preview

# 2. 如果本地 preview 正常，检查 GitHub Pages 设置
# 3. 查看 Actions 是否成功运行
```

### 问题 4：样式丢失

**症状**：页面显示但没有样式

**原因**：通常是 base 路径配置问题

**检查**：
- 确认 `astro.config.mjs` 中 `base: '/life-achievements'`
- 浏览器开发者工具查看 CSS 文件路径是否正确

### 问题 5：推送需要认证

**症状**：`git push` 要求输入用户名密码

**解决**：
```bash
# 使用 SSH（推荐）
git remote set-url origin git@github.com:wmxl/life-achievements.git

# 或使用 Personal Access Token
# 1. GitHub → Settings → Developer settings → Personal access tokens
# 2. Generate new token (classic)
# 3. 选择 repo 权限
# 4. 使用 token 作为密码
```

## 📊 验证清单

部署成功后的检查清单：

### 本地环境
- [ ] `npm run dev` 正常启动
- [ ] 访问 `http://localhost:4321/life-achievements/` 正常
- [ ] 所有链接包含 `/life-achievements/` 前缀
- [ ] 导航、卡片、详情页都正常

### 线上环境
- [ ] 访问 `https://wmxl.github.io/life-achievements` 正常
- [ ] 首页统计数据显示正确
- [ ] 能看到 3 个游戏、3 个电影、3 个书籍
- [ ] 可以点击查看详情
- [ ] 可以返回列表
- [ ] 导航栏工作正常
- [ ] 样式显示正常

### 一致性检查
- [ ] 本地和线上的 URL 结构一致
- [ ] 本地和线上的功能完全相同
- [ ] 所有链接都以 `/life-achievements/` 开头

## 🎯 快速命令参考

```bash
# 本地开发
npm run dev
# 访问 http://localhost:4321/life-achievements/

# 本地构建测试
npm run build
npm run preview

# 提交并部署
git add .
git commit -m "你的提交信息"
git push

# 查看远程仓库
git remote -v

# 查看当前分支
git branch

# 查看提交历史
git log --oneline
```

## 📚 相关文档

- `.github/workflows/deploy.yml` - GitHub Actions 配置
- `astro.config.mjs` - Astro 配置
- `README.md` - 项目说明
- `USAGE.md` - 使用指南

## 🎊 完成！

恭喜！你的个人成就展示网站已经部署上线了！

- 🏠 线上地址：`https://wmxl.github.io/life-achievements`
- 💻 本地地址：`http://localhost:4321/life-achievements/`
- ✅ 完全一致的开发和生产环境

现在你可以：
- 添加更多游戏、电影、书籍
- 自定义样式和主题
- 分享给朋友
- 持续更新你的成就

享受你的成就展示网站吧！🎮🎬📚

