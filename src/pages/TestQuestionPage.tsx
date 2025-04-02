
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, SkipForward, HelpCircle } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";

// Define the question types
type QuestionType = 'personality' | 'skills' | 'interests' | 'values';

// Question interface
interface Question {
  id: number;
  text: string;
  type: QuestionType;
  options: string[];
}

// Test data with categories of questions
const testQuestions: Question[] = [
  // Personality questions
  {
    id: 1,
    text: "Сіз жаңа адамдармен тез тіл табыса аласыз ба?",
    type: "personality",
    options: [
      "Мүлдем келіспеймін",
      "Келіспеймін",
      "Бейтарап",
      "Келісемін",
      "Толықтай келісемін"
    ]
  },
  {
    id: 2,
    text: "Сіз көпшілік алдында сөйлеуді ұнатасыз ба?",
    type: "personality",
    options: [
      "Мүлдем келіспеймін",
      "Келіспеймін",
      "Бейтарап",
      "Келісемін",
      "Толықтай келісемін"
    ]
  },
  {
    id: 3,
    text: "Сіз жаңа идеяларды ойлап табуды ұнатасыз ба?",
    type: "personality",
    options: [
      "Мүлдем келіспеймін",
      "Келіспеймін",
      "Бейтарап",
      "Келісемін",
      "Толықтай келісемін"
    ]
  },
  {
    id: 4,
    text: "Сіз мәселелерді шешу кезінде логикалық ойлауды қолданасыз ба?",
    type: "personality",
    options: [
      "Мүлдем келіспеймін",
      "Келіспеймін",
      "Бейтарап",
      "Келісемін",
      "Толықтай келісемін"
    ]
  },
  // Skills questions
  {
    id: 5,
    text: "Сіз математикалық есептерді шешуге қаншалықты жақсысыз?",
    type: "skills",
    options: [
      "Өте нашар",
      "Нашар",
      "Орташа",
      "Жақсы",
      "Өте жақсы"
    ]
  },
  {
    id: 6,
    text: "Сіз шет тілдерін үйренуге қаншалықты бейімсіз?",
    type: "skills",
    options: [
      "Өте нашар",
      "Нашар",
      "Орташа",
      "Жақсы",
      "Өте жақсы"
    ]
  },
  {
    id: 7,
    text: "Сіз өнермен айналысу қаншалықты ұнатасыз?",
    type: "skills",
    options: [
      "Өте нашар",
      "Нашар",
      "Орташа",
      "Жақсы",
      "Өте жақсы"
    ]
  },
  // Interest questions
  {
    id: 8,
    text: "Техникалық құрылғылармен жұмыс істеу сізге қаншалықты қызықты?",
    type: "interests",
    options: [
      "Мүлдем қызық емес",
      "Қызық емес",
      "Бейтарап",
      "Қызықты",
      "Өте қызықты"
    ]
  },
  {
    id: 9,
    text: "Адамдарға көмектесу қаншалықты маңызды сізге?",
    type: "interests",
    options: [
      "Мүлдем маңызды емес",
      "Маңызды емес",
      "Бейтарап",
      "Маңызды",
      "Өте маңызды"
    ]
  },
  {
    id: 10,
    text: "Ғылыми зерттеулер жүргізу қаншалықты қызықты сізге?",
    type: "interests",
    options: [
      "Мүлдем қызық емес",
      "Қызық емес",
      "Бейтарап",
      "Қызықты",
      "Өте қызықты"
    ]
  },
  // Values questions
  {
    id: 11,
    text: "Сіз үшін жоғары жалақы алу қаншалықты маңызды?",
    type: "values",
    options: [
      "Мүлдем маңызды емес",
      "Маңызды емес",
      "Бейтарап",
      "Маңызды",
      "Өте маңызды"
    ]
  },
  {
    id: 12,
    text: "Жұмыс кезінде шығармашылықпен айналысу сіз үшін қаншалықты маңызды?",
    type: "values",
    options: [
      "Мүлдем маңызды емес",
      "Маңызды емес",
      "Бейтарап",
      "Маңызды",
      "Өте маңызды"
    ]
  },
  {
    id: 13,
    text: "Жұмыста мансаптық өсу мүмкіндігі сіз үшін қаншалықты маңызды?",
    type: "values",
    options: [
      "Мүлдем маңызды емес",
      "Маңызды емес",
      "Бейтарап",
      "Маңызды",
      "Өте маңызды"
    ]
  },
  {
    id: 14,
    text: "Қоғамға пайда әкелетін жұмыс істеу сіз үшін қаншалықты маңызды?",
    type: "values",
    options: [
      "Мүлдем маңызды емес",
      "Маңызды емес",
      "Бейтарап",
      "Маңызды",
      "Өте маңызды"
    ]
  },
  {
    id: 15,
    text: "Жұмыс пен жеке өмірдің тепе-теңдігі сіз үшін қаншалықты маңызды?",
    type: "values",
    options: [
      "Мүлдем маңызды емес",
      "Маңызды емес",
      "Бейтарап",
      "Маңызды",
      "Өте маңызды"
    ]
  },
  // More interests questions
  {
    id: 16,
    text: "Өнермен айналысу сізге қаншалықты қызықты?",
    type: "interests",
    options: [
      "Мүлдем қызық емес",
      "Қызық емес",
      "Бейтарап",
      "Қызықты",
      "Өте қызықты"
    ]
  },
  {
    id: 17,
    text: "Бизнес және экономика саласы сізге қаншалықты қызықты?",
    type: "interests",
    options: [
      "Мүлдем қызық емес",
      "Қызық емес",
      "Бейтарап",
      "Қызықты",
      "Өте қызықты"
    ]
  },
  {
    id: 18,
    text: "Медицина саласы сізге қаншалықты қызықты?",
    type: "interests",
    options: [
      "Мүлдем қызық емес",
      "Қызық емес",
      "Бейтарап",
      "Қызықты",
      "Өте қызықты"
    ]
  },
  {
    id: 19,
    text: "IT және компьютерлік технологиялар саласы сізге қаншалықты қызықты?",
    type: "interests",
    options: [
      "Мүлдем қызық емес",
      "Қызық емес",
      "Бейтарап",
      "Қызықты",
      "Өте қызықты"
    ]
  },
  {
    id: 20,
    text: "Педагогика және оқыту саласы сізге қаншалықты қызықты?",
    type: "interests",
    options: [
      "Мүлдем қызық емес",
      "Қызық емес",
      "Бейтарап",
      "Қызықты",
      "Өте қызықты"
    ]
  },
];

