/**
 * 中文语言包
 */
export default {
    // 基础信息
    basic: {
        title: '基础信息',
        year: '年柱',
        month: '月柱',
        day: '日柱',
        hour: '时柱',
        gender: {
            male: '男',
            female: '女'
        }
    },

    // 八字分析
    bazi: {
        title: '八字分析',
        yearPillar: '年柱代表童年时期、人生总体、家庭背景',
        monthPillar: '月柱代表青年时期、事业发展、工作环境',
        dayPillar: '日柱代表成年时期、个人性格、婚姻状况',
        hourPillar: '时柱代表晚年时期、子女、晚景'
    },

    // 五行分析
    wuxing: {
        title: '五行分析',
        elements: {
            metal: '金',
            wood: '木',
            water: '水',
            fire: '火',
            earth: '土'
        },
        states: {
            veryWeak: '极弱',
            weak: '偏弱',
            balanced: '中和',
            strong: '偏强',
            veryStrong: '极强'
        }
    },

    // 十神分析
    shishen: {
        title: '十神分析',
        types: {
            zhengYin: '正印',
            pianYin: '偏印',
            zhengGuan: '正官',
            qiSha: '七杀',
            zhengCai: '正财',
            pianCai: '偏财',
            shiShen: '食神',
            shangGuan: '伤官',
            zhengBi: '正比',
            jieBi: '劫比'
        }
    },

    // 运势分析
    fortune: {
        title: '运势分析',
        sections: {
            career: '事业运势',
            relationship: '感情运势',
            health: '健康运势',
            wealth: '财运分析'
        }
    },

    // 大运流年
    dayun: {
        title: '大运流年',
        age: '年龄',
        period: '大运',
        year: '流年'
    },

    // 运势指导
    guidance: {
        title: '运势指导',
        sections: {
            timing: '时间选择',
            career: '事业发展',
            relationship: '感情建议',
            health: '健康保养'
        }
    },

    // 错误信息
    errors: {
        invalidYear: '年份必须在1900年到2100年之间',
        invalidMonth: '月份必须在1到12之间',
        invalidDay: '日期无效',
        invalidHour: '小时必须在0到23之间',
        invalidGender: '性别必须是男或女',
        missingParam: '缺少必需参数：',
        unsupportedLanguage: '不支持的语言：'
    }
}; 