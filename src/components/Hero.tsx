
import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Hero: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    // Check if the search query appears to be about universities or majors
    const uniKeywords = ['университет', 'оқу орны', 'колледж', 'вуз', 'қазұу', 'кбту', 'кимэп', 'хату', 'казну', 'атындағы', 'нархоз', 'казнпу'];
    
    const majorKeywords = ['мамандық', 'профессия', 'білім', 'программист', 'медицина', 'қаржы', 'маркетинг', 'биотехнология', 'психология', 'it'];
    
    let isUniSearch = false;
    let isMajorSearch = false;
    
    const lowerQuery = searchQuery.toLowerCase();
    
    // Check if the query contains university keywords
    uniKeywords.forEach(keyword => {
      if (lowerQuery.includes(keyword.toLowerCase())) {
        isUniSearch = true;
      }
    });
    
    // Check if the query contains major keywords
    majorKeywords.forEach(keyword => {
      if (lowerQuery.includes(keyword.toLowerCase())) {
        isMajorSearch = true;
      }
    });
    
    // Navigate based on the identified search intent
    if (isUniSearch || (!isUniSearch && !isMajorSearch)) {
      // Default to universities search if no specific intent is detected
      navigate(`/universities?search=${encodeURIComponent(searchQuery)}`);
    } else if (isMajorSearch) {
      navigate(`/majors?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const heroTitle = 'Болашақ, мамандығыңды табу оңай болсын';
  const heroDescription = 'Қазақстандағы жоғары оқу орындары туралы толық ақпарат және мамандық таңдауға көмек';
  const searchPlaceholder = 'Университет немесе мамандық іздеу...';
  const searchButtonText = 'Іздеу';

  return (
    <section className="bg-blue-50 py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 pb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tighter max-w-3xl">
            {heroTitle}
          </h1>
          <p className="text-muted-foreground md:text-lg max-w-[700px]">
            {heroDescription}
          </p>
          <form onSubmit={handleSearch} className="w-full max-w-md flex items-center gap-2 mt-6">
            <div className="relative flex-1">
              <Input 
                type="text" 
                placeholder={searchPlaceholder} 
                className="pl-3 pr-10 py-2 w-full rounded-md border shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit" className="bg-tandablue hover:bg-blue-700">
              {searchButtonText}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
