/**
 * 八字计算核心工具类
 * 实现基础的八字计算功能
 */

import { TianGan, DiZhi, GanZhiRelations } from '../../data/theory/ganzhi.js';
import { SolarTerms, SolarTermGanZhi, LunarMonths } from '../../data/theory/lunar.js';
import { WuXingAttributes, WuXingRelations, WuXingSeasonalStrength } from '../../data/theory/wuxing.js';
import { ShiShenAttributes, ShiShenRelations, ShiShenPreferences } from '../../data/theory/shishen.js';

class BaZiCalculator {
    constructor() {
        // 天干
        this.tianGan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
        // 地支
        this.diZhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
        // 五行
        this.wuXing = ['金', '木', '水', '火', '土'];
        // 阴阳
        this.yinYang = ['阳', '阴'];
    }

    /**
     * 计算年柱
     * @param {number} year - 公历年份
     * @returns {Object} 天干和地支
     */
    calculateYearPillar(year) {
        const ganIndex = (year - 4) % 10;
        const zhiIndex = (year - 4) % 12;
        return {
            gan: this.tianGan[ganIndex],
            zhi: this.diZhi[zhiIndex]
        };
    }

    /**
     * 计算月柱
     * @param {number} year - 公历年份
     * @param {number} month - 公历月份（1-12）
     * @returns {Object} 天干和地支
     */
    calculateMonthPillar(year, month) {
        const yearGanIndex = (year - 4) % 10;
        const baseIndex = (yearGanIndex % 5 * 2 + month - 1) % 10;
        return {
            gan: this.tianGan[baseIndex],
            zhi: this.diZhi[(month + 1) % 12]
        };
    }

    /**
     * 计算日柱
     * @param {number} year - 公历年份
     * @param {number} month - 公历月份（1-12）
     * @param {number} day - 公历日期
     * @returns {Object} 天干和地支
     */
    calculateDayPillar(year, month, day) {
        const base = new Date(1900, 0, 1);
        const current = new Date(year, month - 1, day);
        const days = Math.floor((current - base) / (24 * 60 * 60 * 1000));
        const ganIndex = (days + 10) % 10;
        const zhiIndex = (days + 12) % 12;
        return {
            gan: this.tianGan[ganIndex],
            zhi: this.diZhi[zhiIndex]
        };
    }

    /**
     * 计算时柱
     * @param {number} hour - 小时（0-23）
     * @param {string} dayGan - 日干
     * @returns {Object} 天干和地支
     */
    calculateHourPillar(hour, dayGan) {
        const ganBase = (this.tianGan.indexOf(dayGan) % 5) * 2;
        const ganIndex = (ganBase + Math.floor(hour / 2)) % 10;
        const zhiIndex = Math.floor(hour / 2);
        return {
            gan: this.tianGan[ganIndex],
            zhi: this.diZhi[zhiIndex]
        };
    }

    /**
     * 计算完整八字
     * @param {number} year - 公历年份
     * @param {number} month - 公历月份（1-12）
     * @param {number} day - 公历日期
     * @param {number} hour - 小时（0-23）
     * @returns {Object} 完整八字信息
     */
    calculateBaZi(year, month, day, hour) {
        const yearPillar = this.calculateYearPillar(year);
        const monthPillar = this.calculateMonthPillar(year, month);
        const dayPillar = this.calculateDayPillar(year, month, day);
        const hourPillar = this.calculateHourPillar(hour, dayPillar.gan);

        return {
            year: yearPillar,
            month: monthPillar,
            day: dayPillar,
            hour: hourPillar
        };
    }

    /**
     * 计算五行分布
     * @param {Object} bazi - 八字对象
     * @returns {Object} 五行统计结果
     */
    calculateWuXing(bazi) {
        const count = {
            '金': 0, '木': 0, '水': 0, '火': 0, '土': 0
        };

        // 简化版五行计算规则
        const ganWuXing = {
            '甲': '木', '乙': '木',
            '丙': '火', '丁': '火',
            '戊': '土', '己': '土',
            '庚': '金', '辛': '金',
            '壬': '水', '癸': '水'
        };

        const zhiWuXing = {
            '子': '水', '丑': '土',
            '寅': '木', '卯': '木',
            '辰': '土', '巳': '火',
            '午': '火', '未': '土',
            '申': '金', '酉': '金',
            '戌': '土', '亥': '水'
        };

        // 统计天干五行
        [bazi.year.gan, bazi.month.gan, bazi.day.gan, bazi.hour.gan].forEach(gan => {
            count[ganWuXing[gan]]++;
        });

        // 统计地支五行
        [bazi.year.zhi, bazi.month.zhi, bazi.day.zhi, bazi.hour.zhi].forEach(zhi => {
            count[zhiWuXing[zhi]]++;
        });

        return count;
    }

    /**
     * 计算阴阳
     * @param {Object} bazi - 八字对象
     * @returns {Object} 阴阳统计结果
     */
    calculateYinYang(bazi) {
        let yin = 0, yang = 0;

        // 天干阴阳
        [bazi.year.gan, bazi.month.gan, bazi.day.gan, bazi.hour.gan].forEach(gan => {
            this.tianGan.indexOf(gan) % 2 === 0 ? yang++ : yin++;
        });

        // 地支阴阳
        [bazi.year.zhi, bazi.month.zhi, bazi.day.zhi, bazi.hour.zhi].forEach(zhi => {
            this.diZhi.indexOf(zhi) % 2 === 0 ? yang++ : yin++;
        });

        return { yin, yang };
    }

    /**
     * 计算十神
     * @param {Object} bazi - 八字对象
     * @returns {Object} 十神分析结果
     */
    calculateShiShen(bazi) {
        const dayGan = bazi.day.gan; // 日主
        const dayWuxing = TianGan[dayGan].wuxing;
        const result = {};

        // 计算其他天干的十神属性
        [bazi.year.gan, bazi.month.gan, bazi.hour.gan].forEach(gan => {
            const ganWuxing = TianGan[gan].wuxing;
            result[gan] = this.determineShiShen(dayWuxing, ganWuxing, TianGan[gan].yinyang === TianGan[dayGan].yinyang);
        });

        return result;
    }

    /**
     * 确定十神属性
     * @param {string} dayWuxing - 日主五行
     * @param {string} otherWuxing - 其他五行
     * @param {boolean} sameYinYang - 是否同阴阳
     * @returns {string} 十神名称
     */
    determineShiShen(dayWuxing, otherWuxing, sameYinYang) {
        const relation = this.determineWuxingRelation(dayWuxing, otherWuxing);
        
        switch(relation) {
            case '生':
                return sameYinYang ? '正印' : '偏印';
            case '克':
                return sameYinYang ? '正官' : '七杀';
            case '被生':
                return sameYinYang ? '食神' : '伤官';
            case '被克':
                return sameYinYang ? '正财' : '偏财';
            default:
                return sameYinYang ? '正比' : '劫比';
        }
    }

    /**
     * 确定五行关系
     * @param {string} mainWuxing - 主五行
     * @param {string} otherWuxing - 其他五行
     * @returns {string} 关系类型
     */
    determineWuxingRelation(mainWuxing, otherWuxing) {
        if (WuXingRelations.生[mainWuxing] === otherWuxing) return '生';
        if (WuXingRelations.克[mainWuxing] === otherWuxing) return '克';
        if (WuXingRelations.生[otherWuxing] === mainWuxing) return '被生';
        if (WuXingRelations.克[otherWuxing] === mainWuxing) return '被克';
        return '比和';
    }
}

export default BaZiCalculator; 