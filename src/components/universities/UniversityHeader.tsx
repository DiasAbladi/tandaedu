
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
  // Get the university image
  const universityImage = getUniversityImage(university.id);

  // Use fullName or fallback to name or id if fullName is not available
  const displayName = university.fullName || university.id;

  return (
    <div className="w-full h-64 md:h-96 relative">
      <img
        src={universityImage}
        alt={displayName}
        className="w-full h-full object-cover"
        loading="lazy"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = "/placeholder.svg";
        }}
      />
      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <Link to="/universities" className="text-white flex items-center mb-4 hover:underline z-10">
          <ArrowLeft className="h-4 w-4 mr-1" /> Барлық университеттер
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 z-10">{displayName}</h1>
        <div className="flex items-center text-white z-10">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{university.location}</span>
        </div>
      </div>
    </div>
  );
};

export default UniversityHeader;
