
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  CalendarDays,
  Users,
  Star,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

interface ConsultantProps {
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
  price: {
    kk: string;
    ru: string;
  };
  rating: number;
  currentLanguage: string;
  translations: any;
}

const ConsultantCard: React.FC<ConsultantProps> = ({ 
  id, name, role, image, experience, price, rating, currentLanguage, translations 
}) => {
  return (
    <Card key={id} className="p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col items-center text-center mb-4">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage src={image} alt={name[currentLanguage]} />
          <AvatarFallback>{name[currentLanguage].substring(0, 2)}</AvatarFallback>
        </Avatar>
        <h3 className="font-bold text-lg">{name[currentLanguage]}</h3>
        <p className="text-gray-600 mb-2">{role[currentLanguage]}</p>
        <div className="flex items-center mb-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
            />
          ))}
          <span className="text-sm ml-1">{rating.toFixed(1)}</span>
        </div>
      </div>
      
      <div className="flex justify-between items-center text-sm text-gray-600 mb-6">
        <div className="flex items-center">
          <CalendarDays className="h-4 w-4 mr-1 text-tandablue" />
          <span>{translations.consultingExperience[currentLanguage]}: {experience[currentLanguage]}</span>
        </div>
        <div className="flex items-center">
          <Users className="h-4 w-4 mr-1 text-tandablue" />
          <span>{price[currentLanguage]}</span>
        </div>
      </div>
      
      <Link to="/counseling">
        <Button variant="outline" className="w-full">{currentLanguage === 'kk' ? 'Кеңес алу' : 'Получить консультацию'}</Button>
      </Link>
    </Card>
  );
};

export default ConsultantCard;
