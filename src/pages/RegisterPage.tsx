
import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AuthContext } from '@/contexts/AuthContext';
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { PasswordStrengthBar } from "@/components/PasswordStrengthBar";

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordError, setPasswordError] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const { register, isAuthenticated, user } = useContext(AuthContext);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated && user) {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  // Check password strength
  useEffect(() => {
    if (password) {
      let strength = 0;
      
      // Length check
      if (password.length >= 8) strength += 1;
      
      // Uppercase check
      if (/[A-Z]/.test(password)) strength += 1;
      
      // Lowercase check
      if (/[a-z]/.test(password)) strength += 1;
      
      // Number check
      if (/[0-9]/.test(password)) strength += 1;
      
      // Special character check
      if (/[^A-Za-z0-9]/.test(password)) strength += 1;
      
      setPasswordStrength(strength);
      
      // Set error message if password is not strong enough
      if (password.length < 8) {
        setPasswordError("Құпия сөз кемінде 8 таңбадан тұруы керек");
      } else if (strength < 3) {
        setPasswordError("Құпия сөз әлсіз: үлкен, кіші әріптер, сандар және арнайы таңбалар қосыңыз");
      } else {
        setPasswordError("");
      }
    } else {
      setPasswordStrength(0);
      setPasswordError("");
    }
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
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

    // Password strength validation
    if (passwordStrength < 3) {
      toast({
        title: "Құпия сөз талаптарға сай емес",
        description: "Күшті құпия сөз жасаңыз: кемінде 8 таңба, үлкен және кіші әріптер, сандар және арнайы таңбалар",
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

    const success = await register(name, email, password);
    if (success) {
      navigate('/');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="mt-1 pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {password && <PasswordStrengthBar strength={passwordStrength} />}
                {passwordError && (
                  <div className="mt-1 flex items-center text-sm text-red-500">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    <span>{passwordError}</span>
                  </div>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Құпия сөз кемінде 8 таңбадан тұруы керек, үлкен және кіші әріптер, сандар мен арнайы таңбалар қамтуы керек
                </p>
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Құпия сөзді растау
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="mt-1 pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {password && confirmPassword && password !== confirmPassword && (
                  <div className="mt-1 flex items-center text-sm text-red-500">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    <span>Құпия сөздер сәйкес келмейді</span>
                  </div>
                )}
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