// Majors categories based on test results
const majorCategories = [
  {
    name: "IT және инженерия",
    description: "Компьютерлік жүйелер, бағдарламалау және инженерия саласындағы мамандықтар",
    majors: ["Компьютерлік ғылымдар", "Ақпараттық технология", "Бағдарламалық жасақтама инженериясы", "Кибер қауіпсіздік", "Деректерді талдау"]
  },
  {
    name: "Бизнес және экономика",
    description: "Бизнес, қаржы және экономика саласындағы мамандықтар",
    majors: ["Бизнес әкімшілігі", "Қаржы", "Маркетинг", "Бухгалтерлік есеп", "Менеджмент"]
  },
  {
    name: "Медицина және денсаулық сақтау",
    description: "Медицина және денсаулық сақтау саласындағы мамандықтар",
    majors: ["Жалпы медицина", "Фармацевтика", "Мейірбике ісі", "Дәрігерлік жедел жәрдем", "Стоматология"]
  },
  {
    name: "Әлеуметтік ғылымдар",
    description: "Психология, әлеуметтану және басқа әлеуметтік ғылымдар",
    majors: ["Психология", "Әлеуметтану", "Әлеуметтік жұмыс", "Саясаттану", "Халықаралық қатынастар"]
  },
  {
    name: "Гуманитарлық ғылымдар",
    description: "Тілдер, тарих, философия және басқа гуманитарлық ғылымдар",
    majors: ["Филология", "Шет тілдері", "Тарих", "Философия", "Мәдениеттану"]
  },
  {
    name: "Өнер және дизайн",
    description: "Шығармашылық салалар мен өнер",
    majors: ["Графикалық дизайн", "Сәулет", "Музыка", "Театр өнері", "Бейнелеу өнері"]
  }
];

