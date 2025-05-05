
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const LanguageSwitcher: React.FC = () => {
  const { language, changeLanguage } = useLanguage();

  const handleLanguageChange = (selectedLanguage: "kk" | "ru") => {
    changeLanguage(selectedLanguage);
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant={language === "kk" ? "default" : "outline"}
        size="sm"
        onClick={() => handleLanguageChange("kk")}
        className="text-xs"
      >
        ҚАЗ
      </Button>
      <Button
        variant={language === "ru" ? "default" : "outline"}
        size="sm"
        onClick={() => handleLanguageChange("ru")}
        className="text-xs"
      >
        РУС
      </Button>
    </div>
  );
};

export default LanguageSwitcher;
