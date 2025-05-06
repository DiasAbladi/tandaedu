
import React from 'react';
import { Link } from "react-router-dom";
import { MapPin, ArrowLeft } from "lucide-react";
import { getUniversityImage } from '@/utils/universityImages';

interface UniversityHeaderProps {
  university: {
    id: string;
    fullName?: string;
    location: string;
  }
}

const UniversityHeader: React.FC<UniversityHeaderProps> = ({ university }) => {
  // Университет суретін алу
  const universityImage = getUniversityImage(university.id);

  // Use fullName or fallback to name or id if fullName is not available
  const displayName = university.fullName || university.id;

  return (
    <div 
      className="w-full h-64 md:h-96 bg-cover bg-center relative" 
      style={{ backgroundImage: `url(${universityImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="container relative z-10 h-full flex flex-col justify-end p-6">
        <Link to="/universities" className="text-white flex items-center mb-4 hover:underline">
          <ArrowLeft className="h-4 w-4 mr-1" /> Барлық университеттер
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{displayName}</h1>
        <div className="flex items-center text-white">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{university.location}</span>
        </div>
      </div>
    </div>
  );
};

export default UniversityHeader;
