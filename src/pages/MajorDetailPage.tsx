
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { 
  Laptop, 
  BarChart2, 
  FlaskConical, 
  Heart, 
  ArrowLeft, 
  BookOpen, 
  GraduationCap, 
  Clock,
  Building,
  Award,
  User,
  Briefcase,
  MonitorSmartphone,
  Brain,
  Microscope,
  Landmark
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface University {
  id: string;
  name: string;
  location: string;
  rating: number;
  tuition: string;
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
  fullDescription: string;
  subjects: string[];
  skills: string[];
  careers: {title: string; description: string}[];
  universities: University[];
}

const getIconComponent = (id: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    "programming": <Laptop className="h-10 w-10 text-tandablue" />,
    "finance": <BarChart2 className="h-10 w-10 text-tandablue" />,
    "biotech": <FlaskConical className="h-10 w-10 text-tandablue" />,
    "medicine": <Heart className="h-10 w-10 text-tandablue" />,
    "digital-marketing": <MonitorSmartphone className="h-10 w-10 text-tandablue" />,
    "psychology": <Brain className="h-10 w-10 text-tandablue" />,
    "science": <Microscope className="h-10 w-10 text-tandablue" />,
    "business": <Briefcase className="h-10 w-10 text-tandablue" />,
    "law": <Landmark className="h-10 w-10 text-tandablue" />
  };
  
  return iconMap[id] || <BookOpen className="h-10 w-10 text-tandablue" />;
};

