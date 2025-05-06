
import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { universities } from '@/data/universities';
import UniversityCard from '@/components/UniversityCard';

// Бас бетте көрсетілетін университеттердің саны
const TOP_UNIVERSITIES_COUNT = 3;

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
