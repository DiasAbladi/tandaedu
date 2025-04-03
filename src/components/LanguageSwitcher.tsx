
import { useContext } from 'react';
import { Button } from "@/components/ui/button";
import { LanguageContext } from '@/contexts/LanguageContext';

const LanguageSwitcher = () => {
  const { currentLanguage, setLanguage } = useContext(LanguageContext);

  return (
    <div className="flex items-center">
      <Button 
        variant="ghost" 
        size="sm" 
        className={`${currentLanguage === 'kk' ? 'font-bold' : 'font-normal'} px-2`}
        onClick={() => setLanguage('kk')}
      >
        Қаз
      </Button>
      <span className="text-gray-300">|</span>
      <Button 
        variant="ghost" 
        size="sm" 
        className={`${currentLanguage === 'ru' ? 'font-bold' : 'font-normal'} px-2`}
        onClick={() => setLanguage('ru')}
      >
        Рус
      </Button>
    </div>
  );
};

export default LanguageSwitcher;
