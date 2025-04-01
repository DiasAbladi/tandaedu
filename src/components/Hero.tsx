
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <section className="bg-blue-50 py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 pb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tighter max-w-3xl">
            Болашақ, мамандығыңды табу оңай болсын
          </h1>
          <p className="text-muted-foreground md:text-lg max-w-[700px]">
            Қазақстандағы жоғары оқу орындары туралы толық ақпарат және мамандық таңдауға көмек
          </p>
          <div className="w-full max-w-md flex items-center gap-2 mt-6">
            <div className="relative flex-1">
              <Input 
                type="text" 
                placeholder="Университет немесе мамандық іздеу..." 
                className="pl-3 pr-10 py-2 w-full rounded-md border shadow-sm"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
            </div>
            <Button type="submit" className="bg-tandablue hover:bg-blue-700">
              Іздеу
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
