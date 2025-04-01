
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
}

const universities: University[] = [
  {
    id: "sdu",
    name: "SDU",
    location: "Нұр Сұлтан қ.",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.8,
    category: "Top 10"
  },
  {
    id: "kbtu",
    name: "Қазақстан-Британ техникалық университеті (КБТУ)",
    location: "Алматы қ.",
    image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.6,
    category: "Top 10"
  },
  {
    id: "kaznu",
    name: "Әл-Фараби атындағы ҚазҰУ",
    location: "Алматы қ.",
    image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.5,
    category: "Top 10"
  }
];

const UniversityCard: React.FC<{ university: University }> = ({ university }) => {
  return (
    <div className="university-card">
      <img
        src={university.image}
        alt={university.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="inline-block mb-2 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
          {university.category}
        </div>
        <h3 className="text-lg font-bold mb-1">{university.name}</h3>
        <p className="text-sm text-gray-500 mb-3">{university.location}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400 mr-1" />
            <span className="font-medium">{university.rating}</span>
          </div>
          <Link to={`/universities/${university.id}`} className="text-tandablue hover:underline text-sm">
            Толығырақ
          </Link>
        </div>
      </div>
    </div>
  );
};

const UniversitySection: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl font-bold mb-8">Танымал университеттер</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {universities.map(university => (
            <UniversityCard key={university.id} university={university} />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Button variant="outline" className="border-tandablue text-tandablue hover:bg-tandablue hover:text-white">
            Барлық университеттер
          </Button>
        </div>
      </div>
    </section>
  );
};

export default UniversitySection;
