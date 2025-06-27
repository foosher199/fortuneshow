/**
 * 神秘学预测中心 - 公共导航栏组件
 * 动态生成统一的顶部导航栏
 */

class MysticNavigation {
    constructor() {
        this.init();
    }

    // 导航菜单配置
    getNavConfig() {
        return [
            {
                name: '八字命理',
                href: '/pages/bazi/chart.html',
                icon: '🔮'
            },
            {
                name: '星座占星',
                href: '/pages/astrology/horoscope.html',
                icon: '⭐'
            },
            {
                name: '塔罗牌',
                href: '/pages/tarot/daily.html',
                icon: '🃏'
            },
            {
                name: '数字命理',
                href: '/pages/numerology/life-path.html',
                icon: '🔢'
            },
            {
                name: '手相面相',
                href: '/pages/palmistry/palm-reading.html',
                icon: '🖐️'
            },
            {
                name: '占卜游戏',
                href: '/pages/divination/lots.html',
                icon: '🎲'
            },
            {
                name: '风水分析',
                href: '/pages/fengshui/home.html',
                icon: '🏠'
            }
        ];
    }

    // 根据当前页面路径确定相对路径前缀
    getBasePath() {
        const currentPath = window.location.pathname;
        if (currentPath.includes('/pages/')) {
            // 在子页面中，需要回到根目录
            const depth = (currentPath.split('/pages/')[1].match(/\//g) || []).length;
            return '../'.repeat(depth + 1);
        }
        return './';
    }

    // 获取当前活动页面
    getCurrentPage() {
        const currentPath = window.location.pathname;
        if (currentPath.includes('/bazi/')) return '八字命理';
        if (currentPath.includes('/astrology/')) return '星座占星';
        if (currentPath.includes('/tarot/')) return '塔罗牌';
        if (currentPath.includes('/numerology/')) return '数字命理';
        if (currentPath.includes('/palmistry/')) return '手相面相';
        if (currentPath.includes('/divination/')) return '占卜游戏';
        if (currentPath.includes('/fengshui/')) return '风水分析';
        return '';
    }

    // 生成导航栏HTML
    generateNavHTML() {
        const basePath = this.getBasePath();
        const currentPage = this.getCurrentPage();
        const navConfig = this.getNavConfig();

        const navItems = navConfig.map(item => {
            const isActive = item.name === currentPage ? ' active' : '';
            const href = basePath + item.href.substring(1); // 移除开头的 '/'
            
            return `
                <li class="nav-item">
                    <a href="${href}" class="nav-link${isActive}">${item.name}</a>
                </li>
            `;
        }).join('');

        return `
            <nav class="top-nav">
                <div class="nav-container">
                    <div class="nav-left">
                        <div class="logo">
                            <a href="${basePath}index_mystic.html">🔮 神秘学预测中心</a>
                        </div>
                        <ul class="nav-menu">
                            ${navItems}
                        </ul>
                    </div>
                    <div class="nav-right">
                        <div class="language-switcher">
                            <button class="lang-btn active" onclick="switchLanguage('zh')">中文</button>
                            <button class="lang-btn" onclick="switchLanguage('en')">English</button>
                        </div>
                    </div>
                </div>
            </nav>
        `;
    }

    // 语言切换功能
    setupLanguageSwitcher() {
        // 如果全局没有语言切换函数，则创建一个
        if (typeof window.switchLanguage === 'undefined') {
            window.switchLanguage = function(lang) {
                // 更新按钮状态
                document.querySelectorAll('.lang-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                document.querySelector(`[onclick="switchLanguage('${lang}')"]`).classList.add('active');
                
                // 这里可以添加实际的语言切换逻辑
                console.log('切换语言到:', lang);
                // 可以触发页面内容的语言切换
                if (typeof window.onLanguageChange === 'function') {
                    window.onLanguageChange(lang);
                }
            };
        }
    }

    // 初始化导航栏
    init() {
        // 等待DOM加载完成
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.render());
        } else {
            this.render();
        }
    }

    // 渲染导航栏
    render() {
        // 查找现有的导航栏并替换
        const existingNav = document.querySelector('.top-nav');
        if (existingNav) {
            existingNav.outerHTML = this.generateNavHTML();
        } else {
            // 如果没有现有导航栏，插入到body开头
            const navHTML = this.generateNavHTML();
            document.body.insertAdjacentHTML('afterbegin', navHTML);
        }

        // 设置语言切换功能
        this.setupLanguageSwitcher();

        // 确保页面内容不被导航栏遮挡
        this.adjustPageLayout();
    }

    // 调整页面布局，确保内容不被固定导航栏遮挡
    adjustPageLayout() {
        const body = document.body;
        const hasMainContainer = document.querySelector('.main-container');
        
        if (hasMainContainer) {
            // 如果有main-container，调整其margin-top
            const mainContainer = document.querySelector('.main-container');
            if (mainContainer && !mainContainer.style.marginTop) {
                mainContainer.style.marginTop = '70px';
            }
        } else {
            // 如果没有main-container，给body添加padding-top
            if (!body.style.paddingTop) {
                body.style.paddingTop = '70px';
            }
        }
    }
}

// 自动初始化导航栏
window.MysticNavigation = MysticNavigation;

// 页面加载时自动创建导航栏
if (typeof window !== 'undefined') {
    new MysticNavigation();
} 