
import React from 'react';
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

interface Consultant {
  id: number;
  name: string;
  role: string;
  image: string;
  experience: string;
  rating: number;
}

const consultants: Consultant[] = [
  {
    id: 1,
    name: "Айгүл Ахметова",
    role: "Карьералық кеңесші",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    experience: "8 жыл",
    rating: 4.9
  },
  {
    id: 2,
    name: "Дәулет Сәрсенов",
    role: "Оқу бағдарламалары маманы",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    experience: "5 жыл",
    rating: 4.7
  },
  {
    id: 3,
    name: "Гүлнұр Жұмабаева",
    role: "Психолог-кеңесші",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    experience: "10 жыл",
    rating: 4.8
  }
];

const ConsultingSection: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Кәсіби кеңес алыңыз</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Мамандық таңдау, карьера қалыптастыру және жоғары оқу орнын таңдау бойынша сарапшылардан кеңес алыңыз
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {consultants.map(consultant => (
            <Card key={consultant.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col items-center text-center mb-4">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={consultant.image} alt={consultant.name} />
                  <AvatarFallback>{consultant.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <h3 className="font-bold text-lg">{consultant.name}</h3>
                <p className="text-gray-600 mb-2">{consultant.role}</p>
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
                  <span>Тәжірибе: {consultant.experience}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1 text-tandablue" />
                  <span>500+ студент</span>
                </div>
              </div>
              
              <Link to="/counseling">
                <Button variant="outline" className="w-full">Кеңес алу</Button>
              </Link>
            </Card>
          ))}
        </div>

        <div className="bg-blue-50 p-8 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Кеңес алу артықшылықтары</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <User className="h-5 w-5 text-tandablue" />
                  </div>
                  <div>
                    <span className="font-medium">Жеке кеңес</span>
                    <p className="text-sm text-gray-600">Сіздің қабілеттеріңіз бен қызығушылықтарыңызды ескере отырып, жеке кеңес алыңыз</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <Star className="h-5 w-5 text-tandablue" />
                  </div>
                  <div>
                    <span className="font-medium">Тәжірибелі мамандар</span>
                    <p className="text-sm text-gray-600">Біздің кеңесшілер өз саласындағы тәжірибелі мамандар</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <CalendarDays className="h-5 w-5 text-tandablue" />
                  </div>
                  <div>
                    <span className="font-medium">Ыңғайлы уақытта</span>
                    <p className="text-sm text-gray-600">Өзіңізге ыңғайлы күні мен уақытында кеңес алыңыз</p>
                  </div>
                </li>
              </ul>
              
              <Link to="/counseling" className="mt-6 inline-flex">
                <Button className="mt-4">
                  Кеңес алуға тіркелу
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                alt="Consulting" 
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
