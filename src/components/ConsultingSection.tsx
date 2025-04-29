
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  CalendarDays,
  Users,
  Star,
  ArrowRight
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { LanguageContext } from '@/contexts/LanguageContext';

const consultants = [
  {
    id: 1,
    name: {
      kk: "Абылай Димаш",
      ru: "Абылай Димаш"
    },
    role: {
      kk: "Карьералық кеңесші",
      ru: "Карьерный консультант"
    },
    image: "/lovable-uploads/711a23b3-38d3-479d-8396-3e392be7d0c1.png",
    experience: {
      kk: "5 жыл",
      ru: "5 лет"
    },
    price: {
      kk: "15,000 ₸/сағат",
      ru: "15,000 ₸/час"
    },
    rating: 4.9
  },
  {
    id: 2,
    name: {
      kk: "Дастан Омар",
      ru: "Дастан Омар"
    },
    role: {
      kk: "IT саласының маманы",
      ru: "Специалист в области IT"
    },
    image: "/lovable-uploads/cef18049-233b-4991-9350-90dc716bd49c.png",
    experience: {
      kk: "7 жыл",
      ru: "7 лет"
    },
    price: {
      kk: "20,000 ₸/сағат",
      ru: "20,000 ₸/час"
    },
    rating: 4.8
  },
  {
    id: 3,
    name: {
      kk: "Өмірбек Аяулым",
      ru: "Омирбек Аяулым"
    },
    role: {
      kk: "Психолог-кеңесші",
      ru: "Психолог-консультант"
    },
    image: "/lovable-uploads/4950e1ab-542c-4159-a64b-79321de90563.png",
    experience: {
      kk: "6 жыл",
      ru: "6 лет"
    },
    price: {
      kk: "13,000 ₸/сағат",
      ru: "13,000 ₸/час"
    },
    rating: 4.7
  },
  {
    id: 4,
    name: {
      kk: "Қайрат Керімбек",
      ru: "Кайрат Керимбек"
    },
    role: {
      kk: "Оқу бағдарламалары маманы",
      ru: "Специалист по учебным программам"
    },
    image: "/lovable-uploads/6375adf0-5c77-4a37-89ee-ec7db32be04f.png",
    experience: {
      kk: "5 жыл",
      ru: "5 лет"
    },
    price: {
      kk: "13,000 ₸/сағат",
      ru: "13,000 ₸/час"
    },
    rating: 4.6
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
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
                  <span>{consultant.price[currentLanguage]}</span>
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
      </div>
    </section>
  );
};

export default ConsultingSection;
