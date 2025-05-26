/**
 * 八字报告生成器类
 * 生成完整的命理分析报告
 */

import { TianGan, DiZhi } from '../../data/theory/ganzhi.js';
import { WuXingAttributes } from '../../data/theory/wuxing.js';
import { ShiShenAttributes } from '../../data/theory/shishen.js';
import { SolarTerms, LunarMonths } from '../../data/theory/lunar.js';

class BaZiReporter {
    constructor() {
        this.reportSections = {
            basic: '基础信息',
            bazi: '八字解析',
            wuxing: '五行分析',
            shishen: '十神分析',
            dayun: '大运流年',
            guidance: '运势指导'
        };
    }

    /**
     * 生成完整报告
     * @param {Object} bazi - 八字对象
     * @param {Object} analysis - 分析结果
     * @returns {Object} 完整报告
     */
    generateFullReport(bazi, analysis) {
        return {
            title: this.generateTitle(bazi),
            sections: {
                basic: this.generateBasicInfo(bazi),
                bazi: this.generateBaZiAnalysis(bazi),
                wuxing: this.generateWuXingAnalysis(analysis.wuxing),
                shishen: this.generateShiShenAnalysis(analysis.shishen),
                dayun: this.generateDaYunAnalysis(analysis.dayun),
                guidance: this.generateGuidance(analysis)
            }
        };
    }

    /**
     * 生成报告标题
     * @param {Object} bazi - 八字对象
     * @returns {string} 标题
     */
    generateTitle(bazi) {
        const yearGan = bazi.year.tianGan;
        const yearZhi = bazi.year.diZhi;
        return `${yearGan}${yearZhi}年 命理分析报告`;
    }

    /**
     * 生成基础信息
     * @param {Object} bazi - 八字对象
     * @returns {Object} 基础信息
     */
    generateBasicInfo(bazi) {
        return {
            title: this.reportSections.basic,
            content: {
                year: `${bazi.year.tianGan}${bazi.year.diZhi}年`,
                month: `${bazi.month.tianGan}${bazi.month.diZhi}月`,
                day: `${bazi.day.tianGan}${bazi.day.diZhi}日`,
                hour: `${bazi.hour.tianGan}${bazi.hour.diZhi}时`,
                yearNature: TianGan[bazi.year.tianGan].nature,
                monthNature: DiZhi[bazi.month.diZhi].nature,
                dayNature: `${TianGan[bazi.day.tianGan].nature}，${DiZhi[bazi.day.diZhi].nature}`,
                hourNature: DiZhi[bazi.hour.diZhi].time
            }
        };
    }

    /**
     * 生成八字解析
     * @param {Object} bazi - 八字对象
     * @returns {Object} 八字解析
     */
    generateBaZiAnalysis(bazi) {
        return {
            title: this.reportSections.bazi,
            content: {
                yearPillar: {
                    combination: `${bazi.year.tianGan}${bazi.year.diZhi}`,
                    meaning: this.getPillarMeaning(bazi.year.tianGan, bazi.year.diZhi, '年柱'),
                    attributes: {
                        tianGan: TianGan[bazi.year.tianGan].personality,
                        diZhi: DiZhi[bazi.year.diZhi].nature
                    }
                },
                monthPillar: {
                    combination: `${bazi.month.tianGan}${bazi.month.diZhi}`,
                    meaning: this.getPillarMeaning(bazi.month.tianGan, bazi.month.diZhi, '月柱'),
                    attributes: {
                        tianGan: TianGan[bazi.month.tianGan].personality,
                        diZhi: DiZhi[bazi.month.diZhi].nature
                    }
                },
                dayPillar: {
                    combination: `${bazi.day.tianGan}${bazi.day.diZhi}`,
                    meaning: this.getPillarMeaning(bazi.day.tianGan, bazi.day.diZhi, '日柱'),
                    attributes: {
                        tianGan: TianGan[bazi.day.tianGan].personality,
                        diZhi: DiZhi[bazi.day.diZhi].nature
                    }
                },
                hourPillar: {
                    combination: `${bazi.hour.tianGan}${bazi.hour.diZhi}`,
                    meaning: this.getPillarMeaning(bazi.hour.tianGan, bazi.hour.diZhi, '时柱'),
                    attributes: {
                        tianGan: TianGan[bazi.hour.tianGan].personality,
                        diZhi: DiZhi[bazi.hour.diZhi].nature
                    }
                }
            }
        };
    }

    /**
     * 生成五行分析
     * @param {Object} wuxingAnalysis - 五行分析结果
     * @returns {Object} 五行分析
     */
    generateWuXingAnalysis(wuxingAnalysis) {
        return {
            title: this.reportSections.wuxing,
            content: {
                distribution: wuxingAnalysis.percentages,
                characteristics: wuxingAnalysis.characteristics,
                description: wuxingAnalysis.description,
                recommendations: this.generateWuXingRecommendations(wuxingAnalysis.characteristics)
            }
        };
    }

    /**
     * 生成十神分析
     * @param {Object} shiShenAnalysis - 十神分析结果
     * @returns {Object} 十神分析
     */
    generateShiShenAnalysis(shiShenAnalysis) {
        return {
            title: this.reportSections.shishen,
            content: {
                details: shiShenAnalysis.details,
                description: shiShenAnalysis.description,
                recommendations: this.generateShiShenRecommendations(shiShenAnalysis.details)
            }
        };
    }

