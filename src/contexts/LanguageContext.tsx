
import { createContext, useState, useEffect, ReactNode } from 'react';

type Language = 'kk' | 'ru';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  translations: Record<string, Record<Language, string>>;
}

const defaultTranslations = {
  navHome: {
    kk: 'Басты бет',
    ru: 'Главная'
  },
  navUniversities: {
    kk: 'Университеттер',
    ru: 'Университеты'
  },
  navMajors: {
    kk: 'Мамандықтар',
    ru: 'Специальности'
  },
  navNews: {
    kk: 'Жаңалықтар',
    ru: 'Новости'
  },
  navTest: {
    kk: 'Кәсіби тест',
    ru: 'Профессиональный тест'
  },
  navCounseling: {
    kk: 'Кеңес алу',
    ru: 'Консультации'
  },
  navBlog: {
    kk: 'Блог',
    ru: 'Блог'
  },
  navLogin: {
    kk: 'Кіру',
    ru: 'Вход'
  },
  navRegister: {
    kk: 'Тіркелу',
    ru: 'Регистрация'
  },
  // Add more translations as needed
};

export const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: 'kk',
  setLanguage: () => {},
  translations: defaultTranslations
});

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  // Try to get the language from localStorage, default to 'kk'
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage === 'kk' || savedLanguage === 'ru') ? savedLanguage : 'kk';
  });

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', currentLanguage);
  }, [currentLanguage]);

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ 
      currentLanguage, 
      setLanguage, 
      translations: defaultTranslations 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};
