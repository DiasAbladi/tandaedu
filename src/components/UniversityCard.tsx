
import React from 'react';
import { Link } from "react-router-dom";
import { Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getUniversityImage } from '@/utils/universityImages';

const UniversityCard: React.FC<{ university: any }> = ({ university }) => {
  // Университет суретін алу
  const universityImage = getUniversityImage(university.id);

  return (
    <div className="bg-white rounded-lg border overflow-hidden shadow-sm">
      <img
        src={universityImage}
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

export default UniversityCard;
