
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GraduationCap, Building, LineChart } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Consultant {
  id: string;
  name: string;
  position: string;
  photo?: string;
}

const consultants: Consultant[] = [
  {
    id: "aidar",
    name: "Айдар Қасымов",
    position: "Мансап кеңесшісі"
  },
  {
    id: "asel",
    name: "Әсел Мұратова",
    position: "Білім беру сарапшысы"
  },
  {
    id: "bakyt",
    name: "Бақыт Әлімов",
    position: "Университет кеңесшісі"
  },
  {
    id: "gulnar",
    name: "Гүлнар Сарсенова",
    position: "Мамандық кеңесшісі"
  }
];

const ConsultantCard: React.FC<{ consultant: Consultant }> = ({ consultant }) => {
  return (
    <div className="bg-white p-5 rounded-lg border text-center">
      <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-3"></div>
      <h4 className="font-bold">{consultant.name}</h4>
      <p className="text-sm text-gray-600 mb-4">{consultant.position}</p>
      <Button size="sm">Кеңес алу</Button>
    </div>
  );
};

const ConsultingPage: React.FC = () => {
  const [consultationType, setConsultationType] = useState("");
  const [consultant, setConsultant] = useState("");
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Header Section */}
        <section className="bg-blue-50 py-16">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-3xl font-bold mb-4">Сарапшылармен онлайн кеңес алыңыз</h1>
                <p className="text-gray-600 mb-6">
                  Білікті мамандардан кеңбір кеңес алып, болашағыңызды жоспарлаңыз
                </p>
                <Button size="lg">Кеңес алуға жазылу</Button>
              </div>
              <div className="hidden md:block">
                <img 
                  src="public/lovable-uploads/16b03a23-f0cc-4e82-952d-d572b19eff04.png"
                  alt="Кеңес алу" 
                  className="rounded-lg shadow-md w-full"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold mb-8 text-center">Кеңес беру бағыттары</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <GraduationCap className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="font-bold mb-2">Мамандық таңдау</h3>
                <p className="text-sm text-gray-600">
                  Қызығушылықтарыңыз бен қабілеттеріңізге сәйкес мамандық таңдауға көмектесеміз
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <Building className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="font-bold mb-2">Университетке түсу</h3>
                <p className="text-sm text-gray-600">
                  Университет таңдау және түсу процесі туралы толық кеңес беремін
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <LineChart className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="font-bold mb-2">Карьера жоспарлау</h3>
                <p className="text-sm text-gray-600">
                  Болашақ мансабыңызды жоспарлау және дамыту стратегиясын құрастырамыз
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Consultants Section */}
        <section className="py-16 bg-gray-50">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold mb-8 text-center">Біздің сарапшылар</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {consultants.map(consultant => (
                <ConsultantCard key={consultant.id} consultant={consultant} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Booking Form */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold mb-8 text-center">Кеңес алуға жазылу</h2>
            
            <div className="max-w-xl mx-auto bg-white p-8 rounded-lg border shadow-sm">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Кеңес түрі</label>
                  <Select value={consultationType} onValueChange={setConsultationType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Мамандық таңдау" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="career">Мамандық таңдау</SelectItem>
                      <SelectItem value="university">Университет таңдау</SelectItem>
                      <SelectItem value="planning">Карьера жоспарлау</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Сарапшы</label>
                  <Select value={consultant} onValueChange={setConsultant}>
                    <SelectTrigger>
                      <SelectValue placeholder="Айдар Қасымов" />
                    </SelectTrigger>
                    <SelectContent>
                      {consultants.map((c) => (
                        <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Күні мен уақыты</label>
                  <Input type="date" />
                </div>
                
                <Button className="w-full">Жазылуды растау</Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Pricing */}
        <section className="py-16 bg-gray-50">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold mb-8 text-center">Кеңес құны</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg border shadow-sm">
                <div className="text-center mb-6">
                  <h3 className="font-medium">Жеке кеңес</h3>
                  <div className="text-3xl font-bold mt-2">15,000 ₸ <span className="text-sm font-normal text-gray-500">/сағат</span></div>
                </div>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span> 60 минут кеңес
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span> Жеке кеңес беру
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span> Онлайн форматта
                  </li>
                </ul>
                
                <Button variant="outline" className="w-full">Таңдау</Button>
              </div>
              
              <div className="bg-white p-8 rounded-lg border shadow-lg relative transform scale-105 z-10">
                <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs px-3 py-1 rounded-br-lg rounded-tl-lg">
                  Танымал
                </div>
                
                <div className="text-center mb-6">
                  <h3 className="font-medium">Пакеттік кеңес</h3>
                  <div className="text-3xl font-bold mt-2">40,000 ₸ <span className="text-sm font-normal text-gray-500">/3 сағат</span></div>
                </div>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span> 3×60 минут кеңес
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span> Жеке жоспар құру
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span> Материалдар
                  </li>
                </ul>
                
                <Button className="w-full">Таңдау</Button>
              </div>
              
              <div className="bg-white p-8 rounded-lg border shadow-sm">
                <div className="text-center mb-6">
                  <h3 className="font-medium">Премиум кеңес</h3>
                  <div className="text-3xl font-bold mt-2">70,000 ₸ <span className="text-sm font-normal text-gray-500">/6 сағат</span></div>
                </div>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span> 6×60 минут кеңес
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span> Толық талдау
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span> Қосымша материалдар
                  </li>
                </ul>
                
                <Button variant="outline" className="w-full">Таңдау</Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold mb-8 text-center">Жиі қойылатын сұрақтар</h2>
            
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Қалай тіркелуге болады?</AccordionTrigger>
                  <AccordionContent>
                    Кеңес алу үшін жоғарыдағы формаға толтырып, қолайлы уақытты таңдаңыз. Сізге растау хабарламасы жіберіледі.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Тест тапсыру қалай жұзеге асады?</AccordionTrigger>
                  <AccordionContent>
                    Мамандық таңдау тестін онлайн режимде тапсыруға болады. Тест нәтижелерін кеңесшімен талқылауға болады.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="py-16 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg border text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600">🤖</span>
                </div>
                <h3 className="font-bold mb-2">Чат-бот</h3>
                <p className="text-sm text-gray-600 mb-4">24/7 автоматты көмекші</p>
                <Button variant="outline" size="sm">Чатты бастау</Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg border text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600">👨‍💼</span>
                </div>
                <h3 className="font-bold mb-2">Оператор</h3>
                <p className="text-sm text-gray-600 mb-4">Тікелей байланыс</p>
                <Button variant="outline" size="sm">Байланысу</Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg border text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600">✉️</span>
                </div>
                <h3 className="font-bold mb-2">Email</h3>
                <p className="text-sm text-gray-600 mb-4">info@tandaedu.kz</p>
                <Button variant="outline" size="sm">Email жазу</Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Social Links Section */}
        <section className="bg-gray-900 text-white py-12">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold mb-4">Әлеуметтік желілер</h2>
              <div className="flex justify-center gap-4">
                {['facebook', 'instagram', 'telegram', 'whatsapp', 'linkedin'].map(social => (
                  <a key={social} href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700">
                    <span className="sr-only">{social}</span>
                    <div className="w-5 h-5"></div>
                  </a>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center">
              <Button variant="outline" className="bg-green-500 text-white hover:bg-green-600 border-none">
                WhatsApp-қа өту
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ConsultingPage;
