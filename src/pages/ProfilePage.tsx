
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthContext } from '@/contexts/AuthContext';
import { LanguageContext } from '@/contexts/LanguageContext';
import { useToast } from "@/hooks/use-toast";
import { User, AtSign, Lock } from "lucide-react";

const ProfilePage = () => {
  const { user, updateUserProfile, updateUserEmail, updateUserPassword, logout } = useContext(AuthContext);
  const { currentLanguage } = useContext(LanguageContext);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [activeTab, setActiveTab] = useState("profile");
  
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === "") {
      toast({
        title: currentLanguage === 'kk' ? "Қате" : "Ошибка",
        description: currentLanguage === 'kk' ? "Аты-жөніңізді енгізіңіз" : "Введите ваше имя",
        variant: "destructive"
      });
      return;
    }
    
    updateUserProfile(name);
    toast({
      title: currentLanguage === 'kk' ? "Сәтті сақталды" : "Успешно сохранено",
      description: currentLanguage === 'kk' ? "Профиль мәліметтері жаңартылды" : "Данные профиля обновлены"
    });
  };
  
  const handleUpdateEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() === "" || !email.includes('@')) {
      toast({
        title: currentLanguage === 'kk' ? "Қате" : "Ошибка",
        description: currentLanguage === 'kk' ? "Жарамды электрондық пошта енгізіңіз" : "Введите действительный email",
        variant: "destructive"
      });
      return;
    }
    
    updateUserEmail(email);
    toast({
      title: currentLanguage === 'kk' ? "Сәтті сақталды" : "Успешно сохранено",
      description: currentLanguage === 'kk' ? "Электрондық пошта жаңартылды" : "Email обновлен"
    });
  };
  
  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: currentLanguage === 'kk' ? "Қате" : "Ошибка",
        description: currentLanguage === 'kk' ? "Барлық өрістерді толтырыңыз" : "Заполните все поля",
        variant: "destructive"
      });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast({
        title: currentLanguage === 'kk' ? "Қате" : "Ошибка",
        description: currentLanguage === 'kk' ? "Жаңа құпиясөздер сәйкес келмейді" : "Новые пароли не совпадают",
        variant: "destructive"
      });
      return;
    }
    
    updateUserPassword(currentPassword, newPassword);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    
    toast({
      title: currentLanguage === 'kk' ? "Сәтті сақталды" : "Успешно сохранено",
      description: currentLanguage === 'kk' ? "Құпиясөз жаңартылды" : "Пароль обновлен"
    });
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-gray-50 py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
            {/* Sidebar */}
            <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
              <div className="flex flex-col items-center mb-6">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-3">
                  <User className="h-10 w-10 text-gray-500" />
                </div>
                <h3 className="font-medium text-lg">{user?.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{user?.email}</p>
              </div>
              
              <div className="space-y-1">
                <Button 
                  variant={activeTab === "profile" ? "default" : "ghost"} 
                  className="w-full justify-start"
                  onClick={() => setActiveTab("profile")}
                >
                  <User className="h-4 w-4 mr-2" />
                  {currentLanguage === 'kk' ? 'Профиль' : 'Профиль'}
                </Button>
                <Button 
                  variant={activeTab === "email" ? "default" : "ghost"} 
                  className="w-full justify-start"
                  onClick={() => setActiveTab("email")}
                >
                  <AtSign className="h-4 w-4 mr-2" />
                  {currentLanguage === 'kk' ? 'Email' : 'Email'}
                </Button>
                <Button 
                  variant={activeTab === "password" ? "default" : "ghost"} 
                  className="w-full justify-start"
                  onClick={() => setActiveTab("password")}
                >
                  <Lock className="h-4 w-4 mr-2" />
                  {currentLanguage === 'kk' ? 'Құпиясөз' : 'Пароль'}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start mt-6 text-red-500"
                  onClick={handleLogout}
                >
                  {currentLanguage === 'kk' ? 'Шығу' : 'Выход'}
                </Button>
              </div>
            </div>
            
            {/* Main content */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              {activeTab === "profile" && (
                <div>
                  <h2 className="text-xl font-bold mb-6">
                    {currentLanguage === 'kk' ? 'Профиль мәліметтері' : 'Данные профиля'}
                  </h2>
                  
                  <form onSubmit={handleUpdateProfile}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">
                          {currentLanguage === 'kk' ? 'Аты-жөні' : 'Имя'}
                        </Label>
                        <Input 
                          id="name" 
                          type="text" 
                          value={name} 
                          onChange={(e) => setName(e.target.value)} 
                          placeholder={currentLanguage === 'kk' ? 'Аты-жөніңізді енгізіңіз' : 'Введите ваше имя'}
                        />
                      </div>
                      
                      <Button type="submit">
                        {currentLanguage === 'kk' ? 'Сақтау' : 'Сохранить'}
                      </Button>
                    </div>
                  </form>
                </div>
              )}
              
              {activeTab === "email" && (
                <div>
                  <h2 className="text-xl font-bold mb-6">
                    {currentLanguage === 'kk' ? 'Email жаңарту' : 'Обновить email'}
                  </h2>
                  
                  <form onSubmit={handleUpdateEmail}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">
                          {currentLanguage === 'kk' ? 'Электрондық пошта' : 'Email'}
                        </Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                          placeholder={currentLanguage === 'kk' ? 'Электрондық поштаңызды енгізіңіз' : 'Введите ваш email'}
                        />
                      </div>
                      
                      <Button type="submit">
                        {currentLanguage === 'kk' ? 'Сақтау' : 'Сохранить'}
                      </Button>
                    </div>
                  </form>
                </div>
              )}
              
              {activeTab === "password" && (
                <div>
                  <h2 className="text-xl font-bold mb-6">
                    {currentLanguage === 'kk' ? 'Құпиясөзді жаңарту' : 'Обновить пароль'}
                  </h2>
                  
                  <form onSubmit={handleUpdatePassword}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">
                          {currentLanguage === 'kk' ? 'Ағымдағы құпиясөз' : 'Текущий пароль'}
                        </Label>
                        <Input 
                          id="current-password" 
                          type="password" 
                          value={currentPassword} 
                          onChange={(e) => setCurrentPassword(e.target.value)} 
                          placeholder={currentLanguage === 'kk' ? 'Ағымдағы құпиясөзді енгізіңіз' : 'Введите текущий пароль'}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="new-password">
                          {currentLanguage === 'kk' ? 'Жаңа құпиясөз' : 'Новый пароль'}
                        </Label>
                        <Input 
                          id="new-password" 
                          type="password" 
                          value={newPassword} 
                          onChange={(e) => setNewPassword(e.target.value)} 
                          placeholder={currentLanguage === 'kk' ? 'Жаңа құпиясөзді енгізіңіз' : 'Введите новый пароль'}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">
                          {currentLanguage === 'kk' ? 'Құпиясөзді растаңыз' : 'Подтвердите пароль'}
                        </Label>
                        <Input 
                          id="confirm-password" 
                          type="password" 
                          value={confirmPassword} 
                          onChange={(e) => setConfirmPassword(e.target.value)} 
                          placeholder={currentLanguage === 'kk' ? 'Жаңа құпиясөзді қайталаңыз' : 'Повторите новый пароль'}
                        />
                      </div>
                      
                      <Button type="submit">
                        {currentLanguage === 'kk' ? 'Сақтау' : 'Сохранить'}
                      </Button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;
