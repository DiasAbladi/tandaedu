
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Star, Calendar } from "lucide-react";

interface Consultant {
  id: string;
  name: string;
  role: string;
  specialization: string[];
  rating: number;
  ratingCount: number;
  experience: string;
  price: string;
  duration: string;
  image: string;
}

const consultants: Consultant[] = [
  {
    id: "consultant1",
    name: "Төлеген Айдарұлы",
    role: "Карьералық кеңесші",
    specialization: ["IT", "Бизнес"],
    rating: 4.8,
    ratingCount: 124,
    experience: "8 жыл тәжірибе",
    price: "15 000 ₸",
    duration: "60 минут",
    image: "/lovable-uploads/cc18b066-c716-4c8e-934f-b534d715a74c.png"
  },
  {
    id: "consultant2",
    name: "Әсел Нұржанқызы",
    role: "Психолог, мамандық кеңесшісі",
    specialization: ["Психология", "Білім беру"],
    rating: 4.9,
    ratingCount: 187,
    experience: "12 жыл тәжірибе",
    price: "18 000 ₸",
    duration: "60 минут",
    image: "/lovable-uploads/cc18b066-c716-4c8e-934f-b534d715a74c.png"
  },
  {
    id: "consultant3",
    name: "Бауржан Мәдиұлы",
    role: "Білім беру сарапшысы",
    specialization: ["Халықаралық білім", "Инженерия"],
    rating: 4.7,
    ratingCount: 156,
    experience: "15 жыл тәжірибе",
    price: "20 000 ₸",
    duration: "60 минут",
    image: "/lovable-uploads/cc18b066-c716-4c8e-934f-b534d715a74c.png"
  },
  {
    id: "consultant4",
    name: "Гүлнар Серікова",
    role: "Медицина саласының кеңесшісі",
    specialization: ["Медицина", "Денсаулық сақтау"],
    rating: 4.9,
    ratingCount: 142,
    experience: "10 жыл тәжірибе",
    price: "17 000 ₸",
    duration: "60 минут",
    image: "/lovable-uploads/cc18b066-c716-4c8e-934f-b534d715a74c.png"
  }
];

const ConsultantCard: React.FC<{ consultant: Consultant }> = ({ consultant }) => {
  return (
    <div className="bg-white rounded-lg p-5 border mb-6">
      <div className="flex gap-4 items-center mb-3">
        <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
          <img src={consultant.image} alt={consultant.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h3 className="font-bold">{consultant.name}</h3>
          <p className="text-gray-600 text-sm">{consultant.role}</p>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-1 mb-3">
        {consultant.specialization.map((spec, index) => (
          <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded-md">{spec}</span>
        ))}
      </div>
      
      <div className="flex items-center mb-3">
        {Array(5).fill(0).map((_, i) => (
          <Star 
            key={i} 
            size={14}
            className={`${i < Math.floor(consultant.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
          />
        ))}
        <span className="ml-1 text-sm font-medium">{consultant.rating}</span>
        <span className="ml-1 text-xs text-gray-500">({consultant.ratingCount} пікір)</span>
      </div>
      
      <p className="text-sm mb-4">{consultant.experience}</p>
      
      <div className="flex justify-between items-center mt-3 pt-3 border-t">
        <div>
          <p className="text-blue-600 font-bold">{consultant.price}</p>
          <p className="text-xs text-gray-500">{consultant.duration}</p>
        </div>
        <Button size="sm">Жазылу</Button>
      </div>
    </div>
  );
};

const ConsultingSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="bg-blue-600 text-white rounded-lg p-6 mb-12">
          <h2 className="text-2xl font-bold mb-2">Жеке кеңес тағайындау</h2>
          <p className="max-w-2xl mb-0">
            Біздің тәжірибелі мамандар сізге университет пен мамандық таңдауда көмек көрсетеді
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="md:w-1/4">
            <div className="bg-white p-5 rounded-lg border">
              <h3 className="font-bold mb-5">Жеке кеңесші таңдаңыз</h3>
              
              <div className="space-y-3">
                <div>
                  <span className="block mb-1 text-sm font-medium">1. Мамандық таңдау</span>
                  <div className="w-full h-1 bg-gray-200 rounded">
                    <div className="h-1 bg-blue-600 rounded" style={{ width: '100%' }}></div>
                  </div>
                </div>
                
                <div>
                  <span className="block mb-1 text-sm font-medium">2. Уақытты таңдау</span>
                  <div className="w-full h-1 bg-gray-200 rounded">
                    <div className="h-1 bg-blue-600 rounded" style={{ width: '33%' }}></div>
                  </div>
                </div>
                
                <div>
                  <span className="block mb-1 text-sm font-medium">3. Жеке мәліметтер</span>
                  <div className="w-full h-1 bg-gray-200 rounded">
                    <div className="h-1 bg-blue-600 rounded" style={{ width: '0%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="font-medium mb-2">Кеңес түрін таңдаңыз</h4>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" className="justify-start">
                    <Calendar className="mr-2 h-4 w-4" /> Онлайн кеңес
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Calendar className="mr-2 h-4 w-4" /> Офлайн кеңес
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-3/4">
            <h3 className="text-xl font-bold mb-6">Жеке кеңесшілер</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {consultants.map(consultant => (
                <ConsultantCard key={consultant.id} consultant={consultant} />
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <Link to="/counseling">
                <Button variant="outline">Барлық кеңесшілерді көру</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultingSection;
