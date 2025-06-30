/**
 * 批量更新星空背景组件脚本
 * 将所有页面的重复星空背景代码替换为公共组件
 */

const fs = require('fs');
const path = require('path');

// 要处理的页面列表
const pagesToUpdate = [
    'pages/palmistry/palm-reading.html',
    'pages/palmistry/face-reading.html',
    'pages/bazi/chart.html',
    'pages/astrology/compatibility.html',
    'pages/tarot/draw.html'
];

// 星空背景公共组件的引用
const starfieldComponentCSS = '<link rel="stylesheet" href="../../components/starfield.css">';
const starfieldComponentJS = '<script src="../../components/starfield.js"></script>';

function updateStarfieldComponent(filePath) {
    try {
        if (!fs.existsSync(filePath)) {
            console.log(`⚠️  文件不存在: ${filePath}`);
            return false;
        }

        let content = fs.readFileSync(filePath, 'utf8');
        let updated = false;

        console.log(`🔄 正在更新: ${filePath}`);

        // 1. 删除重复的星空背景CSS样式
        const cssPatterns = [
            // 删除 .stars 样式定义
            /\.stars\s*\{[^}]*\}/gs,
            // 删除 .star 样式定义
            /\.star\s*\{[^}]*\}/gs,
            // 删除 .star 相关的所有样式变体
            /\.star\.(small|medium|large|bright)\s*\{[^}]*\}/gs,
            // 删除 @keyframes twinkle
            /@keyframes\s+twinkle\s*\{[^}]*\}[^}]*\}/gs,
            // 删除 shooting-star 样式
            /\.shooting-star\s*\{[^}]*\}/gs,
            // 删除 constellation-line 样式
            /\.constellation-line\s*\{[^}]*\}/gs
        ];

        cssPatterns.forEach(pattern => {
            const beforeLength = content.length;
            content = content.replace(pattern, '');
            if (content.length !== beforeLength) {
                updated = true;
                console.log(`  ✅ 删除了重复的CSS样式`);
            }
        });

        // 2. 删除重复的星空背景JavaScript代码
        const jsPatterns = [
            // 删除 createStars 函数
            /function\s+createStars\s*\([^)]*\)\s*\{[^}]*(?:\{[^}]*\}[^}]*)*\}/gs,
            // 删除 createStars() 调用
            /createStars\s*\(\s*\)\s*;?/g,
            // 删除直接的星星创建代码块
            /for\s*\(\s*let\s+i\s*=\s*0\s*;\s*i\s*<\s*\d+\s*;\s*i\+\+\s*\)\s*\{[^}]*document\.createElement\(['"]div['"]\)[^}]*stars[^}]*\}/gs
        ];

        jsPatterns.forEach(pattern => {
            const beforeLength = content.length;
            content = content.replace(pattern, '');
            if (content.length !== beforeLength) {
                updated = true;
                console.log(`  ✅ 删除了重复的JavaScript代码`);
            }
        });

        // 3. 添加公共组件的CSS引用（如果还没有）
        if (!content.includes('starfield.css')) {
            // 在现有的CSS链接后面添加
            const headEndIndex = content.indexOf('</head>');
            if (headEndIndex !== -1) {
                content = content.substring(0, headEndIndex) + 
                         '    ' + starfieldComponentCSS + '\n' + 
                         content.substring(headEndIndex);
                updated = true;
                console.log(`  ✅ 添加了公共星空背景CSS引用`);
            }
        }

        // 4. 添加公共组件的JavaScript引用（如果还没有）
        if (!content.includes('starfield.js')) {
            // 在body结束标签前添加
            const bodyEndIndex = content.lastIndexOf('</body>');
            if (bodyEndIndex !== -1) {
                content = content.substring(0, bodyEndIndex) + 
                         '    ' + starfieldComponentJS + '\n' + 
                         content.substring(bodyEndIndex);
                updated = true;
                console.log(`  ✅ 添加了公共星空背景JavaScript引用`);
            }
        }

        // 5. 清理空的<div class="stars"></div>标签
        const starsContainerPattern = /<div\s+class=["']stars["']\s*>\s*<\/div>/g;
        if (starsContainerPattern.test(content)) {
            content = content.replace(starsContainerPattern, '');
            updated = true;
            console.log(`  ✅ 清理了空的stars容器`);
        }

        // 6. 保存更新后的文件
        if (updated) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`  ✅ ${filePath} 更新完成\n`);
            return true;
        } else {
            console.log(`  ➡️  ${filePath} 无需更新\n`);
            return false;
        }

    } catch (error) {
        console.error(`❌ 更新 ${filePath} 时发生错误:`, error.message);
        return false;
    }
}

function main() {
    console.log('🌟 开始批量更新星空背景组件...\n');

    let successCount = 0;
    let totalCount = 0;

    pagesToUpdate.forEach(filePath => {
        totalCount++;
        if (updateStarfieldComponent(filePath)) {
            successCount++;
        }
    });

    console.log('📊 更新统计:');
    console.log(`   总文件数: ${totalCount}`);
    console.log(`   成功更新: ${successCount}`);
    console.log(`   跳过文件: ${totalCount - successCount}`);
    
    if (successCount > 0) {
        console.log('\n🎉 批量更新完成！所有页面现在都使用统一的公共星空背景组件。');
        console.log('\n💡 公共组件特性:');
        console.log('   • 统一的星空背景样式');
        console.log('   • 可配置的星星数量和效果');
        console.log('   • 包含流星和星座连线效果');
        console.log('   • 响应式设计和性能优化');
        console.log('   • 易于维护和扩展');
    } else {
        console.log('\n ℹ️  所有文件都已是最新状态。');
    }
}

// 执行主函数
main(); 