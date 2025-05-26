/**
 * 八字分析器类
 * 根据八字计算结果生成详细的命理分析
 */

import { TianGan, DiZhi, GanZhiRelations } from '../../data/theory/ganzhi.js';
import { WuXingAttributes, WuXingRelations, WuXingSeasonalStrength } from '../../data/theory/wuxing.js';
import { ShiShenAttributes, ShiShenRelations, ShiShenPreferences } from '../../data/theory/shishen.js';
import BaZiCalculator from './calculator.js';

class BaZiAnalyzer {
    constructor() {
        this.calculator = new BaZiCalculator();
        this.strengthThreshold = {
            veryWeak: 2,
            weak: 3,
            balanced: 4,
            strong: 5,
            veryStrong: 6
        };
    }

    analyze(params) {
        const { year, month, day, hour, gender } = params;
        
        // 计算八字
        const bazi = this.calculator.calculateBaZi(year, month, day, hour);
        
        // 计算五行分布
        const wuxing = this.calculator.calculateWuXing(bazi);
        
        // 计算阴阳
        const yinyang = this.calculator.calculateYinYang(bazi);

        // 生成分析报告
        return {
            success: true,
            data: {
                bazi: this.formatBaZi(bazi),
                wuxing: this.analyzeWuXing(wuxing),
                yinyang: this.analyzeYinYang(yinyang),
                guidance: this.generateGuidance(bazi, wuxing, yinyang, gender)
            }
        };
    }

    formatBaZi(bazi) {
        return {
            year: `${bazi.year.gan}${bazi.year.zhi}`,
            month: `${bazi.month.gan}${bazi.month.zhi}`,
            day: `${bazi.day.gan}${bazi.day.zhi}`,
            hour: `${bazi.hour.gan}${bazi.hour.zhi}`
        };
    }

    analyzeWuXing(wuxing) {
        const total = Object.values(wuxing).reduce((a, b) => a + b, 0);
        const analysis = {};
        
        // 计算各五行的百分比
        for (const [element, count] of Object.entries(wuxing)) {
            const percentage = (count / total * 100).toFixed(1);
            analysis[element] = {
                count,
                percentage: `${percentage}%`,
                status: this.getElementStatus(percentage)
            };
        }

        return analysis;
    }

    getElementStatus(percentage) {
        if (percentage >= 30) return '过旺';
        if (percentage >= 20) return '旺';
        if (percentage >= 10) return '中';
        if (percentage > 0) return '弱';
        return '缺';
    }

    analyzeYinYang(yinyang) {
        const total = yinyang.yin + yinyang.yang;
        const yinPercentage = (yinyang.yin / total * 100).toFixed(1);
        const yangPercentage = (yinyang.yang / total * 100).toFixed(1);

        return {
            yin: {
                count: yinyang.yin,
                percentage: `${yinPercentage}%`
            },
            yang: {
                count: yinyang.yang,
                percentage: `${yangPercentage}%`
            },
            balance: this.getYinYangBalance(yinPercentage, yangPercentage)
        };
    }

    getYinYangBalance(yin, yang) {
        const diff = Math.abs(yin - yang);
        if (diff <= 10) return '阴阳平衡';
        if (yin > yang) return '阴重于阳';
        return '阳重于阴';
    }

    generateGuidance(bazi, wuxing, yinyang, gender) {
        const guidance = {
            general: this.getGeneralGuidance(wuxing, yinyang),
            career: this.getCareerGuidance(wuxing),
            relationships: this.getRelationshipGuidance(wuxing, yinyang, gender),
            health: this.getHealthGuidance(wuxing, yinyang)
        };

        return guidance;
    }

    getGeneralGuidance(wuxing, yinyang) {
        const strongest = Object.entries(wuxing)
            .sort((a, b) => b[1] - a[1])[0][0];
        const weakest = Object.entries(wuxing)
            .sort((a, b) => a[1] - b[1])[0][0];

        return [
            `您的命盘中${strongest}的能量最强，这表示您在${this.getElementTraits(strongest)}方面有特殊的优势。`,
            `${weakest}能量相对较弱，可以通过${this.getElementEnhancement(weakest)}来加强。`,
            yinyang.balance === '阴阳平衡' 
                ? '您的命盘阴阳较为平衡，这是很好的特质。'
                : `您的命盘${yinyang.balance}，可以通过${this.getYinYangAdvice(yinyang.balance)}来调节。`
        ];
    }

