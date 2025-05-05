
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { featuredMajors, majorCategories } from "@/data/majors";
import MajorCard from './majors/MajorCard';

const MajorsSection: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Барлығы');

  const filteredMajors = featuredMajors.filter(major => {
    if (selectedCategory !== 'Барлығы' && major.category !== selectedCategory) {
      return false;
    }
    if (searchValue && !major.name.toLowerCase().includes(searchValue.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-3">Мамандықтар каталогы</h2>
          <p className="text-gray-600 max-w-3xl">
            Болашақ мамандығыңызды таңдауға көмектесетін толық ақпарат: оқу бағдарламалары, жұмыс мүмкіндіктері және табыс деңгейі.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Input 
              type="text" 
              placeholder="Мамандық атауын енгізіңіз" 
              className="pl-10 py-2 w-full"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          </div>
        </div>

        <Tabs defaultValue="Барлығы" className="mb-8">
          <TabsList className="mb-4 flex flex-wrap h-auto bg-transparent p-0 space-x-2">
            {majorCategories.slice(0, 6).map((category) => (
              <TabsTrigger 
                key={category} 
                value={category}
                onClick={() => setSelectedCategory(category)}
                className="mb-2 border border-gray-200 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMajors.length > 0 ? (
            filteredMajors.map(major => (
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
