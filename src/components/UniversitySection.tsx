
import React from 'react';
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { universities } from '@/data/universities';

// Бас бетте көрсетілетін университеттердің саны
const TOP_UNIVERSITIES_COUNT = 3;

const UniversityCard: React.FC<{ university: any }> = ({ university }) => {
  // Университет ішінен сурет алу логикасы
  const getUniversityImage = (uniId: string) => {
    switch(uniId) {
      case "kaznu": 
        return "public/lovable-uploads/93d4f861-eaff-4a58-a39a-cccae16687f1.png"; // КазНУ суреті
      case "kazmu": 
        return "public/lovable-uploads/9a91a880-f257-4936-9fbe-7d3290ff568e.png"; // ҚазҰМУ суреті
      case "oku": 
        return "public/lovable-uploads/bc219841-91c3-4f94-a231-68e33b713252.png"; // М. Әуезов атындағы ОҚУ
      case "ktu": 
        return "public/lovable-uploads/d8d26844-8131-41a5-ab7b-bb93e6983808.png"; // Қарағанды техникалық университеті
      case "buketov": 
        return "public/lovable-uploads/27c3eb85-807c-455a-acb3-72179747bb97.png"; // Бөкетов университеті
      case "almau": 
        return "public/lovable-uploads/83fbda14-7fa1-4abb-b8f1-f7c9f4f704a4.png"; // AlmaU
      case "kazguu": 
        return "public/lovable-uploads/61a90cf6-2caa-46d2-8f3a-27a4f392eb41.png"; // KAZGUU Университеті
      case "kaznau": 
        return "public/lovable-uploads/ee4e51e4-83d5-4a25-a5c3-545d8b931e47.png"; // ҚазҰАЗУ
      case "seifullin": 
        return "public/lovable-uploads/8671a5fd-2b18-4b79-985e-29c187014774.png"; // С.Сейфуллин атындағы ҚАЗАТУ
      case "toraighyrov": 
        return "public/lovable-uploads/4555b923-6286-4595-8054-f682902cac39.png"; // Торайғыров университеті
      case "ektu": 
        return "public/lovable-uploads/0b208751-1737-4280-a47f-55b36a6bbb41.png"; // Шығыс Қазақстан техникалық университеті
      // Басқа университеттерге қажет болған жағдайда қосылады
      default:
        return university.image; // Қалғандарына бастапқы сурет қалады
    }
  };

  // Университет суретін алу
  const universityImage = getUniversityImage(university.id);

  return (
    <div className="university-card bg-white border rounded-lg overflow-hidden shadow-sm">
      <div className="relative">
        <img
          src={universityImage}
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
  // Танымал университеттерді алу (алғашқы 3)
  const topUniversities = universities.slice(0, TOP_UNIVERSITIES_COUNT);

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
          {topUniversities.map(university => (
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
