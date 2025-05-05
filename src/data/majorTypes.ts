
import { LucideIcon } from 'lucide-react';

export interface Major {
  id: string;
  code: string;
  name: string;
  badge: string;
  icon: LucideIcon;
  description: string;
  duration: string;
  salary: string;
  subjects: string;
  category: string;
  minScore?: number;
}

// Мамандықтар категориялары
export const majorCategories = [
  "Барлығы",
  "Білім",
  "Бизнес және басқару",
  "IT және инженерия",
  "Денсаулық сақтау",
  "Жаратылыстану ғылымдары",
  "Гуманитарлық ғылымдар",
  "Өнер және дизайн",
  "Әлеуметтік ғылымдар",
  "Ауыл шаруашылығы",
  "Техникалық ғылымдар",
  "Құқық",
  "Құрылыс және сәулет"
];

// Сұраныс деңгейлері
export const demandLevels = [
  "Жоғары сұраныс",
  "Орташа сұраныс",
  "Төмен сұраныс"
];

// Оқу мерзімдері
export const studyDurations = [
  "4 жыл",
  "5 жыл",
  "5-7 жыл"
];
