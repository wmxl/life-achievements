# ✅ 部署检查清单

## 🎯 目标

部署到：`https://wmxl.github.io/life-achievements`

## 📋 部署前检查

### 1. 本地测试 ✓

开发服务器已重启，访问以下地址测试：

```
http://localhost:4321/life-achievements/
```

⚠️ **重要**：必须包含 `/life-achievements/`，否则会 404！

**测试清单**：
- [ ] 首页能正常打开
- [ ] 点击"游戏"、"电影"、"书籍"导航
- [ ] 点击任意卡片查看详情
- [ ] 点击"返回列表"
- [ ] 查看浏览器地址栏，所有 URL 都是 `/life-achievements/xxx`

### 2. 配置确认 ✓

`astro.config.mjs` 已配置：
```javascript
site: 'https://wmxl.github.io',
base: '/life-achievements',
```

### 3. 文件检查 ✓

- [x] `.github/workflows/deploy.yml` 存在
- [x] 所有页面链接已使用动态 base
- [x] 示例数据完整（3 个游戏、3 个电影、3 个书籍）

## 🚀 部署步骤

### Step 1: 推送代码到 GitHub

```bash
# 检查远程仓库
git remote -v
# 应该显示：origin  https://github.com/wmxl/life-achievements.git

# 如果不对，设置正确的远程仓库
git remote set-url origin https://github.com/wmxl/life-achievements.git

# 查看当前状态
git status

# 添加所有文件
git add .

# 提交
git commit -m "配置部署到 wmxl.github.io/life-achievements"

# 推送到 main 分支
git push -u origin main
```

### Step 2: 启用 GitHub Pages

1. 打开 https://github.com/wmxl/life-achievements/settings/pages
2. **Source** 选择 `GitHub Actions`
3. 保存

### Step 3: 等待部署

1. 访问 https://github.com/wmxl/life-achievements/actions
2. 查看 "Deploy to GitHub Pages" 工作流
3. 等待绿色勾号 ✅（约 1-3 分钟）

### Step 4: 访问网站

```
https://wmxl.github.io/life-achievements
```

## ✅ 部署后验证

### 基础检查
- [ ] 网站能打开（不是 404）
- [ ] 首页显示正常
- [ ] 看到统计卡片（3 个游戏、3 个电影、3 个书籍）
- [ ] 样式正常加载

### 功能检查
- [ ] 导航栏点击正常
- [ ] 游戏列表页显示 3 个游戏
- [ ] 电影列表页显示 3 个电影
- [ ] 书籍列表页显示 3 个书籍
- [ ] 可以点击卡片查看详情
- [ ] 详情页显示完整内容
- [ ] "返回列表"链接工作正常

### 一致性检查
- [ ] 本地 URL: `http://localhost:4321/life-achievements/games`
- [ ] 线上 URL: `https://wmxl.github.io/life-achievements/games`
- [ ] URL 结构完全一致 ✅

## 🎉 部署成功！

如果所有检查都通过，恭喜你！网站已成功部署！

### 分享链接

```
https://wmxl.github.io/life-achievements
```

### 后续更新

每次修改后：
```bash
git add .
git commit -m "更新内容"
git push
```

等待 1-3 分钟，更新会自动部署到线上。

## ❓ 遇到问题？

查看详细故障排查：`DEPLOY_TO_GITHUB.md`

### 快速诊断

**问题：本地访问 404**
→ 访问 `http://localhost:4321/life-achievements/`（加上 `/life-achievements/`）

**问题：GitHub Actions 失败**
→ 检查 Actions 标签页的错误日志

**问题：线上页面 404**
→ 确认访问 `https://wmxl.github.io/life-achievements`（不是 `https://wmxl.github.io/`）

**问题：样式丢失**
→ 检查浏览器开发者工具的 Console 和 Network 标签

## 📞 需要帮助？

- 详细部署指南：`DEPLOY_TO_GITHUB.md`
- 使用指南：`USAGE.md`
- 项目说明：`README.md`

---

祝部署顺利！🚀

