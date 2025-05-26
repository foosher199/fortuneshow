/**
 * 天干地支理论数据
 * 参考《三命通会》《子平真诠》等经典著作
 */

// 天干属性
export const TianGan = {
    '甲': { wuxing: '木', yinyang: '阳', value: 1 },
    '乙': { wuxing: '木', yinyang: '阴', value: 2 },
    '丙': { wuxing: '火', yinyang: '阳', value: 3 },
    '丁': { wuxing: '火', yinyang: '阴', value: 4 },
    '戊': { wuxing: '土', yinyang: '阳', value: 5 },
    '己': { wuxing: '土', yinyang: '阴', value: 6 },
    '庚': { wuxing: '金', yinyang: '阳', value: 7 },
    '辛': { wuxing: '金', yinyang: '阴', value: 8 },
    '壬': { wuxing: '水', yinyang: '阳', value: 9 },
    '癸': { wuxing: '水', yinyang: '阴', value: 10 }
};

// 地支属性
export const DiZhi = {
    '子': { wuxing: '水', yinyang: '阳', value: 1, hour: 23 },
    '丑': { wuxing: '土', yinyang: '阴', value: 2, hour: 1 },
    '寅': { wuxing: '木', yinyang: '阳', value: 3, hour: 3 },
    '卯': { wuxing: '木', yinyang: '阴', value: 4, hour: 5 },
    '辰': { wuxing: '土', yinyang: '阳', value: 5, hour: 7 },
    '巳': { wuxing: '火', yinyang: '阴', value: 6, hour: 9 },
    '午': { wuxing: '火', yinyang: '阳', value: 7, hour: 11 },
    '未': { wuxing: '土', yinyang: '阴', value: 8, hour: 13 },
    '申': { wuxing: '金', yinyang: '阳', value: 9, hour: 15 },
    '酉': { wuxing: '金', yinyang: '阴', value: 10, hour: 17 },
    '戌': { wuxing: '土', yinyang: '阳', value: 11, hour: 19 },
    '亥': { wuxing: '水', yinyang: '阴', value: 12, hour: 21 }
};

// 干支关系
export const GanZhiRelations = {
    // 六合
    六合: {
        '甲': '己',
        '乙': '庚',
        '丙': '辛',
        '丁': '壬',
        '戊': '癸'
    },
    // 三合
    三合: {
        '寅卯辰': '木',
        '巳午未': '火',
        '申酉戌': '金',
        '亥子丑': '水'
    },
    // 六冲
    六冲: [
        ['子', '午'],
        ['丑', '未'],
        ['寅', '申'],
        ['卯', '酉'],
        ['辰', '戌'],
        ['巳', '亥']
    ],
    // 相刑
    相刑: {
        '寅': '巳',
        '巳': '申',
        '申': '寅',
        '丑': '戌',
        '戌': '未',
        '未': '丑',
        '子': '卯',
        '卯': '子',
        '辰': '辰',
        '午': '午',
        '酉': '酉',
        '亥': '亥'
    }
}; 