# 八字命理模块 - 公共侧边栏组件

## 📁 文件结构
```
components/
├── bazi-sidebar.css         # 侧边栏样式文件
├── bazi-sidebar.js          # 侧边栏JavaScript组件
└── bazi-sidebar-README.md   # 使用文档
```

## 🚀 快速开始

### 1. HTML页面引用
在八字命理模块的HTML页面中添加以下引用：

```html
<!DOCTYPE html>
<html>
<head>
    <!-- 其他样式文件 -->
    <link rel="stylesheet" href="../../components/bazi-sidebar.css">
</head>
<body>
    <!-- 页面内容 -->
    <div class="container">
        <!-- 侧边栏容器 -->
        <aside class="sidebar"></aside>
        
        <!-- 主要内容区域 -->
        <main class="main-container">
            <!-- 页面内容 -->
        </main>
    </div>

    <!-- JavaScript文件 -->
    <script src="../../components/bazi-sidebar.js"></script>
</body>
</html>
```

### 2. 自动初始化
组件会自动检测当前页面是否在八字命理模块中，并自动初始化侧边栏。

## 📋 功能菜单

公共侧边栏包含以下八字命理功能：

| 功能 | 文件名 | 图标 | 描述 |
|------|--------|------|------|
| 八字排盘 | chart.html | 🎋 | 生成个人八字命盘 |
| 五行分析 | elements.html | ⚖️ | 分析五行平衡 |
| 纳音五行 | nayin.html | 🎵 | 纳音五行查询 |
| 大运流年 | fortune.html | ⏰ | 运势分析 |
| 神煞分析 | gods.html | ⚡ | 神煞查询 |
| 婚姻配对 | marriage.html | 💕 | 八字合婚 |

## 🎨 样式特性

### 视觉设计
- **宽度**: 280px（移动端自适应为100%）
- **背景**: 半透明黑色（rgba(0, 0, 0, 0.8)）
- **毛玻璃效果**: backdrop-filter: blur(10px)
- **边框**: 青色发光边框（#00ffff）

### 交互效果
- **悬停效果**: 背景色变化 + 左移动画
- **活跃状态**: 自动高亮当前页面
- **过渡动画**: 0.3s 平滑过渡

### 响应式设计
```css
@media (max-width: 768px) {
    .sidebar {
        width: 100%;
        height: auto;
        position: relative;
    }
}
```

## 🔧 API方法

### 基本方法

```javascript
// 获取侧边栏实例
const sidebar = window.baziSidebar;

// 手动更新活跃状态
sidebar.updateActiveState('elements.html');

// 重新渲染侧边栏
sidebar.render();
```

### 高级方法

```javascript
// 添加新菜单项
sidebar.addMenuItem({
    href: 'newpage.html',
    text: '新功能',
    icon: '✨'
});

// 移除菜单项
sidebar.removeMenuItem('marriage.html');

// 获取当前页面名称
const currentPage = sidebar.getCurrentPageName();
```

## 🔄 批量更新

使用提供的批量更新脚本，可以快速将所有八字命理页面更新为使用公共侧边栏组件：

```bash
node update_bazi_sidebar.js
```

### 更新内容
1. ✅ 添加CSS样式文件引用
2. ✅ 添加JavaScript组件引用
3. ✅ 清理原有侧边栏内容
4. ✅ 保留空的sidebar容器供组件填充

## 📱 响应式适配

组件自动适配不同屏幕尺寸：

- **桌面端**: 固定宽度280px的左侧边栏
- **平板端**: 保持侧边栏布局，优化触摸交互
- **手机端**: 转换为顶部导航模式

## 🛠️ 故障排除

### 常见问题

**Q: 侧边栏没有显示内容？**
A: 检查是否正确引用了CSS和JS文件，确保`.sidebar`容器存在。

**Q: 样式不正确？**
A: 确保CSS文件路径正确，检查是否有其他样式冲突。

**Q: 当前页面没有高亮？**
A: 检查文件名是否与菜单项的href属性匹配。

### 调试方法

```javascript
// 在浏览器控制台中检查
console.log('当前页面:', window.baziSidebar?.getCurrentPageName());
console.log('菜单项:', window.baziSidebar?.menuItems);
```

## 🎯 自定义配置

### 修改菜单项

编辑 `bazi-sidebar.js` 文件中的 `menuItems` 数组：

```javascript
this.menuItems = [
    { href: 'chart.html', text: '八字排盘', icon: '🎋' },
    { href: 'elements.html', text: '五行分析', icon: '⚖️' },
    // 添加新项目...
];
```

### 自定义样式

通过CSS变量自定义颜色主题：

```css
:root {
    --sidebar-bg: rgba(0, 0, 0, 0.8);
    --sidebar-border: #00ffff;
    --sidebar-text: #ccc;
    --sidebar-hover: rgba(0, 255, 255, 0.1);
}
```

## 📈 版本更新

当需要更新组件时：

1. 修改 `components/bazi-sidebar.css` 和 `components/bazi-sidebar.js`
2. 所有八字命理页面会自动使用最新版本
3. 无需逐个页面更新

## 📋 更新日志

### v1.0.0 (当前版本)
- ✨ 初始版本发布
- 🎨 统一的侧边栏设计
- 📱 响应式布局支持
- 🔧 完整的API方法
- 📁 批量更新脚本
- 📖 详细使用文档

---

*本组件遵循最新的前端开发最佳实践，确保代码的可维护性和扩展性。* 