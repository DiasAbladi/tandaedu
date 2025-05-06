
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UniversityFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  selectedRating: string;
  setSelectedRating: (rating: string) => void;
  selectedMajor: string;
  setSelectedMajor: (major: string) => void;
  cities: string[];
  uniqueMajors: string[];
  handleSearch: (e: React.FormEvent) => void;
  resetFilters: () => void;
}

const UniversityFilters: React.FC<UniversityFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCity,
  setSelectedCity,
  selectedRating,
  setSelectedRating,
  selectedMajor,
  setSelectedMajor,
  cities,
  uniqueMajors,
  handleSearch,
  resetFilters,
}) => {
  return (
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
  );
};

export default UniversityFilters;
