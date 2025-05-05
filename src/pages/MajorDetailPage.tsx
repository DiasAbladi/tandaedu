import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  Book, 
  Clock, 
  DollarSign, 
  Building, 
  ArrowLeft, 
  Briefcase,
  Star,
  ChevronRight
} from "lucide-react";
import { majorsData } from '@/data/majors';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useLanguage } from '@/contexts/LanguageContext';

const MajorDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  
  const major = majorsData.find(m => m.id === id);
  
  if (!major) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container px-4 md:px-6 py-16 flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Мамандық табылмады</h1>
            <p className="text-gray-600 mb-8">Сіз іздеген мамандық туралы ақпарат табылмады.</p>
            <Button onClick={() => navigate('/majors')}>
              Барлық мамандықтарға оралу
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Ұқсас мамандықтар
  const relatedMajors = majorsData
    .filter(m => m.category === major.category && m.id !== major.id)
    .slice(0, 3);

  // Пәндерді бөлу функциясы
  const getSubjectsList = (subjectsString: string) => {
    // Биология – Химия / Математика – Физика форматындағы жолды бөлеміз
    return subjectsString.split(/\s*[–-]\s*|\s*\/\s*/).filter(s => s.trim());
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-blue-600 text-white py-16">
        <div className="container px-4 md:px-6">
          <Link to="/majors" className="inline-flex items-center text-blue-50 hover:text-white mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Барлық мамандықтарға оралу
          </Link>

          <div className="bg-blue-700 rounded-lg p-6 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div className="flex items-center">
                <div className="p-4 bg-blue-800 rounded-full mr-4">
                  {<major.icon className="h-12 w-12" />}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className="bg-blue-500 hover:bg-blue-500/90">{major.code}</Badge>
                    <Badge variant="outline" className="border-blue-400 text-blue-50">{major.category}</Badge>
                  </div>
                  <h1 className="text-3xl font-bold">{major.name}</h1>
                </div>
              </div>
              <div className="flex flex-col items-start md:items-end">
                <div className={`inline-block px-3 py-1 text-sm font-medium rounded-full mb-2
                  ${major.badge === "Жоғары сұраныс" ? "bg-green-600 text-green-50" : 
                  major.badge === "Орташа сұраныс" ? "bg-yellow-600 text-yellow-50" : 
                  "bg-blue-800 text-blue-50"}`}>
                  {major.badge}
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-2">Шекті балл:</span>
                  <span className="text-2xl font-bold">{major.minScore || "–"}</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-800/50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Book className="h-5 w-5 mr-2" />
                  <span className="text-sm text-blue-200">Пәндер</span>
                </div>
                <p className="font-medium">{major.subjects}</p>
              </div>
              <div className="bg-blue-800/50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Clock className="h-5 w-5 mr-2" />
                  <span className="text-sm text-blue-200">Оқу мерзімі</span>
                </div>
                <p className="font-medium">{major.duration}</p>
              </div>
              <div className="bg-blue-800/50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <DollarSign className="h-5 w-5 mr-2" />
                  <span className="text-sm text-blue-200">Орташа жалақы</span>
                </div>
                <p className="font-medium">{major.salary}</p>
              </div>
              <div className="bg-blue-800/50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Building className="h-5 w-5 mr-2" />
                  <span className="text-sm text-blue-200">Бағдарлама түрі</span>
                </div>
                <p className="font-medium">Бакалавриат</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 md:px-6 py-12">
        <Tabs defaultValue="about" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="about">Мамандық туралы</TabsTrigger>
            <TabsTrigger value="curriculum">Оқу ақысы</TabsTrigger>
            <TabsTrigger value="career">Жұмыс орындары</TabsTrigger>
            <TabsTrigger value="universities">Университеттер</TabsTrigger>
          </TabsList>
          
          <TabsContent value="about" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Мамандық сипаттамасы</h2>
              <p className="text-gray-700 leading-relaxed">
                {major.description}
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Бұл мамандық бойынша ҰБТ-да ең жоғары балл жинаған талапкерлер грант негізінде оқуға түсе алады. 2024 жылы шекті балл: {major.minScore || "белгісіз"}.
              </p>
            </div>

            <Separator />
            
            <div>
              <h2 className="text-2xl font-bold mb-4">Талап етілетін пәндер</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-medium mb-4">Профильдік пәндер</h3>
                  <div className="space-y-3">
                    {getSubjectsList(major.subjects).map((subject, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        <span>{subject}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-medium mb-4">Міндетті пәндер</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span>Математикалық сауаттылық</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span>Оқу сауаттылығы</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span>Қазақстан тарихы</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="curriculum">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Оқу ақысы</h2>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Университет</TableHead>
                    <TableHead>Жылдық төлем</TableHead>
                    <TableHead>Грант саны (2023)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>ҚазҰУ (әл-Фараби атындағы)</TableCell>
                    <TableCell>1,200,000 ₸ - 1,500,000 ₸</TableCell>
                    <TableCell>25</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>ЕҰУ (Гумилев атындағы)</TableCell>
                    <TableCell>1,100,000 ₸ - 1,400,000 ₸</TableCell>
                    <TableCell>20</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>КИМЭП</TableCell>
                    <TableCell>2,900,000 ₸ - 3,500,000 ₸</TableCell>
                    <TableCell>10</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
                <p>Барлық университеттерде оқу ақысы әртүрлі болуы мүмкін. Нақты ақпаратты тікелей университеттерден алуға кеңес береміз.</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="career">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Жұмыс орындары</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <Briefcase className="h-6 w-6 text-blue-600 mr-3" />
                    <h3 className="font-bold">Мемлекеттік мекемелер</h3>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 text-blue-500 mr-2 mt-1" />
                      <span>Білім беру департаменттері</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 text-blue-500 mr-2 mt-1" />
                      <span>Мемлекеттік мекемелер</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 text-blue-500 mr-2 mt-1" />
                      <span>Ғылыми-зерттеу институттары</span>
                    </li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <Building className="h-6 w-6 text-blue-600 mr-3" />
                    <h3 className="font-bold">Жеке компаниялар</h3>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 text-blue-500 mr-2 mt-1" />
                      <span>Консалтинг компаниялары</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 text-blue-500 mr-2 mt-1" />
                      <span>HR департаменттері</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 text-blue-500 mr-2 mt-1" />
                      <span>Корпоративтік оқыту орталықтары</span>
                    </li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <GraduationCap className="h-6 w-6 text-blue-600 mr-3" />
                    <h3 className="font-bold">Білім беру мекемелері</h3>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 text-blue-500 mr-2 mt-1" />
                      <span>Мектептер мен колледждер</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 text-blue-500 mr-2 mt-1" />
                      <span>Университеттер</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 text-blue-500 mr-2 mt-1" />
                      <span>Жеке білім беру орталықтары</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mt-8 mb-4">Орташа жалақы</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-6 text-center">
                  <p className="text-sm text-gray-600 mb-2">Бастапқы деңгей</p>
                  <p className="text-2xl font-bold text-green-600">150,000 - 200,000 ₸</p>
                </div>
                <div className="border rounded-lg p-6 text-center">
                  <p className="text-sm text-gray-600 mb-2">Орта деңгей</p>
                  <p className="text-2xl font-bold text-green-600">200,000 - 350,000 ₸</p>
                </div>
                <div className="border rounded-lg p-6 text-center">
                  <p className="text-sm text-gray-600 mb-2">Жоғары деңгей</p>
                  <p className="text-2xl font-bold text-green-600">350,000 - 600,000 ₸</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="universities">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Осы мамандық бар университеттер</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-100 p-4">
                    <h3 className="font-bold mb-1">ҚазҰУ (әл-Фараби атындағы ҚазҰУ)</h3>
                    <p className="text-sm text-gray-600">Алматы</p>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Шекті балл:</span>
                      <Badge>104 балл</Badge>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Грант саны (2023):</span>
                      <span className="font-medium">25</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Университет рейтингі:</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      </div>
                    </div>
                    <div className="mt-4">
                      <Link to="/universities/kaznu">
                        <Button variant="outline" className="w-full">Толығырақ</Button>
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-100 p-4">
                    <h3 className="font-bold mb-1">ЕҰУ (Л.Н. Гумилев атындағы)</h3>
                    <p className="text-sm text-gray-600">Астана</p>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Шекті балл:</span>
                      <Badge>102 балл</Badge>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Грант саны (2023):</span>
                      <span className="font-medium">20</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Университет рейтингі:</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <Star className="h-4 w-4 text-gray-300" />
                      </div>
                    </div>
                    <div className="mt-4">
                      <Link to="/universities/enu">
                        <Button variant="outline" className="w-full">Толығырақ</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Ұқсас мамандықтар</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedMajors.map((relMajor) => (
              <div key={relMajor.id} className="border rounded-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-blue-50 rounded-full">
                      {<relMajor.icon className="h-8 w-8 text-blue-600" />}
                    </div>
                    <Badge variant="outline">{relMajor.code}</Badge>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-2">{relMajor.name}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{relMajor.description}</p>
                  
                  <div className="space-y-2 mb-5">
                    <div className="flex items-center text-sm">
                      <span className="inline-block w-2 h-2 bg-gray-300 rounded-full mr-2"></span>
                      <span className="text-gray-600">Шекті балл: </span>
                      <span className="ml-1 font-medium">{relMajor.minScore || "–"}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="inline-block w-2 h-2 bg-gray-300 rounded-full mr-2"></span>
                      <span className="text-gray-600">Пәндер: </span>
                      <span className="ml-1 font-medium">{relMajor.subjects}</span>
                    </div>
                  </div>
                  
                  <Link to={`/majors/${relMajor.id}`}>
                    <Button variant="outline" className="w-full">Толығырақ</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default MajorDetailPage;
