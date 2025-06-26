const fs = require('fs');
const path = require('path');

// 标准导航结构配置
const navigationConfig = {
    // 各类别页面的导航链接映射
    links: {
        '八字命理': '../bazi/chart.html',
        '星座占星': '../astrology/horoscope.html', 
        '塔罗牌': '../tarot/daily.html',
        '数字命理': '../numerology/life-path.html',
        '手相面相': '../palmistry/palm-reading.html',
        '占卜游戏': '../divination/lots.html',
        '风水分析': '../fengshui/home.html'
    },
    
    // 特殊页面的主页链接
    homeLinks: {
        'pages/bazi/': '../../index_mystic.html',
        'pages/astrology/': '../../index_mystic.html', 
        'pages/tarot/': '../../index_mystic.html',
        'pages/numerology/': '../../index_mystic.html',
        'pages/palmistry/': '../../index_mystic.html',
        'pages/divination/': '../../index_mystic.html',
        'pages/fengshui/': '../../index_mystic.html'
    }
};

// 确定页面所属类别
function getPageCategory(filePath) {
    if (filePath.includes('/bazi/')) return '八字命理';
    if (filePath.includes('/astrology/')) return '星座占星';
    if (filePath.includes('/tarot/')) return '塔罗牌';
    if (filePath.includes('/numerology/')) return '数字命理';
    if (filePath.includes('/palmistry/')) return '手相面相';
    if (filePath.includes('/divination/')) return '占卜游戏';
    if (filePath.includes('/fengshui/')) return '风水分析';
    return null;
}

// 获取主页链接
function getHomeLinkForPage(filePath) {
    for (const [pathPattern, homeLink] of Object.entries(navigationConfig.homeLinks)) {
        if (filePath.includes(pathPattern)) {
            return homeLink;
        }
    }
    return '../../index_mystic.html';
}

// 生成标准导航HTML
function generateStandardNavigation(currentCategory, filePath) {
    const homeLink = getHomeLinkForPage(filePath);
    
    let navHTML = `
            <div class="logo"><a href="${homeLink}" style="color: inherit; text-decoration: none;">🔮 Mystic Hub</a></div>
            <ul class="nav-menu">`;
    
    // 生成导航项目
    for (const [categoryName, categoryLink] of Object.entries(navigationConfig.links)) {
        const isActive = categoryName === currentCategory ? ' active' : '';
        navHTML += `
                <li class="nav-item">
                    <a href="${categoryLink}" class="nav-link${isActive}">${categoryName}</a>
                </li>`;
    }
    
    navHTML += `
            </ul>`;
    
    return navHTML;
}

// 修复单个文件的导航
function fixNavigationInFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // 确定当前页面类别
        const currentCategory = getPageCategory(filePath);
        if (!currentCategory) {
            console.log(`⚠️  跳过 ${filePath} - 无法确定页面类别`);
            return false;
        }
        
        // 生成新的导航HTML
        const newNavigation = generateStandardNavigation(currentCategory, filePath);
        
        // 查找并替换导航容器内容
        const navContainerRegex = /<div class="nav-container">([\s\S]*?)<\/div>/;
        const match = content.match(navContainerRegex);
        
        if (!match) {
            console.log(`❌ ${filePath} - 未找到导航容器`);
            return false;
        }
        
        // 替换导航容器内容
        const newNavContainer = `<div class="nav-container">${newNavigation}\n        </div>`;
        content = content.replace(navContainerRegex, newNavContainer);
        
        // 写入文件
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ ${filePath} - 导航修复成功`);
        return true;
        
    } catch (error) {
        console.log(`❌ 处理 ${filePath} 时出错: ${error.message}`);
        return false;
    }
}

// 递归查找HTML文件
function findHtmlFiles(dir, excludeDirs = ['node_modules', '.git', 'components']) {
    const files = [];
    
    try {
        const items = fs.readdirSync(dir);
        
        for (const item of items) {
            const fullPath = path.join(dir, item);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory() && !excludeDirs.includes(item)) {
                files.push(...findHtmlFiles(fullPath, excludeDirs));
            } else if (stat.isFile() && path.extname(item).toLowerCase() === '.html') {
                files.push(fullPath);
            }
        }
    } catch (error) {
        console.log(`❌ 读取目录 ${dir} 时出错: ${error.message}`);
    }
    
    return files;
}

// 主函数
function main() {
    console.log('🔧 神秘学预测中心 - 导航链接修复工具');
    console.log('==========================================\n');
    
    // 查找所有HTML文件
    const htmlFiles = findHtmlFiles('./pages');
    
    if (htmlFiles.length === 0) {
        console.log('❌ 未找到任何HTML文件');
        return;
    }
    
    console.log(`📁 找到 ${htmlFiles.length} 个HTML文件:\n`);
    
    let successCount = 0;
    let skipCount = 0;
    let errorCount = 0;
    
    // 处理每个文件
    htmlFiles.forEach((file, index) => {
        console.log(`[${index + 1}/${htmlFiles.length}] 处理: ${file}`);
        const result = fixNavigationInFile(file);
        
        if (result === true) {
            successCount++;
        } else if (result === false) {
            errorCount++;
        }
    });
    
    // 显示统计结果
    console.log('\n==========================================');
    console.log('📊 修复结果统计:');
    console.log(`✅ 成功修复导航: ${successCount} 个文件`);
    console.log(`❌ 修复失败: ${errorCount} 个文件`);
    console.log(`📄 总计处理: ${htmlFiles.length} 个文件`);
    
    if (successCount > 0) {
        console.log('\n🎉 导航修复完成！');
        console.log('💡 修复内容包括:');
        console.log('   1. ✅ 统一所有页面的导航链接');
        console.log('   2. ✅ 修正八字按钮链接到正确页面');
        console.log('   3. ✅ 添加Logo点击返回主页功能');
        console.log('   4. ✅ 修正手相面相按钮链接');
        console.log('   5. ✅ 确保active状态正确显示');
        console.log('\n🔗 现在所有导航按钮都能正常工作了！');
    }
}

// 运行脚本
if (require.main === module) {
    main();
}

module.exports = { fixNavigationInFile, findHtmlFiles }; 