    getElementTraits(element) {
        const traits = {
            '金': '纪律、执行力、决断力',
            '木': '创新、成长、领导力',
            '水': '智慧、适应力、交际能力',
            '火': '热情、表现力、创造力',
            '土': '稳重、踏实、组织能力'
        };
        return traits[element];
    }

    getElementEnhancement(element) {
        const enhancements = {
            '金': '培养规律的生活习惯，提高执行力',
            '木': '多参与创新活动，发展领导才能',
            '水': '扩展人际关系，增加知识储备',
            '火': '培养兴趣爱好，发展表现才能',
            '土': '稳固基础，提高组织能力'
        };
        return enhancements[element];
    }

    getYinYangAdvice(balance) {
        if (balance === '阴重于阳') {
            return '多参与阳刚性活动，如运动、社交等';
        }
        return '多进行冥想、休息等静态活动';
    }

    getCareerGuidance(wuxing) {
        const strongest = Object.entries(wuxing)
            .sort((a, b) => b[1] - a[1])[0][0];
        
        const careers = {
            '金': ['金融', '法律', '军警', '工程'],
            '木': ['教育', '医疗', '环保', '创业'],
            '水': ['科技', '传媒', '营销', '外交'],
            '火': ['艺术', '娱乐', '餐饮', '演讲'],
            '土': ['房地产', '农业', '行政', '服务业']
        };

        return [
            `根据您的五行特质，以下职业领域可能特别适合您：`,
            ...careers[strongest].map(career => `- ${career}`)
        ];
    }

    getRelationshipGuidance(wuxing, yinyang, gender) {
        const advice = [];
        
        if (yinyang.balance === '阴阳平衡') {
            advice.push('您的阴阳平衡，在人际关系中较容易与人相处。');
        } else {
            advice.push('在人际关系中要注意平衡阴阳特质，避免过于强势或过于被动。');
        }

        const strongest = Object.entries(wuxing)
            .sort((a, b) => b[1] - a[1])[0][0];
        
        advice.push(`您的${strongest}能量较强，在关系中要注意${this.getRelationshipAdvice(strongest, gender)}`);

        return advice;
    }

    getRelationshipAdvice(element, gender) {
        const advice = {
            '金': '不要过于严厉，要学会灵活变通',
            '木': '给对方足够的成长空间，不要过于固执',
            '水': '保持适度的情感表达，不要过于理性',
            '火': '控制情绪波动，保持适度热情',
            '土': '适当表达情感，不要过于保守'
        };
        return advice[element];
    }

    getHealthGuidance(wuxing, yinyang) {
        const weakest = Object.entries(wuxing)
            .sort((a, b) => a[1] - b[1])[0][0];
        
        const healthAdvice = {
            '金': ['呼吸系统', '皮肤', '大肠'],
            '木': ['肝胆', '筋络', '眼睛'],
            '水': ['肾脏', '膀胱', '耳朵'],
            '火': ['心脏', '小肠', '舌头'],
            '土': ['脾胃', '消化', '口腔']
        };

        return [
            `需要特别注意${healthAdvice[weakest].join('、')}的保养。`,
            yinyang.balance === '阴阳平衡'
                ? '您的阴阳平衡，身体较为健康。'
                : '建议通过适当的运动和休息来调节阴阳平衡。'
        ];
    }

