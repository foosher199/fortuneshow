/**
 * 日本語言語パック
 */
export default {
    // 基本情報
    basic: {
        title: '基本情報',
        year: '年柱',
        month: '月柱',
        day: '日柱',
        hour: '時柱',
        gender: {
            male: '男性',
            female: '女性'
        }
    },

    // 八字分析
    bazi: {
        title: '八字分析',
        yearPillar: '年柱は幼年期、人生全般、家庭背景を表します',
        monthPillar: '月柱は青年期、キャリア発展、職場環境を表します',
        dayPillar: '日柱は成年期、個性、結婚状況を表します',
        hourPillar: '時柱は晩年期、子供、老後を表します'
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
            veryWeak: '極弱',
            weak: '弱い',
            balanced: '調和',
            strong: '強い',
            veryStrong: '極強'
        }
    },

    // 十神分析
    shishen: {
        title: '十神分析',
        types: {
            zhengYin: '正印',
            pianYin: '偏印',
            zhengGuan: '正官',
            qiSha: '七殺',
            zhengCai: '正財',
            pianCai: '偏財',
            shiShen: '食神',
            shangGuan: '傷官',
            zhengBi: '比肩',
            jieBi: '劫財'
        }
    },

    // 運勢分析
    fortune: {
        title: '運勢分析',
        sections: {
            career: '仕事運',
            relationship: '恋愛運',
            health: '健康運',
            wealth: '金運分析'
        }
    },

    // 大運流年
    dayun: {
        title: '大運流年',
        age: '年齢',
        period: '大運',
        year: '流年'
    },

    // 運勢指導
    guidance: {
        title: '運勢指導',
        sections: {
            timing: '時期選択',
            career: 'キャリア発展',
            relationship: '恋愛アドバイス',
            health: '健康管理'
        }
    },

    // エラーメッセージ
    errors: {
        invalidYear: '年は1900年から2100年の間で指定してください',
        invalidMonth: '月は1から12の間で指定してください',
        invalidDay: '無効な日付です',
        invalidHour: '時間は0から23の間で指定してください',
        invalidGender: '性別は男性または女性を指定してください',
        missingParam: '必須パラメータが不足しています：',
        unsupportedLanguage: '未対応の言語：'
    }
}; 