// 天干
const TIAN_GAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
// 地支
const DI_ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
// 五行
const WU_XING = ['金', '木', '水', '火', '土'];
// 阴阳
const YIN_YANG = ['阳', '阴'];

// 天干对应五行
const GAN_TO_WUXING = {
    '甲': '木', '乙': '木',
    '丙': '火', '丁': '火',
    '戊': '土', '己': '土',
    '庚': '金', '辛': '金',
    '壬': '水', '癸': '水'
};

// 地支对应五行
const ZHI_TO_WUXING = {
    '子': '水', '丑': '土', '寅': '木', '卯': '木',
    '辰': '土', '巳': '火', '午': '火', '未': '土',
    '申': '金', '酉': '金', '戌': '土', '亥': '水'
};

// 计算年干支
function getYearGanZhi(year) {
    const offset = (year - 4) % 60;
    const gan = TIAN_GAN[offset % 10];
    const zhi = DI_ZHI[offset % 12];
    return { gan, zhi };
}

// 计算月干支
function getMonthGanZhi(year, month) {
    const { gan: yearGan } = getYearGanZhi(year);
    const baseIndex = TIAN_GAN.indexOf(yearGan);
    const monthGanIndex = (baseIndex * 2 + month + 1) % 10;
    const monthZhiIndex = (month + 1) % 12;
    
    return {
        gan: TIAN_GAN[monthGanIndex],
        zhi: DI_ZHI[monthZhiIndex]
    };
}

// 计算日干支
function getDayGanZhi(year, month, day) {
    // 这里使用简化算法，实际应该使用农历计算
    const base = new Date(1900, 0, 31);
    const current = new Date(year, month - 1, day);
    const offset = Math.floor((current - base) / (24 * 60 * 60 * 1000));
    
    const gan = TIAN_GAN[offset % 10];
    const zhi = DI_ZHI[offset % 12];
    
    return { gan, zhi };
}

// 计算时干支
function getHourGanZhi(dayGan, hour) {
    const baseIndex = TIAN_GAN.indexOf(dayGan);
    const hourGanIndex = (baseIndex * 2 + hour) % 10;
    return {
        gan: TIAN_GAN[hourGanIndex],
        zhi: DI_ZHI[hour]
    };
}

// 计算五行属性
function calculateWuxing(ganZhi) {
    const wuxingCount = {
        '金': 0, '木': 0, '水': 0, '火': 0, '土': 0
    };

    // 统计天干五行
    Object.values(ganZhi).forEach(gz => {
        wuxingCount[GAN_TO_WUXING[gz.gan]]++;
        wuxingCount[ZHI_TO_WUXING[gz.zhi]]++;
    });

    return wuxingCount;
}

// 计算阴阳属性
function calculateYinYang(ganZhi) {
    let yinCount = 0;
    let yangCount = 0;

    Object.values(ganZhi).forEach(gz => {
        // 天干阴阳
        if (TIAN_GAN.indexOf(gz.gan) % 2 === 0) {
            yangCount++;
        } else {
            yinCount++;
        }
        // 地支阴阳
        if (DI_ZHI.indexOf(gz.zhi) % 2 === 0) {
            yangCount++;
        } else {
            yinCount++;
        }
    });

    return { yin: yinCount, yang: yangCount };
}

// 计算八卦
function calculateBagua(ganZhi) {
    // 简化版八卦计算，实际应该基于更复杂的规则
    const baGuaIndex = (
        TIAN_GAN.indexOf(ganZhi.year.gan) +
        DI_ZHI.indexOf(ganZhi.year.zhi) +
        TIAN_GAN.indexOf(ganZhi.day.gan)
    ) % 8;

    const baGua = ['乾', '兑', '离', '震', '巽', '坎', '艮', '坤'];
    return baGua[baGuaIndex];
}

// 主计算函数
function calculateBaZi(birthData) {
    const { year, month, day, hour } = birthData;

    // 计算四柱
    const yearGanZhi = getYearGanZhi(year);
    const monthGanZhi = getMonthGanZhi(year, month);
    const dayGanZhi = getDayGanZhi(year, month, day);
    const hourGanZhi = getHourGanZhi(dayGanZhi.gan, hour);

    const ganZhi = {
        year: yearGanZhi,
        month: monthGanZhi,
        day: dayGanZhi,
        hour: hourGanZhi
    };

    // 计算五行
    const wuxing = calculateWuxing(ganZhi);

    // 计算阴阳
    const yinyang = calculateYinYang(ganZhi);

    // 计算八卦
    const bagua = calculateBagua(ganZhi);

    return {
        yearGan: yearGanZhi.gan,
        yearZhi: yearGanZhi.zhi,
        monthGan: monthGanZhi.gan,
        monthZhi: monthGanZhi.zhi,
        dayGan: dayGanZhi.gan,
        dayZhi: dayGanZhi.zhi,
        hourGan: hourGanZhi.gan,
        hourZhi: hourGanZhi.zhi,
        wuxing,
        yinyang,
        bagua
    };
} 