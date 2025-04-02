
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Star, ArrowRight, ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

interface University {
  id: string;
  name: string;
  fullName?: string;
  location: string;
  city: string;
  rating: number;
  students: string;
  tuition: string;
  image: string;
  badge?: string;
  badgeNumber?: number;
  majors?: string[];
}

const universities: University[] = [
  {
    id: "kaznu",
    name: "Әл-Фараби атындағы ҚазҰУ",
    fullName: "Әл-Фараби атындағы Қазақ Ұлттық Университеті",
    location: "Алматы қ.",
    city: "Алматы",
    rating: 4.8,
    students: "25,000+ студент",
    tuition: "850,000 ₸/жыл",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    badge: "Топ",
    badgeNumber: 1,
    majors: ["Информатика", "Экономика", "Құқықтану", "Биология", "Химия", "Физика"]
  },
  {
    id: "abaiuni",
    name: "Абай университеті",
    fullName: "Абай атындағы Қазақ ұлттық педагогикалық университеті",
    location: "Астана қ.",
    city: "Астана",
    rating: 4.9,
    students: "15,000+ студент",
    tuition: "1,200,000 ₸/жыл",
    image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    badge: "Топ",
    badgeNumber: 2,
    majors: ["Педагогика", "Психология", "Филология", "Тарих"]
  },
  {
    id: "kimep",
    name: "КИМЭП Университеті",
    fullName: "Қазақстан менеджмент, экономика және болжау институты",
    location: "Алматы қ.",
    city: "Алматы",
    rating: 4.7,
    students: "7,000+ студент",
    tuition: "950,000 ₸/жыл",
    image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    badge: "Топ",
    badgeNumber: 3,
    majors: ["Қаржы", "Менеджмент", "IT", "Маркетинг", "Халықаралық қатынастар"]
  },
  {
    id: "kbtu",
    name: "КБТУ",
    fullName: "Қазақстан-Британ техникалық университеті",
    location: "Алматы қ.",
    city: "Алматы",
    rating: 4.6,
    students: "5,000+ студент",
    tuition: "1,800,000 ₸/жыл",
    image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    badge: "Топ",
    badgeNumber: 4,
    majors: ["IT", "Мұнай-газ инженериясы", "Бизнес әкімшілігі", "Машина жасау"]
  },
  {
    id: "sdu",
    name: "Сүлейман Демирел университеті",
    fullName: "Сүлейман Демирел атындағы университет",
    location: "Қаскелең қ.",
    city: "Қаскелең",
    rating: 4.5,
    students: "8,000+ студент",
    tuition: "1,400,000 ₸/жыл",
    image: "https://images.unsplash.com/photo-1431576901776-e539bd916ba2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    badge: "Топ",
    badgeNumber: 5,
    majors: ["IT технологиялар", "Инженерия", "Бизнес", "Медицина"]
  },
  {
    id: "narxoz",
    name: "Нархоз Университеті",
    fullName: "Нархоз Университеті",
    location: "Алматы қ.",
    city: "Алматы",
    rating: 4.4,
    students: "10,000+ студент",
    tuition: "900,000 ₸/жыл",
    image: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    badge: "Топ",
    badgeNumber: 6,
    majors: ["Экономика", "Қаржы", "Есеп және аудит", "Менеджмент", "Маркетинг"]
  },
  {
    id: "iitu",
    name: "ХАТУ",
    fullName: "Халықаралық ақпараттық технологиялар университеті",
    location: "Алматы қ.",
    city: "Алматы",
    rating: 4.5,
    students: "6,000+ студент",
    tuition: "1,100,000 ₸/жыл",
    image: "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    badge: "Топ",
    badgeNumber: 7,
    majors: ["IT", "Киберқауіпсіздік", "Телекоммуникация", "Мультимедиа"]
  },
  {
    id: "enu",
    name: "Еуразия ұлттық университеті",
    fullName: "Л.Н. Гумилев атындағы Еуразия ұлттық университеті",
    location: "Астана қ.",
    city: "Астана",
    rating: 4.6,
    students: "18,000+ студент",
    tuition: "780,000 ₸/жыл",
    image: "https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    badge: "Топ",
    badgeNumber: 8,
    majors: ["Халықаралық қатынастар", "Филология", "Тарих", "Физика"]
  },
  {
    id: "satbayev",
    name: "Сәтбаев Университеті",
    fullName: "Қ.И. Сәтбаев атындағы Қазақ ұлттық техникалық университеті",
    location: "Алматы қ.",
    city: "Алматы",
    rating: 4.5,
    students: "14,000+ студент",
    tuition: "850,000 ₸/жыл",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    badge: "Топ",
    badgeNumber: 9,
    majors: ["Инженерия", "Металлургия", "Геология", "Мұнай-газ ісі"]
  }
];

// Extract unique cities for filtering
const cities = [...new Set(universities.map(uni => uni.city))];

