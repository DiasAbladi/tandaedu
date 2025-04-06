
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
import { Eye, EyeOff } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAuthenticated, login, user, loginAttempts, resetPassword } = useContext(AuthContext);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated && user) {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Basic validation
    if (!email || !password) {
      toast({
        title: "Қате!",
        description: "Электрондық пошта мен құпия сөзді енгізіңіз",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    const success = await login(email, password);
    if (success) {
      navigate('/');
    }
    setIsSubmitting(false);
  };

  const handleResetPassword = async () => {
    if (!resetEmail) {
      toast({
        title: "Қате",
        description: "Электрондық поштаңызды енгізіңіз",
        variant: "destructive"
      });
      return;
    }

    const success = await resetPassword(resetEmail);
    if (success) {
      setIsResetDialogOpen(false);
      toast({
        title: "Сәтті жіберілді",
        description: "Құпия сөзді қалпына келтіру нұсқаулары электрондық поштаңызға жіберілді",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Determine if login should be disabled due to too many attempts
  const isLoginDisabled = loginAttempts >= 5;

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-blue-600">TandaEdu жүйесіне кіру</h2>
            <p className="mt-2 text-sm text-gray-600">
              Әлі аккаунтыңыз жоқ па? {" "}
              <Link to="/register" className="font-medium text-blue-600 hover:text-blue-800">
                Тіркелу
              </Link>
            </p>
          </div>

          {isLoginDisabled && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">
                Тым көп сәтсіз әрекет. Кіру уақытша бұғатталған. Кейінірек қайталап көріңіз немесе құпия сөзді қалпына келтіруді пайдаланыңыз.
              </p>
            </div>
          )}

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
                  <button 
                    type="button" 
                    onClick={() => setIsResetDialogOpen(true)}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    Құпия сөзді ұмыттыңыз ба?
                  </button>
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoginDisabled || isSubmitting}
            >
              {isSubmitting ? "Кіру..." : "Кіру"}
            </Button>
          </form>
        </div>
      </div>

      <Dialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Құпия сөзді қалпына келтіру</DialogTitle>
            <DialogDescription>
              Құпия сөзді қалпына келтіру үшін тіркелген электрондық поштаңызды енгізіңіз
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reset-email">Электрондық пошта</Label>
              <Input 
                id="reset-email"
                type="email"
                placeholder="email@example.com" 
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
              />
            </div>
            <Button onClick={handleResetPassword} className="w-full">
              Қалпына келтіру сілтемесін жіберу
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </>
  );
};

export default LoginPage;
