/**
 * 国际化语言管理器
 */

import translations from '../../data/i18n/translations.js';

class I18nManager {
    constructor() {
        this.currentLanguage = localStorage.getItem('language') || 'zh';
        this.translations = translations;
    }

    translate(key) {
        const keys = key.split('.');
        let result = this.translations[this.currentLanguage];
        
        for (const k of keys) {
            if (result && result[k]) {
                result = result[k];
            } else {
                return key;
            }
        }
        
        return result;
    }

    setLanguage(lang) {
        if (this.translations[lang]) {
            this.currentLanguage = lang;
            localStorage.setItem('language', lang);
        }
    }

    getCurrentLanguage() {
        return this.currentLanguage;
    }

    getSupportedLanguageNames() {
        return {
            zh: '中文',
            en: 'English',
            ja: '日本語',
            ko: '한국어'
        };
    }

    getError(key) {
        return this.translate(`error.${key}`);
    }
}

export default I18nManager; 