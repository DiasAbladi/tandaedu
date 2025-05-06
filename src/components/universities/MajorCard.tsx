
import React from 'react';
import { GraduationCap } from "lucide-react";

interface MajorProps {
  major: {
    name: string;
    code: string;
    duration: string;
    degree: string;
    price: string;
    universities?: string[];
  }
}

const MajorCard: React.FC<MajorProps> = ({ major }) => {
  return (
    <div className="bg-white p-5 rounded-lg border mb-4 hover:shadow-sm transition-shadow">
      <div className="flex items-center mb-3">
        <GraduationCap className="h-6 w-6 text-tandablue mr-3" />
        <h3 className="text-lg font-bold">{major.name}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center text-sm">
            <span className="text-gray-600 mr-2">Код:</span>
            <span className="font-medium">{major.code}</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-gray-600 mr-2">Оқу мерзімі:</span>
            <span className="font-medium">{major.duration}</span>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center text-sm">
            <span className="text-gray-600 mr-2">Дәреже:</span>
            <span className="font-medium">{major.degree}</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-gray-600 mr-2">Оқу құны:</span>
            <span className="font-medium text-blue-600">{major.price}</span>
          </div>
        </div>
      </div>
      {major.universities && major.universities.length > 0 && (
        <div className="mt-3">
          <p className="text-sm mb-1">Бұл мамандық басқа университеттерде бар:</p>
          <div className="flex flex-wrap gap-1">
            {major.universities.map((uni: string, index: number) => (
              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md">
                {uni}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MajorCard;
