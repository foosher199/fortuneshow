/**
 * 批量更新导航栏组件脚本
 * 移除各页面中重复的导航栏代码，改为使用公共组件
 */

const fs = require('fs');
const path = require('path');

// 需要更新的文件列表
const filesToUpdate = [
    'index_mystic.html',
    'pages/bazi/chart.html',
    'pages/bazi/elements.html',
    'pages/bazi/fortune.html',
    'pages/bazi/gods.html',
    'pages/bazi/marriage.html',
    'pages/bazi/nayin.html',
    'pages/astrology/chart.html',
    'pages/astrology/compatibility.html',
    'pages/astrology/horoscope.html',
    'pages/astrology/zodiac.html',
    'pages/tarot/career.html',
    'pages/tarot/daily.html',
    'pages/tarot/love.html',
    'pages/numerology/life-path.html',
    'pages/numerology/life-number.html',
    'pages/numerology/name-number.html',
    'pages/numerology/soul-number.html',
    'pages/palmistry/palm-reading.html',
    'pages/palmistry/face-reading.html',
    'pages/divination/coin.html',
    'pages/divination/dice.html',
    'pages/divination/lots.html',
    'pages/fengshui/home.html'
];

function updateFile(filePath) {
    try {
        console.log(`正在更新: ${filePath}`);
        
        if (!fs.existsSync(filePath)) {
            console.log(`文件不存在: ${filePath}`);
            return;
        }
        
        let content = fs.readFileSync(filePath, 'utf8');
        
        // 1. 移除现有的top-nav CSS样式
        content = content.replace(/\/\*\s*顶部导航栏[\s\S]*?\.nav-link\.active[\s\S]*?\}/g, '');
        content = content.replace(/\.top-nav\s*{[\s\S]*?}/g, '');
        content = content.replace(/\.nav-container\s*{[\s\S]*?}/g, '');
        content = content.replace(/\.logo\s*{[\s\S]*?}/g, '');
        content = content.replace(/\.nav-menu\s*{[\s\S]*?}/g, '');
        content = content.replace(/\.nav-item\s*{[\s\S]*?}/g, '');
        content = content.replace(/\.nav-link\s*{[\s\S]*?}/g, '');
        content = content.replace(/\.nav-link:hover\s*{[\s\S]*?}/g, '');
        content = content.replace(/\.nav-link\.active\s*{[\s\S]*?}/g, '');
        
        // 2. 移除现有的导航栏HTML
        content = content.replace(/<nav class="top-nav">[\s\S]*?<\/nav>/g, '');
        
        // 3. 在head中添加公共导航样式引用
        const cssLink = '    <!-- 公共导航栏样式 -->\n    <link rel="stylesheet" href="' + getRelativePath(filePath) + 'components/navigation.css">\n';
        
        if (!content.includes('navigation.css')) {
            content = content.replace(/<\/head>/, cssLink + '</head>');
        }
        
        // 4. 在body结束前添加公共导航脚本引用
        const scriptTag = '    <!-- 公共导航栏脚本 -->\n    <script src="' + getRelativePath(filePath) + 'components/navigation.js"></script>\n';
        
        if (!content.includes('navigation.js')) {
            content = content.replace(/<\/body>/, scriptTag + '</body>');
        }
        
        // 5. 确保main-container有正确的margin-top
        if (content.includes('main-container')) {
            content = content.replace(/\.main-container\s*{([^}]*)}/, (match, props) => {
                if (!props.includes('margin-top')) {
                    return `.main-container {\n            margin-top: 70px;\n${props}\n        }`;
                }
                return match;
            });
        }
        
        // 写回文件
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ 更新完成: ${filePath}`);
        
    } catch (error) {
        console.error(`❌ 更新失败: ${filePath}`, error.message);
    }
}

function getRelativePath(filePath) {
    // 根据文件路径计算相对路径
    const depth = (filePath.match(/\//g) || []).length;
    return '../'.repeat(depth);
}

// 执行更新
console.log('🚀 开始批量更新导航栏组件...\n');

filesToUpdate.forEach(file => {
    updateFile(file);
});

console.log('\n✨ 批量更新完成！');
console.log('\n📝 更新内容:');
console.log('1. 移除了各页面中重复的导航栏CSS样式');
console.log('2. 移除了各页面中重复的导航栏HTML代码');
console.log('3. 添加了公共导航栏样式和脚本引用');
console.log('4. 调整了页面布局以适配固定导航栏');
console.log('\n🎯 现在所有页面都使用统一的公共导航组件！'); 