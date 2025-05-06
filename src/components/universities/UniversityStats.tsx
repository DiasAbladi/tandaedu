
import React from 'react';
import { Star, Users, Building } from "lucide-react";

interface UniversityStatsProps {
  university: {
    rating: number | string;
    students: string;
    tuition: string;
  }
}

const UniversityStats: React.FC<UniversityStatsProps> = ({ university }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-5 rounded-lg shadow-sm flex items-center">
        <Star className="h-10 w-10 text-yellow-500 fill-yellow-500 mr-4" />
        <div>
          <p className="text-sm text-gray-500">Рейтинг</p>
          <p className="text-xl font-bold">{university.rating}/5.0</p>
        </div>
      </div>
      
      <div className="bg-white p-5 rounded-lg shadow-sm flex items-center">
        <Users className="h-10 w-10 text-blue-500 mr-4" />
        <div>
          <p className="text-sm text-gray-500">Студенттер саны</p>
          <p className="text-xl font-bold">{university.students}</p>
        </div>
      </div>
      
      <div className="bg-white p-5 rounded-lg shadow-sm flex items-center">
        <Building className="h-10 w-10 text-green-500 mr-4" />
        <div>
          <p className="text-sm text-gray-500">Оқу құны</p>
          <p className="text-xl font-bold">{university.tuition}</p>
        </div>
      </div>
    </div>
  );
};

export default UniversityStats;
