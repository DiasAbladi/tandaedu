
import { useContext } from 'react';
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { LanguageContext } from '@/contexts/LanguageContext';

const LanguageSwitcher = () => {
  const { currentLanguage, setLanguage } = useContext(LanguageContext);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white">
        <DropdownMenuItem 
          onClick={() => setLanguage('kk')}
          className={currentLanguage === 'kk' ? 'bg-gray-100' : ''}
        >
          Қазақша
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage('ru')}
          className={currentLanguage === 'ru' ? 'bg-gray-100' : ''}
        >
          Русский
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
