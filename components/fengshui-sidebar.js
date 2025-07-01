// 风水模块侧边栏组件
class FengShuiSidebar {
    constructor() {
        // 风水模块菜单配置
        this.menuItems = [
            { id: 'home', name: '家居风水', url: 'home.html', icon: '🏠' },
            { id: 'office', name: '办公风水', url: 'office.html', icon: '🏢' },
            { id: 'bedroom', name: '卧室风水', url: 'bedroom.html', icon: '🛏️' },
            { id: 'kitchen', name: '厨房风水', url: 'kitchen.html', icon: '🍳' },
            { id: 'garden', name: '庭院风水', url: 'garden.html', icon: '🌿' },
            { id: 'colors', name: '色彩风水', url: 'colors.html', icon: '🎨' }
        ];
        
        this.currentPage = this.getCurrentPage();
        this.init();
    }
    
    getCurrentPage() {
        const currentPath = window.location.pathname;
        const currentFile = currentPath.split('/').pop();
        
        for (let item of this.menuItems) {
            if (item.url === currentFile) {
                return item.id;
            }
        }
        return 'home'; // 默认为家居风水
    }
    
    init() {
        this.render();
    }
    
    render() {
        const sidebar = document.querySelector('.sidebar');
        if (!sidebar) {
            console.warn('Sidebar container not found');
            return;
        }
        
        // 清空现有内容
        sidebar.innerHTML = '';
        
        // 创建侧边栏内容
        const sidebarContent = `
            <div class="sidebar-category">
                <div class="category-title">风水分析</div>
                <ul class="function-list">
                    ${this.menuItems.map(item => this.createMenuItem(item)).join('')}
                </ul>
            </div>
        `;
        
        sidebar.innerHTML = sidebarContent;
        
        // 添加点击事件监听
        this.addEventListeners();
    }
    
    createMenuItem(item) {
        const isActive = item.id === this.currentPage ? 'active' : '';
        return `
            <li class="function-item">
                <a href="${item.url}" class="function-link ${isActive}" data-id="${item.id}">
                    ${item.icon} ${item.name}
                </a>
            </li>
        `;
    }
    
    addEventListeners() {
        const functionLinks = document.querySelectorAll('.function-link');
        
        functionLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // 移除所有active类
                functionLinks.forEach(l => l.classList.remove('active'));
                // 为当前链接添加active类
                e.target.classList.add('active');
            });
        });
    }
    
    // 设置当前活跃页面
    setActivePage(pageId) {
        this.currentPage = pageId;
        const functionLinks = document.querySelectorAll('.function-link');
        
        functionLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.id === pageId) {
                link.classList.add('active');
            }
        });
    }
}

// 页面加载完成后初始化侧边栏
document.addEventListener('DOMContentLoaded', function() {
    new FengShuiSidebar();
}); 