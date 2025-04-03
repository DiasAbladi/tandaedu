import React, { useState, useContext, useEffect } from 'react';
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
import { useToast } from "@/hooks/use-toast";
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
import { LanguageContext } from '@/contexts/LanguageContext';
import { AuthContext } from '@/contexts/AuthContext';

interface Consultant {
  id: number;
  name: {
    kk: string;
    ru: string;
  };
  role: {
    kk: string;
    ru: string;
  };
  image: string;
  experience: {
    kk: string;
    ru: string;
  };
  rating: number;
  specialization: {
    kk: string[];
    ru: string[];
  };
  available: boolean;
  price: {
    kk: string;
    ru: string;
  };
}

const consultants: Consultant[] = [
  {
    id: 1,
    name: {
      kk: "Айгүл Ахметова",
      ru: "Айгуль Ахметова"
    },
    role: {
      kk: "Карьералық кеңесші",
      ru: "Карьерный консультант"
    },
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    experience: {
      kk: "8 жыл",
      ru: "8 лет"
    },
    rating: 4.9,
    specialization: {
      kk: ["Карьералық жоспарлау", "Резюме дайындау", "Мамандық таңдау"],
      ru: ["Планирование карьеры", "Подготовка резюме", "Выбор профессии"]
    },
    available: true,
    price: {
      kk: "5,000 ₸/сағат",
      ru: "5,000 ₸/час"
    }
  },
  {
    id: 2,
    name: {
      kk: "Дәулет Сәрсенов",
      ru: "Даулет Сарсенов"
    },
    role: {
      kk: "Оқу бағдарламалары маманы",
      ru: "Специалист по учебным программам"
    },
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    experience: {
      kk: "5 жыл",
      ru: "5 лет"
    },
    rating: 4.7,
    specialization: {
      kk: ["Шетелде оқу", "Грант алу кеңестері", "Университет таңдау"],
      ru: ["Обучение за рубежом", "Советы по получению гранта", "Выбор университета"]
    },
    available: true,
    price: {
      kk: "6,000 ₸/сағат",
      ru: "6,000 ₸/час"
    }
  },
  {
    id: 3,
    name: {
      kk: "Гүлнұр Жұмабаева",
      ru: "Гульнур Жумабаева"
    },
    role: {
      kk: "Психолог-кеңесші",
      ru: "Психолог-консультант"
    },
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    experience: {
      kk: "10 жыл",
      ru: "10 лет"
    },
    rating: 4.8,
    specialization: {
      kk: ["Мамандық бейімділік тесті", "Кәсіптік бағдарлау", "Психологиялық қолдау"],
      ru: ["Тест на профессиональную склонность", "Профориентация", "Психологическая поддержка"]
    },
    available: false,
    price: {
      kk: "7,000 ₸/сағат",
      ru: "7,000 ₸/час"
    }
  },
  {
    id: 4,
    name: {
      kk: "Бекзат Оспанов",
      ru: "Бекзат Оспанов"
    },
    role: {
      kk: "IT саласының маманы",
      ru: "Специалист в области IT"
    },
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    experience: {
      kk: "7 жыл",
      ru: "7 лет"
    },
    rating: 4.6,
    specialization: {
      kk: ["IT мамандықтары", "Программалау тілдері", "Техникалық дағдылар"],
      ru: ["IT специальности", "Языки программирования", "Технические навыки"]
    },
    available: true,
    price: {
      kk: "7,500 ₸/сағат",
      ru: "7,500 ₸/час"
    }
  }
];

const KASPI_PAYMENT_URL = "https://kaspi.kz/pay/";

const ConsultingPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedConsultant, setSelectedConsultant] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "none",
    message: ""
  });
  
  const { toast } = useToast();
  const { currentLanguage, translations } = useContext(LanguageContext);
  const { isAuthenticated } = useContext(AuthContext);
  
  useEffect(() => {
    const currentConsultant = selectedConsultant;
    setFormData({
      name: "",
      email: "",
      phone: "",
      topic: "none",
      message: ""
    });
    setSelectedDate("");
    setSelectedTime("");
    setSelectedConsultant(currentConsultant);
  }, [currentLanguage]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast({
        title: translations.consultingError[currentLanguage],
        description: currentLanguage === 'kk' 
          ? "Кеңес алу үшін жүйеге кіру қажет"
          : "Для получения консультации необходимо войти в систему",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.name || !formData.email || !formData.phone || !selectedDate || !selectedTime || !selectedConsultant) {
      toast({
        title: translations.consultingError[currentLanguage],
        description: translations.consultingErrorFields[currentLanguage],
        variant: "destructive"
      });
      return;
    }
    
    window.open(KASPI_PAYMENT_URL, "_blank");
    
    toast({
      title: translations.consultingSuccess[currentLanguage],
      description: translations.consultingSuccessMessage[currentLanguage],
      variant: "default"
    });
    
    setFormData({
      name: "",
      email: "",
      phone: "",
      topic: "none",
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
  
  const availableDates = [...Array(7)].map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date.toISOString().split('T')[0];
  });
  
  const availableTimes = [
    "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-blue-50 py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{translations.consultingTitle[currentLanguage]}</h1>
            <p className="text-lg text-gray-700 mb-6">
              {translations.consultingDescription[currentLanguage]}
            </p>
            <div className="flex items-center justify-center gap-4 mt-8">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>{translations.consultingProfessionals[currentLanguage]}</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>{translations.consultingOnline[currentLanguage]}</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>{translations.consultingPersonal[currentLanguage]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container px-4 md:px-6 py-12">
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8 text-center">{translations.consultingOurExperts[currentLanguage]}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {consultants.map(consultant => (
              <Card 
                key={consultant.id} 
                className={`p-6 hover:shadow-md transition-shadow cursor-pointer ${selectedConsultant === consultant.id ? 'border-2 border-tandablue' : ''}`}
                onClick={() => setSelectedConsultant(consultant.id)}
              >
                <div className="flex flex-col items-center text-center mb-4">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={consultant.image} alt={consultant.name[currentLanguage]} />
                    <AvatarFallback>{consultant.name[currentLanguage].substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-lg">{consultant.name[currentLanguage]}</h3>
                  <p className="text-gray-600 mb-2">{consultant.role[currentLanguage]}</p>
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
                    <span>{translations.consultingExperience[currentLanguage]}: {consultant.experience[currentLanguage]}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 block mb-1">{currentLanguage === 'kk' ? 'Мамандану:' : 'Специализация:'}</span>
                    <div className="flex flex-wrap gap-1">
                      {consultant.specialization[currentLanguage].map((spec, i) => (
                        <span key={i} className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="font-medium text-tandablue">{consultant.price[currentLanguage]}</span>
                    <span className={`text-xs px-2 py-1 rounded ${consultant.available 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'}`}
                    >
                      {consultant.available 
                        ? translations.consultingAvailable[currentLanguage] 
                        : translations.consultingUnavailable[currentLanguage]}
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
              <h2 className="text-xl font-bold mb-6">{translations.consultingSchedule[currentLanguage]}</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{translations.consultingName[currentLanguage]}</Label>
                      <Input 
                        id="name" 
                        name="name"
                        placeholder={translations.consultingNamePlaceholder[currentLanguage]}
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
                        placeholder={currentLanguage === 'kk' ? "Email адресіңізді енгізіңіз" : "Введите ваш email адрес"}
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">{translations.consultingPhone[currentLanguage]}</Label>
                      <Input 
                        id="phone" 
                        name="phone"
                        placeholder={translations.consultingPhonePlaceholder[currentLanguage]}
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="topic">{translations.consultingTopic[currentLanguage]}</Label>
                      <Select 
                        value={formData.topic} 
                        onValueChange={(value) => setFormData({...formData, topic: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={translations.consultingSelectTopic[currentLanguage]} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">{translations.consultingSelectTopic[currentLanguage]}</SelectItem>
                          <SelectItem value="career">{currentLanguage === 'kk' ? 'Мансап жоспарлау' : 'Планирование карьеры'}</SelectItem>
                          <SelectItem value="university">{currentLanguage === 'kk' ? 'Университет таңдау' : 'Выбор университета'}</SelectItem>
                          <SelectItem value="major">{currentLanguage === 'kk' ? 'Мамандық таңдау' : 'Выбор специальности'}</SelectItem>
                          <SelectItem value="grant">{currentLanguage === 'kk' ? 'Грант алу кеңестері' : 'Советы по получению гранта'}</SelectItem>
                          <SelectItem value="abroad">{currentLanguage === 'kk' ? 'Шетелде оқу' : 'Обучение за рубежом'}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">{currentLanguage === 'kk' ? 'Кеңес уақытын таңдаңыз' : 'Выберите время консультации'}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">{translations.consultingDate[currentLanguage]}</Label>
                      <Select 
                        value={selectedDate} 
                        onValueChange={setSelectedDate}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={translations.consultingSelectDate[currentLanguage]} />
                        </SelectTrigger>
                        <SelectContent>
                          {availableDates.map(date => (
                            <SelectItem key={date} value={date}>
                              {new Date(date).toLocaleDateString(currentLanguage === 'kk' ? 'kk-KZ' : 'ru-RU', {
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
                      <Label htmlFor="time">{translations.consultingTime[currentLanguage]}</Label>
                      <Select 
                        value={selectedTime} 
                        onValueChange={setSelectedTime}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={translations.consultingSelectTime[currentLanguage]} />
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
                  <Label htmlFor="message">{translations.consultingAdditionalInfo[currentLanguage]}</Label>
                  <Textarea 
                    id="message" 
                    name="message"
                    placeholder={translations.consultingAdditionalInfoPlaceholder[currentLanguage]}
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                  />
                </div>
                
                <Button type="submit" className="w-full">{translations.consultingPayment[currentLanguage]}</Button>
              </form>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="text-lg font-bold mb-4">{currentLanguage === 'kk' ? 'Байланыс ақпараты' : 'Контактная информация'}</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-tandablue mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">{translations.consultingPhone[currentLanguage]}</p>
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
                    <p className="font-medium">{currentLanguage === 'kk' ? 'Мекен-жайы' : 'Адрес'}</p>
                    <p className="text-gray-600">{currentLanguage === 'kk' 
                      ? 'Алматы қ., Достык даңғ. 12, A5 офис' 
                      : 'г. Алматы, пр. Достык 12, офис A5'}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold mb-4">{currentLanguage === 'kk' ? 'Кеңес алу туралы' : 'О консультации'}</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-tandablue mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">{currentLanguage === 'kk' ? 'Кеңес ұзақтығы' : 'Продолжительность консультации'}</p>
                    <p className="text-gray-600">45-60 {currentLanguage === 'kk' ? 'минут' : 'минут'}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <User className="h-5 w-5 text-tandablue mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">{currentLanguage === 'kk' ? 'Кеңес форматы' : 'Формат консультации'}</p>
                    <p className="text-gray-600">{currentLanguage === 'kk' 
                      ? 'Онлайн (Zoom) немесе офисте' 
                      : 'Онлайн (Zoom) или в офисе'}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <GraduationCap className="h-5 w-5 text-tandablue mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">{currentLanguage === 'kk' ? 'Кеңес бағыттары' : 'Направления консультаций'}</p>
                    <p className="text-gray-600">{currentLanguage === 'kk' 
                      ? 'Мамандық таңдау, ЖОО таңдау, Шетелде оқу, Карьералық кеңес' 
                      : 'Выбор профессии, Выбор ВУЗа, Обучение за рубежом, Карьерная консультация'}</p>
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
