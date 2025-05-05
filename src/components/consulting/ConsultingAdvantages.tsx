
import React from 'react';
import { Button } from "@/components/ui/button";
import { Users, Video, Calendar, MessageSquare } from "lucide-react";
import { Link } from 'react-router-dom';

const ConsultingAdvantages: React.FC = () => {
  return (
    <div className="text-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        <div className="flex flex-col items-center p-6 rounded-lg bg-blue-50">
          <Users className="h-10 w-10 text-tandablue mb-4" />
          <h3 className="font-bold mb-2">Тәжірибелі кеңесшілер</h3>
          <p className="text-gray-600 text-sm">Жоғары білікті мамандардан кеңес алыңыз</p>
        </div>
        
        <div className="flex flex-col items-center p-6 rounded-lg bg-blue-50">
          <Video className="h-10 w-10 text-tandablue mb-4" />
          <h3 className="font-bold mb-2">Онлайн консультация</h3>
          <p className="text-gray-600 text-sm">Үйден шықпай-ақ кеңес алыңыз</p>
        </div>
        
        <div className="flex flex-col items-center p-6 rounded-lg bg-blue-50">
          <Calendar className="h-10 w-10 text-tandablue mb-4" />
          <h3 className="font-bold mb-2">Ыңғайлы кесте</h3>
          <p className="text-gray-600 text-sm">Өзіңізге ыңғайлы уақытты таңдаңыз</p>
        </div>
        
        <div className="flex flex-col items-center p-6 rounded-lg bg-blue-50">
          <MessageSquare className="h-10 w-10 text-tandablue mb-4" />
          <h3 className="font-bold mb-2">Жеке тәсіл</h3>
          <p className="text-gray-600 text-sm">Сіздің жағдайыңызға бейімделген кеңес</p>
        </div>
      </div>
      
      <Link to="/counseling">
        <Button size="lg" className="mt-4">Кеңес алуға жазылу</Button>
      </Link>
    </div>
  );
};

export default ConsultingAdvantages;
