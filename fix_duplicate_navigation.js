const fs = require('fs');
const path = require('path');

console.log('🔧 修复重复导航菜单问题');
console.log('==========================\n');

// 需要检查的页面列表（排除数字命理和手相面相页面）
const pagesToCheck = [
    'pages/bazi/chart.html',
    'pages/bazi/nayin.html', 
    'pages/bazi/marriage.html',
    'pages/bazi/gods.html',
    'pages/bazi/fortune.html',
    'pages/bazi/elements.html',
    'pages/tarot/daily.html',
    'pages/tarot/love.html',
    'pages/tarot/career.html',
    'pages/astrology/horoscope.html',
    'pages/astrology/chart.html',
    'pages/astrology/compatibility.html',
    'pages/astrology/zodiac.html',
    'pages/fengshui/home.html',
    'pages/divination/coin.html',
    'pages/divination/dice.html',
    'pages/divination/lots.html'
];

// 修复重复导航菜单的函数
function fixDuplicateNavigation(filePath) {
    if (!fs.existsSync(filePath)) {
        console.log(`❌ 文件不存在: ${filePath}`);
        return false;
    }
    
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;
        
        // 查找导航结构的问题模式
        const navPattern = /<nav class="top-nav">(.*?)<\/nav>/s;
        const navMatch = content.match(navPattern);
        
        if (navMatch) {
            const navContent = navMatch[1];
            
            // 检查是否有重复的nav-menu
            const menuCount = (navContent.match(/<ul class="nav-menu">/g) || []).length;
            
            if (menuCount > 1) {
                console.log(`🔍 发现重复导航: ${filePath} (${menuCount}个nav-menu)`);
                
                // 修复方案：保留第一个完整的nav-menu，移除多余的
                const fixedNavContent = navContent.replace(
                    /(<\/div>\s*)<ul class="nav-menu">[\s\S]*?<\/ul>/,
                    '$1'
                );
                
                const fixedNav = `<nav class="top-nav">${fixedNavContent}</nav>`;
                content = content.replace(navPattern, fixedNav);
                
                // 写入修复后的内容
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`✅ 已修复: ${filePath}`);
                return true;
            } else {
                console.log(`✅ 无问题: ${filePath}`);
                return false;
            }
        } else {
            console.log(`⚠️ 未找到导航结构: ${filePath}`);
            return false;
        }
        
    } catch (error) {
        console.error(`❌ 处理 ${filePath} 时出错:`, error.message);
        return false;
    }
}

// 更精确的修复函数
function preciseFixNavigation(filePath) {
    if (!fs.existsSync(filePath)) {
        console.log(`❌ 文件不存在: ${filePath}`);
        return false;
    }
    
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // 查找重复的nav-menu模式
        const duplicatePattern = /(<div class="nav-container">[\s\S]*?<\/ul>\s*<\/div>)\s*<ul class="nav-menu">[\s\S]*?<\/ul>[\s\S]*?<div class="language-switcher">[\s\S]*?<\/div>\s*<\/div>/;
        
        if (duplicatePattern.test(content)) {
            console.log(`🔍 发现重复导航结构: ${filePath}`);
            
            // 修复：移除重复的nav-menu部分，保留语言切换器
            content = content.replace(duplicatePattern, 
                '$1\n            <div class="language-switcher">\n                <button class="lang-button" onclick="toggleLanguage()">EN</button>\n            </div>\n        </div>'
            );
            
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ 已修复重复导航: ${filePath}`);
            return true;
        } else {
            // 检查是否有其他类型的重复
            const navMenuCount = (content.match(/<ul class="nav-menu">/g) || []).length;
            if (navMenuCount > 1) {
                console.log(`🔍 发现其他类型重复: ${filePath} (${navMenuCount}个nav-menu)`);
                
                // 简单移除多余的nav-menu
                let navMenuFound = 0;
                content = content.replace(/<ul class="nav-menu">[\s\S]*?<\/ul>/g, (match) => {
                    navMenuFound++;
                    return navMenuFound === 1 ? match : '';
                });
                
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`✅ 已修复: ${filePath}`);
                return true;
            } else {
                console.log(`✅ 导航正常: ${filePath}`);
                return false;
            }
        }
        
    } catch (error) {
        console.error(`❌ 处理 ${filePath} 时出错:`, error.message);
        return false;
    }
}

// 主修复函数
function main() {
    console.log('🚀 开始检查和修复重复导航菜单...\n');
    
    let fixedCount = 0;
    let checkedCount = 0;
    
    pagesToCheck.forEach(filePath => {
        checkedCount++;
        console.log(`\n${checkedCount}. 检查: ${filePath}`);
        
        if (preciseFixNavigation(filePath)) {
            fixedCount++;
        }
    });
    
    console.log('\n🎉 修复完成！');
    console.log(`📊 统计信息:`);
    console.log(`   📄 检查页面: ${checkedCount} 个`);
    console.log(`   🔧 修复页面: ${fixedCount} 个`);
    console.log(`   ✅ 无问题页面: ${checkedCount - fixedCount} 个`);
    
    if (fixedCount > 0) {
        console.log('\n🎯 修复内容:');
        console.log('   ❌ 移除了重复的导航菜单');
        console.log('   ✅ 保留了完整的导航结构');
        console.log('   🔧 确保语言切换器正常显示');
        
        console.log('\n📋 建议后续操作:');
        console.log('   1. 刷新浏览器测试各页面导航');
        console.log('   2. 检查所有链接是否正常工作');
        console.log('   3. 确认移动端响应式表现');
    }
}

// 执行修复
main(); 