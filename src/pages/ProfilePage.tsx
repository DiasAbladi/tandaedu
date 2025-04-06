import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { AuthContext } from '@/contexts/AuthContext';
import { useToast } from "@/hooks/use-toast";
import { User, AtSign, Lock } from "lucide-react";

const ProfilePage = () => {
  const { user, updateUserProfile, updateUserEmail, updateUserPassword, logout } = useContext(AuthContext);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [activeTab, setActiveTab] = useState("profile");

  const getRoleLabel = (role: string | undefined) => {
    switch (role) {
      case 'student':
        return 'Студент';
      case 'pupil':
        return 'Оқушы';
      case 'parent':
        return 'Ата-ана';
      default:
        return '';
    }
  };
  
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === "") {
      toast({
        title: "Қате",
        description: "Аты-жөніңізді енгізіңіз",
        variant: "destructive"
      });
      return;
    }
    
    updateUserProfile(name);
    toast({
      title: "Сәтті сақталды",
      description: "Профиль мәліметтері жаңартылды",
    });
  };
  
  const handleUpdateEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() === "" || !email.includes('@')) {
      toast({
        title: "Қате",
        description: "Жарамды электрондық пошта енгізіңіз",
        variant: "destructive"
      });
      return;
    }
    
    updateUserEmail(email);
    toast({
      title: "Сәтті сақталды",
      description: "Электрондық пошта жаңартылды",
    });
  };
  
  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: "Қате",
        description: "Барлық өрістерді толтырыңыз",
        variant: "destructive"
      });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Қате",
        description: "Жаңа құпиясөздер сәйкес келмейді",
        variant: "destructive"
      });
      return;
    }
    
    updateUserPassword(currentPassword, newPassword);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    
    toast({
      title: "Сәтті сақталды",
      description: "Құпиясөз жаңартылды",
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
            <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
              <div className="flex flex-col items-center mb-6">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-3">
                  <User className="h-10 w-10 text-gray-500" />
                </div>
                <h3 className="font-medium text-lg">{user?.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{user?.email}</p>
                {user?.role && (
                  <Badge variant="outline" className="mt-2">
                    {getRoleLabel(user.role)}
                  </Badge>
                )}
              </div>
              
              <div className="space-y-1">
                <Button 
                  variant={activeTab === "profile" ? "default" : "ghost"} 
                  className="w-full justify-start"
                  onClick={() => setActiveTab("profile")}
                >
                  <User className="h-4 w-4 mr-2" />
                  Профиль
                </Button>
                <Button 
                  variant={activeTab === "email" ? "default" : "ghost"} 
                  className="w-full justify-start"
                  onClick={() => setActiveTab("email")}
                >
                  <AtSign className="h-4 w-4 mr-2" />
                  Email
                </Button>
                <Button 
                  variant={activeTab === "password" ? "default" : "ghost"} 
                  className="w-full justify-start"
                  onClick={() => setActiveTab("password")}
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Құпиясөз
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start mt-6 text-red-500"
                  onClick={handleLogout}
                >
                  Шығу
                </Button>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              {activeTab === "profile" && (
                <div>
                  <h2 className="text-xl font-bold mb-6">
                    Профиль мәліметтері
                  </h2>
                  
                  <form onSubmit={handleUpdateProfile}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">
                          Аты-жөні
                        </Label>
                        <Input 
                          id="name" 
                          type="text" 
                          value={name} 
                          onChange={(e) => setName(e.target.value)} 
                          placeholder="Аты-жөніңізді енгізіңіз"
                        />
                      </div>
                      
                      {user?.role && (
                        <div className="space-y-2">
                          <Label htmlFor="role">
                            Рөліңіз
                          </Label>
                          <div className="flex items-center h-10 px-4 border border-gray-200 rounded-md bg-gray-50">
                            <span>{getRoleLabel(user.role)}</span>
                          </div>
                          <p className="text-xs text-gray-500">
                            Рөл тіркелу кезінде орнатылады және өзгертілмейді
                          </p>
                        </div>
                      )}
                      
                      <Button type="submit">
                        Сақтау
                      </Button>
                    </div>
                  </form>
                </div>
              )}
              
              {activeTab === "email" && (
                <div>
                  <h2 className="text-xl font-bold mb-6">
                    Email жаңарту
                  </h2>
                  
                  <form onSubmit={handleUpdateEmail}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">
                          Электрондық пошта
                        </Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                          placeholder="Электрондық поштаңызды енгізіңіз"
                        />
                      </div>
                      
                      <Button type="submit">
                        Сақтау
                      </Button>
                    </div>
                  </form>
                </div>
              )}
              
              {activeTab === "password" && (
                <div>
                  <h2 className="text-xl font-bold mb-6">
                    Құпиясөзді жаңарту
                  </h2>
                  
                  <form onSubmit={handleUpdatePassword}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">
                          Ағымдағы құпиясөз
                        </Label>
                        <Input 
                          id="current-password" 
                          type="password" 
                          value={currentPassword} 
                          onChange={(e) => setCurrentPassword(e.target.value)} 
                          placeholder="Ағымдағы құпиясөзді енгізіңіз"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="new-password">
                          Жаңа құпиясөз
                        </Label>
                        <Input 
                          id="new-password" 
                          type="password" 
                          value={newPassword} 
                          onChange={(e) => setNewPassword(e.target.value)} 
                          placeholder="Жаңа құпиясөзді енгізіңіз"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">
                          Құпиясөзді растаңыз
                        </Label>
                        <Input 
                          id="confirm-password" 
                          type="password" 
                          value={confirmPassword} 
                          onChange={(e) => setConfirmPassword(e.target.value)} 
                          placeholder="Жаңа құпиясөзді қайталаңыз"
                        />
                      </div>
                      
                      <Button type="submit">
                        Сақтау
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
