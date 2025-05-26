// i18n configuration
window.i18n = {
    zh: {
        current_language: '中文',
        title: '八字命理分析',
        subtitle: '探索命理，寻找人生方向',
        birthdate_label: '出生日期时间',
        gender_label: '性别',
        gender_select: '请选择性别',
        gender_male: '男',
        gender_female: '女',
        analyze_btn: '开始分析',
        reset_btn: '重新填写',
        result_title: '八字分析结果',
        birth_time: '出生信息',
        year_label: '年',
        month_label: '月',
        day_label: '日',
        hour_label: '时',
        gender_result_male: '男性',
        gender_result_female: '女性',
        bazi_title: '八字',
        year_pillar: '年柱',
        month_pillar: '月柱',
        day_pillar: '日柱',
        hour_pillar: '时柱',
        five_elements: '五行分析',
        current_fortune: '今年运势',
        ten_years: '未来十年运势',
        overall: '总运',
        career: '事业',
        relationship: '感情',
        health: '健康运',
        wealth: '财运',
        validation_date: '请选择1900年至2100年之间的日期',
        validation_gender: '请选择性别',
        element_metal: '金',
        element_wood: '木',
        element_water: '水',
        element_fire: '火',
        element_earth: '土',
        element_status_excess: '太过',
        element_status_strong: '旺盛',
        element_status_balanced: '平衡',
        element_status_weak: '偏弱',
        element_status_missing: '缺失',
        fortune_analysis: '运势分析',
        personality_analysis: '性格分析',
        career_analysis: '事业分析',
        relationship_analysis: '人际分析',
        yearly_highlights: '年度重点',
        seasonal_advice: '季节建议',
        spring: '春季',
        summer: '夏季',
        autumn: '秋季',
        winter: '冬季',
        nayin_title: '纳音五行',
        nayin_descriptions: {
            // 甲子甲戌 海中金
            '海中金': '深沉内敛，具有深厚积累和潜在价值',
            // 乙丑乙亥 大溪水
            '大溪水': '源远流长，具有深远影响和持续力',
            // 丙寅丙子 炉中火
            '炉中火': '温暖明亮，具有亲和力和感染力',
            // 丁卯丁丑 大林木
            '大林木': '高大茂盛，具有领袖气质和影响力',
            // 戊辰戊寅 路旁土
            '路旁土': '平实稳健，具有务实性和适应力',
            // 己巳己卯 剑锋金
            '剑锋金': '锐利果断，具有决断力和进取心',
            // 庚午庚辰 山头火
            '山头火': '光明显耀，具有领导力和影响力',
            // 辛未辛巳 涧下水
            '涧下水': '清澈灵动，具有智慧和洞察力',
            // 壬申壬午 天上火
            '天上火': '光明正大，具有威严和号召力',
            // 癸酉癸未 石榴木
            '石榴木': '艳丽多产，具有创造力和繁荣象征',
            // 甲戌甲申 大海水
            '大海水': '宽广深邃，具有包容性和智慧',
            // 乙亥乙酉 钗钏金
            '钗钏金': '精致华美，具有艺术气质和创造力',
            // 丙子丙戌 屋上土
            '屋上土': '稳固可靠，具有保护性和责任感',
            // 丁丑丁亥 霹雳火
            '霹雳火': '迅猛果决，具有爆发力和创造力',
            // 戊寅戊子 松柏木
            '松柏木': '挺拔坚韧，具有坚毅品格和持久力',
            // 己卯己丑 长流水
            '长流水': '绵延不绝，具有持久力和韧性',
            // 庚辰庚寅 砂中金
            '砂中金': '细腻坚韧，具有内在价值和耐性',
            // 辛巳辛卯 山下火
            '山下火': '蕴含力量，具有潜在爆发力和耐心',
            // 壬午壬辰 平地木
            '平地木': '朴实无华，具有稳健性和发展力',
            // 癸未癸巳 壁上土
            '壁上土': '厚重沉稳，具有包容性和稳定性',
            // 甲申甲午 泉中水
            '泉中水': '清澈纯净，具有生机和滋养力',
            // 乙酉乙未 白蜡金
            '白蜡金': '明亮纯净，具有高洁品质和坚韧性',
            // 丙戌丙申 杨柳木
            '杨柳木': '柔韧灵活，具有适应性和创新力',
            // 丁亥丁酉 井泉水
            '井泉水': '静深清澈，具有滋养力和持久性',
            // 戊子戊戌 房上土
            '房上土': '坚实可靠，具有保护性和承载力',
            // 己丑己亥 佛灯火
            '佛灯火': '温和持久，具有智慧和耐心',
            // 庚寅庚子 金箔金
            '金箔金': '光亮华丽，具有表现力和适应性',
            // 辛卯辛丑 天河水
            '天河水': '浩瀚壮阔，具有远见和胸怀',
            // 壬辰壬寅 桑柘木
            '桑柘木': '生机勃勃，具有成长性和包容力',
            // 癸巳癸卯 城墙土
            '城墙土': '坚固稳重，具有防御力和保护性',
            // 戊申戊午 江河水
            '江河水': '奔流不息，具有进取心和冲劲',
            // 添加缺失的描述
            '城头土': '高耸坚固，具有威严和防护力',
            '大驿土': '广厚包容，具有承载力和服务精神',
            '大溪水': '源远流长，具有深远影响和持续力'
        },
        sixty_jiazi_title: '六十甲子',
        cycle_label: '第%d轮甲子',
        position_label: '第%d位',
        gods_title: '神煞分析',
        year_god_label: '年神',
        month_god_label: '月神',
        lucky_unlucky_title: '吉神凶煞',
        lucky_gods: '吉神',
        unlucky_gods: '凶煞',
        recommendations: '开运建议',
        element_recommendations: '五行调节建议',
        lifestyle_recommendations: '生活起居建议',
        career_recommendations: '事业发展建议',
        relationship_recommendations: '感情建议',
        health_recommendations: '健康建议',
        
        // 新增的常量
        normal_fortune: '普通',
        normal_fortune_desc: '运势平稳',
        safe_fortune: '平安',
        safe_fortune_desc: '无特殊凶煞',
        unknown_element: '未知五行',
        unknown_pillar: '未知',

        // 神煞系统
        gods: {
            // 吉神
            tian_de: {
                name: '天德',
                description: '主吉利，逢凶化吉，遇难呈祥'
            },
            yue_de: {
                name: '月德',
                description: '主贵人相助，事业顺遂'
            },
            tian_yi: {
                name: '天医',
                description: '主健康，疾病易愈'
            },
            fu_xing: {
                name: '福星',
                description: '主福禄，诸事顺遂'
            },
            ji_shen: {
                name: '吉神',
                description: '主吉祥如意，诸事大利'
            },
            
            // 凶煞
            jie_sha: {
                name: '劫煞',
                description: '主突发事件，意外损失'
            },
            zai_sha: {
                name: '灾煞',
                description: '主灾祸，需谨慎行事'
            },
            sui_sha: {
                name: '岁煞',
                description: '主年运不顺，诸事阻滞'
            },
            fu_shi: {
                name: '伏尸',
                description: '主阴暗事物，健康不佳'
            },
            xue_ren: {
                name: '血刃',
                description: '主意外伤害，血光之灾'
            }
        }
    },
    en: {
        current_language: 'English',
        title: 'BaZi Destiny Analysis',
        subtitle: 'Explore Your Destiny Path',
        birthdate_label: 'Birth Date and Time',
        gender_label: 'Gender',
        gender_select: 'Select Gender',
        gender_male: 'Male',
        gender_female: 'Female',
        analyze_btn: 'Analyze',
        reset_btn: 'Reset',
        result_title: 'BaZi Analysis Result',
        birth_time: 'Birth Information',
        year_label: 'Year',
        month_label: 'Month',
        day_label: 'Day',
        hour_label: 'Hour',
        gender_result_male: 'Male',
        gender_result_female: 'Female',
        bazi_title: 'BaZi',
        year_pillar: 'Year Pillar',
        month_pillar: 'Month Pillar',
        day_pillar: 'Day Pillar',
        hour_pillar: 'Hour Pillar',
        five_elements: 'Five Elements Analysis',
        current_fortune: 'Current Year Fortune',
        ten_years: 'Next Ten Years Fortune',
        overall: 'Overall',
        career: 'Career',
        relationship: 'Relationship',
        health: 'Health',
        wealth: 'Wealth',
        validation_date: 'Please select a date between 1900 and 2100',
        validation_gender: 'Please select your gender',
        element_metal: 'Metal',
        element_wood: 'Wood',
        element_water: 'Water',
        element_fire: 'Fire',
        element_earth: 'Earth',
        element_status_excess: 'Excess',
        element_status_strong: 'Strong',
        element_status_balanced: 'Balanced',
        element_status_weak: 'Weak',
        element_status_missing: 'Missing',
        fortune_analysis: 'Fortune Analysis',
        personality_analysis: 'Personality Analysis',
        career_analysis: 'Career Analysis',
        relationship_analysis: 'Relationship Analysis',
        yearly_highlights: 'Yearly Highlights',
        seasonal_advice: 'Seasonal Advice',
        spring: 'Spring',
        summer: 'Summer',
        autumn: 'Autumn',
        winter: 'Winter',
        nayin_title: 'NaYin Five Elements',
        nayin_descriptions: {
            // JiaZi JiaXu - Ocean Metal
            '海中金': 'Ocean Metal - Deep and reserved, with accumulated value and potential',
            // YiChou YiHai - Valley Water
            '大溪水': 'Valley Water - Far-reaching and enduring, with lasting influence',
            // BingYin BingZi - Stove Fire
            '炉中火': 'Stove Fire - Warm and bright, with affinity and influence',
            // DingMao DingChou - Forest Wood
            '大林木': 'Forest Wood - Magnificent and prosperous, with leadership and influence',
            // WuChen WuYin - Roadside Earth
            '路旁土': 'Roadside Earth - Plain and steady, with practicality and adaptability',
            // JiSi JiMao - Sword Metal
            '剑锋金': 'Sword Metal - Sharp and decisive, with determination and ambition',
            // GengWu GengChen - Mountain Fire
            '山头火': 'Mountain Fire - Bright and prominent, with leadership and impact',
            // XinWei XinSi - Valley Stream Water
            '涧下水': 'Valley Stream Water - Clear and agile, with wisdom and insight',
            // RenShen RenWu - Sky Fire
            '天上火': 'Sky Fire - Righteous and grand, with authority and influence',
            // GuiYou GuiWei - Pomegranate Wood
            '石榴木': 'Pomegranate Wood - Beautiful and productive, with creativity and prosperity',
            // JiaXu JiaShen - Ocean Water
            '大海水': 'Ocean Water - Vast and profound, with inclusiveness and wisdom',
            // YiHai YiYou - Hairpin Metal
            '钗钏金': 'Hairpin Metal - Delicate and beautiful, with artistic quality and creativity',
            // BingZi BingXu - Roof Earth
            '屋上土': 'Roof Earth - Reliable and stable, with protection and responsibility',
            // DingChou DingHai - Thunder Fire
            '霹雳火': 'Thunder Fire - Swift and decisive, with explosive power and creativity',
            // WuYin WuZi - Pine Wood
            '松柏木': 'Pine Wood - Tall and resilient, with perseverance and endurance',
            // JiMao JiChou - Long Stream Water
            '长流水': 'Long Stream Water - Continuous and persistent, with endurance and tenacity',
            // GengChen GengYin - Sand Metal
            '砂中金': 'Sand Metal - Fine and tough, with inner value and patience',
            // XinSi XinMao - Mountain Base Fire
            '山下火': 'Mountain Base Fire - Contained power, with potential energy and patience',
            // RenWu RenChen - Ground Wood
            '平地木': 'Ground Wood - Plain and steady, with stability and development potential',
            // GuiWei GuiSi - Wall Earth
            '壁上土': 'Wall Earth - Stable and inclusive, with steadiness and tolerance',
            // JiaShen JiaWu - Spring Water
            '泉中水': 'Spring Water - Pure and clear, with vitality and nourishment',
            // YiYou YiWei - White Wax Metal
            '白蜡金': 'White Wax Metal - Pure and bright, with nobility and tenacity',
            // BingXu BingShen - Willow Wood
            '杨柳木': 'Willow Wood - Flexible and adaptable, with innovation and creativity',
            // DingHai DingYou - Well Water
            '井泉水': 'Well Water - Deep and clear, with nourishment and persistence',
            // WuZi WuXu - House Earth
            '房上土': 'House Earth - Solid and reliable, with protection and support',
            // JiChou JiHai - Lamp Fire
            '佛灯火': 'Lamp Fire - Gentle and lasting, with wisdom and patience',
            // GengYin GengZi - Gold Foil Metal
            '金箔金': 'Gold Foil Metal - Bright and gorgeous, with expressiveness and adaptability',
            // XinMao XinChou - Sky River Water
            '天河水': 'Sky River Water - Magnificent and broad, with vision and generosity',
            // RenChen RenYin - Mulberry Wood
            '桑柘木': 'Mulberry Wood - Vigorous and growing, with inclusiveness and potential',
            // GuiSi GuiMao - City Wall Earth
            '城墙土': 'City Wall Earth - Solid and steady, with defense and protection',
            // WuShen WuWu - River Water
            '江河水': 'River Water - Flowing and dynamic, with ambition and drive',
            // Add missing descriptions
            '城头土': 'City Wall Earth - Towering and solid, with authority and protection',
            '大驿土': 'Post Station Earth - Broad and inclusive, with capacity and service spirit',
            '大溪水': 'Valley Water - Far-reaching and enduring, with lasting influence'
        },
        sixty_jiazi_title: 'Sixty Jiazi Cycle',
        cycle_label: 'Cycle %d',
        position_label: 'Position %d',
        gods_title: 'Gods Analysis',
        year_god_label: 'Year God',
        month_god_label: 'Month God',
        lucky_unlucky_title: 'Lucky & Unlucky Gods',
        lucky_gods: 'Lucky Gods',
        unlucky_gods: 'Unlucky Gods',
        recommendations: 'Recommendations',
        element_recommendations: 'Element Balance Suggestions',
        lifestyle_recommendations: 'Lifestyle Suggestions',
        career_recommendations: 'Career Development Advice',
        relationship_recommendations: 'Relationship Advice',
        health_recommendations: 'Health Suggestions',

        // 新增的常量
        normal_fortune: 'Normal',
        normal_fortune_desc: 'Normal fortune',
        safe_fortune: 'Safe',
        safe_fortune_desc: 'No particular adversity',
        unknown_element: 'Unknown Element',
        unknown_pillar: 'Unknown',

        // Gods System
        gods: {
            // Lucky Gods
            tian_de: {
                name: 'Heavenly Virtue Star',
                description: 'brings good fortune, transforms bad luck into good'
            },
            yue_de: {
                name: 'Monthly Virtue Star',
                description: 'brings help from noble people, career success'
            },
            tian_yi: {
                name: 'Heavenly Doctor Star',
                description: 'brings good health, easy recovery from illness'
            },
            fu_xing: {
                name: 'Lucky Star',
                description: 'brings blessings and success in all endeavors'
            },
            ji_shen: {
                name: 'Auspicious Star',
                description: 'brings good luck and great benefits'
            },
            
            // Evil Stars
            jie_sha: {
                name: 'Robbery Evil Star',
                description: 'brings sudden events and unexpected losses'
            },
            zai_sha: {
                name: 'Disaster Evil Star',
                description: 'brings calamities, need to act cautiously'
            },
            sui_sha: {
                name: 'Annual Evil Star',
                description: 'brings obstacles and difficulties throughout the year'
            },
            fu_shi: {
                name: 'Hidden Corpse Star',
                description: 'brings darkness and poor health'
            },
            xue_ren: {
                name: 'Blood Blade Star',
                description: 'brings accidents and injuries'
            }
        }
    }
};