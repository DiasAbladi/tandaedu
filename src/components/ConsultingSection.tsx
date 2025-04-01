
import React from 'react';
import { Button } from "@/components/ui/button";
import { Users, CalendarClock } from "lucide-react";

const ConsultingSection: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold">Кәсіби мамандардан кеңес алыңыз</h2>
            <p className="text-gray-600">Біздің тәжірибелі мамандар сізге дұрыс таңдау жасауға көмектеседі</p>
            
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <div className="flex items-start mb-4">
                <Users className="h-6 w-6 text-tandablue mr-3 mt-1" />
                <div>
                  <h3 className="font-medium mb-1">Тәжірибелі кеңесшілер</h3>
                  <p className="text-sm text-gray-500">10+ жылдық тәжірибесі бар мамандар</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <div className="flex items-start mb-4">
                <CalendarClock className="h-6 w-6 text-tandablue mr-3 mt-1" />
                <div>
                  <h3 className="font-medium mb-1">Онлайн кеңес</h3>
                  <p className="text-sm text-gray-500">Үйден шықпай-ақ кеңес алу мүмкіндігі</p>
                </div>
              </div>
            </div>
            
            <Button className="bg-tandablue hover:bg-blue-700">Кеңес алуға жазылу</Button>
          </div>
          
          <div className="hidden lg:block">
            <img 
              src="public/lovable-uploads/1f7c3993-eb9b-4d19-9655-526bbedb43fe.png" 
              alt="Кәсіби кеңесшілер" 
              className="rounded-lg w-full h-auto object-cover shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultingSection;
