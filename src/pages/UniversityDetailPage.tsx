
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Star, MapPin, Users, Phone, Mail, Globe, ArrowLeft, Building } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for university details
const universities = {
  "kaznu": {
    id: "kaznu",
    name: "Әл-Фараби атындағы ҚазҰУ",
    fullName: "Әл-Фараби атындағы Қазақ Ұлттық Университеті",
    location: "Алматы қ., Әл-Фараби даңғылы 71",
    rating: 4.8,
    students: "25,000+",
    tuition: "850,000 ₸/жыл",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Әл-Фараби атындағы Қазақ ұлттық университеті — Қазақстандағы ең көне әрі ең ірі жоғары оқу орындарының бірі. Университет 1934 жылы құрылған және еліміздің жетекші ғылыми-білім беру орталығы болып табылады.",
    phone: "+7 (727) 377-33-33",
    email: "info@kaznu.kz",
    website: "www.kaznu.kz",
    faculties: [
      "Механика-математика факультеті",
      "Физика-техникалық факультеті",
      "Химия және химиялық технология факультеті",
      "Биология және биотехнология факультеті",
      "Филология факультеті",
      "Заң факультеті",
      "Халықаралық қатынастар факультеті",
      "Экономика және бизнес жоғары мектебі"
    ],
    facilities: [
      "Кітапхана",
      "Спорт кешені",
      "Студенттік жатақханалар",
      "Медициналық орталық",
      "Мәдениет орталығы"
    ],
    programs: [
      "Бакалавриат",
      "Магистратура",
      "Докторантура",
      "Қашықтықтан оқыту"
    ]
  },
  "east": {
    id: "east",
    name: "Абай университеті",
    fullName: "Абай атындағы Қазақ ұлттық педагогикалық университеті",
    location: "Алматы қ., Достық даңғылы 13",
    rating: 4.9,
    students: "15,000+",
    tuition: "1,200,000 ₸/жыл",
    image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Абай атындағы Қазақ ұлттық педагогикалық университеті — Қазақстандағы педагогикалық мамандар даярлау саласындағы жетекші жоғары оқу орны. Университет 1928 жылы құрылған.",
    phone: "+7 (727) 291-57-68",
    email: "rector@kaznpu.kz",
    website: "www.kaznpu.kz",
    faculties: [
      "Физика-математика факультеті",
      "Жаратылыстану факультеті",
      "Тарих және құқық факультеті",
      "Филология факультеті",
      "Педагогика және психология факультеті",
      "Көркем білім беру факультеті",
      "Халықаралық қатынастар факультеті"
    ],
    facilities: [
      "Кітапхана",
      "Спорт кешені",
      "Студенттік жатақханалар",
      "Абай ғылыми-зерттеу орталығы"
    ],
    programs: [
      "Бакалавриат",
      "Магистратура",
      "Докторантура"
    ]
  },
  "kimep": {
    id: "kimep",
    name: "КИМЭП Университеті",
    fullName: "Қазақстан менеджмент, экономика және болжау институты",
    location: "Алматы қ., Абай даңғылы 4",
    rating: 4.7,
    students: "7,000+",
    tuition: "950,000 ₸/жыл",
    image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "КИМЭП Университеті — Орталық Азиядағы жетекші тәуелсіз білім беру ұйымы. Университет 1992 жылы құрылған және халықаралық стандарттарға сәйкес жоғары білім береді.",
    phone: "+7 (727) 270-42-00",
    email: "info@kimep.kz",
    website: "www.kimep.kz",
    faculties: [
      "Бизнес мектебі",
      "Әлеуметтік ғылымдар факультеті",
      "Заң және мемлекеттік басқару факультеті",
      "Гуманитарлық және білім беру факультеті"
    ],
    facilities: [
      "Заманауи кітапхана",
      "Студенттік орталық",
      "Спорт кешені",
      "Жатақхана",
      "Ғылыми зерттеу орталықтары"
    ],
    programs: [
      "Бакалавриат",
      "Магистратура",
      "MBA бағдарламасы",
      "Докторантура",
      "Тіл курстары"
    ]
  }
};

const UniversityDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const university = universities[id as keyof typeof universities];

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

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen">
        {/* Header Section with Image */}
        <div className="w-full h-64 md:h-96 bg-cover bg-center relative" style={{ backgroundImage: `url(${university.image})` }}>
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
                      <Building className="h-4 w-4 text-tandablue" />
                    </div>
                    {facility}
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="text-center mb-8">
            <Button className="px-8">Консультация алу</Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UniversityDetailPage;
