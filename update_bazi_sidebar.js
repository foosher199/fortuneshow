/**
 * 八字命理模块侧边栏批量更新脚本
 * 将所有八字命理页面更新为使用公共侧边栏组件
 */

const fs = require('fs');
const path = require('path');

// 需要更新的八字命理页面
const baziPages = [
    'pages/bazi/chart.html',
    'pages/bazi/elements.html',
    'pages/bazi/nayin.html',
    'pages/bazi/fortune.html',
    'pages/bazi/gods.html',
    'pages/bazi/marriage.html'
];

/**
 * 更新单个页面使用公共侧边栏组件
 */
function updateBaziSidebar(filePath) {
    try {
        if (!fs.existsSync(filePath)) {
            console.log(`❌ 文件不存在: ${filePath}`);
            return false;
        }

        let content = fs.readFileSync(filePath, 'utf-8');
        let hasChanges = false;

        // 1. 添加公共侧边栏CSS引用（如果不存在）
        if (!content.includes('bazi-sidebar.css')) {
            const cssLink = '<link rel="stylesheet" href="../../components/bazi-sidebar.css">';
            
            // 在head标签中查找合适的位置插入
            if (content.includes('<link rel="stylesheet" href="../../components/starfield.css">')) {
                content = content.replace(
                    '<link rel="stylesheet" href="../../components/starfield.css">',
                    `<link rel="stylesheet" href="../../components/starfield.css">\n    ${cssLink}`
                );
            } else if (content.includes('</head>')) {
                content = content.replace('</head>', `    ${cssLink}\n</head>`);
            }
            hasChanges = true;
            console.log(`✅ 已添加侧边栏CSS引用: ${filePath}`);
        }

        // 2. 添加公共侧边栏JS引用（如果不存在）
        if (!content.includes('bazi-sidebar.js')) {
            const jsScript = '<script src="../../components/bazi-sidebar.js"></script>';
            
            // 在starfield.js之后插入
            if (content.includes('<script src="../../components/starfield.js"></script>')) {
                content = content.replace(
                    '<script src="../../components/starfield.js"></script>',
                    `<script src="../../components/starfield.js"></script>\n    ${jsScript}`
                );
            } else if (content.includes('</body>')) {
                content = content.replace('</body>', `    ${jsScript}\n</body>`);
            }
            hasChanges = true;
            console.log(`✅ 已添加侧边栏JS引用: ${filePath}`);
        }

        // 3. 清理现有的侧边栏内容，只保留空的div.sidebar容器
        // 查找现有的侧边栏内容
        const sidebarRegex = /<div class="sidebar"[^>]*>([\s\S]*?)<\/div>/;
        const sidebarMatch = content.match(sidebarRegex);
        
        if (sidebarMatch) {
            // 替换为空的侧边栏容器，让JavaScript组件来填充内容
            const newSidebar = '<div class="sidebar"></div>';
            content = content.replace(sidebarRegex, newSidebar);
            hasChanges = true;
            console.log(`✅ 已清理侧边栏内容，使用公共组件: ${filePath}`);
        }

        // 4. 保存文件（如果有变更）
        if (hasChanges) {
            fs.writeFileSync(filePath, content, 'utf-8');
            console.log(`💾 文件已更新: ${filePath}`);
            return true;
        } else {
            console.log(`⏭️  文件无需更新: ${filePath}`);
            return false;
        }

    } catch (error) {
        console.error(`❌ 更新文件失败 ${filePath}:`, error.message);
        return false;
    }
}

/**
 * 主函数 - 批量更新所有八字命理页面
 */
function main() {
    console.log('🚀 开始批量更新八字命理模块侧边栏...\n');

    let totalFiles = 0;
    let updatedFiles = 0;
    let skippedFiles = 0;

    for (const filePath of baziPages) {
        totalFiles++;
        console.log(`\n📄 处理文件: ${filePath}`);
        
        const result = updateBaziSidebar(filePath);
        if (result) {
            updatedFiles++;
        } else {
            skippedFiles++;
        }
    }

    console.log('\n🎉 批量更新完成！');
    console.log('=' * 50);
    console.log(`📊 更新统计:`);
    console.log(`   总文件数: ${totalFiles}`);
    console.log(`   成功更新: ${updatedFiles}`);
    console.log(`   跳过文件: ${skippedFiles}`);
    console.log('\n✨ 八字命理模块现在使用统一的公共侧边栏组件');
    console.log('📋 功能特性:');
    console.log('   • 统一的侧边栏菜单样式');
    console.log('   • 自动高亮当前页面');
    console.log('   • 完整的八字命理功能导航');
    console.log('   • 响应式设计适配移动端');
    console.log('   • 易于维护和扩展');
}

// 运行主函数
if (require.main === module) {
    main();
} 