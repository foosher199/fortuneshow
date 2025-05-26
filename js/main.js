import { generateYearOptions, generateMonthOptions, generateDayOptions, generateHourOptions } from './dateOptions.js';

// 初始化所有选择框
function initializeSelectors() {
    // 初始化年份选择器
    const yearSelect = document.getElementById('year');
    const yearOptions = generateYearOptions();
    populateSelect(yearSelect, yearOptions);

    // 初始化月份选择器
    const monthSelect = document.getElementById('month');
    const monthOptions = generateMonthOptions();
    populateSelect(monthSelect, monthOptions);

    // 初始化日期选择器（默认显示当前年月的天数）
    const daySelect = document.getElementById('day');
    updateDayOptions();

    // 初始化时辰选择器
    const hourSelect = document.getElementById('hour');
    const hourOptions = generateHourOptions();
    populateSelect(hourSelect, hourOptions);

    // 添加事件监听器
    yearSelect.addEventListener('change', updateDayOptions);
    monthSelect.addEventListener('change', updateDayOptions);

    // 添加表单提交事件监听器
    const form = document.getElementById('baziForm');
    form.addEventListener('submit', handleFormSubmit);

    // 尝试从localStorage恢复之前的选择
    restoreFormData();
}

// 更新日期选择器的选项
function updateDayOptions() {
    const yearSelect = document.getElementById('year');
    const monthSelect = document.getElementById('month');
    const daySelect = document.getElementById('day');
    
    const selectedYear = parseInt(yearSelect.value) || new Date().getFullYear();
    const selectedMonth = parseInt(monthSelect.value) || 1;
    
    const dayOptions = generateDayOptions(selectedYear, selectedMonth);
    
    // 保存当前选中的日期
    const currentDay = daySelect.value;
    
    // 更新选项
    populateSelect(daySelect, dayOptions);
    
    // 如果之前选中的日期仍然有效，则保持选中
    if (currentDay && currentDay <= dayOptions.length) {
        daySelect.value = currentDay;
    }
}

// 填充选择框的选项
function populateSelect(selectElement, options) {
    // 保存当前选中值
    const currentValue = selectElement.value;
    
    // 清空现有选项
    selectElement.innerHTML = '';
    
    // 添加默认选项
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = '请选择';
    selectElement.appendChild(defaultOption);
    
    // 添加新选项
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.value;
        optionElement.textContent = option.text;
        if (option.label) {
            optionElement.dataset.label = option.label;
        }
        selectElement.appendChild(optionElement);
    });
    
    // 如果之前有选中值，尝试恢复
    if (currentValue) {
        selectElement.value = currentValue;
    }
}

// 保存表单数据到localStorage
function saveFormData() {
    const formData = {
        year: document.getElementById('year').value,
        month: document.getElementById('month').value,
        day: document.getElementById('day').value,
        hour: document.getElementById('hour').value,
        gender: document.getElementById('gender').value
    };
    localStorage.setItem('baziFormData', JSON.stringify(formData));
}

// 从localStorage恢复表单数据
function restoreFormData() {
    const savedData = localStorage.getItem('baziFormData');
    if (savedData) {
        const formData = JSON.parse(savedData);
        Object.entries(formData).forEach(([key, value]) => {
            const element = document.getElementById(key);
            if (element && value) {
                element.value = value;
            }
        });
        // 更新日期选项
        updateDayOptions();
    }
}

// 处理表单提交
async function handleFormSubmit(event) {
    event.preventDefault();
    
    // 获取表单数据
    const formData = {
        year: document.getElementById('year').value,
        month: document.getElementById('month').value,
        day: document.getElementById('day').value,
        hour: document.getElementById('hour').value,
        gender: document.getElementById('gender').value
    };

    // 验证所有字段都已填写
    for (const [key, value] of Object.entries(formData)) {
        if (!value) {
            alert(`请选择${document.querySelector(`label[for="${key}"]`).textContent}`);
            return;
        }
    }

    // 保存表单数据
    saveFormData();

    try {
        // 显示结果部分
        const resultSection = document.getElementById('result');
        resultSection.innerHTML = `
            <h2 class="result-title">八字分析结果</h2>
            <div class="result-content">
                <div class="result-item">
                    <h3>基本信息</h3>
                    <p>出生年份：${formData.year}年</p>
                    <p>出生月份：${formData.month}月</p>
                    <p>出生日期：${formData.day}日</p>
                    <p>出生时辰：${document.getElementById('hour').options[document.getElementById('hour').selectedIndex].text}</p>
                    <p>性别：${formData.gender === 'male' ? '男' : '女'}</p>
                </div>
                <!-- 这里可以添加更多分析结果 -->
            </div>
        `;
        resultSection.classList.add('active');
        resultSection.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.error('Analysis error:', error);
        alert('分析出错，请重试');
    }
}

// 当DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', initializeSelectors); 