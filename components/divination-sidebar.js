// 占卜模块侧边栏组件
(function() {
    'use strict';

    // 占卜游戏菜单配置
    const divinationMenus = [
        { href: 'lots.html', text: '抽签占卜', icon: '🎫' },
        { href: 'coin.html', text: '硬币占卜', icon: '🪙' },
        { href: 'dice.html', text: '骰子占卜', icon: '🎲' },
        { href: 'pendulum.html', text: '灵摆占卜', icon: '🔗' },
        { href: 'crystal.html', text: '水晶球', icon: '🔮' },
        { href: 'runes.html', text: '符文占卜', icon: '🪨' }
    ];

    // 获取当前页面文件名
    function getCurrentPage() {
        const path = window.location.pathname;
        const fileName = path.split('/').pop();
        return fileName;
    }

    // 创建侧边栏HTML结构
    function createSidebarHTML() {
        const currentPage = getCurrentPage();
        
        let menuHTML = '';
        divinationMenus.forEach(menu => {
            const isActive = menu.href === currentPage ? ' active' : '';
            menuHTML += `
                <li class="function-item">
                    <a href="${menu.href}" class="function-link${isActive}">
                        ${menu.icon} ${menu.text}
                    </a>
                </li>
            `;
        });

        return `
            <div class="sidebar-category">
                <div class="category-title">🎮 占卜游戏</div>
                <ul class="function-list">
                    ${menuHTML}
                </ul>
            </div>
        `;
    }

    // 初始化侧边栏
    function initSidebar() {
        // 查找侧边栏容器
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            // 如果侧边栏为空，插入菜单结构
            if (!sidebar.innerHTML.trim()) {
                sidebar.innerHTML = createSidebarHTML();
            }
        }
    }

    // 页面加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSidebar);
    } else {
        initSidebar();
    }

    // 添加点击事件处理
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('function-link')) {
            // 移除所有激活状态
            document.querySelectorAll('.function-link').forEach(link => {
                link.classList.remove('active');
            });
            // 为当前点击的链接添加激活状态
            e.target.classList.add('active');
        }
    });

    // 添加键盘导航支持
    document.addEventListener('keydown', function(e) {
        const activeLink = document.querySelector('.function-link.active');
        if (!activeLink) return;

        const allLinks = Array.from(document.querySelectorAll('.function-link'));
        const currentIndex = allLinks.indexOf(activeLink);

        if (e.key === 'ArrowDown' && currentIndex < allLinks.length - 1) {
            e.preventDefault();
            activeLink.classList.remove('active');
            allLinks[currentIndex + 1].classList.add('active');
            allLinks[currentIndex + 1].focus();
        } else if (e.key === 'ArrowUp' && currentIndex > 0) {
            e.preventDefault();
            activeLink.classList.remove('active');
            allLinks[currentIndex - 1].classList.add('active');
            allLinks[currentIndex - 1].focus();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            activeLink.click();
        }
    });

})(); 