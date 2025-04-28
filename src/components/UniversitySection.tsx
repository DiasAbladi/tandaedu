import React from 'react';
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface University {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  category: string;
  badge?: string;
  badgeNumber?: number;
  students: string;
  tuition: string;
}

const universities: University[] = [
  {
    id: "kaznu",
    name: "Әл-Фараби атындағы ҚазҰУ",
    location: "Алматы қ.",
    image: "/lovable-uploads/885aa16e-67cc-42e6-8c48-60db393a06ee.png",
    rating: 4.8,
    category: "Top 10",
    badge: "Топ",
    badgeNumber: 1,
    students: "25,000+ студент",
    tuition: "850,000 ₸/жыл"
  },
  {
    id: "abaiuni",
    name: "Абай университеті",
    location: "Астана қ.",
    image: "/lovable-uploads/7807c993-b7c8-4c78-9d7d-9d79e6dc3606.png",
    rating: 4.9,
    category: "Top 10",
    badge: "Топ",
    badgeNumber: 2,
    students: "15,000+ студент",
    tuition: "1,200,000 ₸/жыл"
  },
  {
    id: "kimep",
    name: "КИМЭП Университеті",
    location: "Алматы қ.",
    image: "/lovable-uploads/39fb90f3-2b54-4dfe-9051-78ea3f3c3627.png",
    rating: 4.7,
    category: "Top 10",
    badge: "Топ",
    badgeNumber: 3,
    students: "7,000+ студент",
    tuition: "950,000 ₸/жыл"
  }
];

const UniversityCard: React.FC<{ university: University }> = ({ university }) => {
  return (
    <div className="university-card bg-white border rounded-lg overflow-hidden shadow-sm">
      <div className="relative">
        <img
          src={university.image}
          alt={university.name}
          className="w-full h-48 object-cover"
        />
        {university.badge && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-green-500 text-white text-xs font-medium rounded">
            {university.badge} {university.badgeNumber}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold mb-1">{university.name}</h3>
        <p className="text-sm text-gray-500 mb-3">{university.location}</p>

        <div className="flex flex-col gap-2 mb-4">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400 mr-1" />
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
          <Button variant="outline" className="w-full border-tandablue text-tandablue hover:bg-tandablue hover:text-white">
            Толығырақ
          </Button>
        </Link>
      </div>
    </div>
  );
};

const UniversitySection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Танымал университеттер</h2>
          <Link to="/universities" className="text-tandablue hover:underline">
            Барлығы
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {universities.map(university => (
            <UniversityCard key={university.id} university={university} />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Link to="/universities">
            <Button variant="default" className="bg-tandablue hover:bg-blue-700">
              Барлық университеттер
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UniversitySection;