    /**
     * 分析日主强弱
     * @param {Object} bazi - 八字对象
     * @param {Object} wuxingCount - 五行统计结果
     * @returns {Object} 日主强弱分析结果
     */
    analyzeDayMasterStrength(bazi, wuxingCount) {
        const dayGan = bazi.day.tianGan;
        const dayWuxing = TianGan[dayGan].wuxing;
        let strength = 0;

        // 计算日主五行力量
        strength += wuxingCount[dayWuxing];

        // 考虑生助关系
        Object.entries(wuxingCount).forEach(([wuxing, count]) => {
            if (WuXingRelations.生[wuxing] === dayWuxing) {
                strength += count * 0.8; // 被生助加分
            }
            if (WuXingRelations.克[wuxing] === dayWuxing) {
                strength -= count * 0.7; // 被克扣分
            }
        });

        // 考虑季节旺衰
        const season = this.determineSeason(bazi.month.diZhi);
        const seasonalStrength = WuXingSeasonalStrength[season][dayWuxing];
        switch (seasonalStrength) {
            case '旺':
                strength *= 1.2;
                break;
            case '相':
                strength *= 1.1;
                break;
            case '休':
                strength *= 0.9;
                break;
            case '囚':
                strength *= 0.8;
                break;
            case '死':
                strength *= 0.7;
                break;
        }

        // 评估强弱程度
        let level = '';
        if (strength <= this.strengthThreshold.veryWeak) {
            level = '极弱';
        } else if (strength <= this.strengthThreshold.weak) {
            level = '偏弱';
        } else if (strength <= this.strengthThreshold.balanced) {
            level = '中和';
        } else if (strength <= this.strengthThreshold.strong) {
            level = '偏强';
        } else {
            level = '极强';
        }

        return {
            strength: strength,
            level: level,
            description: this.getDayMasterDescription(level)
        };
    }

    /**
     * 分析五行特征
     * @param {Object} wuxingCount - 五行统计结果
     * @returns {Object} 五行分析结果
     */
    analyzeWuXing(wuxingCount) {
        const total = Object.values(wuxingCount).reduce((a, b) => a + b, 0);
        const percentages = {};
        const characteristics = {};

        // 计算百分比和特征
        Object.entries(wuxingCount).forEach(([wuxing, count]) => {
            const percentage = (count / total) * 100;
            percentages[wuxing] = Math.round(percentage);

            if (percentage >= 30) {
                characteristics[wuxing] = '太过';
            } else if (percentage <= 10) {
                characteristics[wuxing] = '不及';
            } else {
                characteristics[wuxing] = '适中';
            }
        });

        return {
            percentages: percentages,
            characteristics: characteristics,
            description: this.getWuXingDescription(characteristics)
        };
    }

    /**
     * 分析十神特征
     * @param {Object} bazi - 八字对象
     * @param {Object} shiShen - 十神计算结果
     * @returns {Object} 十神分析结果
     */
    analyzeShiShen(bazi, shiShen) {
        const analysis = {};
        const dayMasterStrength = this.analyzeDayMasterStrength(bazi, {});

        // 分析每个十神的作用
        Object.entries(shiShen).forEach(([gan, shen]) => {
            const attributes = ShiShenAttributes[shen];
            const preferences = dayMasterStrength.level.includes('弱') ? 
                              ShiShenPreferences['日主弱'] :
                              ShiShenPreferences['日主旺'];

            analysis[gan] = {
                type: shen,
                nature: attributes.nature,
                meaning: attributes.meaning,
                personality: attributes.personality,
                isPreferred: preferences.喜.includes(shen),
                impact: this.getShiShenImpact(shen, dayMasterStrength.level)
            };
        });

        return {
            details: analysis,
            description: this.getShiShenDescription(analysis)
        };
    }

    /**
     * 分析大运
     * @param {Object} bazi - 八字对象
     * @returns {Array} 大运序列
     */
    analyzeDaYun(bazi) {
        const gender = '男'; // 这里需要从输入参数获取
        const monthGan = bazi.month.tianGan;
        const monthZhi = bazi.month.diZhi;
        const ganIndex = this.getTianGanIndex(monthGan);
        const zhiIndex = this.getDiZhiIndex(monthZhi);
        const dayun = [];

        // 根据性别和年月确定大运顺逆
        const forward = (gender === '男' && TianGan[monthGan].yinyang === '阳') ||
                       (gender === '女' && TianGan[monthGan].yinyang === '阴');

        // 计算八个大运
        for (let i = 0; i < 8; i++) {
            const newGanIndex = forward ? 
                (ganIndex + i + 1) % 10 : 
                (ganIndex - i - 1 + 10) % 10;
            const newZhiIndex = forward ? 
                (zhiIndex + i + 1) % 12 : 
                (zhiIndex - i - 1 + 12) % 12;

            dayun.push({
                age: (i + 1) * 10,
                tianGan: this.getTianGanByIndex(newGanIndex),
                diZhi: this.getDiZhiByIndex(newZhiIndex)
            });
        }

        return dayun;
    }

