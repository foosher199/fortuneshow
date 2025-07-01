// 手相面相模块侧边栏功能
document.addEventListener('DOMContentLoaded', function() {
    // 创建侧边栏内容
    const sidebarHTML = `
        <div class="sidebar-category">
            <div class="category-title">🖐️ 手相面相</div>
            <ul class="function-list">
                <li class="function-item">
                    <a href="../palmistry/palm-reading.html" class="function-link">手相分析</a>
                </li>
                <li class="function-item">
                    <a href="../palmistry/face-reading.html" class="function-link">面相解读</a>
                </li>
                <li class="function-item">
                    <a href="../palmistry/palm-reading-updated.html" class="function-link">高级手相</a>
                </li>
                <li class="function-item">
                    <a href="../palmistry/fingerprint-analysis.html" class="function-link">指纹分析</a>
                </li>
                <li class="function-item">
                    <a href="../palmistry/palm-lines.html" class="function-link">掌纹详解</a>
                </li>
            </ul>
        </div>
    `;

    // 插入侧边栏内容
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.innerHTML = sidebarHTML;
        
        // 高亮当前页面
        highlightCurrentPage();
        
        // 添加移动端支持
        addMobileSupport();
    }
});

// 高亮当前页面的菜单项
function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('.function-link');
    
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href && currentPath.includes(href.replace('../', ''))) {
            link.classList.add('active');
        }
    });
}

// 添加移动端支持
function addMobileSupport() {
    // 创建移动端覆盖层
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);
    
    // 创建移动端菜单按钮
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-btn';
    menuButton.innerHTML = '☰';
    menuButton.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        z-index: 10000;
        background: rgba(0, 255, 255, 0.8);
        border: none;
        border-radius: 5px;
        color: #000;
        font-size: 18px;
        padding: 10px;
        cursor: pointer;
        display: none;
        transition: all 0.3s ease;
    `;
    
    // 只在移动端显示菜单按钮
    function checkMobile() {
        if (window.innerWidth <= 768) {
            menuButton.style.display = 'block';
            document.body.appendChild(menuButton);
        } else {
            menuButton.style.display = 'none';
            const sidebar = document.querySelector('.sidebar');
            if (sidebar) {
                sidebar.classList.remove('mobile-open');
            }
            overlay.classList.remove('show');
        }
    }
    
    // 初始检查和窗口大小变化监听
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // 菜单按钮点击事件
    menuButton.addEventListener('click', function() {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.classList.toggle('mobile-open');
            overlay.classList.toggle('show');
        }
    });
    
    // 覆盖层点击关闭菜单
    overlay.addEventListener('click', function() {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.classList.remove('mobile-open');
            overlay.classList.remove('show');
        }
    });
    
    // ESC键关闭菜单
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const sidebar = document.querySelector('.sidebar');
            if (sidebar && sidebar.classList.contains('mobile-open')) {
                sidebar.classList.remove('mobile-open');
                overlay.classList.remove('show');
            }
        }
    });
} 