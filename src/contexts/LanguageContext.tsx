
import { createContext, useState, ReactNode } from 'react';

type Language = 'kk';

interface LanguageContextType {
  currentLanguage: Language;
  translations: Record<string, Record<Language, string>>;
}

const defaultTranslations = {
  // Navigation translations
  navHome: {
    kk: 'Басты бет',
  },
  navUniversities: {
    kk: 'Университеттер',
  },
  navMajors: {
    kk: 'Мамандықтар',
  },
  navNews: {
    kk: 'Жаңалықтар',
  },
  navTest: {
    kk: 'Кәсіби тест',
  },
  navCounseling: {
    kk: 'Кеңес алу',
  },
  navLogin: {
    kk: 'Кіру',
  },
  navRegister: {
    kk: 'Тіркелу',
  },
  
  // Consulting page translations
  consultingTitle: {
    kk: 'Кәсіби кеңес алу',
  },
  consultingDescription: {
    kk: 'Мамандық таңдау, карьера қалыптастыру және жоғары оқу орнын таңдау бойынша сарапшылардан кеңес алыңыз',
  },
  consultingProfessionals: {
    kk: 'Кәсіби кеңесшілер',
  },
  consultingOnline: {
    kk: 'Онлайн кеңес алу',
  },
  consultingPersonal: {
    kk: 'Жеке кеңес',
  },
  consultingOurExperts: {
    kk: 'Біздің кеңесшілеріміз',
  },
  consultingSchedule: {
    kk: 'Кеңес алуға жазылу',
  },
  consultingName: {
    kk: 'Аты-жөніңіз',
  },
  consultingNamePlaceholder: {
    kk: 'Аты-жөніңізді енгізіңіз',
  },
  consultingPhone: {
    kk: 'Телефон',
  },
  consultingPhonePlaceholder: {
    kk: 'Телефон нөміріңізді енгізіңіз',
  },
  consultingTopic: {
    kk: 'Кеңес тақырыбы',
  },
  consultingSelectTopic: {
    kk: 'Тақырыпты таңдаңыз',
  },
  consultingDate: {
    kk: 'Күні',
  },
  consultingSelectDate: {
    kk: 'Күнді таңдаңыз',
  },
  consultingTime: {
    kk: 'Уақыты',
  },
  consultingSelectTime: {
    kk: 'Уақытты таңдаңыз',
  },
  consultingAdditionalInfo: {
    kk: 'Қосымша ақпарат',
  },
  consultingAdditionalInfoPlaceholder: {
    kk: 'Кеңес алу туралы қосымша ақпаратты жазыңыз',
  },
  consultingPayment: {
    kk: 'Kaspi арқылы төлем жасау',
  },
  consultingError: {
    kk: 'Қате',
  },
  consultingErrorFields: {
    kk: 'Барлық қажетті өрістерді толтырыңыз',
  },
  consultingSuccess: {
    kk: 'Сәтті',
  },
  consultingSuccessMessage: {
    kk: 'Сіздің өтініміңіз қабылданды. Төлем жасағаннан кейін біз сізбен жақын арада хабарласамыз.',
  },
  consultingAvailable: {
    kk: 'Қолжетімді',
  },
  consultingUnavailable: {
    kk: 'Бос емес',
  },
  consultingExperience: {
    kk: 'Тәжірибе',
  },
  // Add more translations as needed
};

export const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: 'kk',
  translations: defaultTranslations
});

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  // Always use 'kk' (Kazakh)
  const currentLanguage: Language = 'kk';

  // Set the document language
  document.documentElement.lang = currentLanguage;

  return (
    <LanguageContext.Provider value={{ 
      currentLanguage, 
      translations: defaultTranslations 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};