    /**
     * 生成大运分析
     * @param {Array} dayunAnalysis - 大运分析结果
     * @returns {Object} 大运分析
     */
    generateDaYunAnalysis(dayunAnalysis) {
        return {
            title: this.reportSections.dayun,
            content: dayunAnalysis.map(dayun => ({
                age: dayun.age,
                combination: `${dayun.tianGan}${dayun.diZhi}`,
                nature: `${TianGan[dayun.tianGan].nature}，${DiZhi[dayun.diZhi].nature}`,
                guidance: this.getDaYunGuidance(dayun)
            }))
        };
    }

    /**
     * 生成运势指导
     * @param {Object} analysis - 完整分析结果
     * @returns {Object} 运势指导
     */
    generateGuidance(analysis) {
        return {
            title: this.reportSections.guidance,
            content: {
                career: this.getCareerGuidance(analysis),
                relationship: this.getRelationshipGuidance(analysis),
                health: this.getHealthGuidance(analysis),
                timing: this.getTimingGuidance(analysis)
            }
        };
    }

    /**
     * 获取柱位含义
     * @param {string} gan - 天干
     * @param {string} zhi - 地支
     * @param {string} pillar - 柱位
     * @returns {string} 含义描述
     */
    getPillarMeaning(gan, zhi, pillar) {
        const ganAttr = TianGan[gan];
        const zhiAttr = DiZhi[zhi];
        
        const meanings = {
            '年柱': '代表童年时期、人生总体、家庭背景',
            '月柱': '代表青年时期、事业发展、工作环境',
            '日柱': '代表成年时期、个人性格、婚姻状况',
            '时柱': '代表晚年时期、子女、晚景'
        };

        return `${meanings[pillar]}。${ganAttr.nature}，${zhiAttr.nature}`;
    }

    /**
     * 生成五行建议
     * @param {Object} characteristics - 五行特征
     * @returns {Array} 建议列表
     */
    generateWuXingRecommendations(characteristics) {
        const recommendations = [];
        
        Object.entries(characteristics).forEach(([wuxing, state]) => {
            const attr = WuXingAttributes[wuxing];
            switch (state) {
                case '太过':
                    recommendations.push(`${wuxing}过旺，建议从事${attr.career}相关工作，但需注意不要过于执着`);
                    break;
                case '不及':
                    recommendations.push(`${wuxing}偏弱，可以通过${attr.career}相关活动来补充能量`);
                    break;
                case '适中':
                    recommendations.push(`${wuxing}平衡，适合在${attr.career}方面发展`);
                    break;
            }
        });

        return recommendations;
    }

    /**
     * 生成十神建议
     * @param {Object} details - 十神详情
     * @returns {Array} 建议列表
     */
    generateShiShenRecommendations(details) {
        const recommendations = [];
        
        Object.entries(details).forEach(([gan, detail]) => {
            const attr = ShiShenAttributes[detail.type];
            if (detail.isPreferred) {
                recommendations.push(`宜发展${attr.meaning}相关方向，可以发挥${attr.positive}的优势`);
            } else {
                recommendations.push(`需注意克服${attr.negative}的特点，适度发展${attr.meaning}相关方向`);
            }
        });

        return recommendations;
    }

    /**
     * 获取大运指导
     * @param {Object} dayun - 大运信息
     * @returns {string} 指导建议
     */
    getDaYunGuidance(dayun) {
        const ganAttr = TianGan[dayun.tianGan];
        const zhiAttr = DiZhi[dayun.diZhi];
        
        return `这段时期主要体现${ganAttr.personality}的特质，
                宜从事${ganAttr.wuxing}相关行业。
                ${zhiAttr.nature}，
                注意把握${zhiAttr.time}时段的机会。`;
    }

    /**
     * 获取事业指导
     * @param {Object} analysis - 分析结果
     * @returns {string} 事业建议
     */
    getCareerGuidance(analysis) {
        // 根据五行和十神分析生成事业建议
        let guidance = '事业发展建议：\n';
        
        // 添加五行相关建议
        guidance += analysis.wuxing.description + '\n';
        
        // 添加十神相关建议
        guidance += '根据命局特征：\n';
        guidance += analysis.shishen.description;
        
        return guidance;
    }

    /**
     * 获取感情指导
     * @param {Object} analysis - 分析结果
     * @returns {string} 感情建议
     */
    getRelationshipGuidance(analysis) {
        // 根据日柱和配偶宫分析生成感情建议
        return '感情发展建议：\n' +
               '1. 注意培养感情的稳定性\n' +
               '2. 保持良好的沟通方式\n' +
               '3. 适时表达关心和理解';
    }

    /**
     * 获取健康指导
     * @param {Object} analysis - 分析结果
     * @returns {string} 健康建议
     */
    getHealthGuidance(analysis) {
        // 根据五行特征生成健康建议
        return '健康保养建议：\n' +
               '1. 注意作息规律\n' +
               '2. 保持适度运动\n' +
               '3. 调节饮食结构';
    }

    /**
     * 获取时间指导
     * @param {Object} analysis - 分析结果
     * @returns {string} 时间建议
     */
    getTimingGuidance(analysis) {
        // 根据大运和流年分析生成时间选择建议
        return '时间选择建议：\n' +
               '1. 把握有利时机\n' +
               '2. 避开不利时段\n' +
               '3. 合理规划进度';
    }
}

export default BaZiReporter; 