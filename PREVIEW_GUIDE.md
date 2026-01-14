# 📱 预览指南

## 本地预览

### 开发模式（日常使用）

```bash
# 启动开发服务器
npm run dev
```

访问：http://localhost:4321/life-achievements/

**特点**：
- ⚡ 自动热重载
- 🐛 详细错误提示
- 💻 适合开发调试

**停止服务器**：按 `Ctrl + C`

---

### 生产预览（部署前测试）

```bash
# 1. 构建
npm run build

# 2. 预览
npm run preview
```

访问：http://localhost:4321/life-achievements/

**特点**：
- 🚀 完全模拟线上环境
- ⚡ 性能优化版本
- ✅ 适合部署前测试

---

## 线上预览

### 访问地址

```
https://wmxl.github.io/life-achievements
```

### 更新流程

```bash
# 1. 修改内容
# 编辑 src/content/ 下的 Markdown 文件

# 2. 本地测试
npm run dev
# 访问 http://localhost:4321/life-achievements/ 确认无误

# 3. 提交并推送
git add .
git commit -m "添加新游戏/更新内容"
git push

# 4. 等待自动部署（2-5 分钟）
# 访问 https://github.com/wmxl/life-achievements/actions 查看状态

# 5. 访问线上网站
# https://wmxl.github.io/life-achievements
```

### 查看部署状态

**Actions 页面**：https://github.com/wmxl/life-achievements/actions

- 🟡 黄色圆圈：正在部署
- ✅ 绿色勾号：部署成功
- ❌ 红色叉号：部署失败（点击查看错误日志）

**部署时间**：通常 2-5 分钟

---

## 常见使用场景

### 场景 1：添加新游戏

```bash
# 1. 创建游戏文件
vi src/content/games/new-game.md

# 2. 本地预览
npm run dev
# 访问 http://localhost:4321/life-achievements/games

# 3. 确认无误后推送
git add .
git commit -m "添加新游戏"
git push

# 4. 等待部署，访问线上查看
# https://wmxl.github.io/life-achievements
```

### 场景 2：修改样式

```bash
# 1. 修改样式文件
vi src/layouts/Layout.astro

# 2. 本地预览（实时看到效果）
npm run dev

# 3. 满意后推送
git add .
git commit -m "更新样式"
git push
```

### 场景 3：测试构建

```bash
# 1. 构建并预览
npm run build
npm run preview

# 2. 如果构建成功，推送即可
git push

# 3. 如果构建失败，查看错误信息并修复
```

---

## 故障排查

### 本地预览问题

#### 问题 1：端口被占用

**错误信息**：
```
Error: listen EADDRINUSE: address already in use :::4321
```

**解决方法**：
```bash
# 方式 1：使用不同端口
npm run dev -- --port 3000

# 方式 2：关闭占用端口的进程
lsof -i :4321
kill -9 [PID]
```

#### 问题 2：访问 404

**原因**：访问的 URL 不对

- ❌ 错误：http://localhost:4321/
- ✅ 正确：http://localhost:4321/life-achievements/

**说明**：本地和线上都需要包含 `/life-achievements/` 前缀

#### 问题 3：修改不生效

**解决方法**：
```bash
# 1. 停止开发服务器（Ctrl + C）
# 2. 清除缓存并重启
rm -rf .astro dist
npm run dev
```

---

### 线上预览问题

#### 问题 1：推送后没有自动部署

**检查步骤**：

1. 确认 GitHub Pages 已启用
   - 访问：https://github.com/wmxl/life-achievements/settings/pages
   - Source 应该是 "GitHub Actions"

2. 检查 Actions 是否运行
   - 访问：https://github.com/wmxl/life-achievements/actions
   - 应该看到新的工作流

#### 问题 2：部署失败

**查看错误日志**：
1. 访问 https://github.com/wmxl/life-achievements/actions
2. 点击失败的工作流（红色叉号）
3. 查看详细错误信息

**常见错误**：
- 构建失败：通常是 Markdown 格式错误或类型不匹配
- 权限问题：检查 Settings → Actions → Workflow permissions

#### 问题 3：线上显示旧内容

**原因**：浏览器缓存

**解决方法**：
- 强制刷新：`Ctrl + Shift + R`（Windows/Linux）或 `Cmd + Shift + R`（Mac）
- 或清除浏览器缓存

---

## 快速命令

```bash
# === 本地开发 ===
npm run dev                    # 开发模式
npm run dev -- --port 3000     # 使用不同端口

# === 构建和预览 ===
npm run build                  # 构建生产版本
npm run preview                # 预览构建结果

# === 部署 ===
git add .                      # 添加更改
git commit -m "更新说明"       # 提交
git push                       # 推送（触发自动部署）

# === 查看状态 ===
git status                     # 查看本地状态
git log --oneline -5           # 查看最近提交
```

---

## URL 对照表

| 环境 | URL | 说明 |
|------|-----|------|
| 本地开发 | http://localhost:4321/life-achievements/ | 开发调试 |
| 本地预览 | http://localhost:4321/life-achievements/ | 构建后预览 |
| 线上生产 | https://wmxl.github.io/life-achievements | 正式环境 |
| GitHub Actions | https://github.com/wmxl/life-achievements/actions | 部署状态 |
| GitHub Pages 设置 | https://github.com/wmxl/life-achievements/settings/pages | 配置 Pages |

---

## 推荐工作流程

### 日常添加内容

1. ✅ 创建/修改 Markdown 文件
2. ✅ `npm run dev` 本地预览
3. ✅ 确认无误
4. ✅ `git add . && git commit -m "xxx" && git push`
5. ✅ 等待自动部署
6. ✅ 访问线上网站确认

### 重大修改前

1. ✅ 创建新分支（可选）
2. ✅ 本地充分测试
3. ✅ `npm run build && npm run preview` 生产环境测试
4. ✅ 确认无误后推送
5. ✅ 监控 Actions 部署状态

---

**提示**：记得收藏这个文档，方便随时查看！📌