    /**
     * 确定季节
     * @param {string} monthZhi - 月支
     * @returns {string} 季节
     */
    determineSeason(monthZhi) {
        const seasonMap = {
            '寅': '春', '卯': '春', '辰': '春',
            '巳': '夏', '午': '夏', '未': '夏',
            '申': '秋', '酉': '秋', '戌': '秋',
            '亥': '冬', '子': '冬', '丑': '冬'
        };
        return seasonMap[monthZhi];
    }

    /**
     * 获取日主强弱描述
     * @param {string} level - 强弱等级
     * @returns {string} 描述文本
     */
    getDayMasterDescription(level) {
        const descriptions = {
            '极弱': '日主极弱，需要扶助生发，喜见印绶食神。性格温和谦逊，但易优柔寡断。',
            '偏弱': '日主偏弱，需要适当扶助，喜见印绶。性格随和，但主见不足。',
            '中和': '日主中和，喜忌皆可通用。性格平和，处事圆通。',
            '偏强': '日主偏强，需要适当制衡，喜见官杀财星。性格刚毅，但易固执。',
            '极强': '日主极强，需要制衡化泄，喜见官杀。性格强势，易过于刚强。'
        };
        return descriptions[level];
    }

    /**
     * 获取五行特征描述
     * @param {Object} characteristics - 五行特征
     * @returns {string} 描述文本
     */
    getWuXingDescription(characteristics) {
        let description = '五行特征：';
        Object.entries(characteristics).forEach(([wuxing, state]) => {
            const attr = WuXingAttributes[wuxing];
            switch (state) {
                case '太过':
                    description += `${wuxing}过旺，具有${attr.personality}的特质，但易走极端；`;
                    break;
                case '不及':
                    description += `${wuxing}偏弱，缺乏${attr.personality}的特质，需要补充；`;
                    break;
                case '适中':
                    description += `${wuxing}适中，${attr.personality}的特质平衡；`;
                    break;
            }
        });
        return description;
    }

    /**
     * 获取十神作用强度
     * @param {string} shiShen - 十神名称
     * @param {string} dayMasterStrength - 日主强弱
     * @returns {string} 作用描述
     */
    getShiShenImpact(shiShen, dayMasterStrength) {
        if (dayMasterStrength.includes('弱')) {
            return ShiShenPreferences['日主弱'].喜.includes(shiShen) ? 
                   '有利' : '不利';
        } else {
            return ShiShenPreferences['日主旺'].喜.includes(shiShen) ? 
                   '有利' : '不利';
        }
    }

    /**
     * 获取十神分析描述
     * @param {Object} analysis - 十神分析结果
     * @returns {string} 描述文本
     */
    getShiShenDescription(analysis) {
        let description = '命局特征：';
        Object.entries(analysis.details).forEach(([gan, detail]) => {
            description += `${gan}为${detail.type}，${detail.nature}，对命主${detail.impact}；`;
        });
        return description;
    }

    /**
     * 获取天干索引
     * @param {string} gan - 天干
     * @returns {number} 索引
     */
    getTianGanIndex(gan) {
        return ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'].indexOf(gan);
    }

    /**
     * 获取地支索引
     * @param {string} zhi - 地支
     * @returns {number} 索引
     */
    getDiZhiIndex(zhi) {
        return ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'].indexOf(zhi);
    }

    /**
     * 根据索引获取天干
     * @param {number} index - 索引
     * @returns {string} 天干
     */
    getTianGanByIndex(index) {
        const ganList = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
        return ganList[index];
    }

    /**
     * 根据索引获取地支
     * @param {number} index - 索引
     * @returns {string} 地支
     */
    getDiZhiByIndex(index) {
        const zhiList = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
        return zhiList[index];
    }
}

export default BaZiAnalyzer; 