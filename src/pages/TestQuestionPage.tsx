
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, SkipForward, HelpCircle } from "lucide-react";

const TestQuestionPage: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Мансап тесті</h2>
          <button className="text-gray-400 hover:text-gray-600">
            <span className="sr-only">Жабу</span>
            &times;
          </button>
        </div>
        
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-1">
            <span>Прогресс</span>
            <span>7/20 сұрақ</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div className="h-full bg-blue-600 rounded-full" style={{ width: '35%' }}></div>
          </div>
        </div>
        
        {/* Question */}
        <div className="mb-8">
          <h3 className="text-xl mb-6">Сіз жаңа адамдармен тез тіл табыса аласыз ба?</h3>
          
          <div className="space-y-3">
            {[
              "Мүлдем келіспеймін",
              "Келіспеймін",
              "Бейтарап",
              "Келісемін",
              "Толықтай келісемін"
            ].map((option, index) => (
              <div 
                key={index}
                onClick={() => setSelectedOption(index)}
                className={`p-4 border rounded-lg cursor-pointer transition-colors
                  ${selectedOption === index 
                    ? 'border-blue-600 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'}`}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3
                    ${selectedOption === index 
                      ? 'border-blue-600' 
                      : 'border-gray-300'}`}
                  >
                    {selectedOption === index && (
                      <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <button className="flex items-center text-sm text-gray-500">
            <SkipForward className="h-4 w-4 mr-1" /> Сақтау және шығу
          </button>
          
          <Button 
            className="flex items-center" 
            disabled={selectedOption === null}
          >
            Келесі <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        
        <div className="mt-10 text-center">
          <button className="flex items-center text-sm text-gray-500 mx-auto">
            <HelpCircle className="h-4 w-4 mr-1" /> Көмек керек пе?
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestQuestionPage;
