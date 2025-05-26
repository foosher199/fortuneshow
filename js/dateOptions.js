// 生成年份选项（1900-2100）
export function generateYearOptions() {
    const startYear = 1900;
    const endYear = 2100;
    const years = [];
    
    for (let year = startYear; year <= endYear; year++) {
        years.push({
            value: year,
            text: `${year}年`
        });
    }
    
    return years;
}

// 生成月份选项（1-12）
export function generateMonthOptions() {
    const months = [];
    
    for (let month = 1; month <= 12; month++) {
        months.push({
            value: month,
            text: `${month}月`
        });
    }
    
    return months;
}

// 生成日期选项（1-31，根据年月动态调整）
export function generateDayOptions(year, month) {
    const days = [];
    let daysInMonth = 31;
    
    if (month === 2) {
        // 处理闰年
        daysInMonth = ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) ? 29 : 28;
    } else if ([4, 6, 9, 11].includes(month)) {
        daysInMonth = 30;
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
        days.push({
            value: day,
            text: `${day}日`
        });
    }
    
    return days;
}

// 生成时辰选项（子时到亥时，24小时制对应）
export function generateHourOptions() {
    const hours = [
        { value: "23,0", text: "子时 (23:00-01:00)", label: "子" },
        { value: "1,2", text: "丑时 (01:00-03:00)", label: "丑" },
        { value: "3,4", text: "寅时 (03:00-05:00)", label: "寅" },
        { value: "5,6", text: "卯时 (05:00-07:00)", label: "卯" },
        { value: "7,8", text: "辰时 (07:00-09:00)", label: "辰" },
        { value: "9,10", text: "巳时 (09:00-11:00)", label: "巳" },
        { value: "11,12", text: "午时 (11:00-13:00)", label: "午" },
        { value: "13,14", text: "未时 (13:00-15:00)", label: "未" },
        { value: "15,16", text: "申时 (15:00-17:00)", label: "申" },
        { value: "17,18", text: "酉时 (17:00-19:00)", label: "酉" },
        { value: "19,20", text: "戌时 (19:00-21:00)", label: "戌" },
        { value: "21,22", text: "亥时 (21:00-23:00)", label: "亥" }
    ];
    
    return hours;
} 