const majorsData: Record<string, Major> = {
  "programming": {
    id: "programming",
    name: "Бағдарламалық қамтамасыз ету",
    icon: <Laptop className="h-10 w-10 text-tandablue" />,
    badge: "Жоғары сұраныс",
    description: "Компьютерлік бағдарламалар мен жүйелерді әзірлеу",
    duration: "4 жыл",
    salary: "400,000 - 800,000 ₸",
    category: "IT және компьютерлік ғылымдар",
    fullDescription: "Бағдарламалық қамтамасыз ету мамандығы - компьютерлік бағдарламаларды жасау, тестілеу және қолдау көрсету саласындағы кәсіп. Бұл мамандық бойынша оқу барысында студенттер компьютерлік бағдарламалау тілдері, алгоритмдер, деректер базасы, веб-әзірлеу, мобильді қосымшалар жасау және бағдарламалық жасақтама инженериясы сияқты пәндерді оқиды. Бұл мамандық түлектері әртүрлі салаларда жұмыс істей алады, өйткені бүгінде кез-келген компания цифрлық технологияларды қолданады.",
    subjects: [
      "Алгоритмдер және деректер құрылымы",
      "Бағдарламалау тілдері (Python, Java, C++)",
      "Веб-әзірлеу технологиялары",
      "Мобильді қосымшаларды әзірлеу",
      "Деректер базасын жобалау",
      "Жасанды интеллект негіздері",
      "Киберқауіпсіздік",
      "Бағдарламалық жасақтама инженериясы"
    ],
    skills: [
      "Логикалық ойлау",
      "Проблемаларды шешу қабілеті",
      "Командалық жұмыс",
      "Тайм-менеджмент",
      "Техникалық құжаттаманы жазу",
      "Өзін-өзі оқыту"
    ],
    careers: [
      {
        title: "Бағдарламашы",
        description: "Бағдарламалық қамтамасыз етуді жасау және тестілеу"
      },
      {
        title: "Веб-әзірлеуші",
        description: "Веб-сайттар мен веб-қосымшаларды әзірлеу"
      },
      {
        title: "Мобильді қосымшалар әзірлеушісі",
        description: "iOS және Android платформаларына арналған мобильді қосымшалар жасау"
      },
      {
        title: "DevOps инженері",
        description: "Бағдарламалық жасақтаманы үздіксіз интеграциялау және жеткізу процестерін автоматтандыру"
      },
      {
        title: "Бағдарламалық жасақтама архитекторы",
        description: "Бағдарламалық жасақтама жүйелерінің жоғары деңгейдегі құрылымын жобалау"
      }
    ],
    universities: [
      {
        id: "kaznu",
        name: "ҚазҰУ",
        location: "Алматы қ.",
        rating: 4.8,
        tuition: "850,000 ₸/жыл"
      },
      {
        id: "kbtu",
        name: "КБТУ",
        location: "Алматы қ.",
        rating: 4.6,
        tuition: "1,800,000 ₸/жыл"
      },
      {
        id: "iitu",
        name: "ХАТУ",
        location: "Алматы қ.",
        rating: 4.5,
        tuition: "1,100,000 ₸/жыл"
      },
      {
        id: "sdu",
        name: "Сүлейман Демирел университеті",
        location: "Қаскелең қ.",
        rating: 4.5,
        tuition: "1,400,000 ₸/жыл"
      }
    ]
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
    fullDescription: "Қаржы және есеп мамандығы бизнестің қаржылық аспектілерін басқару және талдау саласындағы мамандарды дайындайды. Бұл мамандық бойынша оқу барысында студенттер бухгалтерлік есеп, қаржылық талдау, салық салу, аудит, қаржы нарықтары және инвестициялар сияқты пәндерді оқиды. Түлектер банктерде, инвестициялық компанияларда, аудиторлық фирмаларда және әртүрлі ұйымдардың қаржы бөлімдерінде жұмыс істей алады.",
    subjects: [
      "Қаржылық есеп",
      "Басқару есебі",
      "Қаржылық талдау",
      "Корпоративтік қаржы",
      "Салық салу",
      "Аудит негіздері",
      "Банк ісі",
      "Инвестицияларды басқару"
    ],
    skills: [
      "Талдау қабілеті",
      "Сандармен жұмыс істеу",
      "Мұқият болу",
      "Этикалық шешімдер қабылдау",
      "Коммуникация",
      "Уақытты басқару"
    ],
    careers: [
      {
        title: "Бухгалтер",
        description: "Қаржылық есептерді дайындау және талдау"
      },
      {
        title: "Қаржылық талдаушы",
        description: "Компанияның қаржылық жағдайын бағалау және болжау"
      },
      {
        title: "Аудитор",
        description: "Ұйымдардың қаржылық есептерін тексеру"
      },
      {
        title: "Банк маманы",
        description: "Банктік операцияларды жүргізу және клиенттерге қызмет көрсету"
      },
      {
        title: "Салық кеңесшісі",
        description: "Салық заңнамасы бойынша кеңес беру және салық есептілігін дайындау"
      }
    ],
    universities: [
      {
        id: "narxoz",
        name: "Нархоз Университеті",
        location: "Алматы қ.",
        rating: 4.4,
        tuition: "900,000 ₸/жыл"
      },
      {
        id: "kimep",
        name: "КИМЭП Университеті",
        location: "Алматы қ.",
        rating: 4.7,
        tuition: "950,000 ₸/жыл"
      },
      {
        id: "kaznu",
        name: "ҚазҰУ",
        location: "Алматы қ.",
        rating: 4.8,
        tuition: "850,000 ₸/жыл"
      },
      {
        id: "enu",
        name: "Еуразия ұлттық университеті",
        location: "Астана қ.",
        rating: 4.6,
        tuition: "780,000 ₸/жыл"
      }
    ]
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
    fullDescription: "Биотехнология - биологиялық жүйелерді, тірі организмдерді немесе олардың туындыларын қолдана отырып, өнімдер мен процестерді жасау немесе өзгерту саласы. Биотехнология мамандығы студенттерді биология, химия, генетика және инженерия білімдерін біріктіруге үйретеді. Бұл мамандық түлектері фармацевтика, ауыл шаруашылығы, тағам өндірісі, қоршаған ортаны қорғау және медицина салаларында жұмыс істей алады.",
    subjects: [
      "Микробиология",
      "Генетика және молекулалық биология",
      "Биохимия",
      "Биотехнологиялық процестер",
      "Өсімдіктер биотехнологиясы",
      "Биоинженерия",
      "Фармацевтикалық биотехнология",
      "Биоинформатика"
    ],
    skills: [
      "Зертханалық техникаларды меңгеру",
      "Аналитикалық ойлау",
      "Деректерді талдау",
      "Ғылыми жазу",
      "Зерттеу жұмыстарын жүргізу",
      "Командада жұмыс істеу"
    ],
    careers: [
      {
        title: "Биотехнолог",
        description: "Биологиялық процестерді өнеркәсіптік қолдануда зерттеу және дамыту"
      },
      {
        title: "Ғылыми зерттеуші",
        description: "Биология және химия саласында ғылыми зерттеулер жүргізу"
      },
      {
        title: "Фармацевтикалық өнімдерді әзірлеуші",
        description: "Жаңа дәрі-дәрмектер мен вакциналар жасау"
      },
      {
        title: "Ауыл шаруашылығы маманы",
        description: "Өсімдіктер мен жануарлардың генетикалық жақсарту"
      },
      {
        title: "Экологиялық биотехнолог",
        description: "Қоршаған ортаны қорғау үшін биологиялық шешімдер әзірлеу"
      }
    ],
    universities: [
      {
        id: "kaznu",
        name: "ҚазҰУ",
        location: "Алматы қ.",
        rating: 4.8,
        tuition: "850,000 ₸/жыл"
      },
      {
        id: "enu",
        name: "Еуразия ұлттық университеті",
        location: "Астана қ.",
        rating: 4.6,
        tuition: "780,000 ₸/жыл"
      }
    ]
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
    fullDescription: "Медицина мамандығы - адам денсаулығын сақтау және аурулардың алдын алу, диагностикалау және емдеумен айналысатын сала. Медицина мамандығы бойынша оқу ұзақ және қарқынды болып табылады. Студенттер анатомия, физиология, биохимия, фармакология, патология және клиникалық пәндерді оқиды. Медицина мамандығын бітірген соң, түлектер әртүрлі салаларда маманданып, ауруханаларда, емханаларда, зерттеу институттарында жұмыс істей алады.",
    subjects: [
      "Анатомия",
      "Физиология",
      "Биохимия",
      "Фармакология",
      "Патология",
      "Терапия негіздері",
      "Хирургия негіздері",
      "Педиатрия",
      "Акушерлік және гинекология"
    ],
    skills: [
      "Клиникалық дағдылар",
      "Эмпатия",
      "Коммуникация",
      "Сыни ойлау",
      "Шешім қабылдау",
      "Стресске төзімділік"
    ],
    careers: [
      {
        title: "Дәрігер-терапевт",
        description: "Ересектердің жалпы ауруларын диагностикалау және емдеу"
      },
      {
        title: "Хирург",
        description: "Хирургиялық операциялар жүргізу"
      },
      {
        title: "Педиатр",
        description: "Балалардың денсаулығын бақылау және емдеу"
      },
      {
        title: "Медициналық зерттеуші",
        description: "Медицина саласында ғылыми жұмыстар жүргізу"
      },
      {
        title: "Дәрігер-маман",
        description: "Белгілі бір ауру немесе дене мүшелерімен жұмыс (кардиология, неврология, т.б.)"
      }
    ],
    universities: [
      {
        id: "kaznu",
        name: "ҚазҰУ",
        location: "Алматы қ.",
        rating: 4.8,
        tuition: "850,000 ₸/жыл"
      }
    ]
  },
  "digital-marketing": {
    id: "digital-marketing",
    name: "Цифрлық маркетинг",
    icon: <MonitorSmartphone className="h-10 w-10 text-tandablue" />,
    badge: "Жоғары сұраныс",
    description: "Онлайн маркетинг стратегиялары мен сандық брендинг",
    duration: "4 жыл",
    salary: "300,000 - 700,000 ₸",
    category: "Маркетинг және коммуникация",
    fullDescription: "Цифрлық маркетинг мамандығы - компаниялардың өнімдері мен қызметтерін интернет арқылы жылжыту стратегияларын әзірлеумен айналысатын сала. Бұл мамандық бойынша оқитын студенттер маркетинг негіздері, SMM, SEO, контент-маркетинг, электрондық пошта маркетингі, жарнама және аналитика сияқты пәндерді оқиды. Цифрлық маркетинг мамандығының түлектері жарнама агенттіктерінде, компаниялардың маркетинг бөлімдерінде немесе фрилансер ретінде жұмыс істей алады.",
    subjects: [
      "Маркетинг негіздері",
      "Әлеуметтік медиа маркетингі",
      "Іздеу жүйелерін оңтайландыру (SEO)",
      "Контент маркетинг",
      "Электрондық пошта маркетингі",
      "Жарнамалық науқандар",
      "Веб-аналитика",
      "Бренд стратегиясы"
    ],
    skills: [
      "Шығармашылық ойлау",
      "Талдау қабілеті",
      "Коммуникация",
      "Жаңа технологияларды меңгеру",
      "Жазу дағдылары",
      "Жобаларды басқару"
    ],
    careers: [
      {
        title: "Цифрлық маркетинг маманы",
        description: "Онлайн маркетинг стратегияларын әзірлеу және жүзеге асыру"
      },
      {
        title: "SMM маманы",
        description: "Әлеуметтік желілерде брендті жылжыту"
      },
      {
        title: "SEO маманы",
        description: "Іздеу жүйелерінде сайттың көрінуін жақсарту"
      },
      {
        title: "Контент менеджері",
        description: "Бренд үшін тартымды және құнды контент жасау"
      },
      {
        title: "Интернет-жарнама маманы",
        description: "Онлайн жарнама науқандарын жоспарлау және жүргізу"
      }
    ],
    universities: [
      {
        id: "kimep",
        name: "КИМЭП Университеті",
        location: "Алматы қ.",
        rating: 4.7,
        tuition: "950,000 ₸/жыл"
      },
      {
        id: "narxoz",
        name: "Нархоз Университеті",
        location: "Алматы қ.",
        rating: 4.4,
        tuition: "900,000 ₸/жыл"
      }
    ]
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
    fullDescription: "Психология мамандығы адам мінез-құлқы, ойлау процестері, эмоциялар мен оның әлеуметтік өзара әрекеттесуін зерттеумен айналысады. Бұл мамандық бойынша оқу барысында студенттер жалпы психология, даму психологиясы, әлеуметтік психология, клиникалық психология және психологиялық кеңес беру сияқты пәндерді оқиды. Психология мамандығының түлектері білім беру мекемелерінде, клиникаларда, кеңес беру орталықтарында және компаниялардың HR бөлімдерінде жұмыс істей алады.",
    subjects: [
      "Жалпы психология",
      "Даму психологиясы",
      "Әлеуметтік психология",
      "Клиникалық психология",
      "Психодиагностика",
      "Психологиялық кеңес беру",
      "Психотерапия негіздері",
      "Эксперименталды психология"
    ],
    skills: [
      "Эмпатия",
      "Белсенді тыңдау",
      "Талдау қабілеті",
      "Өзін-өзі басқару",
      "Этикалық принциптерді сақтау",
      "Зерттеу дағдылары"
    ],
    careers: [
      {
        title: "Психолог-кеңесші",
        description: "Жеке тұлғаларға психологиялық көмек көрсету"
      },
      {
        title: "Клиникалық психолог",
        description: "Психикалық бұзылыстарды диагностикалау және емдеу"
      },
      {
        title: "Білім беру психологы",
        description: "Білім беру мекемелерінде психологиялық қолдау көрсету"
      },
      {
        title: "Ұйымдастыру психологы",
        description: "Компанияларда персоналмен жұмыс және ұйымдастыру мәдениетін дамыту"
      },
      {
        title: "Зерттеуші психолог",
        description: "Психология саласында ғылыми жұмыстар жүргізу"
      }
    ],
    universities: [
      {
        id: "abaiuni",
        name: "Абай университеті",
        location: "Астана қ.",
        rating: 4.9,
        tuition: "1,200,000 ₸/жыл"
      },
      {
        id: "kaznu",
        name: "ҚазҰУ",
        location: "Алматы қ.",
        rating: 4.8,
        tuition: "850,000 ₸/жыл"
      }
    ]
  }
};

const MajorDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const major = majorsData[id as keyof typeof majorsData];

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
      <main className="bg-gray-50 min-h-screen">
        <div className="bg-blue-50 py-16">
          <div className="container px-4 md:px-6">
            <Link to="/majors" className="flex items-center text-tandablue mb-4 hover:underline">
              <ArrowLeft className="h-4 w-4 mr-1" /> Барлық мамандықтар
            </Link>

            <div className="flex items-center gap-4">
              <div className="p-4 bg-white rounded-full">
                {major.icon}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold">{major.name}</h1>
                  <Badge className={`
                    ${major.badge === "Жоғары сұраныс" ? "bg-green-100 text-green-800 hover:bg-green-100" : 
                    major.badge === "Орташа сұраныс" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" : 
                    "bg-blue-100 text-blue-800 hover:bg-blue-100"}
                  `}>
                    {major.badge}
                  </Badge>
                </div>
                <p className="text-gray-600">{major.category}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container px-4 md:px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-5 rounded-lg shadow-sm flex items-center">
              <Clock className="h-10 w-10 text-blue-500 mr-4" />
              <div>
                <p className="text-sm text-gray-500">Оқу мерзімі</p>
                <p className="text-xl font-bold">{major.duration}</p>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-sm flex items-center">
              <Award className="h-10 w-10 text-green-500 mr-4" />
              <div>
                <p className="text-sm text-gray-500">Мамандық дәрежесі</p>
                <p className="text-xl font-bold">Бакалавр</p>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-sm flex items-center">
              <Briefcase className="h-10 w-10 text-purple-500 mr-4" />
              <div>
                <p className="text-sm text-gray-500">Орташа жалақы</p>
                <p className="text-xl font-bold">{major.salary}</p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="description" className="mb-12">
            <TabsList className="mb-8">
              <TabsTrigger value="description">Сипаттама</TabsTrigger>
              <TabsTrigger value="subjects">Пәндер</TabsTrigger>
              <TabsTrigger value="careers">Мансап мүмкіндіктері</TabsTrigger>
              <TabsTrigger value="universities">Университеттер</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Мамандық туралы</h2>
              <p className="text-gray-700 mb-6">{major.fullDescription}</p>
              
              <h3 className="text-xl font-semibold mb-3">Қажетті дағдылар</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {major.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-sm py-2">
                    {skill}
                  </Badge>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="subjects" className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Негізгі оқу пәндері</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {major.subjects.map((subject, index) => (
                  <div key={index} className="flex items-center p-3 border rounded-md">
                    <div className="h-2 w-2 bg-blue-500 rounded-full mr-3"></div>
                    <span>{subject}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="careers" className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Мансап мүмкіндіктері</h2>
              <div className="space-y-4">
                {major.careers.map((career, index) => (
                  <Card key={index}>
                    <CardContent className="p-4 flex items-center">
                      <User className="h-10 w-10 text-tandablue bg-blue-50 p-2 rounded-full mr-4" />
                      <div>
                        <h3 className="font-bold">{career.title}</h3>
                        <p className="text-sm text-gray-600">{career.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="universities" className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Бұл мамандықты оқытатын университеттер</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {major.universities.map((university, index) => (
                  <Link key={index} to={`/universities/${university.id}`} className="block">
                    <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-bold">{university.name}</h3>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                            <span>{university.rating}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{university.location}</p>
                        <p className="text-sm font-medium text-blue-600">{university.tuition}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="text-center mb-8">
            <Link to="/counseling">
              <Button className="px-8">Мамандық бойынша кеңес алу</Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MajorDetailPage;
