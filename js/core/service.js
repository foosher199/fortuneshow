/**
 * 八字服务类
 * 整合计算器、分析器和报告生成器，提供统一的八字分析服务
 */

import BaZiCalculator from './calculator.js';
import BaZiAnalyzer from './analyzer.js';
import I18nManager from './i18n.js';
import StorageManager from './storage.js';
import { CONFIG } from '../data/config.js';

class BaZiService {
    constructor() {
        this.calculator = new BaZiCalculator();
        this.analyzer = new BaZiAnalyzer();
        this.i18n = new I18nManager();
        
        // 从配置文件获取有效的时辰值
        this.validHours = CONFIG.HOURS.map(hour => hour.value);
        
        // 初始化语言设置
        this.currentLanguage = StorageManager.getLanguage();
    }

    /**
     * 生成专业分析
     * @param {Object} params - 分析参数
     * @returns {Object} 分析结果
     */
    async generateProfessionalAnalysis(params) {
        try {
            // 验证输入
            if (!this.validateInput(params)) {
                return {
                    success: false,
                    error: CONFIG.ERRORS.UNKNOWN_ERROR
                };
            }

            // 计算八字
            const bazi = this.calculator.calculateBaZi(
                params.year,
                params.month,
                params.day,
                params.hour
            );

            // 计算五行分布
            const wuxingCount = this.calculator.calculateWuXing(bazi);

            // 计算阴阳
            const yinyang = this.calculator.calculateYinYang(bazi);

            // 分析结果
            const analysis = this.analyzer.analyze({
                bazi,
                wuxingCount,
                yinyang,
                gender: params.gender
            });

            // 保存分析结果
            const result = {
                success: true,
                data: {
                    report: {
                        title: '八字命理分析报告',
                        sections: {
                            basic: {
                                title: '基本八字',
                                content: this.formatBaZiSection(bazi)
                            },
                            wuxing: {
                                title: '五行分析',
                                content: this.formatWuXingSection(analysis.data.wuxing)
                            },
                            guidance: {
                                title: '命理指导',
                                content: this.formatGuidanceSection(analysis.data.guidance)
                            }
                        }
                    }
                }
            };

            // 保存到本地存储
            StorageManager.saveLastAnalysis(result);

            return result;
        } catch (error) {
            console.error('Analysis error:', error);
            return {
                success: false,
                error: CONFIG.ERRORS.UNKNOWN_ERROR
            };
        }
    }

    /**
     * 验证输入参数
     * @param {Object} params - 输入参数
     * @returns {boolean} 是否有效
     */
    validateInput(params) {
        try {
            this.validateParams(params);
            return true;
        } catch (error) {
            console.error('Validation error:', error.message);
            return false;
        }
    }

    /**
     * 验证输入参数（详细验证）
     * @param {Object} params - 输入参数
     * @throws {Error} 参数验证错误
     */
    validateParams(params) {
        // 验证必需参数
        const required = ['year', 'month', 'day', 'hour', 'gender'];
        for (const field of required) {
            if (params[field] === undefined || params[field] === null || params[field] === '') {
                throw new Error(CONFIG.ERRORS[`INVALID_${field.toUpperCase()}`]);
            }
        }

        // 验证年份
        const year = parseInt(params.year);
        if (isNaN(year) || year < CONFIG.YEAR.MIN || year > CONFIG.YEAR.MAX) {
            throw new Error(CONFIG.ERRORS.INVALID_YEAR);
        }

        // 验证月份
        const month = parseInt(params.month);
        if (isNaN(month) || month < 1 || month > 12) {
            throw new Error(CONFIG.ERRORS.INVALID_MONTH);
        }

        // 验证日期
        const day = parseInt(params.day);
        const daysInMonth = new Date(year, month, 0).getDate();
        if (isNaN(day) || day < 1 || day > daysInMonth) {
            throw new Error(CONFIG.ERRORS.INVALID_DAY);
        }

        // 验证时辰
        const hour = parseInt(params.hour);
        if (isNaN(hour) || !this.validHours.includes(hour)) {
            throw new Error(CONFIG.ERRORS.INVALID_HOUR);
        }

        // 验证性别
        if (!['男', '女'].includes(params.gender)) {
            throw new Error(CONFIG.ERRORS.INVALID_GENDER);
        }

        // 验证日期是否有效
        const date = new Date(year, month - 1, day);
        if (date.getMonth() !== month - 1) {
            throw new Error(CONFIG.ERRORS.INVALID_DAY);
        }
    }

    /**
     * 格式化八字部分
     * @param {Object} bazi - 八字对象
     * @returns {Array} 格式化后的内容
     */
    formatBaZiSection(bazi) {
        return [
            '您的八字如下：',
            `年柱：${bazi.year.gan}${bazi.year.zhi}`,
            `月柱：${bazi.month.gan}${bazi.month.zhi}`,
            `日柱：${bazi.day.gan}${bazi.day.zhi}`,
            `时柱：${bazi.hour.gan}${bazi.hour.zhi}`
        ];
    }

    /**
     * 格式化五行部分
     * @param {Object} wuxing - 五行分析结果
     * @returns {Array} 格式化后的内容
     */
    formatWuXingSection(wuxing) {
        const content = ['您的五行分布：'];
        
        for (const [element, data] of Object.entries(wuxing)) {
            content.push(`${element}：${data.percentage}% (${data.status})`);
        }

        return content;
    }

    /**
     * 格式化指导部分
     * @param {Object} guidance - 指导内容
     * @returns {Object} 格式化后的内容
     */
    formatGuidanceSection(guidance) {
        return {
            '总体评估': guidance.general,
            '事业建议': guidance.career,
            '人际关系': guidance.relationships,
            '健康指导': guidance.health
        };
    }
}

export default BaZiService; 