
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Clock, AlertTriangle } from "lucide-react";
import { AuthContext } from '@/contexts/AuthContext';
import { useToast } from "@/components/ui/use-toast";
import { LanguageContext } from '@/contexts/LanguageContext';

interface Question {
  id: number;
  text: {
    kk: string;
    ru: string;
  };
  options: {
    id: string;
    text: {
      kk: string;
      ru: string;
    };
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: {
      kk: 'Сізге қай саладағы жұмыс қызықтырады?',
      ru: 'Какая сфера работы вас интересует?'
    },
    options: [
      { id: 'a', text: { kk: 'Технология', ru: 'Технология' } },
      { id: 'b', text: { kk: 'Медицина', ru: 'Медицина' } },
      { id: 'c', text: { kk: 'Бизнес', ru: 'Бизнес' } },
      { id: 'd', text: { kk: 'Өнер', ru: 'Искусство' } }
    ]
  },
  {
    id: 2,
    text: {
      kk: 'Сіз қандай жұмыс ортасын қалайсыз?',
      ru: 'Какую рабочую среду вы предпочитаете?'
    },
    options: [
      { id: 'a', text: { kk: 'Офис', ru: 'Офис' } },
      { id: 'b', text: { kk: 'Дала жұмысы', ru: 'Полевая работа' } },
      { id: 'c', text: { kk: 'Үйден жұмыс', ru: 'Работа из дома' } },
      { id: 'd', text: { kk: 'Аралас', ru: 'Смешанная' } }
    ]
  },
  {
    id: 3,
    text: {
      kk: 'Сіздің күшті жақтарыңыз қандай?',
      ru: 'Каковы ваши сильные стороны?'
    },
    options: [
      { id: 'a', text: { kk: 'Аналитикалық ойлау', ru: 'Аналитическое мышление' } },
      { id: 'b', text: { kk: 'Креативтілік', ru: 'Креативность' } },
      { id: 'c', text: { kk: 'Коммуникация', ru: 'Коммуникация' } },
      { id: 'd', text: { kk: 'Ұйымдастыру қабілеті', ru: 'Организационные способности' } }
    ]
  },
  {
    id: 4,
    text: {
      kk: 'Қандай жұмыс кестесі сізге қолайлы?',
      ru: 'Какой рабочий график вам удобен?'
    },
    options: [
      { id: 'a', text: { kk: 'Стандартты 9-18', ru: 'Стандартный 9-18' } },
      { id: 'b', text: { kk: 'Икемді график', ru: 'Гибкий график' } },
      { id: 'c', text: { kk: 'Ауысымды жұмыс', ru: 'Сменная работа' } },
      { id: 'd', text: { kk: 'Жобалық жұмыс', ru: 'Проектная работа' } }
    ]
  },
  {
    id: 5,
    text: {
      kk: 'Сізге қандай жұмыс міндеттері ұнайды?',
      ru: 'Какие рабочие задачи вам нравятся?'
    },
    options: [
      { id: 'a', text: { kk: 'Мәселелерді шешу', ru: 'Решение проблем' } },
      { id: 'b', text: { kk: 'Адамдармен жұмыс', ru: 'Работа с людьми' } },
      { id: 'c', text: { kk: 'Шығармашылық жобалар', ru: 'Творческие проекты' } },
      { id: 'd', text: { kk: 'Зерттеу және талдау', ru: 'Исследования и анализ' } }
    ]
  },
  // Добавьте больше вопросов по необходимости
];

interface TestAnswer {
  questionId: number;
  answerId: string;
}

interface TestHistory {
  id: string;
  date: string;
  answers: TestAnswer[];
  result: string;
}