// Extract unique majors for filtering
const allMajors = universities.flatMap(uni => uni.majors || []);
const uniqueMajors = [...new Set(allMajors)];

const UniversityCard: React.FC<{ university: University }> = ({ university }) => {
  return (
    <div className="bg-white rounded-lg border overflow-hidden shadow-sm">
      <img
        src={university.image}
        alt={university.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-5">
        {university.badge && (
          <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded mb-2">
            {university.badge} {university.badgeNumber}
          </span>
        )}
        
        <h3 className="text-xl font-bold mb-1">{university.name}</h3>
        <p className="text-gray-500 text-sm mb-3">{university.location}</p>
        
        <div className="flex flex-col gap-2 mb-5">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
            <span className="font-medium">{university.rating}</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-gray-600">{university.students}</span>
          </div>
          <div className="flex items-center text-sm font-medium text-blue-600">
            <span>{university.tuition}</span>
          </div>
        </div>
        
        <Link to={`/universities/${university.id}`}>
          <Button className="w-full flex justify-between items-center">
            Толығырақ <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

const UniversitiesPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedRating, setSelectedRating] = useState<string>("all");
  const [selectedMajor, setSelectedMajor] = useState<string>("all");
  const [filteredUniversities, setFilteredUniversities] = useState<University[]>(universities);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const universitiesPerPage = 6;
  
  // Check for search query parameters when the component mounts
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [location]);

  // Apply filters
  useEffect(() => {
    let filtered = universities;
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(uni => 
        uni.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (uni.fullName && uni.fullName.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Filter by city
    if (selectedCity !== "all") {
      filtered = filtered.filter(uni => uni.city === selectedCity);
    }
    
    // Filter by rating
    if (selectedRating !== "all") {
      const ratingValue = parseFloat(selectedRating);
      filtered = filtered.filter(uni => uni.rating >= ratingValue);
    }
    
    // Filter by major
    if (selectedMajor !== "all") {
      filtered = filtered.filter(uni => 
        uni.majors?.some(major => major.toLowerCase().includes(selectedMajor.toLowerCase()))
      );
    }
    
    setFilteredUniversities(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, selectedCity, selectedRating, selectedMajor]);

  // Pagination logic
  const indexOfLastUniversity = currentPage * universitiesPerPage;
  const indexOfFirstUniversity = indexOfLastUniversity - universitiesPerPage;
  const currentUniversities = filteredUniversities.slice(
    indexOfFirstUniversity, 
    indexOfLastUniversity
  );
  
  const totalPages = Math.ceil(filteredUniversities.length / universitiesPerPage);
  
  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCity("all");
    setSelectedRating("all");
    setSelectedMajor("all");
    
    // Update the URL to remove query parameters
    navigate('/universities');
    
    toast({
      title: "Сүзгіштер тазартылды",
      description: "Барлық сүзгіштер тазартылды",
    });
  };

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The existing useEffect will handle filtering based on searchQuery
    
    // Update URL with search parameter
    navigate(`/universities?search=${encodeURIComponent(searchQuery)}`);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-gray-50 py-12">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-bold mb-8">Қазақстан университеттері</h1>
          
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <div className="relative">
              <Input 
                type="text" 
                placeholder="Университет атауын іздеу" 
                className="pl-10 py-2 w-full rounded-md border shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            </div>
            
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Аймақ бойынша" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Барлық қалалар</SelectItem>
                {cities.map(city => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedRating} onValueChange={setSelectedRating}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Рейтинг бойынша" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Барлық рейтинг</SelectItem>
                <SelectItem value="4.8">4.8+</SelectItem>
                <SelectItem value="4.5">4.5+</SelectItem>
                <SelectItem value="4.0">4.0+</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedMajor} onValueChange={setSelectedMajor}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Мамандық бойынша" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Барлық мамандықтар</SelectItem>
                {uniqueMajors.map(major => (
                  <SelectItem key={major} value={major}>{major}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="lg:col-span-4 flex justify-end">
              <Button type="submit" className="mr-2">Іздеу</Button>
              <Button type="button" variant="outline" onClick={resetFilters}>Тазарту</Button>
            </div>
          </form>

          {filteredUniversities.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {currentUniversities.map(university => (
                  <UniversityCard key={university.id} university={university} />
                ))}
              </div>
              
              <div className="flex justify-center gap-2">
                <Button 
                  variant="outline" 
                  className="w-10 h-10 p-0" 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  &lt;
                </Button>
                
                {Array.from({ length: totalPages }).map((_, i) => (
                  <Button 
                    key={i}
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    className="w-10 h-10 p-0"
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}
                
                <Button 
                  variant="outline" 
                  className="w-10 h-10 p-0"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  &gt;
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center p-10">
              <p className="text-gray-500 mb-4">Университеттер табылмады</p>
              <Button onClick={resetFilters}>Сүзгіштерді тазарту</Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UniversitiesPage;
