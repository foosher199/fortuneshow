const fs = require('fs');

console.log('🔧 修复手相面相页面样式 - 使其与其他页面保持一致');
console.log('==========================================\n');

const filePath = './pages/palmistry/palm-reading.html';

try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 替换标题
    content = content.replace(
        '<title>手相分析 - 奥秘天地</title>',
        '<title>手相分析 - 神秘学预测中心</title>'
    );
    
    // 替换body背景样式
    content = content.replace(
        'background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460);',
        'background: linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%);'
    );
    
    content = content.replace(
        'color: #e0e6ed;',
        'color: #e0e0e0;'
    );
    
    // 移除旧的容器样式，替换为新的布局结构
    content = content.replace(
        /<div class="container">/,
        `<div class="stars"></div>
    
    <nav class="top-nav">
        <div class="nav-container">`
    );
    
    // 替换导航结构
    const oldNavRegex = /<nav class="nav">[\s\S]*?<\/nav>/;
    const newNav = `<div class="logo"><a href="../../index_mystic.html" style="color: inherit; text-decoration: none;">🔮 Mystic Hub</a></div>
            <ul class="nav-menu">
                <li class="nav-item">
                    <a href="../bazi/chart.html" class="nav-link">八字命理</a>
                </li>
                <li class="nav-item">
                    <a href="../astrology/horoscope.html" class="nav-link">星座占星</a>
                </li>
                <li class="nav-item">
                    <a href="../tarot/daily.html" class="nav-link">塔罗牌</a>
                </li>
                <li class="nav-item">
                    <a href="../numerology/life-path.html" class="nav-link">数字命理</a>
                </li>
                <li class="nav-item">
                    <a href="../palmistry/palm-reading.html" class="nav-link active">手相面相</a>
                </li>
                <li class="nav-item">
                    <a href="../divination/lots.html" class="nav-link">占卜游戏</a>
                </li>
                <li class="nav-item">
                    <a href="../fengshui/home.html" class="nav-link">风水分析</a>
                </li>
            </ul>
        </div>
    </nav>

    <div class="main-container">
        <div class="sidebar">
            <div class="sidebar-category">
                <div class="category-title">🖐️ 手相面相</div>
                <ul class="function-list">
                    <li class="function-item">
                        <a href="#" class="function-link active">手相分析</a>
                    </li>
                    <li class="function-item">
                        <a href="#" class="function-link">面相解读</a>
                    </li>
                    <li class="function-item">
                        <a href="#" class="function-link">指纹分析</a>
                    </li>
                    <li class="function-item">
                        <a href="#" class="function-link">掌纹详解</a>
                    </li>
                </ul>
            </div>
        </div>

        <div class="content-area">`;
    
    content = content.replace(oldNavRegex, newNav);
    
    // 在页面末尾添加布局结构闭合标签
    content = content.replace(
        '</div>\n\n    <script>',
        '        </div>\n    </div>\n\n    <script>'
    );
    
    // 添加新的CSS样式（在现有样式后面）
    const newStyles = `
        /* 星空背景动画 */
        .stars {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
        }

        /* 顶部导航栏 */
        .top-nav {
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(10px);
            border-bottom: 2px solid #00ffff;
            padding: 0;
            position: fixed;
            width: 100%;
            top: 0;
            z-index: 1000;
            box-shadow: 0 2px 20px rgba(0, 255, 255, 0.3);
        }

        .nav-container {
            display: flex;
            align-items: center;
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 20px;
        }

        /* 主要内容区域 */
        .main-container {
            display: flex;
            margin-top: 70px;
            min-height: calc(100vh - 70px);
        }

        /* 左侧功能菜单 */
        .sidebar {
            width: 280px;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            border-right: 2px solid #00ffff;
            padding: 20px 0;
            overflow-y: auto;
        }

        .sidebar-category {
            margin-bottom: 20px;
        }

        .category-title {
            color: #00ffff;
            font-size: 18px;
            font-weight: bold;
            padding: 10px 20px;
            border-bottom: 1px solid rgba(0, 255, 255, 0.3);
            margin-bottom: 10px;
        }

        .function-list {
            list-style: none;
        }

        .function-item {
            margin: 2px 0;
        }

        .function-link {
            display: block;
            padding: 12px 20px;
            color: #ccc;
            text-decoration: none;
            transition: all 0.3s ease;
            border-left: 3px solid transparent;
        }

        .function-link:hover {
            background: rgba(0, 255, 255, 0.1);
            color: #00ffff;
            border-left-color: #00ffff;
            transform: translateX(5px);
        }

        .function-link.active {
            background: rgba(0, 255, 255, 0.2);
            color: #00ffff;
            border-left-color: #00ffff;
        }

        /* 主内容区域 */
        .content-area {
            flex: 1;
            padding: 40px;
            position: relative;
        }

        /* 响应式布局调整 */
        @media (max-width: 768px) {
            .main-container {
                flex-direction: column;
            }

            .sidebar {
                width: 100%;
                order: 2;
            }

            .content-area {
                order: 1;
                padding: 20px;
            }
        }`;
    
    // 在第一个 </style> 标签前插入新样式
    content = content.replace('</style>', newStyles + '\n    </style>');
    
    // 更新星空背景创建函数
    content = content.replace(
        /function createStars\(\) \{[\s\S]*?\}/,
        `function createStars() {
            const starsContainer = document.querySelector('.stars');
            for (let i = 0; i < 200; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                star.style.left = Math.random() * 100 + '%';
                star.style.top = Math.random() * 100 + '%';
                star.style.width = Math.random() * 3 + 1 + 'px';
                star.style.height = star.style.width;
                star.style.animationDelay = Math.random() * 3 + 's';
                starsContainer.appendChild(star);
            }
        }`
    );
    
    // 写入修改后的内容
    fs.writeFileSync(filePath, content, 'utf8');
    
    console.log('✅ 手相面相页面样式修复完成！');
    console.log('📋 修复内容：');
    console.log('   1. ✅ 更新页面标题');
    console.log('   2. ✅ 统一深色背景主题');
    console.log('   3. ✅ 添加统一的导航结构');
    console.log('   4. ✅ 添加左侧功能菜单');
    console.log('   5. ✅ 更新星空背景效果');
    console.log('   6. ✅ 添加响应式布局');
    console.log('\n🎉 页面样式现在与其他页面保持一致！');
    
} catch (error) {
    console.error('❌ 修复过程中出错:', error.message);
} 