const TestQuestionPage: React.FC = () => {
  const { currentLanguage } = useContext(LanguageContext);
  const { testAttemptsRemaining, decrementTestAttempts } = useContext(AuthContext);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answers, setAnswers] = useState<TestAnswer[]>([]);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const [testHistory, setTestHistory] = useState<TestHistory[]>(() => {
    const savedHistory = localStorage.getItem('testHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });
  
  useEffect(() => {
    // Check if user has attempts remaining
    if (testAttemptsRemaining <= 0) {
      toast({
        title: currentLanguage === 'kk' ? "Мүмкіндік аяқталды" : "Возможности исчерпаны",
        description: currentLanguage === 'kk' 
          ? "Сіз барлық тегін тест мүмкіндіктерін пайдаландыңыз" 
          : "Вы использовали все бесплатные попытки теста",
        variant: "destructive"
      });
      navigate('/test');
      return;
    }
    
    // Save test history to localStorage when it changes
    localStorage.setItem('testHistory', JSON.stringify(testHistory));
  }, [testHistory, testAttemptsRemaining]);
  
  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          // Time's up - finish the test
          endTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const nextQuestion = () => {
    if (!selectedOption) {
      toast({
        title: currentLanguage === 'kk' ? "Жауап таңдаңыз" : "Выберите ответ",
        description: currentLanguage === 'kk' 
          ? "Жалғастыру үшін жауап нұсқасын таңдаңыз" 
          : "Выберите вариант ответа, чтобы продолжить",
        variant: "destructive"
      });
      return;
    }
    
    // Save the answer
    setAnswers([...answers, {
      questionId: questions[currentQuestion].id,
      answerId: selectedOption
    }]);
    
    // Move to the next question or finish the test
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedOption(null);
    } else {
      endTest();
    }
  };
  
  const endTest = () => {
    // Save the last answer if there is one
    if (selectedOption && currentQuestion < questions.length) {
      setAnswers(prev => [...prev, {
        questionId: questions[currentQuestion].id,
        answerId: selectedOption
      }]);
    }
    
    // Create test result based on answers
    const testResult = determineResult(answers);
    
    // Add to history
    const newTestRecord: TestHistory = {
      id: `test-${Date.now()}`,
      date: new Date().toISOString(),
      answers: answers,
      result: testResult
    };
    
    setTestHistory(prev => [newTestRecord, ...prev]);
    
    // Decrement remaining attempts
    decrementTestAttempts();
    
    // Navigate to the results page or show results
    toast({
      title: currentLanguage === 'kk' ? "Тест аяқталды" : "Тест завершен",
      description: currentLanguage === 'kk' 
        ? "Сіздің нәтижеңіз: " + testResult 
        : "Ваш результат: " + testResult,
    });
    
    navigate('/test');
  };
  
  const determineResult = (testAnswers: TestAnswer[]): string => {
    // Simple logic to determine a result based on answers
    // This would be more sophisticated in a real app
    const answerCounts: Record<string, number> = {
      'a': 0, 'b': 0, 'c': 0, 'd': 0
    };
    
    testAnswers.forEach(answer => {
      if (answerCounts[answer.answerId] !== undefined) {
        answerCounts[answer.answerId]++;
      }
    });
    
    const maxCount = Math.max(...Object.values(answerCounts));
    const mostCommonAnswer = Object.keys(answerCounts).find(key => answerCounts[key] === maxCount) || 'a';
    
    const results = {
      'a': currentLanguage === 'kk' ? 'IT маманы' : 'Специалист IT',
      'b': currentLanguage === 'kk' ? 'Медицина маманы' : 'Медицинский специалист',
      'c': currentLanguage === 'kk' ? 'Бизнес аналитик' : 'Бизнес-аналитик',
      'd': currentLanguage === 'kk' ? 'Креативті маман' : 'Креативный специалист'
    };
    
    return results[mostCommonAnswer as keyof typeof results];
  };
  
  // Warning threshold for timer - 2 minutes
  const isTimeWarning = timeLeft <= 120;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6 max-w-3xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">
                {currentLanguage === 'kk' ? 'Кәсіби бағдар тесті' : 'Профессиональный ориентационный тест'}
              </h1>
              <p className="text-muted-foreground">
                {currentLanguage === 'kk' 
                  ? `Сұрақ ${currentQuestion + 1} / ${questions.length}` 
                  : `Вопрос ${currentQuestion + 1} / ${questions.length}`}
              </p>
            </div>
            
            <div className={`flex items-center ${isTimeWarning ? 'text-red-500' : 'text-gray-600'}`}>
              <Clock className={`mr-2 h-5 w-5 ${isTimeWarning ? 'animate-pulse' : ''}`} />
              <span className="font-bold">{formatTime(timeLeft)}</span>
            </div>
          </div>
          
          <Progress value={(currentQuestion / questions.length) * 100} className="mb-8" />
          
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-6">
              {questions[currentQuestion]?.text[currentLanguage]}
            </h2>
            
            <RadioGroup value={selectedOption || ''} onValueChange={setSelectedOption} className="space-y-4">
              {questions[currentQuestion]?.options.map(option => (
                <div key={option.id} className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-gray-50">
                  <RadioGroupItem value={option.id} id={`option-${option.id}`} />
                  <Label htmlFor={`option-${option.id}`} className="flex-1 cursor-pointer">
                    {option.text[currentLanguage]}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          {isTimeWarning && (
            <div className="bg-red-50 border border-red-200 rounded p-4 flex items-center mb-8">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-red-700">
                {currentLanguage === 'kk' 
                  ? 'Уақыт аз қалды! Жауаптарыңызды аяқтаңыз.' 
                  : 'Осталось мало времени! Завершите свои ответы.'}
              </span>
            </div>
          )}
          
          <div className="flex justify-between">
            <Button 
              variant="outline"
              onClick={() => navigate('/test')}
            >
              {currentLanguage === 'kk' ? 'Бас тарту' : 'Отмена'}
            </Button>
            
            <Button onClick={nextQuestion}>
              {currentQuestion < questions.length - 1 
                ? (currentLanguage === 'kk' ? 'Келесі' : 'Далее') 
                : (currentLanguage === 'kk' ? 'Аяқтау' : 'Завершить')}
            </Button>
          </div>
          
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">
              {currentLanguage === 'kk' 
                ? `Қалған тегін талпыныстар: ${testAttemptsRemaining}` 
                : `Оставшиеся бесплатные попытки: ${testAttemptsRemaining}`}
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TestQuestionPage;
