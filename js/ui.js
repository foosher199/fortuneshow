document.addEventListener('DOMContentLoaded', function() {
    // 获取表单元素
    const birthForm = document.getElementById('birthForm');
    const yearSelect = document.getElementById('birthYear');
    const monthSelect = document.getElementById('birthMonth');
    const daySelect = document.getElementById('birthDay');
    const hourSelect = document.getElementById('birthHour');
    const resultSection = document.querySelector('.result-section');

    // 初始化年份选择（1900-2024）
    for (let year = 2024; year >= 1900; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year + '年';
        yearSelect.appendChild(option);
    }

    // 初始化月份选择
    for (let month = 1; month <= 12; month++) {
        const option = document.createElement('option');
        option.value = month;
        option.textContent = month + '月';
        monthSelect.appendChild(option);
    }

    // 初始化时辰选择
    const dizhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
    const timeRanges = [
        '23:00-1:00', '1:00-3:00', '3:00-5:00', '5:00-7:00',
        '7:00-9:00', '9:00-11:00', '11:00-13:00', '13:00-15:00',
        '15:00-17:00', '17:00-19:00', '19:00-21:00', '21:00-23:00'
    ];

    dizhi.forEach((dz, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${dz}时 (${timeRanges[index]})`;
        hourSelect.appendChild(option);
    });

    // 更新日期选择
    function updateDays() {
        const year = parseInt(yearSelect.value);
        const month = parseInt(monthSelect.value);
        const daysInMonth = new Date(year, month, 0).getDate();

        // 清空现有的日期选项
        daySelect.innerHTML = '';

        // 添加新的日期选项
        for (let day = 1; day <= daysInMonth; day++) {
            const option = document.createElement('option');
            option.value = day;
            option.textContent = day + '日';
            daySelect.appendChild(option);
        }
    }

    // 监听年月变化以更新日期选项
    yearSelect.addEventListener('change', updateDays);
    monthSelect.addEventListener('change', updateDays);

    // 初始化日期选择
    updateDays();

    // 处理表单提交
    birthForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 获取选择的值
        const birthData = {
            year: parseInt(yearSelect.value),
            month: parseInt(monthSelect.value),
            day: parseInt(daySelect.value),
            hour: parseInt(hourSelect.value)
        };

        // 调用计算函数（在 calculator.js 中定义）
        const result = calculateBaZi(birthData);
        
        // 显示结果区域
        resultSection.style.display = 'block';
        
        // 更新八字结果
        document.getElementById('baziResult').innerHTML = `
            <div class="bazi-item">
                <div class="gan">${result.yearGan}</div>
                <div class="zhi">${result.yearZhi}</div>
            </div>
            <div class="bazi-item">
                <div class="gan">${result.monthGan}</div>
                <div class="zhi">${result.monthZhi}</div>
            </div>
            <div class="bazi-item">
                <div class="gan">${result.dayGan}</div>
                <div class="zhi">${result.dayZhi}</div>
            </div>
            <div class="bazi-item">
                <div class="gan">${result.hourGan}</div>
                <div class="zhi">${result.hourZhi}</div>
            </div>
        `;

        // 更新五行分析
        updateWuxingChart(result.wuxing);
        
        // 更新阴阳分析
        updateYinYangChart(result.yinyang);
        
        // 更新八卦分析
        updateBaguaChart(result.bagua);

        // 滚动到结果区域
        resultSection.scrollIntoView({ behavior: 'smooth' });
    });

    // 更新五行图表
    function updateWuxingChart(wuxingData) {
        const wuxingChart = document.getElementById('wuxingResult');
        const total = Object.values(wuxingData).reduce((a, b) => a + b, 0);
        
        // 加载五行图标
        fetch('assets/icons/wuxing.svg')
            .then(response => response.text())
            .then(svgContent => {
                wuxingChart.innerHTML = svgContent;
                
                // 添加五行分析文字
                const analysisText = document.createElement('div');
                analysisText.className = 'wuxing-analysis';
                analysisText.innerHTML = `
                    <div class="wuxing-stats">
                        <div class="wuxing-item" style="color: #FFD700">金: ${wuxingData['金']} (${Math.round(wuxingData['金'] * 100 / total)}%)</div>
                        <div class="wuxing-item" style="color: #228B22">木: ${wuxingData['木']} (${Math.round(wuxingData['木'] * 100 / total)}%)</div>
                        <div class="wuxing-item" style="color: #4169E1">水: ${wuxingData['水']} (${Math.round(wuxingData['水'] * 100 / total)}%)</div>
                        <div class="wuxing-item" style="color: #FF4500">火: ${wuxingData['火']} (${Math.round(wuxingData['火'] * 100 / total)}%)</div>
                        <div class="wuxing-item" style="color: #8B4513">土: ${wuxingData['土']} (${Math.round(wuxingData['土'] * 100 / total)}%)</div>
                    </div>
                `;
                wuxingChart.appendChild(analysisText);
            });
    }

    // 更新阴阳图表
    function updateYinYangChart(yinyangData) {
        const yinyangChart = document.getElementById('yinyangResult');
        const total = yinyangData.yin + yinyangData.yang;
        
        // 加载阴阳图标
        fetch('assets/icons/yinyang.svg')
            .then(response => response.text())
            .then(svgContent => {
                yinyangChart.innerHTML = svgContent;
                
                // 添加阴阳分析文字
                const analysisText = document.createElement('div');
                analysisText.className = 'yinyang-analysis';
                analysisText.innerHTML = `
                    <div class="yinyang-stats">
                        <div class="yinyang-item">阳: ${yinyangData.yang} (${Math.round(yinyangData.yang * 100 / total)}%)</div>
                        <div class="yinyang-item">阴: ${yinyangData.yin} (${Math.round(yinyangData.yin * 100 / total)}%)</div>
                    </div>
                    <div class="yinyang-description">
                        ${getYinYangDescription(yinyangData)}
                    </div>
                `;
                yinyangChart.appendChild(analysisText);
            });
    }

    // 更新八卦图表
    function updateBaguaChart(bagua) {
        const baguaChart = document.getElementById('baguaResult');
        
        // 加载八卦图标
        fetch('assets/icons/bagua.svg')
            .then(response => response.text())
            .then(svgContent => {
                baguaChart.innerHTML = svgContent;
                
                // 添加八卦分析文字
                const analysisText = document.createElement('div');
                analysisText.className = 'bagua-analysis';
                analysisText.innerHTML = `
                    <div class="bagua-name">${bagua}卦</div>
                    <div class="bagua-description">
                        ${getBaguaDescription(bagua)}
                    </div>
                `;
                baguaChart.appendChild(analysisText);
            });
    }

    // 获取阴阳描述
    function getYinYangDescription(yinyangData) {
        const total = yinyangData.yin + yinyangData.yang;
        const yinPercent = yinyangData.yin * 100 / total;
        const yangPercent = yinyangData.yang * 100 / total;
        
        if (Math.abs(yinPercent - yangPercent) <= 20) {
            return '阴阳较为平衡，显示性格温和，处事圆融。';
        } else if (yangPercent > yinPercent) {
            return '阳气偏重，显示积极进取，富有活力。';
        } else {
            return '阴气偏重，显示深思熟虑，内敛沉稳。';
        }
    }

    // 获取八卦描述
    function getBaguaDescription(bagua) {
        const descriptions = {
            '乾': '象征天，代表领导力、创造力和坚韧不拔的精神。',
            '兑': '象征泽，代表愉悦、和谐与口才。',
            '离': '象征火，代表智慧、光明与表现力。',
            '震': '象征雷，代表行动力、变革与新生。',
            '巽': '象征风，代表谦逊、顺从与灵活。',
            '坎': '象征水，代表智慧、危险与机遇。',
            '艮': '象征山，代表稳重、停止与内省。',
            '坤': '象征地，代表包容、温顺与滋养。'
        };
        return descriptions[bagua] || '暂无解释';
    }
}); 