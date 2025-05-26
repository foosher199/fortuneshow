/**
 * 한국어 언어 팩
 */
export default {
    // 기본 정보
    basic: {
        title: '기본 정보',
        year: '년주',
        month: '월주',
        day: '일주',
        hour: '시주',
        gender: {
            male: '남성',
            female: '여성'
        }
    },

    // 팔자 분석
    bazi: {
        title: '팔자 분석',
        yearPillar: '년주는 유년기, 인생 전반, 가정 배경을 나타냅니다',
        monthPillar: '월주는 청년기, 경력 발전, 직장 환경을 나타냅니다',
        dayPillar: '일주는 성년기, 개성, 결혼 상황을 나타냅니다',
        hourPillar: '시주는 노년기, 자녀, 노후를 나타냅니다'
    },

    // 오행 분석
    wuxing: {
        title: '오행 분석',
        elements: {
            metal: '금',
            wood: '목',
            water: '수',
            fire: '화',
            earth: '토'
        },
        states: {
            veryWeak: '극약',
            weak: '약함',
            balanced: '균형',
            strong: '강함',
            veryStrong: '극강'
        }
    },

    // 십신 분석
    shishen: {
        title: '십신 분석',
        types: {
            zhengYin: '정인',
            pianYin: '편인',
            zhengGuan: '정관',
            qiSha: '칠살',
            zhengCai: '정재',
            pianCai: '편재',
            shiShen: '식신',
            shangGuan: '상관',
            zhengBi: '비견',
            jieBi: '겁재'
        }
    },

    // 운세 분석
    fortune: {
        title: '운세 분석',
        sections: {
            career: '직장운',
            relationship: '연애운',
            health: '건강운',
            wealth: '재물운 분석'
        }
    },

    // 대운 유년
    dayun: {
        title: '대운 유년',
        age: '연령',
        period: '대운',
        year: '유년'
    },

    // 운세 지도
    guidance: {
        title: '운세 지도',
        sections: {
            timing: '시기 선택',
            career: '경력 발전',
            relationship: '연애 조언',
            health: '건강 관리'
        }
    },

    // 오류 메시지
    errors: {
        invalidYear: '연도는 1900년에서 2100년 사이여야 합니다',
        invalidMonth: '월은 1에서 12 사이여야 합니다',
        invalidDay: '유효하지 않은 날짜입니다',
        invalidHour: '시간은 0에서 23 사이여야 합니다',
        invalidGender: '성별은 남성 또는 여성이어야 합니다',
        missingParam: '필수 매개변수가 누락되었습니다: ',
        unsupportedLanguage: '지원되지 않는 언어: '
    }
}; 