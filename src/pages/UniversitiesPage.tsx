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
import { universities } from '@/data/universities';

const UniversityCard: React.FC<{ university: any }> = ({ university }) => {
  // Университет ішінен сурет алу логикасы
  const getUniversityImage = (uniId: string) => {
    switch(uniId) {
      case "kaznu": 
        return "public/lovable-uploads/93d4f861-eaff-4a58-a39a-cccae16687f1.png"; // КазНУ суреті
      case "kazmu": 
        return "public/lovable-uploads/9a91a880-f257-4936-9fbe-7d3290ff568e.png"; // ҚазҰМУ суреті
      case "oku": 
        return "public/lovable-uploads/bc219841-91c3-4f94-a231-68e33b713252.png"; // М. Әуезов атындағы ОҚУ
      case "ktu": 
        return "public/lovable-uploads/d8d26844-8131-41a5-ab7b-bb93e6983808.png"; // Қарағанды техникалық университеті
      case "buketov": 
        return "public/lovable-uploads/27c3eb85-807c-455a-acb3-72179747bb97.png"; // Бөкетов университеті
      case "almau": 
        return "public/lovable-uploads/83fbda14-7fa1-4abb-b8f1-f7c9f4f704a4.png"; // AlmaU
      case "kazguu": 
        return "public/lovable-uploads/61a90cf6-2caa-46d2-8f3a-27a4f392eb41.png"; // KAZGUU Университеті
      case "kaznau": 
        return "public/lovable-uploads/ee4e51e4-83d5-4a25-a5c3-545d8b931e47.png"; // ҚазҰАЗУ
      case "seifullin": 
        return "public/lovable-uploads/8671a5fd-2b18-4b79-985e-29c187014774.png"; // С.Сейфуллин атындағы ҚАЗАТУ
      case "toraighyrov": 
        return "public/lovable-uploads/4555b923-6286-4595-8054-f682902cac39.png"; // Торайғыров университеті
      case "ektu": 
        return "public/lovable-uploads/0b208751-1737-4280-a47f-55b36a6bbb41.png"; // Шығыс Қазақстан техникалық университеті
      // Басқа университеттерге қажет болған жағдайда қосылады
      default:
        return university.image; // Қалғандарына бастапқы сурет қалады
    }
  };

  // Университет суретін алу
  const universityImage = getUniversityImage(university.id);

  return (
    <div className="bg-white rounded-lg border overflow-hidden shadow-sm">
      <img
        src={universityImage}
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
  
  // Extract unique cities for filtering
  const cities = [...new Set(universities.map(uni => uni.city))];

  // Extract unique majors for filtering
  const allMajors = universities.flatMap(uni => uni.majors || []);
  const uniqueMajors = [...new Set(allMajors)];
  
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedRating, setSelectedRating] = useState<string>("all");
  const [selectedMajor, setSelectedMajor] = useState<string>("all");
  const [filteredUniversities, setFilteredUniversities] = useState(universities);
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
