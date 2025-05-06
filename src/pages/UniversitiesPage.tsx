
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from "@/components/ui/use-toast";
import { universities } from '@/data/universities';
import UniversityCard from '@/components/UniversityCard';
import UniversityFilters from '@/components/universities/UniversityFilters';
import UniversityPagination from '@/components/universities/UniversityPagination';

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
          
          <UniversityFilters 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            selectedRating={selectedRating}
            setSelectedRating={setSelectedRating}
            selectedMajor={selectedMajor}
            setSelectedMajor={setSelectedMajor}
            cities={cities}
            uniqueMajors={uniqueMajors}
            handleSearch={handleSearch}
            resetFilters={resetFilters}
          />

          {filteredUniversities.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {currentUniversities.map(university => (
                  <UniversityCard key={university.id} university={university} />
                ))}
              </div>
              
              <UniversityPagination 
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
              />
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
