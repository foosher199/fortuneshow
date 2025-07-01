// 塔罗牌模块 - 侧边栏功能
class TarotSidebar {
    constructor() {
        this.init();
    }

    init() {
        this.createSidebar();
        this.setupEventListeners();
        this.setActiveLink();
    }

    createSidebar() {
        // 检查是否已存在侧边栏
        const existingSidebar = document.querySelector('.sidebar');
        if (existingSidebar) {
            existingSidebar.remove();
        }

        // 创建侧边栏HTML结构
        const sidebarHTML = `
            <div class="sidebar">
                <div class="sidebar-category">
                    <div class="category-title">🔮 塔罗占卜</div>
                    <ul class="function-list">
                        <li class="function-item">
                            <a href="daily.html" class="function-link" data-page="daily">📅 每日塔罗</a>
                        </li>
                        <li class="function-item">
                            <a href="love.html" class="function-link" data-page="love">💖 爱情塔罗</a>
                        </li>
                        <li class="function-item">
                            <a href="career.html" class="function-link" data-page="career">💼 事业塔罗</a>
                        </li>
                        <li class="function-item">
                            <a href="celtic.html" class="function-link" data-page="celtic">✨ 凯尔特十字</a>
                        </li>
                        <li class="function-item">
                            <a href="three-card.html" class="function-link" data-page="three-card">🃏 三张牌占卜</a>
                        </li>
                        <li class="function-item">
                            <a href="monthly.html" class="function-link" data-page="monthly">🗓️ 月运势</a>
                        </li>
                    </ul>
                </div>
            </div>
            <button class="mobile-menu-toggle" id="mobileMenuToggle">☰</button>
        `;

        // 插入到页面开头
        document.body.insertAdjacentHTML('afterbegin', sidebarHTML);
    }

    setupEventListeners() {
        // 移动端菜单切换
        const mobileToggle = document.getElementById('mobileMenuToggle');
        const sidebar = document.querySelector('.sidebar');
        
        if (mobileToggle && sidebar) {
            mobileToggle.addEventListener('click', () => {
                sidebar.classList.toggle('mobile-open');
                // 切换按钮图标
                mobileToggle.textContent = sidebar.classList.contains('mobile-open') ? '✕' : '☰';
            });

            // 点击页面其他区域关闭移动端菜单
            document.addEventListener('click', (e) => {
                if (!sidebar.contains(e.target) && !mobileToggle.contains(e.target)) {
                    sidebar.classList.remove('mobile-open');
                    mobileToggle.textContent = '☰';
                }
            });
        }

        // 监听窗口大小变化
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                sidebar.classList.remove('mobile-open');
                mobileToggle.textContent = '☰';
            }
        });
    }

    setActiveLink() {
        // 获取当前页面文件名
        const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
        
        // 移除所有active类
        const links = document.querySelectorAll('.function-link');
        links.forEach(link => link.classList.remove('active'));
        
        // 设置当前页面链接为active
        const activeLink = document.querySelector(`[data-page="${currentPage}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    // 获取当前模块名称
    getModuleName() {
        return '塔罗占卜';
    }

    // 获取当前页面的中文名称
    getCurrentPageName() {
        const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
        const pageNames = {
            'daily': '每日塔罗',
            'love': '爱情塔罗', 
            'career': '事业塔罗',
            'celtic': '凯尔特十字',
            'three-card': '三张牌占卜',
            'monthly': '月运势'
        };
        return pageNames[currentPage] || '塔罗占卜';
    }

    // 更新页面标题
    updatePageTitle() {
        const moduleName = this.getModuleName();
        const pageName = this.getCurrentPageName();
        
        // 更新文档标题
        document.title = `${pageName} - ${moduleName} | 神秘学预测中心`;
        
        // 更新页面标题元素（如果存在）
        const pageTitle = document.querySelector('.page-title');
        if (pageTitle) {
            pageTitle.innerHTML = `<span itemprop="headline">🔮 ${pageName}</span>`;
        }
    }
}

// 页面加载完成后初始化侧边栏
document.addEventListener('DOMContentLoaded', () => {
    const tarotSidebar = new TarotSidebar();
    tarotSidebar.updatePageTitle();
});

// 导出类以供其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TarotSidebar;
} 