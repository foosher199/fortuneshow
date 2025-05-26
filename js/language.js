let currentLang = 'en';  // Default to English

// Language switching functions
function toggleLanguageOptions() {
    const options = document.getElementById('languageOptions');
    options.classList.toggle('show');
    
    // Close the language options when clicking outside
    document.addEventListener('click', function closeLanguageOptions(e) {
        if (!e.target.closest('.language-selector')) {
            options.classList.remove('show');
            document.removeEventListener('click', closeLanguageOptions);
        }
    });
}

function changeLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    
    // Update language button text
    const currentLangText = document.querySelector('.current-lang-text');
    currentLangText.textContent = lang === 'en' ? 'English' : '中文';
    
    // Hide language options
    document.getElementById('languageOptions').classList.remove('show');
    
    // Update page content
    updatePageLanguage();
    
    // Save language preference
    localStorage.setItem('preferredLanguage', lang);
}

// Get language setting from URL parameters
function getLanguageFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('lang') || 'en';  // Default to English if not specified
}

// Listen for messages from parent page
window.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'languageChange') {
        currentLang = event.data.language;
        updatePageLanguage();
    }
});

// Initialize page language
document.addEventListener('DOMContentLoaded', function() {
    // Set default language to English if no preference is saved
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    changeLanguage(savedLang);

    // Notify parent page that iframe has loaded
    window.parent.postMessage({ type: 'iframeLoaded', frame: 'birth' }, '*');
});

// Update page text
function updatePageLanguage() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (i18n[currentLang][key]) {
            element.textContent = i18n[currentLang][key];
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (i18n[currentLang][key]) {
            element.placeholder = i18n[currentLang][key];
        }
    });

    // Update select options
    const genderSelect = document.getElementById('gender');
    const selectedValue = genderSelect.value;
    genderSelect.innerHTML = `
        <option value="">${i18n[currentLang].gender_select}</option>
        <option value="male">${i18n[currentLang].gender_male}</option>
        <option value="female">${i18n[currentLang].gender_female}</option>
    `;
    genderSelect.value = selectedValue;

    // Update HTML language attribute
    document.documentElement.lang = currentLang;

    // Regenerate results if they are displayed
    const resultSection = document.getElementById('result');
    if (resultSection.classList.contains('active')) {
        const birthdate = new Date(document.getElementById('birthdate').value);
        const gender = document.getElementById('gender').value;
        generateAndDisplayResult(birthdate, gender);
    }
}

// Export functions and variables that need to be accessed from other files
window.currentLang = currentLang;
window.toggleLanguageOptions = toggleLanguageOptions;
window.changeLanguage = changeLanguage;
window.updatePageLanguage = updatePageLanguage; 