
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Star, MapPin, Users, Phone, Mail, Globe, ArrowLeft, Building, GraduationCap } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { universities } from '@/data/universities';

// Create a component for major details
const MajorCard: React.FC<{ major: any }> = ({ major }) => {
  return (
    <div className="bg-white p-5 rounded-lg border mb-4">
      <div className="flex items-center mb-3">
        <GraduationCap className="h-6 w-6 text-tandablue mr-3" />
        <h3 className="text-lg font-bold">{major.name}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center text-sm">
            <span className="text-gray-600 mr-2">Код:</span>
            <span className="font-medium">{major.code}</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-gray-600 mr-2">Оқу мерзімі:</span>
            <span className="font-medium">{major.duration}</span>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center text-sm">
            <span className="text-gray-600 mr-2">Дәреже:</span>
            <span className="font-medium">{major.degree}</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-gray-600 mr-2">Оқу құны:</span>
            <span className="font-medium text-blue-600">{major.price}</span>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <p className="text-sm mb-1">Бұл мамандық басқа университеттерде бар:</p>
        <div className="flex flex-wrap gap-1">
          {major.universities && major.universities.map((uni: string, index: number) => (
            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md">
              {uni}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const UniversityDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const university = universities.find(uni => uni.id === id);

  // Университет ішінен сурет алу логикасы
  const getUniversityImage = (uniId: string | undefined) => {
    if (!uniId) return "";
    
    switch(uniId) {
      case "kaznu": 
        return "public/lovable-uploads/93d4f861-eaff-4a58-a39a-cccae16687f1.png"; // КазНУ суреті
      case "kazmu": 
        return "public/lovable-uploads/9a91a880-f257-4936-9fbe-7d3290ff568e.png"; // ҚазҰМУ суреті
      case "oku": 
        return "public/lovable-uploads/bc219841-91c3-4f94-a231-68e33b713252.png"; // М. Әуезов атындағы ОҚУ
      case "ktu": 
        return "public/lovable-uploads/d8d26844-8131-41a5-ab7b-bb93e6983808.png"; // Қарағанды техникалық университеті
      case "buketov": 
        return "public/lovable-uploads/27c3eb85-807c-455a-acb3-72179747bb97.png"; // Бөкетов университеті
      case "almau": 
        return "public/lovable-uploads/83fbda14-7fa1-4abb-b8f1-f7c9f4f704a4.png"; // AlmaU
      case "kazguu": 
        return "public/lovable-uploads/61a90cf6-2caa-46d2-8f3a-27a4f392eb41.png"; // KAZGUU Университеті
      case "kaznau": 
        return "public/lovable-uploads/ee4e51e4-83d5-4a25-a5c3-545d8b931e47.png"; // ҚазҰАЗУ
      case "seifullin": 
        return "public/lovable-uploads/8671a5fd-2b18-4b79-985e-29c187014774.png"; // С.Сейфуллин атындағы ҚАЗАТУ
      case "toraighyrov": 
        return "public/lovable-uploads/4555b923-6286-4595-8054-f682902cac39.png"; // Торайғыров университеті
      case "ektu": 
        return "public/lovable-uploads/0b208751-1737-4280-a47f-55b36a6bbb41.png"; // Шығыс Қазақстан техникалық университеті
      // Басқа университеттерге қажет болған жағдайда қосылады
      default:
        return university?.image || ""; // Қалғандарына бастапқы сурет қалады
    }
  };

  if (!university) {
    return (
      <>
        <Navbar />
        <div className="container py-12 min-h-screen">
          <h1 className="text-2xl font-bold">Университет табылмады</h1>
          <Link to="/universities" className="text-tandablue">
            Университеттер тізіміне оралу
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  // Университет суретін алу
  const universityImage = getUniversityImage(university.id);

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen">
        {/* Header Section with Image */}
        <div 
          className="w-full h-64 md:h-96 bg-cover bg-center relative" 
          style={{ backgroundImage: `url(${universityImage})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="container relative z-10 h-full flex flex-col justify-end p-6">
            <Link to="/universities" className="text-white flex items-center mb-4 hover:underline">
              <ArrowLeft className="h-4 w-4 mr-1" /> Барлық университеттер
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{university.fullName}</h1>
            <div className="flex items-center text-white">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{university.location}</span>
            </div>
          </div>
        </div>

        <div className="container py-8">
          {/* Ratings and Quick Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-5 rounded-lg shadow-sm flex items-center">
              <Star className="h-10 w-10 text-yellow-500 fill-yellow-500 mr-4" />
              <div>
                <p className="text-sm text-gray-500">Рейтинг</p>
                <p className="text-xl font-bold">{university.rating}/5.0</p>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-sm flex items-center">
              <Users className="h-10 w-10 text-blue-500 mr-4" />
              <div>
                <p className="text-sm text-gray-500">Студенттер саны</p>
                <p className="text-xl font-bold">{university.students}</p>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-sm flex items-center">
              <Building className="h-10 w-10 text-green-500 mr-4" />
              <div>
                <p className="text-sm text-gray-500">Оқу құны</p>
                <p className="text-xl font-bold">{university.tuition}</p>
              </div>
            </div>
          </div>

          {/* Tabs Content */}
          <Tabs defaultValue="about" className="mb-12">
            <TabsList className="mb-8">
              <TabsTrigger value="about">Негізгі ақпарат</TabsTrigger>
              <TabsTrigger value="faculties">Факультеттер</TabsTrigger>
              <TabsTrigger value="programs">Бағдарламалар</TabsTrigger>
              <TabsTrigger value="facilities">Инфрақұрылым</TabsTrigger>
              <TabsTrigger value="majors">Мамандықтар</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Университет туралы</h2>
              <p className="text-gray-700 mb-6">{university.description}</p>
              
              <h3 className="text-xl font-semibold mb-3">Байланыс ақпараты</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-tandablue mr-2" />
                  <span>{university.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-tandablue mr-2" />
                  <span>{university.email}</span>
                </div>
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-tandablue mr-2" />
                  <span>{university.website}</span>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="faculties" className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Факультеттер</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {university.faculties.map((faculty, index) => (
                  <li key={index} className="py-2 px-4 border-l-4 border-tandablue bg-blue-50">
                    {faculty}
                  </li>
                ))}
              </ul>
            </TabsContent>
            
            <TabsContent value="programs" className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Білім беру бағдарламалары</h2>
              <ul className="space-y-3">
                {university.programs.map((program, index) => (
                  <li key={index} className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-green-500 mr-3"></div>
                    {program}
                  </li>
                ))}
              </ul>
            </TabsContent>
            
            <TabsContent value="facilities" className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Инфрақұрылым</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {university.facilities.map((facility, index) => (
                  <div key={index} className="p-4 border rounded-lg flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <Building className="h-5 w-5 text-blue-600" />
                    </div>
                    {facility}
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="majors" className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Мамандықтар</h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {university.majors.map((major, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    {major}
                  </span>
                ))}
              </div>
              
              {university.id === "kaznu" && (
                <>
                  <p className="text-gray-700 mb-4">Университетте оқытылатын мамандықтар толық тізімі:</p>
                  
                  <div className="space-y-4">
                    <MajorCard major={{
                      name: "Информатика",
                      code: "6B06101",
                      duration: "4 жыл",
                      degree: "Бакалавр",
                      price: "850,000 ₸/жыл",
                      universities: ["ҚазҰУ", "ЕҰУ", "ХАТУ", "КБТУ", "СДУ"]
                    }} />
                    
                    <MajorCard major={{
                      name: "Экономика",
                      code: "6B04106",
                      duration: "4 жыл",
                      degree: "Бакалавр",
                      price: "800,000 ₸/жыл",
                      universities: ["ҚазҰУ", "Нархоз", "КИМЭП", "ЕҰУ"]
                    }} />
                    
                    <MajorCard major={{
                      name: "Құқықтану",
                      code: "6B04201",
                      duration: "4 жыл",
                      degree: "Бакалавр",
                      price: "780,000 ₸/жыл",
                      universities: ["ҚазҰУ", "ЕҰУ", "Абай университеті", "KAZGUU"]
                    }} />
                    
                    <MajorCard major={{
                      name: "Биология",
                      code: "6B05101",
                      duration: "4 жыл",
                      degree: "Бакалавр",
                      price: "750,000 ₸/жыл",
                      universities: ["ҚазҰУ", "ЕҰУ", "Абай университеті"]
                    }} />
                  </div>
                </>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UniversityDetailPage;
