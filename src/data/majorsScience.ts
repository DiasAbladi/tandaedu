
import { 
  Microscope, 
  Globe, 
  FlaskConical
} from "lucide-react";
import { Major } from './majorTypes';

// Жаратылыстану ғылымдары саласындағы мамандықтар
export const scienceMajors: Major[] = [
  {
    id: "b050",
    code: "B050",
    name: "Биологиялық және сабақтас ғылымдар",
    badge: "Орташа сұраныс",
    icon: Microscope,
    description: "Бұл мамандық бойынша студенттер биологиялық процестер, тірі организмдер және олардың өзара әрекеттесуі саласындағы білім алады.",
    duration: "4 жыл",
    salary: "200,000 - 400,000 ₸",
    subjects: "Биология – Химия",
    category: "Жаратылыстану ғылымдары",
    minScore: 82
  },
  {
    id: "b051",
    code: "B051",
    name: "Қоршаған орта",
    badge: "Жоғары сұраныс",
    icon: Globe,
    description: "Бұл мамандық бойынша студенттер экология, табиғи ресурстар және қоршаған ортаны қорғау саласындағы білім алады.",
    duration: "4 жыл",
    salary: "200,000 - 450,000 ₸",
    subjects: "Биология – География",
    category: "Жаратылыстану ғылымдары",
    minScore: 80
  },
  {
    id: "b052",
    code: "B052",
    name: "Жер туралы ғылым",
    badge: "Орташа сұраныс",
    icon: Globe,
    description: "Бұл мамандық бойынша студенттер геология, геофизика және жер қыртысының құрылымы саласындағы білім алады.",
    duration: "4 жыл",
    salary: "200,000 - 500,000 ₸",
    subjects: "Математика – География",
    category: "Жаратылыстану ғылымдары",
    minScore: 79
  },
  {
    id: "b053",
    code: "B053",
    name: "Химия",
    badge: "Орташа сұраныс",
    icon: FlaskConical,
    description: "Бұл мамандық бойынша студенттер химиялық элементтер, қосылыстар және химиялық реакциялар саласындағы білім алады.",
    duration: "4 жыл",
    salary: "200,000 - 450,000 ₸",
    subjects: "Биология – Химия",
    category: "Жаратылыстану ғылымдары",
    minScore: 83
  }
];
