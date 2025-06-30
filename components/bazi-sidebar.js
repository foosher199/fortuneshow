/**
 * 八字命理模块 - 公共侧边栏组件
 * 自动生成统一的八字命理功能菜单
 */

class BaziSidebar {
    constructor() {
        this.menuItems = [
            { href: 'chart.html', text: '八字排盘', icon: '🎋' },
            { href: 'elements.html', text: '五行分析', icon: '⚖️' },
            { href: 'nayin.html', text: '纳音五行', icon: '🎵' },
            { href: 'fortune.html', text: '大运流年', icon: '⏰' },
            { href: 'gods.html', text: '神煞分析', icon: '⚡' },
            { href: 'marriage.html', text: '婚姻配对', icon: '💕' }
        ];
        
        this.init();
    }

    // 初始化侧边栏
    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.render());
        } else {
            this.render();
        }
    }

    // 渲染侧边栏
    render() {
        const sidebarContainer = document.querySelector('.sidebar');
        if (!sidebarContainer) {
            console.warn('BaziSidebar: 找不到 .sidebar 容器');
            return;
        }

        // 获取当前页面文件名
        const currentPage = this.getCurrentPageName();
        
        // 生成侧边栏HTML
        const sidebarHTML = this.generateSidebarHTML(currentPage);
        
        // 更新侧边栏内容
        sidebarContainer.innerHTML = sidebarHTML;
    }

    // 获取当前页面文件名
    getCurrentPageName() {
        const path = window.location.pathname;
        const fileName = path.split('/').pop();
        return fileName || 'chart.html'; // 默认为八字排盘页面
    }

    // 生成侧边栏HTML
    generateSidebarHTML(currentPage) {
        const menuHTML = this.menuItems.map(item => {
            const isActive = item.href === currentPage ? 'active' : '';
            return `
                <li class="function-item">
                    <a href="${item.href}" class="function-link ${isActive}">
                        ${item.icon} ${item.text}
                    </a>
                </li>
            `;
        }).join('');

        return `
            <div class="sidebar-category">
                <div class="category-title">八字命理</div>
                <ul class="function-list">
                    ${menuHTML}
                </ul>
            </div>
        `;
    }

    // 更新活跃状态（当页面动态切换时使用）
    updateActiveState(activePage) {
        const links = document.querySelectorAll('.function-link');
        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === activePage) {
                link.classList.add('active');
            }
        });
    }

    // 添加新菜单项
    addMenuItem(item) {
        this.menuItems.push(item);
        this.render();
    }

    // 移除菜单项
    removeMenuItem(href) {
        this.menuItems = this.menuItems.filter(item => item.href !== href);
        this.render();
    }
}

// 全局可用
window.BaziSidebar = BaziSidebar;

// 自动初始化八字命理侧边栏
if (typeof window !== 'undefined') {
    // 检查当前页面是否在八字命理模块中
    const currentPath = window.location.pathname;
    if (currentPath.includes('/pages/bazi/')) {
        window.addEventListener('load', () => {
            // 检查是否已经有侧边栏实例
            if (!window.baziSidebar) {
                window.baziSidebar = new BaziSidebar();
            }
        });
    }
} 