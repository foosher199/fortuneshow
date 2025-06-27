
// 优化的全局脚本
(function(){
    // 创建星空背景
    function createStars(){
        const starsContainer=document.createElement('div');
        starsContainer.className='stars';
        for(let i=0;i<100;i++){
            const star=document.createElement('div');
            star.className='star';
            star.style.left=Math.random()*100+'%';
            star.style.top=Math.random()*100+'%';
            star.style.animationDelay=Math.random()*3+'s';
            starsContainer.appendChild(star);
        }
        document.body.appendChild(starsContainer);
    }
    
    // 懒加载图片
    function lazyLoadImages(){
        const images=document.querySelectorAll('img[data-src]');
        const imageObserver=new IntersectionObserver((entries,observer)=>{
            entries.forEach(entry=>{
                if(entry.isIntersecting){
                    const img=entry.target;
                    img.src=img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        images.forEach(img=>imageObserver.observe(img));
    }
    
    // 性能监控
    function performanceMonitor(){
        if('performance' in window){
            window.addEventListener('load',()=>{
                setTimeout(()=>{
                    const perfData=performance.getEntriesByType('navigation')[0];
                    console.log('页面加载时间:',perfData.loadEventEnd-perfData.fetchStart+'ms');
                },0);
            });
        }
    }
    
    // 平滑滚动
    function smoothScroll(){
        document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
            anchor.addEventListener('click',function(e){
                e.preventDefault();
                const target=document.querySelector(this.getAttribute('href'));
                if(target){
                    target.scrollIntoView({behavior:'smooth'});
                }
            });
        });
    }
    
    // 初始化
    document.addEventListener('DOMContentLoaded',()=>{
        createStars();
        lazyLoadImages();
        performanceMonitor();
        smoothScroll();
    });
})();
