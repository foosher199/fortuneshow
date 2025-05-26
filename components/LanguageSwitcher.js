/**
 * 语言切换组件
 */

class LanguageSwitcher {
    constructor(i18n, onChange) {
        this.i18n = i18n;
        this.onChange = onChange;
        this.element = this.createSwitcher();
    }

    createSwitcher() {
        const container = document.createElement('div');
        container.className = 'language-switcher';
        container.innerHTML = `
            <style>
                .language-switcher {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 1000;
                    background: rgba(255, 255, 255, 0.95);
                    border-radius: 12px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    padding: 8px;
                    display: flex;
                    gap: 8px;
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(0, 0, 0, 0.1);
                }

                .language-button {
                    padding: 8px 12px;
                    border: none;
                    border-radius: 8px;
                    background: transparent;
                    color: #666;
                    cursor: pointer;
                    font-size: 14px;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }

                .language-button:hover {
                    background: rgba(0, 0, 0, 0.05);
                    color: #333;
                }

                .language-button.active {
                    background: #007AFF;
                    color: white;
                }

                .language-icon {
                    width: 16px;
                    height: 16px;
                    display: inline-block;
                }
            </style>
        `;

        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.gap = '8px';

        // 获取支持的语言列表
        const languages = this.i18n.getSupportedLanguageNames();
        
        // 创建语言按钮
        Object.entries(languages).forEach(([code, name]) => {
            const button = document.createElement('button');
            button.className = 'language-button';
            if (code === this.i18n.getCurrentLanguage()) {
                button.classList.add('active');
            }

            // 添加语言图标
            const icon = this.getLanguageIcon(code);
            button.innerHTML = `${icon}${name}`;

            // 添加点击事件
            button.addEventListener('click', () => {
                // 更新按钮状态
                container.querySelectorAll('.language-button').forEach(btn => {
                    btn.classList.remove('active');
                });
                button.classList.add('active');

                // 切换语言
                this.i18n.setLanguage(code);
                if (this.onChange) {
                    this.onChange(code);
                }
            });

            buttonContainer.appendChild(button);
        });

        container.appendChild(buttonContainer);
        return container;
    }

    getLanguageIcon(code) {
        // 为每种语言定义SVG图标
        const icons = {
            zh: `<svg class="language-icon" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" fill="#DE2910"/>
                    <path d="M8,8 L10,6 L12,8 L14,6 L16,8" stroke="#FFDE00" stroke-width="1" fill="none"/>
                </svg>`,
            en: `<svg class="language-icon" viewBox="0 0 24 24">
                    <rect width="24" height="24" fill="#012169"/>
                    <path d="M0,0 L24,24 M24,0 L0,24" stroke="white" stroke-width="2"/>
                </svg>`,
            ja: `<svg class="language-icon" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" fill="white"/>
                    <circle cx="12" cy="12" r="6" fill="#BC002D"/>
                </svg>`,
            ko: `<svg class="language-icon" viewBox="0 0 24 24">
                    <rect width="24" height="24" fill="white"/>
                    <circle cx="12" cy="12" r="6" fill="#CD2E3A"/>
                    <path d="M12,6 A6,6 0 0 1 18,12" fill="#0047A0"/>
                    <path d="M12,18 A6,6 0 0 1 6,12" fill="#0047A0"/>
                </svg>`
        };

        return icons[code] || '';
    }

    // 挂载到DOM
    mount(container) {
        container.appendChild(this.element);
    }

    // 从DOM移除
    unmount() {
        this.element.remove();
    }
}

export default LanguageSwitcher; 