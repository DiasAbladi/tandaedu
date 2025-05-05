
import { createContext, useState, ReactNode, useContext } from 'react';

type Language = 'kk' | 'ru';

interface LanguageContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
  translations: Record<string, Record<Language, string>>;
}

const defaultTranslations = {
  // Navigation translations
  navHome: {
    kk: 'Басты бет',
    ru: 'Главная',
  },
  navUniversities: {
    kk: 'Университеттер',
    ru: 'Университеты',
  },
  navMajors: {
    kk: 'Мамандықтар',
    ru: 'Специальности',
  },
  navNews: {
    kk: 'Жаңалықтар',
    ru: 'Новости',
  },
  navTest: {
    kk: 'Кәсіби тест',
    ru: 'Профессиональный тест',
  },
  navCounseling: {
    kk: 'Кеңес алу',
    ru: 'Консультация',
  },
  navLogin: {
    kk: 'Кіру',
    ru: 'Вход',
  },
  navRegister: {
    kk: 'Тіркелу',
    ru: 'Регистрация',
  },
  
  // Consulting page translations
  consultingTitle: {
    kk: 'Кәсіби кеңес алу',
    ru: 'Профессиональная консультация',
  },
  consultingDescription: {
    kk: 'Мамандық таңдау, карьера қалыптастыру және жоғары оқу орнын таңдау бойынша сарапшылардан кеңес алыңыз',
    ru: 'Получите консультацию экспертов по выбору профессии, построению карьеры и выбору вуза',
  },
  consultingProfessionals: {
    kk: 'Кәсіби кеңесшілер',
    ru: 'Профессиональные консультанты',
  },
  consultingOnline: {
    kk: 'Онлайн кеңес алу',
    ru: 'Онлайн консультация',
  },
  consultingPersonal: {
    kk: 'Жеке кеңес',
    ru: 'Личная консультация',
  },
  consultingOurExperts: {
    kk: 'Біздің кеңесшілеріміз',
    ru: 'Наши консультанты',
  },
  consultingSchedule: {
    kk: 'Кеңес алуға жазылу',
    ru: 'Записаться на консультацию',
  },
  consultingName: {
    kk: 'Аты-жөніңіз',
    ru: 'Ваше имя',
  },
  consultingNamePlaceholder: {
    kk: 'Аты-жөніңізді енгізіңіз',
    ru: 'Введите ваше имя',
  },
  consultingPhone: {
    kk: 'Телефон',
    ru: 'Телефон',
  },
  consultingPhonePlaceholder: {
    kk: 'Телефон нөміріңізді енгізіңіз',
    ru: 'Введите ваш номер телефона',
  },
  consultingTopic: {
    kk: 'Кеңес тақырыбы',
    ru: 'Тема консультации',
  },
  consultingSelectTopic: {
    kk: 'Тақырыпты таңдаңыз',
    ru: 'Выберите тему',
  },
  consultingDate: {
    kk: 'Күні',
    ru: 'Дата',
  },
  consultingSelectDate: {
    kk: 'Күнді таңдаңыз',
    ru: 'Выберите дату',
  },
  consultingTime: {
    kk: 'Уақыты',
    ru: 'Время',
  },
  consultingSelectTime: {
    kk: 'Уақытты таңдаңыз',
    ru: 'Выберите время',
  },
  consultingAdditionalInfo: {
    kk: 'Қосымша ақпарат',
    ru: 'Дополнительная информация',
  },
  consultingAdditionalInfoPlaceholder: {
    kk: 'Кеңес алу туралы қосымша ақпаратты жазыңыз',
    ru: 'Напишите дополнительную информацию о консультации',
  },
  consultingPayment: {
    kk: 'Kaspi арқылы төлем жасау',
    ru: 'Оплата через Kaspi',
  },
  consultingError: {
    kk: 'Қате',
    ru: 'Ошибка',
  },
  consultingErrorFields: {
    kk: 'Барлық қажетті өрістерді толтырыңыз',
    ru: 'Заполните все обязательные поля',
  },
  consultingSuccess: {
    kk: 'Сәтті',
    ru: 'Успешно',
  },
  consultingSuccessMessage: {
    kk: 'Сіздің өтініміңіз қабылданды. Төлем жасағаннан кейін біз сізбен жақын арада хабарласамыз.',
    ru: 'Ваша заявка принята. Мы свяжемся с вами в ближайшее время после оплаты.',
  },
  consultingAvailable: {
    kk: 'Қолжетімді',
    ru: 'Доступен',
  },
  consultingUnavailable: {
    kk: 'Бос емес',
    ru: 'Недоступен',
  },
  consultingExperience: {
    kk: 'Тәжірибе',
    ru: 'Опыт',
  },
  // Add more translations as needed
};

export const LanguageContext = createContext<LanguageContextType>({
  language: 'kk',
  changeLanguage: () => {},
  translations: defaultTranslations
});

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>('kk');

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    document.documentElement.lang = newLanguage;
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      changeLanguage,
      translations: defaultTranslations 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Create and export the useLanguage hook
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
