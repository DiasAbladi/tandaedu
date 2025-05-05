
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search,
  FileText,
  Filter,
  SortAsc
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { majorsData, majorCategories, demandLevels, studyDurations } from '@/data/majors';
import MajorCard from '@/components/majors/MajorCard';

const MajorsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("Барлығы");
  const [searchValue, setSearchValue] = useState("");
  const [selectedDemand, setSelectedDemand] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [sortOption, setSortOption] = useState("popular");
  const navigate = useNavigate();

  const handleDemandChange = (value: string) => {
    setSelectedDemand(prev => 
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const handleDurationChange = (value: string) => {
    setSelectedDurations(prev => 
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const filteredMajors = majorsData.filter(major => {
    // Категория бойынша фильтрлеу
    if (selectedCategory !== "Барлығы" && major.category !== selectedCategory) {
      return false;
    }
    
    // Сұраныс деңгейі бойынша фильтрлеу
    if (selectedDemand.length > 0 && !selectedDemand.includes(major.badge)) {
      return false;
    }
    
    // Оқу мерзімі бойынша фильтрлеу
    if (selectedDurations.length > 0 && !selectedDurations.includes(major.duration)) {
      return false;
    }
    
    // Іздеу сұранысы бойынша фильтрлеу
    if (searchValue && !major.name.toLowerCase().includes(searchValue.toLowerCase()) && 
        !major.code.toLowerCase().includes(searchValue.toLowerCase())) {
      return false;
    }
    
    return true;
  }).sort((a, b) => {
    // Сұрыптау
    switch (sortOption) {
      case "name":
        return a.name.localeCompare(b.name);
      case "code":
        return a.code.localeCompare(b.code);
      case "score-high":
        return (b.minScore || 0) - (a.minScore || 0);
      case "score-low":
        return (a.minScore || 0) - (b.minScore || 0);
      default:
        return 0;
    }
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already implemented with the filter
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-blue-50 py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Мамандықтар каталогы</h1>
            <p className="text-gray-600">
              Болашақ мамандығыңызды таңдауға көмектесетін толық ақпарат: оқу бағдарламалары, талап етілетін пәндер және шекті балл.
            </p>
          </div>
          
          <Tabs defaultValue="Барлық мамандықтар" className="mt-8 max-w-2xl mx-auto">
            <TabsList className="grid grid-cols-3 bg-blue-100">
              <TabsTrigger value="Барлық мамандықтар">Барлық мамандықтар</TabsTrigger>
              <TabsTrigger value="Бакалавриат">Бакалавриат</TabsTrigger>
              <TabsTrigger value="Магистратура">Магистратура</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar filters */}
          <div className="space-y-8">
            <div>
              <h3 className="font-medium text-lg mb-4">Мамандық салалары</h3>
              <div className="space-y-2">
                {majorCategories.map((category) => (
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
                {studyDurations.map((duration) => (
                  <div key={duration} className="flex items-center">
                    <Checkbox 
                      id={`duration-${duration}`} 
                      checked={selectedDurations.includes(duration)}
                      onCheckedChange={() => handleDurationChange(duration)}
                      className="mr-2" 
                    />
                    <label 
                      htmlFor={`duration-${duration}`}
                      className="text-sm text-gray-700 cursor-pointer"
                    >
                      {duration}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-medium text-lg mb-4">Сұраныс деңгейі</h3>
              <div className="space-y-2">
                {demandLevels.map((demand) => (
                  <div key={demand} className="flex items-center">
                    <Checkbox 
                      id={`demand-${demand}`} 
                      checked={selectedDemand.includes(demand)}
                      onCheckedChange={() => handleDemandChange(demand)}
                      className="mr-2" 
                    />
                    <label 
                      htmlFor={`demand-${demand}`}
                      className="text-sm text-gray-700 cursor-pointer"
                    >
                      {demand}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Input 
                    type="text" 
                    placeholder="Мамандық атауын немесе кодын енгізіңіз" 
                    className="pl-10"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                </div>
                <div className="flex gap-2">
                  <Select 
                    defaultValue="popular"
                    value={sortOption}
                    onValueChange={setSortOption}
                  >
                    <SelectTrigger className="w-full md:w-auto">
                      <SelectValue placeholder="Сұрыптау" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">Танымалдылық бойынша</SelectItem>
                      <SelectItem value="name">Атауы бойынша</SelectItem>
                      <SelectItem value="code">Коды бойынша</SelectItem>
                      <SelectItem value="score-high">Шекті балл (жоғарыдан)</SelectItem>
                      <SelectItem value="score-low">Шекті балл (төменнен)</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex rounded-md border">
                    <Button 
                      type="button" 
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      className="rounded-r-none" 
                      onClick={() => setViewMode("grid")}
                    >
                      <FileText className="h-4 w-4" />
                    </Button>
                    <Button 
                      type="button" 
                      variant={viewMode === "table" ? "default" : "ghost"}
                      className="rounded-l-none" 
                      onClick={() => setViewMode("table")}
                    >
                      <Table className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </form>
            </div>
            
            {viewMode === "grid" ? (
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
            ) : (
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Код</TableHead>
                      <TableHead>Мамандық атауы</TableHead>
                      <TableHead>Пәндер</TableHead>
                      <TableHead className="text-right">Шекті балл (2024)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMajors.length > 0 ? (
                      filteredMajors.map((major) => (
                        <TableRow key={major.id} className="cursor-pointer hover:bg-gray-50" onClick={() => navigate(`/majors/${major.id}`)}>
                          <TableCell className="font-medium text-blue-600">{major.code}</TableCell>
                          <TableCell>{major.name}</TableCell>
                          <TableCell>{major.subjects}</TableCell>
                          <TableCell className="text-right">
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium
                              ${(major.minScore || 0) >= 90 ? "bg-green-100 text-green-700" : 
                               (major.minScore || 0) >= 75 ? "bg-yellow-100 text-yellow-700" : 
                               "bg-blue-100 text-blue-700"}`}>
                              {major.minScore || "–"} балл
                            </span>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8">
                          <Search className="h-8 w-8 mx-auto text-gray-300 mb-2" />
                          <p className="text-gray-600">Мамандықтар табылмады</p>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
            
            {filteredMajors.length > 20 && (
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