const TestQuestionPage: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Array<number | null>>(Array(testQuestions.length).fill(null));
  const [exitDialogOpen, setExitDialogOpen] = useState(false);
  const [helpDialogOpen, setHelpDialogOpen] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [topCategories, setTopCategories] = useState<string[]>([]);
  
  const navigate = useNavigate();

  const currentQuestion = testQuestions[currentQuestionIndex];
  
  useEffect(() => {
    // If showing results, calculate the top categories
    if (showResults) {
      calculateResults();
    }
  }, [showResults]);

  const handleOptionSelect = (index: number) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestionIndex] = index;
    setSelectedOptions(newSelectedOptions);
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < testQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Show results when all questions are answered
      setShowResults(true);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateResults = () => {
    // Example scoring algorithm: count interests and values
    const scores: Record<string, number> = {
      "IT және инженерия": 0,
      "Бизнес және экономика": 0,
      "Медицина және денсаулық сақтау": 0,
      "Әлеуметтік ғылымдар": 0,
      "Гуманитарлық ғылымдар": 0,
      "Өнер және дизайн": 0
    };
    
    // Very simplified scoring system
    selectedOptions.forEach((option, questionIndex) => {
      if (option === null) return;
      
      const question = testQuestions[questionIndex];
      
      // Apply different weights to different questions
      if (question.type === "interests") {
        // IT-related interests
        if (question.id === 8 || question.id === 19) {
          scores["IT және инженерия"] += option;
        }
        // Business
        if (question.id === 17) {
          scores["Бизнес және экономика"] += option;
        }
        // Medicine
        if (question.id === 18) {
          scores["Медицина және денсаулық сақтау"] += option;
        }
        // Art
        if (question.id === 7 || question.id === 16) {
          scores["Өнер және дизайн"] += option;
        }
        // Teaching
        if (question.id === 20) {
          scores["Гуманитарлық ғылымдар"] += option;
          scores["Әлеуметтік ғылымдар"] += option;
        }
        // Helping people
        if (question.id === 9) {
          scores["Медицина және денсаулық сақтау"] += option;
          scores["Әлеуметтік ғылымдар"] += option;
        }
        // Science
        if (question.id === 10) {
          scores["IT және инженерия"] += option;
          scores["Медицина және денсаулық сақтау"] += option;
        }
      }
      
      // Skills-based scores
      if (question.type === "skills") {
        // Math skills
        if (question.id === 5) {
          scores["IT және инженерия"] += option;
          scores["Бизнес және экономика"] += option;
        }
        // Language skills
        if (question.id === 6) {
          scores["Гуманитарлық ғылымдар"] += option;
        }
        // Art skills
        if (question.id === 7) {
          scores["Өнер және дизайн"] += option;
        }
      }
      
      // Add more scoring logic as needed
    });
    
    // Sort and get top 2 categories
    const sortedCategories = Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .map(entry => entry[0]);
    
    setTopCategories(sortedCategories.slice(0, 2));
  };

  const progressPercentage = ((currentQuestionIndex + 1) / testQuestions.length) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8">
      {!showResults ? (
        <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Мансап тесті</h2>
            <button 
              className="text-gray-400 hover:text-gray-600"
              onClick={() => setExitDialogOpen(true)}
            >
              <span className="sr-only">Жабу</span>
              &times;
            </button>
          </div>
          
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-500 mb-1">
              <span>Прогресс</span>
              <span>{currentQuestionIndex + 1}/{testQuestions.length} сұрақ</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-300" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
          
          {/* Question */}
          <div className="mb-8">
            <h3 className="text-xl mb-6">{currentQuestion.text}</h3>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <div 
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors
                    ${selectedOptions[currentQuestionIndex] === index 
                      ? 'border-blue-600 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3
                      ${selectedOptions[currentQuestionIndex] === index 
                        ? 'border-blue-600' 
                        : 'border-gray-300'}`}
                    >
                      {selectedOptions[currentQuestionIndex] === index && (
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
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline"
                onClick={() => setExitDialogOpen(true)}
                className="flex items-center text-sm text-gray-500"
              >
                <SkipForward className="h-4 w-4 mr-1" /> Сақтау және шығу
              </Button>
              
              {currentQuestionIndex > 0 && (
                <Button
                  variant="outline"
                  onClick={goToPreviousQuestion}
                  className="flex items-center"
                >
                  <ArrowLeft className="mr-1 h-4 w-4" /> Алдыңғы
                </Button>
              )}
            </div>
            
            <Button 
              className="flex items-center" 
              onClick={goToNextQuestion}
              disabled={selectedOptions[currentQuestionIndex] === null}
            >
              {currentQuestionIndex < testQuestions.length - 1 ? (
                <>Келесі <ArrowRight className="ml-1 h-4 w-4" /></>
              ) : (
                <>Нәтижелер <ArrowRight className="ml-1 h-4 w-4" /></>
              )}
            </Button>
          </div>
          
          <div className="mt-10 text-center">
            <button 
              onClick={() => setHelpDialogOpen(true)}
              className="flex items-center text-sm text-gray-500 mx-auto"
            >
              <HelpCircle className="h-4 w-4 mr-1" /> Көмек керек пе?
            </button>
          </div>
        </div>
      ) : (
        // Test Results
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Тест нәтижелері</h2>
            <p className="text-gray-600">Сізге сәйкес келетін мамандық бағыттары:</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {topCategories.map((category, index) => {
              const categoryData = majorCategories.find(c => c.name === category);
              if (!categoryData) return null;
              
              return (
                <Card key={index} className={index === 0 ? "border-blue-500 border-2" : ""}>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-2">{categoryData.name}</h3>
                    <p className="text-gray-600 mb-4">{categoryData.description}</p>
                    
                    <h4 className="font-semibold mb-2">Мамандықтар:</h4>
                    <ul className="list-disc pl-5">
                      {categoryData.majors.map((major, idx) => (
                        <li key={idx} className="mb-1">{major}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/universities')}
              className="flex items-center"
            >
              Университеттерді қарау
            </Button>
            <Button 
              onClick={() => navigate('/majors')}
              variant="outline"
              className="flex items-center"
            >
              Мамандықтар туралы
            </Button>
            <Button 
              onClick={() => navigate('/counseling')}
              variant="outline"
              className="flex items-center"
            >
              Кеңес алу
            </Button>
          </div>
        </div>
      )}
      
      {/* Exit Dialog */}
      <Dialog open={exitDialogOpen} onOpenChange={setExitDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Тесттен шығу</DialogTitle>
          </DialogHeader>
          <p>Сіз шынымен тесттен шыққыңыз келе ме? Сіздің жауаптарыңыз сақталмауы мүмкін.</p>
          <DialogFooter className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setExitDialogOpen(false)}>
              Жоқ, жалғастыру
            </Button>
            <Button onClick={() => navigate('/test')}>
              Иә, шығу
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Help Dialog */}
      <Dialog open={helpDialogOpen} onOpenChange={setHelpDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Тест туралы көмек</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Бұл тест сіздің мінезіңіз, қызығушылықтарыңыз және қабілеттеріңіз негізінде сізге ең қолайлы мамандықтарды анықтауға көмектеседі.</p>
            <p>Әрбір сұраққа адал жауап беріңіз. Дұрыс немесе бұрыс жауаптар жоқ.</p>
            <p>Тестті аяқтағаннан кейін, сізге сәйкес келетін мамандықтар көрсетіледі.</p>
          </div>
          <DialogFooter>
            <Button onClick={() => setHelpDialogOpen(false)}>
              Түсінікті
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TestQuestionPage;
