
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Laptop, 
  BarChart2, 
  FlaskConical, 
  Heart, 
  Search,
  Briefcase,
  GraduationCap,
  MonitorSmartphone,
  Brain,
  Microscope,
  Building2,
  Landmark
} from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";

interface Major {
  id: string;
  name: string;
  icon: React.ReactNode;
  badge: string;
  description: string;
  duration: string;
  salary: string;
  category: string;
}

const majors: Major[] = [
  {
    id: "programming",
    name: "Бағдарламалық қамтамасыз ету",
    icon: <Laptop className="h-10 w-10 text-tandablue" />,
    badge: "Жоғары сұраныс",
    description: "Компьютерлік бағдарламалар мен жүйелерді әзірлеу",
    duration: "4 жыл",
    salary: "400,000 - 800,000 ₸",
    category: "IT және компьютерлік ғылымдар"
  },
  {
    id: "finance",
    name: "Қаржы және есеп",
    icon: <BarChart2 className="h-10 w-10 text-tandablue" />,
    badge: "Жоғары сұраныс",
    description: "Қаржылық талдау және бухгалтерлік есеп",
    duration: "4 жыл",
    salary: "300,000 - 600,000 ₸",
    category: "Экономика және бизнес"
  },
  {
    id: "biotech",
    name: "Биотехнология",
    icon: <FlaskConical className="h-10 w-10 text-tandablue" />,
    badge: "Орташа сұраныс",
    description: "Биологиялық процестерді зерттеу және қолдану",
    duration: "4 жыл",
    salary: "250,000 - 500,000 ₸",
    category: "Жаратылыстану ғылымдары"
  },
  {
    id: "medicine",
    name: "Медицина",
    icon: <Heart className="h-10 w-10 text-tandablue" />,
    badge: "Жоғары сұраныс",
    description: "Адам денсаулығын сақтау және емдеу",
    duration: "5-7 жыл",
    salary: "350,000 - 900,000 ₸",
    category: "Денсаулық сақтау"
  },
  {
    id: "digital-marketing",
    name: "Цифрлық маркетинг",
    icon: <MonitorSmartphone className="h-10 w-10 text-tandablue" />,
    badge: "Жоғары сұраныс",
    description: "Онлайн маркетинг стратегиялары мен сандық брендинг",
    duration: "4 жыл",
    salary: "300,000 - 700,000 ₸",
    category: "Маркетинг және коммуникация"
  },
  {
    id: "psychology",
    name: "Психология",
    icon: <Brain className="h-10 w-10 text-tandablue" />,
    badge: "Орташа сұраныс",
    description: "Адам мінез-құлқы мен психикалық процестерді зерттеу",
    duration: "4 жыл",
    salary: "250,000 - 500,000 ₸",
    category: "Әлеуметтік ғылымдар"
  }
];

const categories = [
  "Барлығы",
  "IT және компьютерлік ғылымдар",
  "Экономика және бизнес",
  "Жаратылыстану ғылымдары",
  "Денсаулық сақтау",
  "Маркетинг және коммуникация",
  "Әлеуметтік ғылымдар",
  "Инженерия",
  "Білім беру",
  "Өнер және дизайн"
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
        
        <Button className="w-full">Толығырақ</Button>
      </div>
    </Card>
  );
};

const MajorsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("Барлығы");
  const [searchValue, setSearchValue] = React.useState("");

  const filteredMajors = majors.filter(major => {
    if (selectedCategory !== "Барлығы" && major.category !== selectedCategory) {
      return false;
    }
    if (searchValue && !major.name.toLowerCase().includes(searchValue.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-blue-50 py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Мамандықтар каталогы</h1>
            <p className="text-gray-600">
              Болашақ мамандығыңызды таңдауға көмектесетін толық ақпарат: оқу бағдарламалары, жұмыс мүмкіндіктері және табыс деңгейі.
            </p>
          </div>
        </div>
      </div>

      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar filters */}
          <div className="space-y-8">
            <div>
              <h3 className="font-medium text-lg mb-4">Мамандық салалары</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center">
                    <Checkbox 
                      id={`category-${category}`} 
                      checked={selectedCategory === category}
                      onCheckedChange={() => setSelectedCategory(category)}
                      className="mr-2" 
                    />
                    <label 
                      htmlFor={`category-${category}`}
                      className="text-sm text-gray-700 cursor-pointer"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-medium text-lg mb-4">Оқу мерзімі</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Checkbox id="duration-2-3" className="mr-2" />
                  <label 
                    htmlFor="duration-2-3"
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    2-3 жыл
                  </label>
                </div>
                <div className="flex items-center">
                  <Checkbox id="duration-4" className="mr-2" />
                  <label 
                    htmlFor="duration-4"
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    4 жыл
                  </label>
                </div>
                <div className="flex items-center">
                  <Checkbox id="duration-5-6" className="mr-2" />
                  <label 
                    htmlFor="duration-5-6"
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    5-6 жыл
                  </label>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-medium text-lg mb-4">Сұраныс деңгейі</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Checkbox id="demand-high" className="mr-2" />
                  <label 
                    htmlFor="demand-high"
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    Жоғары сұраныс
                  </label>
                </div>
                <div className="flex items-center">
                  <Checkbox id="demand-medium" className="mr-2" />
                  <label 
                    htmlFor="demand-medium"
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    Орташа сұраныс
                  </label>
                </div>
                <div className="flex items-center">
                  <Checkbox id="demand-low" className="mr-2" />
                  <label 
                    htmlFor="demand-low"
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    Төмен сұраныс
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Input 
                    type="text" 
                    placeholder="Мамандық атауын енгізіңіз" 
                    className="pl-10"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                </div>
                <div className="flex gap-2">
                  <Select defaultValue="popular">
                    <SelectTrigger className="w-full md:w-auto">
                      <SelectValue placeholder="Сұрыптау" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">Танымалдылық бойынша</SelectItem>
                      <SelectItem value="salary-high">Жалақы (жоғарыдан)</SelectItem>
                      <SelectItem value="salary-low">Жалақы (төменнен)</SelectItem>
                      <SelectItem value="name">Атауы бойынша</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredMajors.length > 0 ? (
                filteredMajors.map((major) => (
                  <MajorCard key={major.id} major={major} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <Search className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-semibold">Мамандықтар табылмады</h3>
                  <p className="text-gray-600 mt-2">Іздеу сұранысыңызды өзгертіп, қайталап көріңіз</p>
                </div>
              )}
            </div>
            
            {filteredMajors.length > 0 && (
              <div className="mt-10 flex justify-center">
                <Button variant="outline">Тағы жүктеу</Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default MajorsPage;
