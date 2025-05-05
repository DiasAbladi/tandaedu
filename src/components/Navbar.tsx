
import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { User, LogOut, Menu } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { AuthContext } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center mr-8">
              <span className="text-xl font-bold text-blue-600">TandaEdu</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-6">
              <Link 
                to="/universities" 
                className={`transition-colors ${isActive('/universities') ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}`}
              >
                Университеттер
              </Link>
              <Link 
                to="/majors" 
                className={`transition-colors ${isActive('/majors') ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}`}
              >
                Мамандықтар
              </Link>
              <Link 
                to="/test" 
                className={`transition-colors ${isActive('/test') ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}`}
              >
                Кәсіби бағдар тесті
              </Link>
              <Link 
                to="/counseling" 
                className={`transition-colors ${isActive('/counseling') ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}`}
              >
                Кеңес алу
              </Link>
              <Link 
                to="/news" 
                className={`transition-colors ${isActive('/news') ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}`}
              >
                Жаңалықтар
              </Link>
            </div>
          </div>

          {/* Right-aligned items */}
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-4 py-3 font-medium">
                    Менің аккаунтым
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="h-4 w-4 mr-2" />
                    <span>Профиль</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Шығу</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate('/login')}>
                  Кіру
                </Button>
                <Button
                  variant="default"
                  onClick={() => navigate('/register')}
                >
                  Тіркелу
                </Button>
              </>
            )}

            {/* Mobile menu button */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Навигацияны ашу</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  <Button
                    variant={isActive('/') ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => {
                      navigate('/');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Басты бет
                  </Button>
                  <Button
                    variant={isActive('/universities') ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => {
                      navigate('/universities');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Университеттер
                  </Button>
                  <Button
                    variant={isActive('/majors') ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => {
                      navigate('/majors');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Мамандықтар
                  </Button>
                  <Button
                    variant={isActive('/news') ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => {
                      navigate('/news');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Жаңалықтар
                  </Button>
                  <Button
                    variant={isActive('/test') ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => {
                      navigate('/test');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Кәсіби бағдар тесті
                  </Button>
                  <Button
                    variant={isActive('/counseling') ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => {
                      navigate('/counseling');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Кеңес алу
                  </Button>
                  
                  {isAuthenticated ? (
                    <>
                      <Button
                        variant={isActive('/profile') ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => {
                          navigate('/profile');
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        Менің аккаунтым
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => {
                          logout();
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        Шығу
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => {
                          navigate('/login');
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        Кіру
                      </Button>
                      <Button
                        className="w-full justify-start"
                        onClick={() => {
                          navigate('/register');
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        Тіркелу
                      </Button>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
