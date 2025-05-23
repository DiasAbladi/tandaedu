
import { 
  BookOpen, 
  GraduationCap, 
  Languages
} from "lucide-react";
import { Major } from './majorTypes';

// Гуманитарлық ғылымдар саласындағы мамандықтар
export const humanitiesMajors: Major[] = [
  {
    id: "b032",
    code: "B032",
    name: "Философия және этика",
    badge: "Орташа сұраныс",
    icon: BookOpen,
    description: "Бұл мамандық бойынша студенттер философиялық ойлау, этикалық принциптер және моральдық құндылықтар саласындағы білім алады.",
    duration: "4 жыл",
    salary: "180,000 - 350,000 ₸",
    subjects: "Дж. тарихы – География",
    category: "Гуманитарлық ғылымдар",
    minScore: 76
  },
  {
    id: "b033",
    code: "B033",
    name: "Дінтану және теология",
    badge: "Орташа сұраныс",
    icon: BookOpen,
    description: "Бұл мамандық бойынша студенттер әлемдік діндер, діни философия және теологиялық концепциялар саласындағы білім алады.",
    duration: "4 жыл",
    salary: "180,000 - 350,000 ₸",
    subjects: "Шығармашылық",
    category: "Гуманитарлық ғылымдар",
    minScore: 75
  },
  {
    id: "b034",
    code: "B034",
    name: "Тарих",
    badge: "Орташа сұраныс",
    icon: BookOpen,
    description: "Бұл мамандық бойынша студенттер әлем тарихы, Қазақстан тарихы және тарихи зерттеу әдістері саласындағы білім алады.",
    duration: "4 жыл",
    salary: "180,000 - 350,000 ₸",
    subjects: "Дж. тарихы – География",
    category: "Гуманитарлық ғылымдар",
    minScore: 82
  },
  {
    id: "b035",
    code: "B035",
    name: "Түркітану",
    badge: "Орташа сұраныс",
    icon: BookOpen,
    description: "Бұл мамандық бойынша студенттер түркі тілдері, мәдениеті, тарихы және өркениеті саласындағы білім алады.",
    duration: "4 жыл",
    salary: "200,000 - 350,000 ₸",
    subjects: "Шет тілі – Дж. тарихы",
    category: "Гуманитарлық ғылымдар",
    minScore: 78
  },
  {
    id: "b036",
    code: "B036",
    name: "Аударма ісі",
    badge: "Жоғары сұраныс",
    icon: Languages,
    description: "Бұл мамандық бойынша студенттер шет тілдерінен аудару, ауызша және жазбаша аударма техникалары саласындағы білім алады.",
    duration: "4 жыл",
    salary: "250,000 - 600,000 ₸",
    subjects: "Шет тілі – Дж. тарихы",
    category: "Гуманитарлық ғылымдар",
    minScore: 92
  },
  {
    id: "b037",
    code: "B037",
    name: "Филология",
    badge: "Орташа сұраныс",
    icon: BookOpen,
    description: "Бұл мамандық бойынша студенттер тіл білімі, әдебиеттану, лингвистика және тілдік талдау саласындағы білім алады.",
    duration: "4 жыл",
    salary: "180,000 - 350,000 ₸",
    subjects: "Қаз. Тілі – Қаз. Әдебиеті / Орыс. Тілі – Орыс. Әдебиеті",
    category: "Гуманитарлық ғылымдар",
    minScore: 83
  },
  {
    id: "b039",
    code: "B039",
    name: "Мәдениеттану",
    badge: "Орташа сұраныс",
    icon: BookOpen,
    description: "Бұл мамандық бойынша студенттер әлем мәдениеті, мәдени антропология және мәдени мұра саласындағы білім алады.",
    duration: "4 жыл",
    salary: "180,000 - 350,000 ₸",
    subjects: "Шет тілі – Дж. тарихы",
    category: "Гуманитарлық ғылымдар",
    minScore: 76
  },
  {
    id: "b042",
    code: "B042",
    name: "Журналистика және репортер ісі",
    badge: "Жоғары сұраныс",
    icon: BookOpen,
    description: "Бұл мамандық бойынша студенттер баспасөз, теледидар, радио және онлайн медиада жаңалықтар мен репортаждар жазу саласындағы білім алады.",
    duration: "4 жыл",
    salary: "200,000 - 500,000 ₸",
    subjects: "Шығармашылық",
    category: "Гуманитарлық ғылымдар",
    minScore: 85
  },
  {
    id: "b043",
    code: "B043",
    name: "Кітапхана ісі, ақпараттарды өңдеу және мұрағат ісі",
    badge: "Орташа сұраныс",
    icon: BookOpen,
    description: "Бұл мамандық бойынша студенттер кітапхана менеджменті, ақпараттық ресурстар және мұрағаттық құжаттар саласындағы білім алады.",
    duration: "4 жыл",
    salary: "160,000 - 300,000 ₸",
    subjects: "Қаз. Тілі – Қаз. Әдебиеті / Орыс. Тілі – Орыс. Әдебиеті",
    category: "Гуманитарлық ғылымдар",
    minScore: 70
  },
  {
    id: "b134",
    code: "B134",
    name: "Археология және этнология",
    badge: "Орташа сұраныс",
    icon: BookOpen,
    description: "Бұл мамандық бойынша студенттер археологиялық зерттеулер, этнологиялық зерттеулер және мәдени мұра саласындағы білім алады.",
    duration: "4 жыл",
    salary: "180,000 - 350,000 ₸",
    subjects: "Дж. тарихы – География",
    category: "Гуманитарлық ғылымдар",
    minScore: 75
  },
  {
    id: "b135",
    code: "B135",
    name: "Шығыстану",
    badge: "Орташа сұраныс",
    icon: Languages,
    description: "Бұл мамандық бойынша студенттер Шығыс елдерінің тілдері, мәдениеті, тарихы және саясаты саласындағы білім алады.",
    duration: "4 жыл",
    salary: "200,000 - 400,000 ₸",
    subjects: "Шет тілі – Дж. тарихы",
    category: "Гуманитарлық ғылымдар",
    minScore: 83
  }
];
