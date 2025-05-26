/**
 * 全局配置文件
 * 包含所有常量和配置项
 */

export const CONFIG = {
    // 时辰配置
    HOURS: [
        { value: 23, name: '子时', range: '23:00-01:00' },
        { value: 1, name: '丑时', range: '01:00-03:00' },
        { value: 3, name: '寅时', range: '03:00-05:00' },
        { value: 5, name: '卯时', range: '05:00-07:00' },
        { value: 7, name: '辰时', range: '07:00-09:00' },
        { value: 9, name: '巳时', range: '09:00-11:00' },
        { value: 11, name: '午时', range: '11:00-13:00' },
        { value: 13, name: '未时', range: '13:00-15:00' },
        { value: 15, name: '申时', range: '15:00-17:00' },
        { value: 17, name: '酉时', range: '17:00-19:00' },
        { value: 19, name: '戌时', range: '19:00-21:00' },
        { value: 21, name: '亥时', range: '21:00-23:00' }
    ],

    // 年份范围
    YEAR: {
        MIN: 1900,
        MAX: new Date().getFullYear()
    },

    // 语言配置
    LANGUAGE: {
        DEFAULT: 'zh',
        SUPPORTED: ['zh', 'en', 'ja', 'ko']
    },

    // 本地存储键名
    STORAGE_KEYS: {
        LANGUAGE: 'bazi_language',
        LAST_ANALYSIS: 'bazi_last_analysis'
    },

    // 错误消息
    ERRORS: {
        INVALID_YEAR: '请输入有效的年份',
        INVALID_MONTH: '请输入有效的月份',
        INVALID_DAY: '请输入有效的日期',
        INVALID_HOUR: '请输入有效的时辰',
        INVALID_GENDER: '请选择性别',
        UNKNOWN_ERROR: '发生未知错误，请稍后重试'
    }
}; 