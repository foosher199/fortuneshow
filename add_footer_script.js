const fs = require('fs');
const path = require('path');

// 通用页脚HTML和CSS代码
const footerCode = `
    <!-- 引入通用页脚 -->
    <style>
        .mystic-footer {
            background: linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(26, 26, 46, 0.95));
            backdrop-filter: blur(10px);
            border-top: 2px solid rgba(0, 255, 255, 0.3);
            padding: 20px;
            text-align: center;
            margin-top: 40px;
            position: relative;
            z-index: 100;
        }

        .mystic-footer .disclaimer-main {
            font-size: 15px;
            color: #ffaa00;
            font-weight: bold;
            margin-bottom: 12px;
            animation: footerGlow 2s ease-in-out infinite alternate;
        }

        @keyframes footerGlow {
            from { text-shadow: 0 0 5px #ffaa00, 0 0 10px #ffaa00; }
            to { text-shadow: 0 0 8px #ffaa00, 0 0 15px #ffaa00, 0 0 20px #ffaa00; }
        }

        .mystic-footer .disclaimer {
            font-size: 13px;
            color: #ccc;
            line-height: 1.5;
            margin-bottom: 15px;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }

        .mystic-footer .footer-links {
            display: flex;
            gap: 15px;
            flex-wrap: wrap;
            justify-content: center;
            margin-bottom: 12px;
        }

        .mystic-footer .footer-links a {
            color: #888;
            text-decoration: none;
            padding: 6px 12px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            transition: all 0.3s ease;
            font-size: 12px;
        }

        .mystic-footer .footer-links a:hover {
            color: #00ffff;
            border-color: #00ffff;
            background: rgba(0, 255, 255, 0.1);
            transform: translateY(-1px);
        }

        .mystic-footer .copyright {
            font-size: 11px;
            color: #666;
            margin-top: 10px;
        }

        .mystic-footer .wisdom-quote {
            font-size: 12px;
            color: #999;
            font-style: italic;
            opacity: 0.8;
            margin-bottom: 8px;
        }

        /* 响应式设计 */
        @media (max-width: 768px) {
            .mystic-footer .footer-links {
                flex-direction: column;
                gap: 8px;
            }
            
            .mystic-footer .disclaimer-main {
                font-size: 13px;
            }
            
            .mystic-footer .disclaimer {
                font-size: 12px;
            }
        }
    </style>

    <footer class="mystic-footer">
        <div class="disclaimer-main">
            ⚠️ 重要提醒：本站所有预测结果仅供娱乐参考，请勿当真！
        </div>
        <div class="disclaimer">
            🌟 命运掌握在自己手中，占卜结果仅为参考 • 理性对待预测内容，积极面对人生挑战<br>
            🔮 本平台致力于弘扬传统文化，所有内容均为文化传播和娱乐目的
        </div>
        <div class="footer-links">
            <a href="REPLACE_HOME_PATH">返回首页</a>
            <a href="#" onclick="return false;">服务条款</a>
            <a href="#" onclick="return false;">隐私政策</a>
            <a href="#" onclick="return false;">免责声明</a>
            <a href="#" onclick="return false;">联系我们</a>
        </div>
        <div class="wisdom-quote">
            "知命不惧，知而无畏" - 探索未知，拥抱可能
        </div>
        <div class="copyright">
            © 2024 神秘学预测中心 All Rights Reserved | 仅供娱乐 请勿当真
        </div>
    </footer>

</body>
</html>`;

// 计算相对路径到主页的函数
function getHomePathFromFile(filePath) {
    const depth = filePath.split('/').length - 1;
    if (depth === 0) return 'index_mystic.html';
    return '../'.repeat(depth) + 'index_mystic.html';
}

// 检查文件是否已经包含页脚
function hasFooter(content) {
    return content.includes('mystic-footer') || content.includes('重要提醒：本站所有预测结果仅供娱乐参考');
}

// 添加页脚到HTML文件
function addFooterToFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // 检查是否已经有页脚
        if (hasFooter(content)) {
            console.log(`⚠️  ${filePath} 已经包含页脚，跳过`);
            return false;
        }
        
        // 查找 </body> 和 </html> 标签的位置
        const bodyEndIndex = content.lastIndexOf('</body>');
        const htmlEndIndex = content.lastIndexOf('</html>');
        
        if (bodyEndIndex === -1 || htmlEndIndex === -1) {
            console.log(`❌ ${filePath} 不是有效的HTML文件，跳过`);
            return false;
        }
        
        // 计算主页相对路径
        const relativePath = path.relative(path.dirname(filePath), './').replace(/\\/g, '/');
        const homePath = relativePath ? relativePath + '/index_mystic.html' : 'index_mystic.html';
        
        // 替换页脚代码中的主页路径
        const customFooterCode = footerCode.replace('REPLACE_HOME_PATH', homePath);
        
        // 在 </body> 标签前插入页脚
        const newContent = content.slice(0, bodyEndIndex) + customFooterCode + content.slice(htmlEndIndex);
        
        // 写入文件
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`✅ ${filePath} 页脚添加成功`);
        return true;
        
    } catch (error) {
        console.log(`❌ 处理 ${filePath} 时出错: ${error.message}`);
        return false;
    }
}

// 递归遍历目录查找HTML文件
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
    console.log('🔮 神秘学预测中心 - 批量添加页脚工具');
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
        const result = addFooterToFile(file);
        
        if (result === true) {
            successCount++;
        } else if (result === false && hasFooter(fs.readFileSync(file, 'utf8'))) {
            skipCount++;
        } else {
            errorCount++;
        }
    });
    
    // 显示统计结果
    console.log('\n==========================================');
    console.log('📊 处理结果统计:');
    console.log(`✅ 成功添加页脚: ${successCount} 个文件`);
    console.log(`⚠️  已有页脚跳过: ${skipCount} 个文件`);
    console.log(`❌ 处理失败: ${errorCount} 个文件`);
    console.log(`📄 总计处理: ${htmlFiles.length} 个文件`);
    console.log('\n🎉 页脚添加任务完成！');
    
    if (successCount > 0) {
        console.log('\n💡 提示: 现在所有页面都包含了免责声明页脚');
        console.log('   页脚内容包括:');
        console.log('   - ⚠️ 重要提醒：仅供娱乐参考，请勿当真');
        console.log('   - 🌟 正确看待占卜结果的引导文字');
        console.log('   - 🔗 服务条款、隐私政策等链接');
        console.log('   - 📄 版权信息和免责声明');
    }
}

// 运行脚本
if (require.main === module) {
    main();
}

module.exports = { addFooterToFile, findHtmlFiles }; 