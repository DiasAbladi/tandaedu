
import React from 'react';
import { Link } from "react-router-dom";
import { 
  Laptop, 
  BarChart2, 
  FlaskConical, 
  Heart, 
  Search,
  Briefcase,
  GraduationCap,
  MonitorSmartphone
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Major {
  id: string;
  name: string;
  icon: React.ReactNode;
  badge: string;
  description: string;
  duration: string;
  salary: string;
}

const majors: Major[] = [
  {
    id: "programming",
    name: "Бағдарламалық қамтамасыз ету",
    icon: <Laptop className="h-10 w-10 text-tandablue" />,
    badge: "Жоғары сұраныс",
    description: "Компьютерлік бағдарламалар мен жүйелерді әзірлеу",
    duration: "4 жыл",
    salary: "400,000 - 800,000 ₸"
  },
  {
    id: "finance",
    name: "Қаржы және есеп",
    icon: <BarChart2 className="h-10 w-10 text-tandablue" />,
    badge: "Жоғары сұраныс",
    description: "Қаржылық талдау және бухгалтерлік есеп",
    duration: "4 жыл",
    salary: "300,000 - 600,000 ₸"
  },
  {
    id: "biotech",
    name: "Биотехнология",
    icon: <FlaskConical className="h-10 w-10 text-tandablue" />,
    badge: "Орташа сұраныс",
    description: "Биологиялық процестерді зерттеу және қолдану",
    duration: "4 жыл",
    salary: "250,000 - 500,000 ₸"
  },
  {
    id: "medicine",
    name: "Медицина",
    icon: <Heart className="h-10 w-10 text-tandablue" />,
    badge: "Жоғары сұраныс",
    description: "Адам денсаулығын сақтау және емдеу",
    duration: "5-7 жыл",
    salary: "350,000 - 900,000 ₸"
  }
];

const MajorCard: React.FC<{ major: Major }> = ({ major }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-blue-50 rounded-full">
            {major.icon}
          </div>
          <div className={`inline-block px-3 py-1 text-xs font-medium rounded-full
            ${major.badge === "Жоғары сұраныс" ? "bg-green-100 text-green-700" : 
            major.badge === "Орташа сұраныс" ? "bg-yellow-100 text-yellow-700" : 
            "bg-blue-100 text-blue-700"}`}>
            {major.badge}
          </div>
        </div>
        
        <h3 className="text-lg font-bold mb-2">{major.name}</h3>
        <p className="text-sm text-gray-600 mb-4">{major.description}</p>
        
        <div className="space-y-2 mb-5">
          <div className="flex items-center text-sm">
            <span className="inline-block w-2 h-2 bg-gray-300 rounded-full mr-2"></span>
            <span className="text-gray-600">Оқу мерзімі: </span>
            <span className="ml-1 font-medium">{major.duration}</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="inline-block w-2 h-2 bg-gray-300 rounded-full mr-2"></span>
            <span className="text-gray-600">Орташа жалақы: </span>
            <span className="ml-1 font-medium">{major.salary}</span>
          </div>
        </div>
        
        <Link to={`/majors/${major.id}`}>
          <Button className="w-full">Толығырақ</Button>
        </Link>
      </div>
    </Card>
  );
};

const MajorsSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-3">Мамандықтар каталогы</h2>
          <p className="text-gray-600 max-w-3xl">
            Болашақ мамандығыңызды таңдауға көмектесетін толық ақпарат: оқу бағдарламалары, жұмыс мүмкіндіктері және табыс деңгейі.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Input 
              type="text" 
              placeholder="Мамандық атауын енгізіңіз" 
              className="pl-10 py-2 w-full"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 md:flex-none whitespace-nowrap">
              Барлық салалар <span className="ml-1">▼</span>
            </Button>
            <Button variant="outline" className="flex-1 md:flex-none whitespace-nowrap">
              Оқу мерзімі <span className="ml-1">▼</span>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {majors.map(major => (
            <MajorCard key={major.id} major={major} />
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Link to="/majors">
            <Button variant="outline" size="lg">
              Барлық мамандықтарды қарау
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MajorsSection;
