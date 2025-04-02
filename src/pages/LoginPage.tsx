
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      toast({
        title: "Қате!",
        description: "Электрондық пошта мен құпия сөзді енгізіңіз",
        variant: "destructive",
      });
      return;
    }

    // In a real app, you'd make an API call to authenticate
    // For demo purposes, we'll use a mock login
    // Extract name from email for display purposes
    const userName = email.split('@')[0];
    
    // Save user info to localStorage
    const userData = {
      email,
      name: userName.charAt(0).toUpperCase() + userName.slice(1), // Capitalize first letter
      isLoggedIn: true
    };
    
    localStorage.setItem('user', JSON.stringify(userData));
    
    toast({
      title: "Сәтті кіру!",
      description: "Жүйеге кіру сәтті болды.",
    });
    navigate('/');
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-tandablue">TandaEdu жүйесіне кіру</h2>
            <p className="mt-2 text-sm text-gray-600">
              Әлі аккаунтыңыз жоқ па? {" "}
              <Link to="/register" className="font-medium text-tandablue hover:text-blue-800">
                Тіркелу
              </Link>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
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

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Checkbox 
                    id="remember-me" 
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(!!checked)}
                  />
                  <Label 
                    htmlFor="remember-me" 
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Мені есте сақтау
                  </Label>
                </div>
                <div>
                  <Link to="/forgot-password" className="text-sm font-medium text-tandablue hover:text-blue-800">
                    Құпия сөзді ұмыттыңыз ба?
                  </Link>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full">
              Кіру
            </Button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
