
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { 
  Calendar, 
  Clock, 
  Mail, 
  Phone, 
  MapPin,
  User, 
  GraduationCap,
  CheckCircle,
  CalendarDays
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Consultant {
  id: number;
  name: string;
  role: string;
  image: string;
  experience: string;
  rating: number;
  specialization: string[];
  available: boolean;
  price: string;
}

const consultants: Consultant[] = [
  {
    id: 1,
    name: "Айгүл Ахметова",
    role: "Карьералық кеңесші",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    experience: "8 жыл",
    rating: 4.9,
    specialization: ["Карьералық жоспарлау", "Резюме дайындау", "Мамандық таңдау"],
    available: true,
    price: "5,000 ₸/сағат"
  },
  {
    id: 2,
    name: "Дәулет Сәрсенов",
    role: "Оқу бағдарламалары маманы",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    experience: "5 жыл",
    rating: 4.7,
    specialization: ["Шетелде оқу", "Грант алу кеңестері", "Университет таңдау"],
    available: true,
    price: "6,000 ₸/сағат"
  },
  {
    id: 3,
    name: "Гүлнұр Жұмабаева",
    role: "Психолог-кеңесші",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    experience: "10 жыл",
    rating: 4.8,
    specialization: ["Мамандық бейімділік тесті", "Кәсіптік бағдарлау", "Психологиялық қолдау"],
    available: false,
    price: "7,000 ₸/сағат"
  },
  {
    id: 4,
    name: "Бекзат Оспанов",
    role: "IT саласының маманы",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    experience: "7 жыл",
    rating: 4.6,
    specialization: ["IT мамандықтары", "Программалау тілдері", "Техникалық дағдылар"],
    available: true,
    price: "7,500 ₸/сағат"
  }
];

const ConsultingPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedConsultant, setSelectedConsultant] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "not-specified",
    message: ""
  });
  
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate the form
    if (!formData.name || !formData.email || !formData.phone || !selectedDate || !selectedTime || !selectedConsultant) {
      toast({
        title: "Қате",
        description: "Барлық қажетті өрістерді толтырыңыз",
        variant: "destructive"
      });
      return;
    }
    
    // Redirect to Kaspi Bank for payment
    const kaspiPaymentUrl = "https://kaspi.kz/pay/";
    window.open(kaspiPaymentUrl, "_blank");
    
    // Form is valid, show success message
    toast({
      title: "Сәтті",
      description: "Сіздің өтініміңіз қабылданды. Төлем жасағаннан кейін біз сізбен жақын арада хабарласамыз.",
      variant: "default"
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      topic: "not-specified",
      message: ""
    });
    setSelectedDate("");
    setSelectedTime("");
    setSelectedConsultant(null);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  // Available dates (next 7 days)
  const availableDates = [...Array(7)].map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date.toISOString().split('T')[0];
  });
  
  // Available times
  const availableTimes = [
    "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-blue-50 py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Кәсіби кеңес алу</h1>
            <p className="text-lg text-gray-700 mb-6">
              Мамандық таңдау, карьера қалыптастыру және жоғары оқу орнын таңдау бойынша сарапшылардан кеңес алыңыз
            </p>
            <div className="flex items-center justify-center gap-4 mt-8">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Кәсіби кеңесшілер</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Онлайн кеңес алу</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Жеке кеңес</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container px-4 md:px-6 py-12">
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8 text-center">Біздің кеңесшілеріміз</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {consultants.map(consultant => (
              <Card 
                key={consultant.id} 
                className={`p-6 hover:shadow-md transition-shadow cursor-pointer ${selectedConsultant === consultant.id ? 'border-2 border-tandablue' : ''}`}
                onClick={() => setSelectedConsultant(consultant.id)}
              >
                <div className="flex flex-col items-center text-center mb-4">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={consultant.image} alt={consultant.name} />
                    <AvatarFallback>{consultant.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-lg">{consultant.name}</h3>
                  <p className="text-gray-600 mb-2">{consultant.role}</p>
                  <div className="flex items-center mb-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-4 w-4 ${i < consultant.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-sm ml-1">{consultant.rating.toFixed(1)}</span>
                  </div>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <CalendarDays className="h-4 w-4 text-tandablue mr-2" />
                    <span>Тәжірибе: {consultant.experience}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 block mb-1">Мамандану:</span>
                    <div className="flex flex-wrap gap-1">
                      {consultant.specialization.map((spec, i) => (
                        <span key={i} className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="font-medium text-tandablue">{consultant.price}</span>
                    <span className={`text-xs px-2 py-1 rounded ${consultant.available ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {consultant.available ? 'Қолжетімді' : 'Бос емес'}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-6">Кеңес алуға жазылу</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Аты-жөніңіз</Label>
                      <Input 
                        id="name" 
                        name="name"
                        placeholder="Аты-жөніңізді енгізіңіз" 
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        name="email"
                        type="email" 
                        placeholder="Email адресіңізді енгізіңіз"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон</Label>
                      <Input 
                        id="phone" 
                        name="phone"
                        placeholder="Телефон нөміріңізді енгізіңіз"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="topic">Кеңес тақырыбы</Label>
                      <Select 
                        value={formData.topic} 
                        onValueChange={(value) => setFormData({...formData, topic: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Тақырыпты таңдаңыз" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="not-specified">Тақырыпты таңдаңыз</SelectItem>
                          <SelectItem value="career">Мансап жоспарлау</SelectItem>
                          <SelectItem value="university">Университет таңдау</SelectItem>
                          <SelectItem value="major">Мамандық таңдау</SelectItem>
                          <SelectItem value="grant">Грант алу кеңестері</SelectItem>
                          <SelectItem value="abroad">Шетелде оқу</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Кеңес уақытын таңдаңыз</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Күні</Label>
                      <Select 
                        value={selectedDate} 
                        onValueChange={setSelectedDate}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Күнді таңдаңыз" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableDates.map(date => (
                            <SelectItem key={date} value={date}>
                              {new Date(date).toLocaleDateString('kk-KZ', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long'
                              })}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="time">Уақыты</Label>
                      <Select 
                        value={selectedTime} 
                        onValueChange={setSelectedTime}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Уақытты таңдаңыз" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableTimes.map(time => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Қосымша ақпарат</Label>
                  <Textarea 
                    id="message" 
                    name="message"
                    placeholder="Кеңес алу туралы қосымша ақпаратты жазыңыз"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                  />
                </div>
                
                <Button type="submit" className="w-full">Kaspi арқылы төлем жасау</Button>
              </form>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="text-lg font-bold mb-4">Байланыс ақпараты</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-tandablue mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Телефон</p>
                    <p className="text-gray-600">+7 (727) 123-45-67</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-tandablue mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">info@tandabilim.kz</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-tandablue mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Мекен-жайы</p>
                    <p className="text-gray-600">Алматы қ., Достық даңғ. 12, A5 офис</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold mb-4">Кеңес алу туралы</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-tandablue mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Кеңес ұзақтығы</p>
                    <p className="text-gray-600">45-60 минут</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <User className="h-5 w-5 text-tandablue mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Кеңес форматы</p>
                    <p className="text-gray-600">Онлайн (Zoom) немесе офисте</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <GraduationCap className="h-5 w-5 text-tandablue mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Кеңес бағыттары</p>
                    <p className="text-gray-600">Мамандық таңдау, ЖОО таңдау, Шетелде оқу, Карьералық кеңес</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ConsultingPage;
