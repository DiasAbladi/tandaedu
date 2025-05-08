
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, BarChart2 } from 'lucide-react';
import { TestResult } from '@/hooks/useCareerTest';
import { categories, categoryDescriptions, CareerCategory } from '@/data/testQuestions';
import { Link } from 'react-router-dom';
import { Major } from '@/data/majorTypes';
import { majorsData } from '@/data/majors';
import { Card, CardContent } from "@/components/ui/card";

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
    <div className="flex flex-col items-center">
      {/* Test Completed Card */}
      <Card className="w-full max-w-lg mx-auto mb-8">
        <CardContent className="flex flex-col items-center pt-8 pb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Check className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold mb-2">Тест аяқталды!</h2>
          <p className="text-gray-500 mb-6">Құттықтаймыз! Сіз барлығы {result.totalAnswers} сұраққа жауап бердіңіз</p>
          
          <p className="text-gray-600 mb-6">Енді сізге ең қолайлы мамандық бағыттарын көре аласыз</p>
          
          <div className="flex gap-3 w-full">
            <Button 
              className="w-full" 
              onClick={() => {
                document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Нәтижелерді көру <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              onClick={onRestart} 
              className="w-full"
            >
              Тестті қайта бастау
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      <div id="results-section" className="bg-white rounded-lg p-6 shadow-sm w-full">
        <div className="mb-6">
          <h3 className="font-bold text-lg mb-4">Сізге ең қолайлы мамандық бағыттары</h3>
          
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
      
      {/* Additional Information Section */}
      <div className="mt-12 w-full">
        <h2 className="text-2xl font-bold mb-8 text-center">Мамандық таңдау туралы ақпарат</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-3">Кәсіби бағдар тесті дегеніміз не?</h3>
              <p className="text-gray-600">
                Кәсіби бағдар тесті - бұл сіздің қызығушылықтарыңыз, қабілеттеріңіз және құндылықтарыңызға негізделген мамандық таңдауға көмектесетін құрал.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-3">Тест нәтижелерін қалай пайдалану керек?</h3>
              <p className="text-gray-600">
                Тест нәтижелері - бұл бағыттаушы құрал. Оны мамандық таңдау туралы шешім қабылдаудың бір бөлігі ретінде қарастырыңыз.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-3">Келесі қадамдар</h3>
              <p className="text-gray-600">
                Ұсынылған мамандықтар туралы көбірек біліңіз, осы салада жұмыс істейтін мамандармен сөйлесіңіз, оқу орындарын зерттеңіз.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-blue-50 p-8 rounded-lg mb-12">
          <h3 className="text-xl font-bold mb-4 text-center">Мамандық таңдау кезінде ескеретін факторлар</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold mb-2">Қызығушылықтар</h4>
              <p className="text-gray-600 mb-4">
                Сізге шынымен ұнайтын іс-әрекеттерді таңдаңыз. Қызығушылық танытатын салада жұмыс істеу мотивацияңызды арттырады.
              </p>
              
              <h4 className="font-bold mb-2">Қабілеттер</h4>
              <p className="text-gray-600">
                Сіздің табиғи талантыңыз бен дағдыларыңызды ескеріңіз. Нені жақсы істей аласыз және нені үйренгіңіз келеді?
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-2">Құндылықтар</h4>
              <p className="text-gray-600 mb-4">
                Сіз үшін не маңызды? Шығармашылық, тұрақтылық, дербестік әлде басқалар?
              </p>
              
              <h4 className="font-bold mb-2">Еңбек нарығы</h4>
              <p className="text-gray-600">
                Таңдаған мамандықтың болашақтағы перспективаларын, жалақы мөлшерін және жұмысқа орналасу мүмкіндіктерін зерттеңіз.
              </p>
            </div>
          </div>
        </div>
        
        <div className="text-center mb-12">
          <h3 className="text-xl font-bold mb-4">Әлі сұрақтарыңыз бар ма?</h3>
          <p className="text-gray-600 mb-6">
            Мамандық таңдау - маңызды шешім. Біздің кәсіби мамандармен ақылдасыңыз.
          </p>
          <Link to="/consulting">
            <Button size="lg">
              Консультация алу
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TestResults;
