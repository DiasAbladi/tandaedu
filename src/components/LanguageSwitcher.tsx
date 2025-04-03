
import { useContext } from 'react';
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { LanguageContext } from '@/contexts/LanguageContext';

const LanguageSwitcher = () => {
  const { currentLanguage, setLanguage } = useContext(LanguageContext);

  return (
    <Select value={currentLanguage} onValueChange={(value: 'kk' | 'ru') => setLanguage(value)}>
      <SelectTrigger className="w-[100px] bg-white border-gray-200">
        <SelectValue>
          <div className="flex items-center">
            <Globe className="h-4 w-4 mr-2" />
            {currentLanguage === 'kk' ? 'Қаз' : 'Рус'}
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="kk">Қазақша</SelectItem>
        <SelectItem value="ru">Русский</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;
