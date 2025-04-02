
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Star, Calendar, Filter, ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

interface Consultant {
  id: string;
  name: string;
  role: string;
  specialization: string[];
  rating: number;
  ratingCount: number;
  experience: string;
  price: string;
  duration: string;
  image: string;
  description: string;
}

const consultants: Consultant[] = [
  {
    id: "consultant1",
    name: "Төлеген Айдарұлы",
    role: "Карьералық кеңесші",
    specialization: ["IT", "Бизнес"],
    rating: 4.8,
    ratingCount: 124,
    experience: "8 жыл тәжірибесі бар IT және бизнес саласында кәсіби кеңесші. Назарбаев Университетінің түлегі.",
    price: "15 000 ₸",
    duration: "60 минут",
    image: "/lovable-uploads/cc18b066-c716-4c8e-934f-b534d715a74c.png",
    description: "8 жылдық тәжірибесі бар IT және бизнес саласында кәсіби кеңесші. Назарбаев Университетінің түлегі."
  },
  {
    id: "consultant2",
    name: "Әсел Нұржанқызы",
    role: "Психолог, мамандық кеңесшісі",
    specialization: ["Психология", "Білім беру"],
    rating: 4.9,
    ratingCount: 187,
    experience: "12 жыл тәжірибе",
    price: "18 000 ₸",
    duration: "60 минут",
    image: "/lovable-uploads/cc18b066-c716-4c8e-934f-b534d715a74c.png",
    description: "12 жылдық тәжірибесі бар психолог және мамандық кеңесшісі. 500-ден астам түлекке өз мамандығын таңдауға көмектескен."
  },
  {
    id: "consultant3",
    name: "Бауржан Мәдиұлы",
    role: "Білім беру сарапшысы",
    specialization: ["Халықаралық білім", "Инженерия"],
    rating: 4.7,
    ratingCount: 156,
    experience: "15 жыл тәжірибе",
    price: "20 000 ₸",
    duration: "60 минут",
    image: "/lovable-uploads/cc18b066-c716-4c8e-934f-b534d715a74c.png",
    description: "15 жылдық тәжірибесі бар білім беру сарапшысы. Шетелдік оқу және инженерлік мамандықтар бойынша кеңес береді."
  },
  {
    id: "consultant4",
    name: "Гүлнар Серікова",
    role: "Медицина саласының кеңесшісі",
    specialization: ["Медицина", "Денсаулық сақтау"],
    rating: 4.9,
    ratingCount: 142,
    experience: "10 жыл тәжірибе",
    price: "17 000 ₸",
    duration: "60 минут",
    image: "/lovable-uploads/cc18b066-c716-4c8e-934f-b534d715a74c.png",
    description: "10 жылдық тәжірибесі бар медицина саласының маманы. Медициналық мамандықтар бойынша кәсіби кеңес береді."
  }
];

const ConsultantCard: React.FC<{ consultant: Consultant }> = ({ consultant }) => {
  return (
    <div className="bg-white rounded-lg p-5 border mb-6">
      <div className="flex gap-4 items-center mb-3">
        <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
          <img src={consultant.image} alt={consultant.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h3 className="font-bold">{consultant.name}</h3>
          <p className="text-gray-600 text-sm">{consultant.role}</p>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-1 mb-3">
        {consultant.specialization.map((spec, index) => (
          <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded-md">{spec}</span>
        ))}
      </div>
      
      <div className="flex items-center mb-3">
        {Array(5).fill(0).map((_, i) => (
          <Star 
            key={i} 
            size={14}
            className={`${i < Math.floor(consultant.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
          />
        ))}
        <span className="ml-1 text-sm font-medium">{consultant.rating}</span>
        <span className="ml-1 text-xs text-gray-500">({consultant.ratingCount} пікір)</span>
      </div>
      
      <p className="text-sm mb-4">{consultant.description}</p>
      
      <div className="flex justify-between items-center mt-3 pt-3 border-t">
        <div>
          <p className="text-blue-600 font-bold">{consultant.price}</p>
          <p className="text-xs text-gray-500">{consultant.duration}</p>
        </div>
        <Button size="sm">Жазылу</Button>
      </div>
    </div>
  );
};

const ConsultingPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>("all");
  const [filteredConsultants, setFilteredConsultants] = useState<Consultant[]>(consultants);
  const { toast } = useToast();

  // Collect all unique specializations
  const allSpecializations = Array.from(
    new Set(consultants.flatMap(consultant => consultant.specialization))
  );

  // Apply filters when search or specialization changes
  React.useEffect(() => {
    let filtered = consultants;
    
    if (searchQuery) {
      filtered = filtered.filter(consultant =>
        consultant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        consultant.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        consultant.specialization.some(spec => 
          spec.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
    
    if (selectedSpecialization !== "all") {
      filtered = filtered.filter(consultant =>
        consultant.specialization.includes(selectedSpecialization)
      );
    }
    
    setFilteredConsultants(filtered);
  }, [searchQuery, selectedSpecialization]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedSpecialization("all");
    toast({
      title: "Сүзгіштер тазартылды",
      description: "Барлық сүзгіштер тазартылды",
    });
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="container px-4 md:px-6">
          <div className="bg-blue-600 text-white rounded-lg p-6 mb-12">
            <h2 className="text-2xl font-bold mb-2">Жеке кеңес тағайындау</h2>
            <p className="max-w-2xl mb-0">
              Біздің тәжірибелі мамандар сізге университет пен мамандық таңдауда көмек көрсетеді
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg mb-8">
            <h3 className="text-lg font-bold mb-4">Кеңес түрін таңдаңыз</h3>
            
            <Tabs defaultValue="online">
              <TabsList className="mb-6">
                <TabsTrigger value="online">
                  <Calendar className="h-4 w-4 mr-2" /> Онлайн кеңес
                </TabsTrigger>
                <TabsTrigger value="offline">
                  <Calendar className="h-4 w-4 mr-2" /> Офлайн кеңес
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="online" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <Input 
                      type="text" 
                      placeholder="Кеңесші атауын іздеу" 
                      className="pl-10 py-2 w-full rounded-md border shadow-sm"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  </div>
                  
                  <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Саласы бойынша" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Барлық салалар</SelectItem>
                      {allSpecializations.map(spec => (
                        <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Button variant="outline" onClick={resetFilters}>
                    <Filter className="h-4 w-4 mr-2" />
                    Сүзгіштерді тазарту
                  </Button>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-6">Кеңесшілер ({filteredConsultants.length})</h3>
                  {filteredConsultants.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {filteredConsultants.map(consultant => (
                        <ConsultantCard key={consultant.id} consultant={consultant} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center p-10">
                      <p className="text-gray-500 mb-4">Кеңесшілер табылмады</p>
                      <Button onClick={resetFilters}>Сүзгіштерді тазарту</Button>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="offline">
                <div className="p-6 text-center">
                  <p className="text-lg mb-4">Офлайн кеңестер тек алдын-ала жазылу арқылы өткізіледі.</p>
                  <Button>Байланысу</Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ConsultingPage;
