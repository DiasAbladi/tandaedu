
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  CalendarDays,
  Users,
  Star,
  ArrowRight,
} from "lucide-react";

interface ConsultingAdvantagesProps {
  currentLanguage: string;
}

const ConsultingAdvantages: React.FC<ConsultingAdvantagesProps> = ({ currentLanguage }) => {
  return (
    <div className="bg-blue-50 p-8 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-2xl font-bold mb-4">{currentLanguage === 'kk' ? 'Кеңес алу артықшылықтары' : 'Преимущества консультации'}</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <Users className="h-5 w-5 text-tandablue" />
              </div>
              <div>
                <span className="font-medium">{currentLanguage === 'kk' ? 'Жеке кеңес' : 'Личная консультация'}</span>
                <p className="text-sm text-gray-600">
                  {currentLanguage === 'kk' 
                    ? 'Сіздің қабілеттеріңіз бен қызығушылықтарыңызды ескере отырып, жеке кеңес алыңыз' 
                    : 'Получите индивидуальную консультацию с учетом ваших способностей и интересов'}
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <Star className="h-5 w-5 text-tandablue" />
              </div>
              <div>
                <span className="font-medium">{currentLanguage === 'kk' ? 'Тәжірибелі мамандар' : 'Опытные специалисты'}</span>
                <p className="text-sm text-gray-600">
                  {currentLanguage === 'kk' 
                    ? 'Біздің кеңесшілер өз саласындағы тәжірибелі мамандар' 
                    : 'Наши консультанты - опытные специалисты в своей области'}
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <CalendarDays className="h-5 w-5 text-tandablue" />
              </div>
              <div>
                <span className="font-medium">{currentLanguage === 'kk' ? 'Ыңғайлы уақытта' : 'В удобное время'}</span>
                <p className="text-sm text-gray-600">
                  {currentLanguage === 'kk' 
                    ? 'Өзіңізге ыңғайлы күні мен уақытында кеңес алыңыз' 
                    : 'Получите консультацию в удобный для вас день и время'}
                </p>
              </div>
            </li>
          </ul>
          
          <Link to="/counseling" className="mt-6 inline-flex">
            <Button className="mt-4">
              {currentLanguage === 'kk' ? 'Кеңес алуға тіркелу' : 'Записаться на консультацию'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        <div className="flex justify-center">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
            alt={currentLanguage === 'kk' ? 'Кеңес алу' : 'Консультация'} 
            className="rounded-lg max-h-80 object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ConsultingAdvantages;
