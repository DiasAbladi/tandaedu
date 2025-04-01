
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Brain, Users, BookOpen } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const CareerTestPage: React.FC = () => {
  const navigate = useNavigate();
  
  const startTest = () => {
    navigate('/test/question');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Мамандық таңдау тесті</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Болашақ мамандығыңызды анықтауға көмектесетін интерактивті тест
            </p>
          </div>
          
          <div className="bg-white shadow-md rounded-xl p-12 max-w-xl mx-auto text-center mb-16">
            <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <span className="text-blue-600 text-2xl">?</span>
            </div>
            <p className="text-lg mb-6">Тест 15-20 минут уақытыңызды алады</p>
            <Button size="lg" onClick={startTest} className="px-8">
              Тестті бастау
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white p-6 rounded-lg border">
              <Brain className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Қызығушылықтарыңыз</h3>
              <p className="text-gray-600">Сіздің қызығушылықтарыңыз бен бейімділіктеріңізді анықтау</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border">
              <Users className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Қабілеттеріңіз</h3>
              <p className="text-gray-600">Сіздің дағдыларыңыз бен қабілеттеріңізді бағалау</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border">
              <BookOpen className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Мамандық ұсыныстары</h3>
              <p className="text-gray-600">Сізге ең қолайлы мамандықтарды анықтау</p>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Қалай жұмыс істейді?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-blue-600">1</span>
                </div>
                <h3 className="font-bold mb-2">Тестті бастау</h3>
                <p className="text-sm text-gray-600">Тіркеліп, тестті бастаңыз</p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-blue-600">2</span>
                </div>
                <h3 className="font-bold mb-2">Сұрақтарға жауап беру</h3>
                <p className="text-sm text-gray-600">Барлық сұрақтарға жауап беріңіз</p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-blue-600">3</span>
                </div>
                <h3 className="font-bold mb-2">Нәтижелерді алу</h3>
                <p className="text-sm text-gray-600">Толық талдау алыңыз</p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-blue-600">4</span>
                </div>
                <h3 className="font-bold mb-2">Университеттер</h3>
                <p className="text-sm text-gray-600">Ұсынылған оқу орындарын көріңіз</p>
              </div>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Пікірлер</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg border">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-bold">Айдана Серікова</h4>
                    <p className="text-sm text-gray-500">Студент</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  "Тест маған болашақ мамандығымды таңдауға көмектесті. Қазір таңдаған мамандығыма өте ризамын."
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-bold">Бақыт Асқаров</h4>
                    <p className="text-sm text-gray-500">Оқушы</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  "Тест нәтижелері менің қызығушылықтарыма сәйкес келді және жаңа мүмкіндіктер ашты."
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-bold">Мақсат Ерланұлы</h4>
                    <p className="text-sm text-gray-500">Мектеп түлегі</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  "Өте пайдалы тест. Мамандық таңдауда көп көмегін тигізді!"
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Button size="lg" onClick={startTest} className="px-8">
              Тестті бастау
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CareerTestPage;
