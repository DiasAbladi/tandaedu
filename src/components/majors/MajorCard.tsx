
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Major } from '@/data/majors';

interface MajorCardProps {
  major: Major;
}

const MajorCard: React.FC<MajorCardProps> = ({ major }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-blue-50 rounded-full">
            {<major.icon className="h-10 w-10 text-blue-600" />}
          </div>
          <div className={`inline-block px-3 py-1 text-xs font-medium rounded-full
            ${major.badge === "Жоғары сұраныс" ? "bg-green-100 text-green-700" : 
            major.badge === "Орташа сұраныс" ? "bg-yellow-100 text-yellow-700" : 
            "bg-blue-100 text-blue-700"}`}>
            {major.badge}
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            {major.code}
          </Badge>
          <h3 className="text-lg font-bold truncate">{major.name}</h3>
        </div>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{major.description}</p>
        
        <div className="space-y-2 mb-5">
          <div className="flex items-center text-sm">
            <span className="inline-block w-2 h-2 bg-gray-300 rounded-full mr-2"></span>
            <span className="text-gray-600">Шекті балл: </span>
            <span className="ml-1 font-medium">{major.minScore ? `${major.minScore} балл` : "Белгісіз"}</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="inline-block w-2 h-2 bg-gray-300 rounded-full mr-2"></span>
            <span className="text-gray-600">Пәндер: </span>
            <span className="ml-1 font-medium">{major.subjects}</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="inline-block w-2 h-2 bg-gray-300 rounded-full mr-2"></span>
            <span className="text-gray-600">Оқу мерзімі: </span>
            <span className="ml-1 font-medium">{major.duration}</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="inline-block w-2 h-2 bg-gray-300 rounded-full mr-2"></span>
            <span className="text-gray-600">Орташа жалақы: </span>
            <span className="ml-1 font-medium">{major.salary}</span>
          </div>
        </div>
        
        <Link to={`/majors/${major.id}`}>
          <Button className="w-full">Толығырақ</Button>
        </Link>
      </div>
    </Card>
  );
};

export default MajorCard;
