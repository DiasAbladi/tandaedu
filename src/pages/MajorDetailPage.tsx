
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { 
  Laptop, 
  BarChart2, 
  FlaskConical, 
  Heart, 
  Brain,
  Microscope,
  Star,
  Building2,
  Landmark,
  Briefcase,
  GraduationCap,
  Users,
  Clock,
  Flame,
  CheckCircle
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface University {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  description: string;
  website?: string;
}

interface Major {
  id: string;
  name: string;
  icon: React.ReactNode;
  badge: string;
  description: string;
  duration: string;
  salary: string;
  category: string;
  detailedDescription?: string;
  skills?: string[];
  careerPaths?: string[];
  subjects?: {name: string, description: string}[];
  universities?: string[];
}

const majors: Record<string, Major> = {
  "programming": {
    id: "programming",
    name: "Бағдарламалық қамтамасыз ету",
    icon: <Laptop className="h-10 w-10 text-tandablue" />,
    badge: "Жоғары сұраныс",
    description: "Компьютерлік бағдарламалар мен жүйелерді әзірлеу",
    duration: "4 жыл",
    salary: "400,000 - 800,000 ₸",
    category: "IT және компьютерлік ғылымдар",
    detailedDescription: "Бағдарламалық қамтамасыз ету инженериясы - компьютерлік бағдарламаларды жасау, тестілеу және қолдау көрсету саласы. Бұл мамандық бойынша оқу барысында студенттер алгоритмдерді құру, программалау тілдерін меңгеру, деректер базасымен жұмыс істеу, жүйелік талдау және жобалау әдістерін үйренеді. Бағдарламалық қамтамасыз ету инженерлері мобильді қосымшалар, веб-сайттар, операциялық жүйелер, компьютерлік ойындар және басқа да бағдарламалық өнімдерді жасайды.",
    skills: [
      "Python, Java, JavaScript сияқты программалау тілдері",
      "Деректер құрылымдары мен алгоритмдер",
      "Деректер базасымен жұмыс (SQL, NoSQL)",
      "Веб-технологиялар (HTML, CSS, фреймворктар)",
      "Бағдарламалық қамтамасыз етуді тестілеу",
      "Жобаларды басқару"
    ],
    careerPaths: [
      "Бағдарламашы / Программист",
      "Front-end / Back-end әзірлеуші",
      "Мобильді қосымшалар әзірлеушісі",
      "DevOps инженері",
      "Жүйелік архитектор",
      "Бағдарламалық қамтамасыз ету жобасының менеджері"
    ],
    subjects: [
      { name: "Программалау негіздері", description: "Программалау тілдерінің синтаксисі мен логикасы" },
      { name: "Деректер базасы", description: "Деректерді сақтау және басқару жүйелері" },
      { name: "Веб-технологиялар", description: "Веб-сайттар мен қосымшаларды әзірлеу" },
      { name: "Жүйелік талдау", description: "Бағдарламалық қамтамасыз ету жүйелерін талдау әдістері" },
      { name: "Мобильді қосымшалар", description: "iOS және Android платформаларына арналған қосымшаларды әзірлеу" }
    ],
    universities: ["kaznu", "abaiuni", "iitu", "kbtu", "kimep"]
  },
  "finance": {
    id: "finance",
    name: "Қаржы және есеп",
    icon: <BarChart2 className="h-10 w-10 text-tandablue" />,
    badge: "Жоғары сұраныс",
    description: "Қаржылық талдау және бухгалтерлік есеп",
    duration: "4 жыл",
    salary: "300,000 - 600,000 ₸",
    category: "Экономика және бизнес",
    detailedDescription: "Қаржы және есеп мамандығы бойынша студенттер компанияның қаржылық жағдайын талдау, қаржылық есептілікті дайындау, салық салу, инвестициялық шешімдерді бағалау және стратегиялық қаржылық жоспарлауды үйренеді. Бұл мамандық бойынша түлектер банк секторында, қаржы компанияларында, бухгалтерлік фирмаларда және корпорацияларда жұмыс істей алады.",
    skills: [
      "Қаржылық талдау",
      "Бухгалтерлік есеп",
      "Бюджеттеу және болжау",
      "Салық салу",
      "Қаржылық есептілікті дайындау",
      "Excel және қаржылық бағдарламалық қамтамасыз ету"
    ],
    careerPaths: [
      "Қаржы талдаушысы",
      "Бухгалтер",
      "Аудитор",
      "Қаржы менеджері",
      "Инвестициялық банкир",
      "Салық консультанты"
    ],
    subjects: [
      { name: "Микроэкономика", description: "Жеке экономикалық агенттердің мінез-құлқын зерттеу" },
      { name: "Макроэкономика", description: "Жалпы экономиканың жұмыс істеу принциптері" },
      { name: "Бухгалтерлік есеп", description: "Қаржылық операцияларды тіркеу және есепке алу" },
      { name: "Корпоративтік қаржы", description: "Компаниялардың қаржылық шешімдері" },
      { name: "Банк ісі", description: "Банк жүйесінің жұмыс істеу принциптері" }
    ],
    universities: ["kaznu", "narxoz", "kimep", "sdu", "kbtu"]
  },
  "biotech": {
    id: "biotech",
    name: "Биотехнология",
    icon: <FlaskConical className="h-10 w-10 text-tandablue" />,
    badge: "Орташа сұраныс",
    description: "Биологиялық процестерді зерттеу және қолдану",
    duration: "4 жыл",
    salary: "250,000 - 500,000 ₸",
    category: "Жаратылыстану ғылымдары",
    detailedDescription: "Биотехнология мамандығы биологиялық жүйелер мен процестерді технологиялық қолдану арқылы өнімдер мен қызметтерді жасауға бағытталған. Студенттер молекулалық биология, генетика, микробиология, биохимия және биоинженерия саласында білім алады. Биотехнологтар медицина, ауыл шаруашылығы, тамақ өнеркәсібі және қоршаған ортаны қорғау салаларында жұмыс істейді.",
    skills: [
      "Зертханалық техникалар",
      "ДНҚ секвенирлеу және генетикалық инженерия",
      "Микробиологиялық әдістер",
      "Биологиялық деректерді талдау",
      "Биоинформатика",
      "Биопроцестерді масштабтау"
    ],
    careerPaths: [
      "Биотехнолог",
      "Зерттеуші",
      "Фармацевтикалық өндіріс маманы",
      "Сапаны бақылау инженері",
      "Биоинформатик",
      "Клиникалық зерттеулер маманы"
    ],
    subjects: [
      { name: "Молекулалық биология", description: "Молекулалық деңгейдегі биологиялық процестерді зерттеу" },
      { name: "Генетика", description: "Тұқым қуалаушылық механизмдері" },
      { name: "Микробиология", description: "Микроорганизмдердің құрылымы мен функциялары" },
      { name: "Биохимия", description: "Биологиялық молекулалар мен процестердің химиясы" },
      { name: "Биоинженерия", description: "Биологиялық жүйелерді инженерлік принциптер арқылы зерттеу" }
    ],
    universities: ["kaznu", "abaiuni", "katu", "kazntumrz", "keu"]
  },
  "medicine": {
    id: "medicine",
    name: "Медицина",
    icon: <Heart className="h-10 w-10 text-tandablue" />,
    badge: "Жоғары сұраныс",
    description: "Адам денсаулығын сақтау және емдеу",
    duration: "5-7 жыл",
    salary: "350,000 - 900,000 ₸",
    category: "Денсаулық сақтау",
    detailedDescription: "Медицина мамандығы адам денсаулығын сақтау, ауруларды диагностикалау және емдеу саласындағы білім мен дағдыларды қамтиды. Медицина факультетінің студенттері анатомия, физиология, фармакология, клиникалық медицина және басқа да медициналық пәндерді оқиды. Медицина мамандығын бітірген түлектер дәрігер, хирург, педиатр және басқа да медициналық мамандықтарда жұмыс істей алады.",
    skills: [
      "Клиникалық диагностика",
      "Медициналық процедуралар",
      "Пациенттермен қарым-қатынас",
      "Медициналық құжаттарды жүргізу",
      "Ғылыми медициналық әдебиеттерді талдау",
      "Этикалық шешімдер қабылдау"
    ],
    careerPaths: [
      "Терапевт",
      "Хирург",
      "Педиатр",
      "Гинеколог",
      "Невролог",
      "Медициналық зерттеуші"
    ],
    subjects: [
      { name: "Анатомия", description: "Адам денесінің құрылымы" },
      { name: "Физиология", description: "Адам ағзасының функциялары" },
      { name: "Фармакология", description: "Дәрілердің әсері мен қолданылуы" },
      { name: "Клиникалық медицина", description: "Аурулардың диагностикасы мен емделуі" },
      { name: "Хирургия", description: "Хирургиялық процедуралар мен техникалар" }
    ],
    universities: ["asfendiyarov", "smu", "kaznu", "abaiuni", "nmu"]
  },
  "digital-marketing": {
    id: "digital-marketing",
    name: "Цифрлық маркетинг",
    icon: <Laptop className="h-10 w-10 text-tandablue" />,
    badge: "Жоғары сұраныс",
    description: "Онлайн маркетинг стратегиялары мен сандық брендинг",
    duration: "4 жыл",
    salary: "300,000 - 700,000 ₸",
    category: "Маркетинг және коммуникация",
    detailedDescription: "Цифрлық маркетинг мамандығы онлайн арналар арқылы өнімдер мен қызметтерді жылжытуға бағытталған. Студенттер әлеуметтік желілерде маркетинг, іздеу жүйелерінде оңтайландыру (SEO), контент-маркетинг, электрондық пошта маркетингі және веб-аналитика сияқты тақырыптарды меңгереді. Цифрлық маркетинг мамандары компаниялардың онлайн беделін құру және интернеттегі аудиториямен байланыс орнату үшін жұмыс істейді.",
    skills: [
      "Әлеуметтік желілерде маркетинг",
      "SEO және SEM",
      "Контент-маркетинг",
      "Веб-аналитика",
      "Email-маркетинг",
      "Цифрлық жарнама"
    ],
    careerPaths: [
      "Цифрлық маркетинг маманы",
      "SMM менеджер",
      "SEO маманы",
      "Контент-менеджер",
      "Цифрлық жарнама менеджері",
      "Маркетинг аналитигі"
    ],
    subjects: [
      { name: "Маркетинг негіздері", description: "Маркетингтің базалық принциптері мен концепциялары" },
      { name: "Цифрлық маркетинг стратегиясы", description: "Онлайн маркетинг стратегияларын жоспарлау және жүзеге асыру" },
      { name: "Әлеуметтік медиа", description: "Әлеуметтік желілерде бренд құру және контентті жылжыту" },
      { name: "Веб-аналитика", description: "Онлайн метрикаларды өлшеу және талдау" },
      { name: "Цифрлық жарнама", description: "Онлайн жарнама түрлері мен платформалары" }
    ],
    universities: ["kimep", "kaznu", "narxoz", "sdu", "kbtu"]
  },
  "psychology": {
    id: "psychology",
    name: "Психология",
    icon: <Brain className="h-10 w-10 text-tandablue" />,
    badge: "Орташа сұраныс",
    description: "Адам мінез-құлқы мен психикалық процестерді зерттеу",
    duration: "4 жыл",
    salary: "250,000 - 500,000 ₸",
    category: "Әлеуметтік ғылымдар",
    detailedDescription: "Психология мамандығы адам мінез-құлқы мен психикалық процестерді зерттейді. Студенттер жалпы психология, даму психологиясы, әлеуметтік психология, клиникалық психология және психологиялық консультация беру саласындағы білім алады. Психологтар білім беру, денсаулық сақтау, бизнес, спорт және басқа да салаларда жұмыс істеуі мүмкін.",
    skills: [
      "Психологиялық кеңес беру",
      "Психологиялық диагностика",
      "Зерттеу әдістері",
      "Коммуникация дағдылары",
      "Психологиялық тестілеу және бағалау",
      "Клиенттермен жұмыс"
    ],
    careerPaths: [
      "Психолог-консультант",
      "Клиникалық психолог",
      "Мектеп психологы",
      "Ұйымдық психолог",
      "Зерттеуші психолог",
      "Спорт психологы"
    ],
    subjects: [
      { name: "Жалпы психология", description: "Психологияның негізгі принциптері мен концепциялары" },
      { name: "Даму психологиясы", description: "Әр жастағы адамның психологиялық дамуы" },
      { name: "Әлеуметтік психология", description: "Адамдардың әлеуметтік ортада мінез-құлқы" },
      { name: "Клиникалық психология", description: "Психологиялық бұзылулар мен оларды емдеу" },
      { name: "Психологиялық кеңес беру", description: "Психологиялық қызмет көрсету әдістері мен техникалары" }
    ],
    universities: ["kaznu", "abaiuni", "kimep", "sdu", "narkhoz"]
  }
};

const universities: Record<string, University> = {
  "kaznu": {
    id: "kaznu",
    name: "Әл-Фараби атындағы ҚазҰУ",
    location: "Алматы қ.",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.8,
    description: "Қазақстанның ең көне және беделді университеттерінің бірі. 16 факультетте 2000-нан астам профессор мен оқытушылар қызмет етеді. 25000-нан астам студент білім алады."
  },
  "abaiuni": {
    id: "abaiuni",
    name: "Абай атындағы ҚазҰПУ",
    location: "Алматы қ.",
    image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.6,
    description: "Қазақстандағы ең ірі педагогикалық жоғары оқу орны. Білім беру саласындағы мамандарды даярлауда көшбасшы болып табылады."
  },
  "kimep": {
    id: "kimep",
    name: "КИМЭП Университеті",
    location: "Алматы қ.",
    image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.7,
    description: "Халықаралық стандарттарға сәйкес бизнес, құқық, қоғамдық ғылымдар және білім беру саласында жоғары білім ұсынатын жетекші университет."
  },
  "iitu": {
    id: "iitu",
    name: "Халықаралық ақпараттық технологиялар университеті",
    location: "Алматы қ.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.5,
    description: "IT және компьютерлік технологиялар саласында мамандарды даярлайтын жетекші университет."
  },
  "kbtu": {
    id: "kbtu",
    name: "Қ.И. Сәтбаев атындағы ҚазҰТЗУ",
    location: "Алматы қ.",
    image: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.6,
    description: "Инженерия, технология және жаратылыстану ғылымдары саласындағы мамандарды даярлайтын техникалық университет."
  },
  "sdu": {
    id: "sdu",
    name: "Сүлеймен Демирел университеті",
    location: "Алматы қ.",
    image: "https://images.unsplash.com/photo-1498322590555-139c697a8abe?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.3,
    description: "Инженерия, IT, бизнес және гуманитарлық ғылымдар саласында мамандарды даярлайтын халықаралық стандарттарға сай университет."
  },
  "narxoz": {
    id: "narxoz",
    name: "Нархоз университеті",
    location: "Алматы қ.",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.4,
    description: "Экономика, қаржы, бизнес және құқық саласында мамандарды даярлайтын жетекші университет."
  },
  "asfendiyarov": {
    id: "asfendiyarov",
    name: "С.Ж. Асфендияров атындағы ҚазҰМУ",
    location: "Алматы қ.",
    image: "https://images.unsplash.com/photo-1527576539890-dfa815648363?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.7,
    description: "Медицина саласында мамандарды даярлайтын ең беделді жоғары оқу орны."
  },
  "katu": {
    id: "katu",
    name: "С.Сейфуллин атындағы Қазақ агротехникалық университеті",
    location: "Астана қ.",
    image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.2,
    description: "Ауыл шаруашылығы, мал шаруашылығы, агроинженерия және басқа ауыл шаруашылығы салаларындағы мамандарды даярлайтын университет."
  },
  "kazntumrz": {
    id: "kazntumrz",
    name: "Қ.И. Сәтпаев атындағы ҚазҰТЗУ",
    location: "Алматы қ.",
    image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.5,
    description: "Мұнай-газ, тау-кен ісі, геология, металлургия және машина жасау саласындағы мамандарды даярлайтын техникалық университет."
  },
  "keu": {
    id: "keu",
    name: "Қазтұтынуодағы Қарағанды экономикалық университеті",
    location: "Қарағанды қ.",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.2,
    description: "Экономика, қаржы, бизнес және құқық саласындағы мамандарды даярлайтын университет."
  },
  "smu": {
    id: "smu",
    name: "Семей медицина университеті",
    location: "Семей қ.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.3,
    description: "Медицина саласындағы мамандарды даярлайтын жетекші оқу орны."
  },
  "nmu": {
    id: "nmu",
    name: "Назарбаев Университеті",
    location: "Астана қ.",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.9,
    description: "Халықаралық деңгейдегі зерттеу университеті. Ғылым, инженерия, медицина, бизнес және гуманитарлық ғылымдар саласында мамандарды даярлайды."
  }
};

const MajorDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [major, setMajor] = useState<Major | undefined>(undefined);
  const [relatedUniversities, setRelatedUniversities] = useState<University[]>([]);

  useEffect(() => {
    if (id && majors[id]) {
      setMajor(majors[id]);

      // Get related universities for this major
      const uniIds = majors[id].universities || [];
      const uniList = uniIds.map(uniId => universities[uniId]).filter(Boolean);
      setRelatedUniversities(uniList);
    }
  }, [id]);

  if (!major) {
    return (
      <>
        <Navbar />
        <div className="container py-12 min-h-screen">
          <h1 className="text-2xl font-bold">Мамандық табылмады</h1>
          <Link to="/majors" className="text-tandablue">
            Мамандықтар тізіміне оралу
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-blue-600 py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-8 items-center text-white">
              <div className="p-8 bg-blue-700 rounded-full">
                {major.icon}
              </div>
              <div>
                <div className={`inline-block px-3 py-1 text-xs font-medium rounded-full mb-4
                  ${major.badge === "Жоғары сұраныс" ? "bg-green-500 text-white" : 
                  major.badge === "Орташа сұраныс" ? "bg-yellow-500 text-white" : 
                  "bg-blue-400 text-white"}`}>
                  {major.badge}
                </div>
                <h1 className="text-4xl font-bold mb-4">{major.name}</h1>
                <p className="text-blue-100 text-lg mb-6">{major.description}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Оқу мерзімі: <strong>{major.duration}</strong></span>
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-2" />
                    <span>Орташа жалақы: <strong>{major.salary}</strong></span>
                  </div>
                  <div className="flex items-center">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    <span>Категория: <strong>{major.category}</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container px-4 md:px-6 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">Мамандық туралы</h2>
                <p className="text-gray-700 mb-6">{major.detailedDescription}</p>
                
                <Tabs defaultValue="skills" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="skills">Негізгі дағдылар</TabsTrigger>
                    <TabsTrigger value="career">Мансап мүмкіндіктері</TabsTrigger>
                    <TabsTrigger value="subjects">Оқу пәндері</TabsTrigger>
                  </TabsList>
                  <TabsContent value="skills">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Негізгі дағдылар мен білім</h3>
                      <ul className="space-y-2">
                        {major.skills?.map((skill, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                            <span>{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                  <TabsContent value="career">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Мансап мүмкіндіктері</h3>
                      <ul className="space-y-2">
                        {major.careerPaths?.map((path, index) => (
                          <li key={index} className="flex items-start">
                            <Flame className="h-5 w-5 text-orange-500 mr-2 mt-0.5" />
                            <span>{path}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                  <TabsContent value="subjects">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Негізгі оқу пәндері</h3>
                      <Accordion type="single" collapsible className="w-full">
                        {major.subjects?.map((subject, index) => (
                          <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-left">
                              {subject.name}
                            </AccordionTrigger>
                            <AccordionContent>
                              {subject.description}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-lg shadow p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">Бұл мамандық туралы</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-tandablue mr-3" />
                    <span>Студенттердің қызығушылығы: <strong>Жоғары</strong></span>
                  </div>
                  <div className="flex items-center">
                    <Flame className="h-5 w-5 text-tandablue mr-3" />
                    <span>Еңбек нарығындағы сұраныс: <strong>{major.badge}</strong></span>
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="h-5 w-5 text-tandablue mr-3" />
                    <span>Мамандар тапшылығы: <strong>Орташа</strong></span>
                  </div>
                </div>
              </div>

              {/* Universities offering this major */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">Бұл мамандықты оқытатын университеттер</h2>
                <div className="space-y-4">
                  {relatedUniversities.map(university => (
                    <Link 
                      key={university.id}
                      to={`/universities/${university.id}`}
                      className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <img 
                        src={university.image} 
                        alt={university.name} 
                        className="w-12 h-12 object-cover rounded-full mr-4"
                      />
                      <div>
                        <h3 className="font-medium">{university.name}</h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <Star className="h-3 w-3 fill-yellow-400 stroke-yellow-400 mr-1" />
                          <span>{university.rating}</span>
                          <span className="mx-2">•</span>
                          <span>{university.location}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MajorDetailPage;
