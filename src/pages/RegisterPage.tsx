
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [agreedTerms, setAgreedTerms] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Қате",
        description: "Барлық өрістерді толтырыңыз",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Құпия сөздер сәйкес келмейді",
        description: "Енгізілген құпия сөздер бірдей болуы керек",
        variant: "destructive",
      });
      return;
    }

    if (!agreedTerms) {
      toast({
        title: "Шарттарға келісу қажет",
        description: "Жалғастыру үшін пайдалану шарттарымен келісіңіз",
        variant: "destructive",
      });
      return;
    }

    // In a real app, you'd make an API call to register the user
    // For demo purposes, we'll use a mock registration
    
    // Save user info to localStorage
    const userData = {
      name,
      email,
      isLoggedIn: true
    };
    
    localStorage.setItem('user', JSON.stringify(userData));
    
    toast({
      title: "Тіркелу сәтті аяқталды!",
      description: "Сіз сәтті тіркелдіңіз.",
    });
    navigate('/');
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-tandablue">TandaEdu-де тіркелу</h2>
            <p className="mt-2 text-sm text-gray-600">
              Сізде аккаунт бар ма? {" "}
              <Link to="/login" className="font-medium text-tandablue hover:text-blue-800">
                Кіру
              </Link>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Толық атыңыз
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Аты-жөніңіз"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Электрондық пошта
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Құпия сөз
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Құпия сөзді растау
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="mt-1"
                />
              </div>

              <div className="flex items-center">
                <Checkbox 
                  id="terms" 
                  checked={agreedTerms}
                  onCheckedChange={(checked) => setAgreedTerms(!!checked)}
                  required
                />
                <Label 
                  htmlFor="terms" 
                  className="ml-2 block text-sm text-gray-700"
                >
                  Мен <Link to="/terms" className="text-tandablue hover:text-blue-800">пайдалану шарттарымен</Link> және <Link to="/privacy" className="text-tandablue hover:text-blue-800">құпиялылық саясатымен</Link> келісемін
                </Label>
              </div>
            </div>

            <Button type="submit" className="w-full">
              Тіркелу
            </Button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RegisterPage;
