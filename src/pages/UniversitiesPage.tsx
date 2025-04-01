
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Star, ArrowRight } from "lucide-react";

interface University {
  id: string;
  name: string;
  fullName?: string;
  location: string;
  rating: number;
  students: string;
  tuition: string;
  image: string;
  badge?: string;
  badgeNumber?: number;
}

const universities: University[] = [
  {
    id: "kaznu",
    name: "Әл-Фараби атындағы ҚазҰУ",
    fullName: "Әл-Фараби атындағы Қазақ Ұлттық Университеті",
    location: "Алматы қ.",
    rating: 4.8,
    students: "25,000+ студент",
    tuition: "850,000 ₸/жыл",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    badge: "Топ",
    badgeNumber: 1
  },
  {
    id: "east",
    name: "Абай университеті",
    location: "Астана қ.",
    rating: 4.9,
    students: "15,000+ студент",
    tuition: "1,200,000 ₸/жыл",
    image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    badge: "Топ",
    badgeNumber: 2
  },
  {
    id: "kimep",
    name: "КИМЭП Университеті",
    location: "Алматы қ.",
    rating: 4.7,
    students: "7,000+ студент",
    tuition: "950,000 ₸/жыл",
    image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    badge: "Топ",
    badgeNumber: 3
  },
];

const UniversityCard: React.FC<{ university: University }> = ({ university }) => {
  return (
    <div className="bg-white rounded-lg border overflow-hidden shadow-sm">
      <img
        src={university.image}
        alt={university.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-5">
        {university.badge && (
          <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded mb-2">
            {university.badge} {university.badgeNumber}
          </span>
        )}
        
        <h3 className="text-xl font-bold mb-1">{university.name}</h3>
        <p className="text-gray-500 text-sm mb-3">{university.location}</p>
        
        <div className="flex flex-col gap-2 mb-5">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
            <span className="font-medium">{university.rating}</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-gray-600">{university.students}</span>
          </div>
          <div className="flex items-center text-sm font-medium text-blue-600">
            <span>{university.tuition}</span>
          </div>
        </div>
        
        <Link to={`/universities/${university.id}`}>
          <Button className="w-full flex justify-between items-center">
            Толығырақ <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

const UniversitiesPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-gray-50 py-12">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-bold mb-8">Қазақстан университеттері</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
            <div className="relative">
              <Input 
                type="text" 
                placeholder="Университет атауын іздеу" 
                className="pl-10 py-2 w-full rounded-md border shadow-sm"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            </div>
            
            <Button variant="outline" className="justify-between">
              Аймақ бойынша <span>▼</span>
            </Button>
            
            <Button variant="outline" className="justify-between">
              Рейтинг бойынша <span>▼</span>
            </Button>
            
            <Button variant="outline" className="justify-between">
              Мамандық бойынша <span>▼</span>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {universities.map(university => (
              <UniversityCard key={university.id} university={university} />
            ))}
          </div>
          
          <div className="flex justify-center gap-2">
            <Button variant="outline" className="w-10 h-10 p-0" disabled>
              &lt;
            </Button>
            <Button variant="default" className="w-10 h-10 p-0">
              1
            </Button>
            <Button variant="outline" className="w-10 h-10 p-0">
              2
            </Button>
            <Button variant="outline" className="w-10 h-10 p-0">
              3
            </Button>
            <Button variant="outline" className="w-10 h-10 p-0">
              &gt;
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UniversitiesPage;
