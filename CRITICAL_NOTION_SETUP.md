# ⚠️ 关键步骤：连接 Notion Integration 到数据库

## 🎯 当前状态

✅ Token 有效
✅ Database ID 正确
❌ **数据库未与 Integration 连接** ← 这是问题所在！

## 🔧 解决方法（必须完成）

### 步骤 1：打开你的 Notion 数据库页面

使用这个 Database ID 找到对应的页面：
```
2e8223bbe5518039b0c1c156ebb70d51
```

你可以在 Notion 的页面 URL 中找到它，像这样：
```
https://www.notion.so/your-workspace/2e8223bbe5518039b0c1c156ebb70d51?v=...
```

### 步骤 2：连接 Integration（关键！）

1. **打开数据库页面**

2. **点击右上角的 `•••` (三个点按钮)**

3. **在下拉菜单中找到 "Connections" 或 "Add connections"**

   ![找到 Connections 选项](https://notionusercontent.com/connections-menu.png)

4. **搜索并选择你的 Integration**
   - 它的名称可能是你创建时设置的
   - 或者默认名称如 "My Integration"

5. **点击 "Confirm" 确认连接**

6. **确认成功**
   - 你应该能在数据库右上角看到一个小图标
   - 或者在 Connections 列表中看到你的 Integration

### 步骤 3：验证连接

运行测试命令：

```bash
npm run test:notion
```

**如果成功，你会看到：**
```
✅ 连接成功！
📊 数据库中共有 X 条记录
🎮 游戏列表:
  - 游戏名称 (平台) - 评分 - 状态
```

**如果仍然失败，检查：**
1. 是否选择了正确的 Integration
2. 是否点击了 "Confirm"
3. 是否在正确的数据库页面操作

---

## 📸 视觉指南

### 在哪里找到"三个点"？

```
┌─────────────────────────────────────────────┐
│  游戏收藏                  🔍 Filter   •••  │ ← 这里！
├─────────────────────────────────────────────┤
│  Name    │  平台  │  评分  │  状态       │
│──────────┼────────┼────────┼──────────────│
│  游戏 1  │  PC    │  ⭐⭐⭐⭐ │  已完成   │
│  游戏 2  │  Switch│  ⭐⭐⭐⭐⭐│  已完成   │
└─────────────────────────────────────────────┘
```

### 点击后的菜单

```
•••  下拉菜单:
    ├─ Properties
    ├─ Layout
    ├─ Sort
    ├─ Filter
    ├─ Search
    ├─ ───────────
    ├─ Add connections    ← 选择这个！
    ├─ ───────────
    ├─ Copy link
    ├─ Move to
    └─ Delete
```

### 选择 Integration

```
╔═══════════════════════════════════╗
║  Add connections                  ║
║  ─────────────────────────────    ║
║  🔍 Search integrations...        ║
║  ─────────────────────────────    ║
║  ✓  My Integration                ║ ← 你的 Integration
║     life-achievements-api         ║
║  ─────────────────────────────    ║
║           [ Cancel ] [ Confirm ]  ║
╚═══════════════════════════════════╝
```

---

## 🚨 常见错误

### 错误 1: "Could not find database"
**原因**：数据库未与 Integration 连接
**解决**：按照上面的步骤连接

### 错误 2: "Unauthorized"
**原因**：Token 不正确或已过期
**解决**：重新生成 Token

### 错误 3: "Invalid database_id"
**原因**：Database ID 格式不正确
**解决**：确保从正确的位置复制

---

## 💡 提示

### 如何确认已连接？

1. **方式 A**：查看数据库右上角
   - 如果连接成功，会显示 Integration 图标

2. **方式 B**：再次点击 `•••` → "Connections"
   - 应该能看到你的 Integration 列表

3. **方式 C**：运行测试命令
   ```bash
   npm run test:notion
   ```

---

## 📋 完整检查清单

在运行网站之前，确保：

- [ ] 已创建 Notion Integration
- [ ] 已获取 Token
- [ ] 已创建游戏数据库
- [ ] 已获取 Database ID
- [ ] **已将数据库连接到 Integration** ← 最重要！
- [ ] `.env` 文件包含正确的凭据
- [ ] 数据库有必需的字段（Name, 平台, 评分等）
- [ ] 数据库至少有一条测试数据

---

## ✅ 完成后

连接成功后，你就可以：

1. **本地测试**
   ```bash
   npm run dev
   ```
   访问：`http://localhost:4321/life-achievements/games-notion`

2. **添加数据**
   在 Notion 数据库中添加游戏

3. **部署到线上**
   ```bash
   git add .
   git commit -m "Notion 集成完成"
   git push
   ```

---

需要更多帮助？查看 `NOTION_SETUP_GUIDE.md` 获取详细教程！
