
import React from 'react';
import { TestQuestion as QuestionType } from '@/data/testQuestions';
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CareerCategory } from '@/data/testQuestions';
import { ArrowRight } from 'lucide-react';

interface TestQuestionProps {
  question: QuestionType;
  onAnswer: (optionId: string, category: CareerCategory) => void;
  onNext: () => void;
  selectedOptionId?: string;
  questionNumber: number;
  totalQuestions: number;
}

const TestQuestion: React.FC<TestQuestionProps> = ({ 
  question, 
  onAnswer, 
  onNext, 
  selectedOptionId,
  questionNumber,
  totalQuestions
}) => {
  const handleChange = (value: string) => {
    const option = question.options.find(opt => opt.id === value);
    if (option) {
      onAnswer(value, option.category);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6">{question.question}</h2>

      <RadioGroup 
        value={selectedOptionId} 
        onValueChange={handleChange}
        className="space-y-4"
      >
        {question.options.map(option => (
          <div key={option.id} className="flex items-center space-x-3 border rounded-lg p-3 hover:bg-gray-50">
            <RadioGroupItem value={option.id} id={option.id} />
            <Label htmlFor={option.id} className="flex-1 cursor-pointer">
              {option.text}
            </Label>
          </div>
        ))}
      </RadioGroup>

      <div className="mt-6 flex justify-end">
        <Button 
          onClick={onNext} 
          disabled={!selectedOptionId}
          className="px-6"
        >
          {questionNumber === totalQuestions ? 'Аяқтау' : 'Келесі сұрақ'} 
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="mt-6 text-sm text-gray-500 text-center">
        Сұрақ {questionNumber}/{totalQuestions}
      </div>
    </div>
  );
};

export default TestQuestion;
