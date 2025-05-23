
import React from 'react';
import { Link } from "react-router-dom";
import { Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getUniversityImage } from '@/utils/universityImages';
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface UniversityProps {
  university: {
    id: string;
    name: string;
    location: string;
    rating: string | number;
    students: string;
    tuition: string;
    badge?: string;
    badgeNumber?: string | number;
  }
}

const UniversityCard: React.FC<UniversityProps> = ({ university }) => {
  // Get the university image
  const universityImage = getUniversityImage(university.id);

  return (
    <div className="bg-white rounded-lg border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <AspectRatio ratio={16/9} className="h-full">
          <img
            src={universityImage}
            alt={university.name}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = "/placeholder.svg";
              console.log(`Failed to load image for ${university.name}`);
            }}
          />
        </AspectRatio>
        {/* Overlay for university name */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4">
          <h3 className="text-lg font-bold text-white">{university.name}</h3>
          <p className="text-white text-sm">{university.location}</p>
        </div>
        
        {university.badge && (
          <span className="absolute top-2 left-2 inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
            {university.badge} {university.badgeNumber}
          </span>
        )}
      </div>
      <div className="p-5">
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
