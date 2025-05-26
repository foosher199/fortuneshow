/**
 * 本地存储管理器
 * 处理所有本地存储相关的操作
 */

import { CONFIG } from '../data/config.js';

class StorageManager {
    /**
     * 设置语言偏好
     * @param {string} language - 语言代码
     */
    static setLanguage(language) {
        if (CONFIG.LANGUAGE.SUPPORTED.includes(language)) {
            localStorage.setItem(CONFIG.STORAGE_KEYS.LANGUAGE, language);
        }
    }

    /**
     * 获取当前语言
     * @returns {string} 语言代码
     */
    static getLanguage() {
        return localStorage.getItem(CONFIG.STORAGE_KEYS.LANGUAGE) || CONFIG.LANGUAGE.DEFAULT;
    }

    /**
     * 保存最近的分析结果
     * @param {Object} result - 分析结果
     */
    static saveLastAnalysis(result) {
        try {
            localStorage.setItem(CONFIG.STORAGE_KEYS.LAST_ANALYSIS, JSON.stringify(result));
        } catch (error) {
            console.error('Failed to save analysis:', error);
        }
    }

    /**
     * 获取最近的分析结果
     * @returns {Object|null} 分析结果或null
     */
    static getLastAnalysis() {
        try {
            const data = localStorage.getItem(CONFIG.STORAGE_KEYS.LAST_ANALYSIS);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Failed to get analysis:', error);
            return null;
        }
    }

    /**
     * 清除所有存储的数据
     */
    static clearAll() {
        try {
            Object.values(CONFIG.STORAGE_KEYS).forEach(key => {
                localStorage.removeItem(key);
            });
        } catch (error) {
            console.error('Failed to clear storage:', error);
        }
    }

    /**
     * 检查浏览器是否支持本地存储
     * @returns {boolean} 是否支持
     */
    static isSupported() {
        try {
            const testKey = '__test__';
            localStorage.setItem(testKey, testKey);
            localStorage.removeItem(testKey);
            return true;
        } catch (error) {
            return false;
        }
    }
}

export default StorageManager; 