/**
 * 农历与节气理论数据
 * 参考《三命通会》《子平真诠》等经典著作
 */

// 二十四节气
export const SolarTerms = {
    '立春': { month: 2, day: 4 },
    '雨水': { month: 2, day: 19 },
    '惊蛰': { month: 3, day: 6 },
    '春分': { month: 3, day: 21 },
    '清明': { month: 4, day: 5 },
    '谷雨': { month: 4, day: 20 },
    '立夏': { month: 5, day: 6 },
    '小满': { month: 5, day: 21 },
    '芒种': { month: 6, day: 6 },
    '夏至': { month: 6, day: 21 },
    '小暑': { month: 7, day: 7 },
    '大暑': { month: 7, day: 23 },
    '立秋': { month: 8, day: 8 },
    '处暑': { month: 8, day: 23 },
    '白露': { month: 9, day: 8 },
    '秋分': { month: 9, day: 23 },
    '寒露': { month: 10, day: 8 },
    '霜降': { month: 10, day: 24 },
    '立冬': { month: 11, day: 8 },
    '小雪': { month: 11, day: 22 },
    '大雪': { month: 12, day: 7 },
    '冬至': { month: 12, day: 22 },
    '小寒': { month: 1, day: 6 },
    '大寒': { month: 1, day: 20 }
};

// 节气对应的干支
export const SolarTermGanZhi = {
    '立春': { gan: '戊', zhi: '寅' },
    '惊蛰': { gan: '庚', zhi: '寅' },
    '清明': { gan: '壬', zhi: '寅' },
    '立夏': { gan: '甲', zhi: '巳' },
    '芒种': { gan: '丙', zhi: '巳' },
    '小暑': { gan: '戊', zhi: '巳' },
    '立秋': { gan: '庚', zhi: '申' },
    '白露': { gan: '壬', zhi: '申' },
    '寒露': { gan: '甲', zhi: '申' },
    '立冬': { gan: '丙', zhi: '亥' },
    '大雪': { gan: '戊', zhi: '亥' },
    '小寒': { gan: '庚', zhi: '亥' }
};

// 农历月份
export const LunarMonths = {
    '正月': { wuxing: '木', season: '春' },
    '二月': { wuxing: '木', season: '春' },
    '三月': { wuxing: '木', season: '春' },
    '四月': { wuxing: '火', season: '夏' },
    '五月': { wuxing: '火', season: '夏' },
    '六月': { wuxing: '火', season: '夏' },
    '七月': { wuxing: '金', season: '秋' },
    '八月': { wuxing: '金', season: '秋' },
    '九月': { wuxing: '金', season: '秋' },
    '十月': { wuxing: '水', season: '冬' },
    '冬月': { wuxing: '水', season: '冬' },
    '腊月': { wuxing: '水', season: '冬' }
};

// 节气计算规则
export const SolarTermRules = {
    // 节气与公历日期对应规则
    '计算规则': {
        '春分': '春分点太阳到达黄经0°',
        '夏至': '夏至点太阳到达黄经90°',
        '秋分': '秋分点太阳到达黄经180°',
        '冬至': '冬至点太阳到达黄经270°'
    },
    // 节气平气差
    '平气差': {
        '春分': 0,
        '清明': 15,
        '谷雨': 30,
        '立夏': 45,
        '小满': 60,
        '芒种': 75,
        '夏至': 90,
        '小暑': 105,
        '大暑': 120,
        '立秋': 135,
        '处暑': 150,
        '白露': 165,
        '秋分': 180,
        '寒露': 195,
        '霜降': 210,
        '立冬': 225,
        '小雪': 240,
        '大雪': 255,
        '冬至': 270,
        '小寒': 285,
        '大寒': 300,
        '立春': 315,
        '雨水': 330,
        '惊蛰': 345
    }
}; 