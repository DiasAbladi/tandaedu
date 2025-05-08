
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, BarChart2 } from 'lucide-react';
import { TestResult } from '@/hooks/useCareerTest';
import { categories, categoryDescriptions, CareerCategory } from '@/data/testQuestions';
import { Link } from 'react-router-dom';
import { Major } from '@/data/majorTypes';
import { majorsData } from '@/data/majors';

interface TestResultsProps {
  result: TestResult;
  onRestart: () => void;
}

interface ResultCategoryProps {
  category: CareerCategory;
  percentage: number;
  description: string;
}

const ResultCategory: React.FC<ResultCategoryProps> = ({ category, percentage, description }) => (
  <div className="mb-8">
    <div className="flex items-center justify-between mb-2">
      <h3 className="font-bold">{categories[category]}</h3>
      <span className="text-blue-600 font-bold">{percentage}%</span>
    </div>
    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-2">
      <div 
        className="bg-blue-600 h-full rounded-full" 
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

const RecommendedMajor: React.FC<{ major: Major }> = ({ major }) => (
  <div className="bg-white p-4 rounded-lg border mb-3">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center">
        <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded mr-2">
          {major.code}
        </span>
        <h4 className="font-bold">{major.name}</h4>
      </div>
    </div>
    
    <div className="space-y-1 text-sm mb-3">
      <div className="flex items-center">
        <span className="inline-block w-2 h-2 bg-gray-300 rounded-full mr-2"></span>
        <span className="text-gray-600">Пәндер: </span>
        <span className="ml-1 font-medium">{major.subjects}</span>
      </div>
    </div>
    
    <Link to={`/majors/${major.id}`}>
      <Button variant="outline" size="sm" className="w-full">
        Толығырақ <ArrowRight className="h-3 w-3 ml-1" />
      </Button>
    </Link>
  </div>
);

const TestResults: React.FC<TestResultsProps> = ({ result, onRestart }) => {
  const recommendedMajors = result.recommendedMajorIds
    .map(id => majorsData.find(major => major.id === id))
    .filter((major): major is Major => major !== undefined)
    .slice(0, 6);  // Limit to 6 recommendations

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <Check className="h-8 w-8 text-blue-600" />
        </div>
        <h2 className="text-xl font-bold">Тест аяқталды!</h2>
        <p className="text-gray-500 text-sm">Құттықтаймыз! Сіз барлығы {result.totalAnswers} сұраққа жауап бердіңіз</p>
      </div>

      <div className="mb-6">
        <h3 className="font-bold text-lg mb-4">Енді сізге ең қолайлы мамандық бағыттарын көре аласыз</h3>
        
        {result.topCategories.slice(0, 2).map(item => (
          <ResultCategory 
            key={item.category}
            category={item.category}
            percentage={item.percentage}
            description={categoryDescriptions[item.category]}
          />
        ))}
      </div>

      <h3 className="font-bold text-lg mb-4 flex items-center">
        <BarChart2 className="mr-2 h-5 w-5 text-blue-600" />
        Ұсынылатын мамандықтар
      </h3>

      <div className="space-y-2 mb-6">
        {recommendedMajors.length > 0 ? (
          recommendedMajors.map(major => (
            <RecommendedMajor key={major.id} major={major} />
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">
            Сіздің профиліңізге сәйкес мамандықтар табылмады.
          </p>
        )}
      </div>

      <div className="flex gap-3 mt-6">
        <Button 
          variant="outline" 
          onClick={onRestart} 
          className="w-full"
        >
          Тестті қайта тапсыру
        </Button>
        <Link to="/majors" className="w-full">
          <Button className="w-full">
            Барлық мамандықтарды көру
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default TestResults;
