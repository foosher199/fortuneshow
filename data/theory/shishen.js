/**
 * 十神理论数据
 * 参考《三命通会》《子平真诠》等经典著作
 */

// 十神属性
export const ShiShenAttributes = {
    '正印': {
        nature: '权威、贵人',
        meaning: '学习、智慧、权威',
        personality: '稳重、有涵养',
        career: ['教育', '行政', '管理'],
        relationships: '长辈、师长'
    },
    '偏印': {
        nature: '清高、孤傲',
        meaning: '艺术、才华、个性',
        personality: '清高、独特',
        career: ['艺术', '设计', '创作'],
        relationships: '长辈、异性'
    },
    '正官': {
        nature: '正统、规范',
        meaning: '权力、地位、规矩',
        personality: '正直、严谨',
        career: ['政府', '军警', '法律'],
        relationships: '上司、长官'
    },
    '七杀': {
        nature: '威严、强势',
        meaning: '权力、竞争、破坏',
        personality: '果断、霸气',
        career: ['军事', '竞技', '创业'],
        relationships: '对手、竞争者'
    },
    '正财': {
        nature: '正当、稳定',
        meaning: '财富、收入、正财',
        personality: '务实、稳健',
        career: ['金融', '商业', '管理'],
        relationships: '配偶、正室'
    },
    '偏财': {
        nature: '活跃、机动',
        meaning: '偏财、机遇、投机',
        personality: '灵活、善变',
        career: ['投资', '销售', '创业'],
        relationships: '情人、异性'
    },
    '食神': {
        nature: '温和、愉悦',
        meaning: '才艺、表现、享受',
        personality: '开朗、乐观',
        career: ['餐饮', '艺术', '服务'],
        relationships: '朋友、同好'
    },
    '伤官': {
        nature: '叛逆、创新',
        meaning: '创新、变革、破旧',
        personality: '聪明、叛逆',
        career: ['创新', '研发', '改革'],
        relationships: '下属、学生'
    },
    '正比': {
        nature: '平等、合作',
        meaning: '同级、帮助、合作',
        personality: '平和、友善',
        career: ['合作', '协调', '服务'],
        relationships: '同辈、朋友'
    },
    '劫比': {
        nature: '竞争、冲突',
        meaning: '竞争、争斗、破坏',
        personality: '好强、争胜',
        career: ['竞争', '运动', '销售'],
        relationships: '兄弟、竞争者'
    }
};

// 十神关系
export const ShiShenRelations = {
    '生': {
        '正印': ['食神', '伤官'],
        '偏印': ['食神', '伤官'],
        '正官': ['正财', '偏财'],
        '七杀': ['正财', '偏财'],
        '正财': ['正印', '偏印'],
        '偏财': ['正印', '偏印'],
        '食神': ['正官', '七杀'],
        '伤官': ['正官', '七杀'],
        '正比': ['正比', '劫比'],
        '劫比': ['正比', '劫比']
    },
    '克': {
        '正印': ['正官', '七杀'],
        '偏印': ['正官', '七杀'],
        '正官': ['正财', '偏财'],
        '七杀': ['正财', '偏财'],
        '正财': ['食神', '伤官'],
        '偏财': ['食神', '伤官'],
        '食神': ['正印', '偏印'],
        '伤官': ['正印', '偏印'],
        '正比': ['正比', '劫比'],
        '劫比': ['正比', '劫比']
    }
};

// 十神喜忌
export const ShiShenPreferences = {
    '日主弱': {
        '喜': ['正印', '偏印', '食神', '正比'],
        '忌': ['正官', '七杀', '正财', '偏财']
    },
    '日主旺': {
        '喜': ['正官', '七杀', '正财', '偏财'],
        '忌': ['正印', '偏印', '食神', '伤官']
    }
}; 