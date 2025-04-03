
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  CalendarDays,
  Users,
  User,
  Star,
  ArrowRight
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { LanguageContext } from '@/contexts/LanguageContext';

interface Consultant {
  id: number;
  name: {
    kk: string;
    ru: string;
  };
  role: {
    kk: string;
    ru: string;
  };
  image: string;
  experience: {
    kk: string;
    ru: string;
  };
  rating: number;
}

const consultants: Consultant[] = [
  {
    id: 1,
    name: {
      kk: "Айгүл Ахметова",
      ru: "Айгуль Ахметова"
    },
    role: {
      kk: "Карьералық кеңесші",
      ru: "Карьерный консультант"
    },
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    experience: {
      kk: "8 жыл",
      ru: "8 лет"
    },
    rating: 4.9
  },
  {
    id: 2,
    name: {
      kk: "Дәулет Сәрсенов",
      ru: "Даулет Сарсенов"
    },
    role: {
      kk: "Оқу бағдарламалары маманы",
      ru: "Специалист по учебным программам"
    },
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    experience: {
      kk: "5 жыл",
      ru: "5 лет"
    },
    rating: 4.7
  },
  {
    id: 3,
    name: {
      kk: "Гүлнұр Жұмабаева",
      ru: "Гульнур Жумабаева"
    },
    role: {
      kk: "Психолог-кеңесші",
      ru: "Психолог-консультант"
    },
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    experience: {
      kk: "10 жыл",
      ru: "10 лет"
    },
    rating: 4.8
  }
];

const ConsultingSection: React.FC = () => {
  const { currentLanguage, translations } = useContext(LanguageContext);

  return (
    <section className="py-16">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">{translations.consultingTitle[currentLanguage]}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {translations.consultingDescription[currentLanguage]}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {consultants.map(consultant => (
            <Card key={consultant.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col items-center text-center mb-4">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={consultant.image} alt={consultant.name[currentLanguage]} />
                  <AvatarFallback>{consultant.name[currentLanguage].substring(0, 2)}</AvatarFallback>
                </Avatar>
                <h3 className="font-bold text-lg">{consultant.name[currentLanguage]}</h3>
                <p className="text-gray-600 mb-2">{consultant.role[currentLanguage]}</p>
                <div className="flex items-center mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(consultant.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="text-sm ml-1">{consultant.rating.toFixed(1)}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-sm text-gray-600 mb-6">
                <div className="flex items-center">
                  <CalendarDays className="h-4 w-4 mr-1 text-tandablue" />
                  <span>{translations.consultingExperience[currentLanguage]}: {consultant.experience[currentLanguage]}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1 text-tandablue" />
                  <span>500+ {currentLanguage === 'kk' ? 'студент' : 'студентов'}</span>
                </div>
              </div>
              
              <Link to="/counseling">
                <Button variant="outline" className="w-full">{currentLanguage === 'kk' ? 'Кеңес алу' : 'Получить консультацию'}</Button>
              </Link>
            </Card>
          ))}
        </div>

        <div className="bg-blue-50 p-8 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">{currentLanguage === 'kk' ? 'Кеңес алу артықшылықтары' : 'Преимущества консультации'}</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <User className="h-5 w-5 text-tandablue" />
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
      </div>
    </section>
  );
};

export default ConsultingSection;
