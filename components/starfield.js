/**
 * 神秘学预测中心 - 公共星空背景组件
 * 动态生成美丽的星空背景效果
 */

class MysticStarfield {
    constructor(options = {}) {
        this.options = {
            starCount: options.starCount || 200,
            shootingStarCount: options.shootingStarCount || 3,
            constellationLines: options.constellationLines || 5,
            enableShootingStars: options.enableShootingStars !== false,
            enableConstellations: options.enableConstellations !== false,
            container: options.container || 'body'
        };
        
        this.init();
    }

    // 初始化星空背景
    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.render());
        } else {
            this.render();
        }
    }

    // 渲染星空背景
    render() {
        this.createStarsContainer();
        this.createStars();
        
        if (this.options.enableShootingStars) {
            this.createShootingStars();
        }
        
        if (this.options.enableConstellations) {
            this.createConstellationLines();
        }
    }

    // 创建星空容器
    createStarsContainer() {
        // 检查是否已存在星空容器
        let starsContainer = document.querySelector('.stars');
        
        if (!starsContainer) {
            starsContainer = document.createElement('div');
            starsContainer.className = 'stars';
            
            // 根据容器选择插入位置
            if (this.options.container === 'body') {
                document.body.appendChild(starsContainer);
            } else {
                const targetContainer = document.querySelector(this.options.container);
                if (targetContainer) {
                    targetContainer.appendChild(starsContainer);
                } else {
                    document.body.appendChild(starsContainer);
                }
            }
        } else {
            // 清空现有内容，避免重复创建
            starsContainer.innerHTML = '';
        }
        
        this.starsContainer = starsContainer;
    }

    // 创建普通星星
    createStars() {
        const stars = [];
        
        for (let i = 0; i < this.options.starCount; i++) {
            const star = document.createElement('div');
            
            // 随机分配星星类型
            const starTypes = ['small', 'medium', 'large'];
            const weights = [0.6, 0.3, 0.1]; // 小星星60%，中等30%，大星星10%
            const starType = this.getWeightedRandom(starTypes, weights);
            
            star.className = `star ${starType}`;
            
            // 随机位置
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            
            // 随机动画延迟
            star.style.animationDelay = Math.random() * 3 + 's';
            
            // 随机动画持续时间
            star.style.animationDuration = (1.5 + Math.random() * 2) + 's';
            
            // 5%概率创建特殊亮星
            if (Math.random() < 0.05) {
                star.classList.add('bright');
            }
            
            stars.push(star);
            this.starsContainer.appendChild(star);
        }
        
        return stars;
    }

    // 创建流星
    createShootingStars() {
        for (let i = 0; i < this.options.shootingStarCount; i++) {
            const shootingStar = document.createElement('div');
            shootingStar.className = 'shooting-star';
            
            // 随机起始位置（从左上角区域开始）
            shootingStar.style.left = Math.random() * 30 + '%';
            shootingStar.style.top = Math.random() * 30 + '%';
            
            // 随机延迟，避免所有流星同时出现
            shootingStar.style.animationDelay = Math.random() * 8 + 's';
            
            // 随机持续时间
            shootingStar.style.animationDuration = (3 + Math.random() * 3) + 's';
            
            this.starsContainer.appendChild(shootingStar);
        }
    }

    // 创建星座连线
    createConstellationLines() {
        for (let i = 0; i < this.options.constellationLines; i++) {
            const line = document.createElement('div');
            line.className = 'constellation-line';
            
            // 随机位置和方向
            const angle = Math.random() * 360;
            const length = 50 + Math.random() * 100;
            
            line.style.left = Math.random() * 80 + '%';
            line.style.top = Math.random() * 80 + '%';
            line.style.width = length + 'px';
            line.style.transform = `rotate(${angle}deg)`;
            
            // 随机动画延迟
            line.style.animationDelay = Math.random() * 6 + 's';
            
            this.starsContainer.appendChild(line);
        }
    }

    // 权重随机选择
    getWeightedRandom(items, weights) {
        const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
        let random = Math.random() * totalWeight;
        
        for (let i = 0; i < items.length; i++) {
            random -= weights[i];
            if (random <= 0) {
                return items[i];
            }
        }
        
        return items[items.length - 1];
    }

    // 更新星空密度
    updateStarCount(newCount) {
        this.options.starCount = newCount;
        this.render();
    }

    // 切换流星效果
    toggleShootingStars(enabled) {
        this.options.enableShootingStars = enabled;
        
        const shootingStars = this.starsContainer.querySelectorAll('.shooting-star');
        shootingStars.forEach(star => {
            star.style.display = enabled ? 'block' : 'none';
        });
    }

    // 切换星座连线效果
    toggleConstellations(enabled) {
        this.options.enableConstellations = enabled;
        
        const lines = this.starsContainer.querySelectorAll('.constellation-line');
        lines.forEach(line => {
            line.style.display = enabled ? 'block' : 'none';
        });
    }

    // 销毁星空背景
    destroy() {
        if (this.starsContainer) {
            this.starsContainer.remove();
            this.starsContainer = null;
        }
    }
}

// 全局可用
window.MysticStarfield = MysticStarfield;

// 自动初始化默认星空背景
if (typeof window !== 'undefined') {
    // 等待DOM和其他脚本加载完成
    window.addEventListener('load', () => {
        // 检查是否已经有星空背景实例
        if (!window.mysticStarfield) {
            window.mysticStarfield = new MysticStarfield({
                starCount: 150,
                shootingStarCount: 2,
                constellationLines: 3,
                enableShootingStars: true,
                enableConstellations: true
            });
        }
    });
} 