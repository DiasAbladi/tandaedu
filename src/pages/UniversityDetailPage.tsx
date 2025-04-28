import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Star, MapPin, Users, Phone, Mail, Globe, ArrowLeft, Building, GraduationCap, BookOpen, Award } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

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
    image: "/lovable-uploads/885aa16e-67cc-42e6-8c48-60db393a06ee.png",
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
    ],
    majors: [
      {
        name: "Информатика",
        code: "6B06101",
        duration: "4 жыл",
        degree: "Бакалавр",
        price: "850,000 ₸/жыл",
        universities: ["ҚазҰУ", "ЕҰУ", "ХАТУ", "КБТУ", "СДУ"]
      },
      {
        name: "Экономика",
        code: "6B04106",
        duration: "4 жыл",
        degree: "Бакалавр",
        price: "800,000 ₸/жыл",
        universities: ["ҚазҰУ", "Нархоз", "КИМЭП", "ЕҰУ"]
      },
      {
        name: "Құқықтану",
        code: "6B04201",
        duration: "4 жыл",
        degree: "Бакалавр",
        price: "780,000 ₸/жыл",
        universities: ["ҚазҰУ", "ЕҰУ", "Абай университеті"]
      },
      {
        name: "Биология",
        code: "6B05101",
        duration: "4 жыл",
        degree: "Бакалавр",
        price: "750,000 ₸/жыл",
        universities: ["ҚазҰУ", "ЕҰУ", "Абай университеті"]
      }
    ]
  },
  "abaiuni": {
    id: "abaiuni",
    name: "Абай университеті",
    fullName: "Абай атындағы Қазақ ұлттық педагогикалық университеті",
    location: "Алматы қ., Достық даңғылы 13",
    rating: 4.9,
    students: "15,000+",
    tuition: "1,200,000 ₸/жыл",
    image: "/lovable-uploads/7807c993-b7c8-4c78-9d7d-9d79e6dc3606.png",
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
    ],
    majors: [
      {
        name: "Педагогика",
        code: "6B01301",
        duration: "4 жыл",
        degree: "Бакалавр",
        price: "750,000 ₸/жыл",
        universities: ["Абай университеті", "ҚазҰУ", "ЕҰУ"]
      },
      {
        name: "Психология",
        code: "6B03101",
        duration: "4 жыл",
        degree: "Бакалавр",
        price: "780,000 ₸/жыл",
        universities: ["Абай университеті", "ҚазҰУ", "ЕҰУ", "Нархоз"]
      },
      {
        name: "Филология",
        code: "6B02301",
        duration: "4 жыл",
        degree: "Бакалавр",
        price: "750,000 ₸/жыл",
        universities: ["Абай университеті", "ҚазҰУ", "ЕҰУ"]
      }
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
    image: "/lovable-uploads/39fb90f3-2b54-4dfe-9051-78ea3f3c3627.png",
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
    ],
    majors: [
      {
        name: "Қаржы",
        code: "6B04103",
        duration: "4 жыл",
        degree: "Бакалавр",
        price: "950,000 ₸/жыл",
        universities: ["КИМЭП", "ҚазҰУ", "Нархоз", "ЕҰУ"]
      },
      {
        name: "Менеджмент",
        code: "6B04102",
        duration: "4 жыл",
        degree: "Бакалавр",
        price: "950,000 ₸/жыл",
        universities: ["КИМЭП", "ҚазҰУ", "Нархоз", "КБТУ"]
      },
      {
        name: "Халықаралық қатынастар",
        code: "6B03110",
        duration: "4 жыл",
        degree: "Бакалавр",
        price: "980,000 ₸/жыл",
        universities: ["КИМЭП", "ҚазҰУ", "ЕҰУ", "Абай университеті"]
      }
    ]
  },
  "kbtu": {
    id: "kbtu",
    name: "КБТУ",
    fullName: "Қазақстан-Британ техникалық университеті",
    location: "Алматы қ., Төле би көшесі 59",
    rating: 4.6,
    students: "5,000+",
    tuition: "1,800,000 ₸/жыл",
    image: "/lovable-uploads/3ff402b5-eb8f-45bf-8a7e-a114af708eda.png",
    description: "Қазақстан-Британ техникалық университеті — Қазақстандағы беделді техникалық жоғары оқу орындарының бірі. Университет техникалық және IT мамандықтар бойынша көшбасшы болып табылады.",
    phone: "+7 (727) 250-46-66",
    email: "info@kbtu.kz",
    website: "www.kbtu.kz",
    faculties: [
      "Ақпараттық технологиялар мектебі",
      "Мұнай-газ инженериясы мектебі",
      "Бизнес мектебі",
      "Қолданбалы ғылымдар мектебі"
    ],
    facilities: [
      "Кітапхана",
      "Заманауи зертханалар",
      "Студенттік жатақхана",
      "Спорт кешені"
    ],
    programs: [
      "Бакалавриат",
      "Магистратура",
      "MBA бағдарламасы",
      "Докторантура"
    ],
    majors: [
      {
        name: "IT",
        code: "6B06102",
        duration: "4 жыл",
        degree: "Бакалавр",
        price: "1,800,000 ₸/жыл",
        universities: ["КБТУ", "ҚазҰУ", "ХАТУ", "СДУ"]
      },
      {
        name: "Мұнай-газ инженериясы",
        code: "6B07202",
        duration: "4 жыл",
        degree: "Бакалавр",
        price: "1,850,000 ₸/жыл",
        universities: ["КБТУ", "Сәтбаев Университеті"]
      }
    ]
  },
  "sdu": {
    id: "sdu",
    name: "Сүлейман Демирел университеті",
    fullName: "Сүлейман Демирел атындағы университет",
    location: "Қаскелең қ., Әбілайхан көшесі 1/1",
    rating: 4.5,
    students: "8,000+",
    tuition: "1,400,000 ₸/жыл",
    image: "/lovable-uploads/d6efe010-b6cd-4c24-91e4-86e30526a77a.png",
    description: "Сүлейман Демирел атындағы университет — халықаралық деңгейде танылған жоғары оқу орны. SDU студенттері жаhандық бәсекеге қабілетті заманауи білім алады.",
    phone: "+7 (727) 307-95-65",
    email: "info@sdu.edu.kz",
    website: "www.sdu.edu.kz",
    faculties: [
      "Инженерия факультеті",
      "Ақпараттық технологиялар факультеті",
      "Бизнес факультеті",
      "Педагогика және гуманитарлық ғылымдар факультеті",
      "Құқық факультеті"
    ],
    facilities: [
      "Заманауи кітапхана",
      "IT зертханалары",
      "Студенттік жатақхана",
      "Спорт кешені",
      "Стартап орталығы"
    ],
    programs: [
      "Бакалавриат",
      "Магистратура",
      "Докторантура",
      "Foundation бағдарламасы"
    ],
    majors: [
      {
        name: "IT технологиялар",
        code: "6B06105",
        duration: "4 жыл",
        degree: "Бакалавр",
        price: "1,400,000 ₸/жыл",
        universities: ["СДУ", "ХАТУ", "КБТУ", "ҚазҰУ"]
      },
      {
        name: "Бизнес",
        code: "6B04107",
        duration: "4 жыл",
        degree: "Бакалавр",
        price: "1,350,000 ₸/жыл",
        universities: ["СДУ", "КИМЭП", "Нархоз", "ҚазҰУ"]
      }
    ]
  },
  "iitu": {
    id: "iitu",
    name: "ХАТУ",
    fullName: "Халықаралық ақпараттық технологиялар университеті",
    location: "Алматы қ., Манас көшесі 34/1",
    rating: 4.5,
    students: "6,000+",
    tuition: "1,100,000 ₸/жыл",
    image: "/lovable-uploads/71fd4b3b-9b52-4e9b-a05e-ac774b7d3bac.png",
    description: "ХАТУ — IT саласында мамандар даярлайтын Қазақстандағы жетекші университет. Халықаралық сертификаттауға ие бакалавриат және магистратура бағдарламалары бар.",
    phone: "+7 (727) 330-85-56",
    email: "info@iitu.edu.kz",
    website: "www.iitu.edu.kz",
    faculties: [
      "Ақпараттық технологиялар факультеті",
      "Киберқауіпсіздік, өңдеу және IT-медицина факультеті",
      "Цифрлық трансформация және телекоммуникация факультеті",
      "Бизнес және менеджмент факультеті"
    ],
    facilities: [
      "IT зертханалары",
      "Кітапхана",
      "Студенттік жатақхана",
      "Спорт залы"
    ],
    programs: [
      "Бакалавриат",
      "Магистратура",
      "Докторантура"
    ],
    majors: [
      {
        name: "Киберқауіпсіздік",
        code: "6B06301",
        duration: "4 жыл",
        degree: "Бакалавр",
        price: "1,100,000 ₸/жыл",
        universities: ["ХАТУ", "ҚазҰУ", "КБТУ", "СДУ"]
      },
      {
        name: "Телекоммуникация",
        code: "6B06201",
        duration: "4 жыл",
        degree: "Бакалавр",
        price: "1,050,000 ₸/жыл",
        universities: ["ХАТУ", "ҚазҰУ"]
      }
    ]
  },
  "narxoz": {
    id: "narxoz",
    name: "Нархоз Университеті",
    fullName: "Нархоз Университеті",
    location: "Алматы қ.",
    rating: 4.4,
    students: "10,000+",
    tuition: "900,000 ₸/жыл",
    image: "/lovable-uploads/56762d93-79e1-433d-a329-283f6851a301.png",
    description: "Нархоз Университеті",
    phone: "+7 (727) 377-33-33",
    email: "info@narxoz.kz",
    website: "www.narxoz.kz",
    faculties: [
      "Экономика факультеті",
      "Бизнес факультеті",
      "Құқық факультеті"
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
    ],
    majors: [
      {
        name: "Экономика",
        code: "6B06101",
        duration: "4 жыл",
        degree: "Бакалавр",
        price: "850,000 ₸/жыл",
        universities: ["ҚазҰУ", "ЕҰУ", "ХАТУ", "КБТУ", "СДУ"]
      },
      {
        name: "Құқықтану",
        code: "6B04106",
        duration: "4 жыл",
        degree: "Бакалавр",
        price: "800,000 ₸/жыл",
        universities: ["ҚазҰУ", "Нархоз", "КИМЭП", "ЕҰУ"]
      }
    ]
  },
  "enu": {
    id: "enu",
    name: "Еуразия ұлттық университеті",
    fullName: "Л.Н. Гумилев атындағы Еуразия ұлттық университеті",
    location: "Астана қ.",
    rating: 4.6,
    students: "18,000+",
    tuition: "780,000 ₸/жыл",
    image: "/lovable-uploads/6a01e60c-e412-4666-9c8a-37b2e0f7f00e.png",
    description: "Еуразия ұлттық университеті",
    phone: "+7 (727) 377-33-33",
    email: "info@enu.kz",
    website: "www.enu.kz",
    faculties: [
      "Механика-математика факультеті",
      "Физика-техникалық факультеті",
      "Химия және химиялық технология факультеті"
    ],
    facilities: [
      "Кітапхана",
      "Спорт кешені",
      "Студенттік жатақханалар"
    ],
    programs: [
      "Бакалавриат",
      "Магистратура",
      "Докторантура"
    ],
    majors: [
      {
        name: "Информатика",
        code: "6B06101",
        duration: "4 жыл",
        degree: "Бакалавр",
        price: "850,000 ₸/жыл",
        universities: ["ҚазҰУ", "ЕҰУ", "ХАТУ", "КБТУ", "СДУ"]
      },
      {
        name: "Экономика",
        code: "6B04106",
        duration: "4 жыл",
        degree: "Бакалавр",
        price: "800,000 ₸/жыл",
        universities: ["ҚазҰУ", "Нархоз", "КИМЭП", "ЕҰУ"]
      }
    ]
  },
  "satbayev": {
    id: "satbayev",
    name: "Сәтбаев Университеті",
    fullName: "Қ.И. Сәтбаев атындағы Қазақ ұлттық техникалық университеті",
    location: "Алматы қ.",
    rating: 4.5,
    students: "14,000+",
    tuition: "850,000 ₸/жыл",
    image: "/lovable-uploads/aa68e8be-f0fe-4264-810e-1f1b50e70513.png",
    description: "Сәтбаев Университеті",
    phone: "+7 (727) 377-33-33",
    email: "info@satbayev.kz",
    website: "www.satbayev.kz",
    faculties: [
      "Механика-математика факультеті",
      "Физика-техникалық факультеті",
      "Химия және химиялық технология факультеті"
    ],
    facilities: [
      "Кітапхана",
      "Спорт кешені",
      "Студенттік жатақханалар"
    ],
    programs: [
      "Бакалавриат",
      "Магистратура",
      "Докторантура"
    ],
    majors: [
      {
        name: "Информатика",
        code: "6B06101",
        duration: "4 жыл",
        degree: "Бакалавр",
        price: "850,000 ₸/жыл",
        universities: ["ҚазҰУ", "ЕҰУ", "ХАТУ", "КБТУ", "СДУ"]
      },
      {
        name: "Экономика",
        code: "6B04106",
        duration: "4 жыл",
        degree: "Бакалавр",
        price: "800,000 ₸/жыл",
        universities: ["ҚазҰУ", "Нархоз", "КИМЭП", "ЕҰУ"]
      }
    ]
  }
};

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
          {major.universities.map((uni: string, index: number) => (
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
                      <Building className="h
