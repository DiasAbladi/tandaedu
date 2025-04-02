
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { GraduationCap, Search, Menu, X, UserCircle, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  // You can add props if needed later
}

const Navbar: React.FC<NavbarProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  // Check if user is logged in when component mounts
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const userData = JSON.parse(loggedInUser);
      setIsLoggedIn(true);
      setUserName(userData.name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserName("");
    navigate('/');
  };

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-40">
      <div className="container flex h-16 items-center">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-tandablue" />
              <span className="font-bold text-xl">TandaEdu</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-5 text-sm">
              <Link
                to="/universities"
                className="transition-colors hover:text-tandablue py-2"
              >
                Университеттер
              </Link>
              <Link
                to="/majors"
                className="transition-colors hover:text-tandablue py-2"
              >
                Мамандықтар
              </Link>
              <Link
                to="/test"
                className="transition-colors hover:text-tandablue py-2"
              >
                Кәсіби бағдар тесті
              </Link>
              <Link
                to="/counseling"
                className="transition-colors hover:text-tandablue py-2"
              >
                Кеңес алу
              </Link>
              <Link
                to="/news"
                className="transition-colors hover:text-tandablue py-2"
              >
                Жаңалықтар
              </Link>
              <Link
                to="/blog"
                className="transition-colors hover:text-tandablue py-2"
              >
                Блог
              </Link>
            </nav>
          </div>

          {/* Right side - Search and Auth/Profile */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <UserCircle className="h-5 w-5" />
                    <span>{userName}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Менің аккаунтым</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <UserCircle className="mr-2 h-4 w-4" />
                    <span>Профиль</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Шығу</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Кіру
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Тіркелу</Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="container py-4 flex flex-col">
            <Link
              to="/universities"
              className="py-3 hover:text-tandablue"
              onClick={() => setIsMenuOpen(false)}
            >
              Университеттер
            </Link>
            <Link
              to="/majors"
              className="py-3 hover:text-tandablue"
              onClick={() => setIsMenuOpen(false)}
            >
              Мамандықтар
            </Link>
            <Link
              to="/test"
              className="py-3 hover:text-tandablue"
              onClick={() => setIsMenuOpen(false)}
            >
              Кәсіби бағдар тесті
            </Link>
            <Link
              to="/counseling"
              className="py-3 hover:text-tandablue"
              onClick={() => setIsMenuOpen(false)}
            >
              Кеңес алу
            </Link>
            <Link
              to="/news"
              className="py-3 hover:text-tandablue"
              onClick={() => setIsMenuOpen(false)}
            >
              Жаңалықтар
            </Link>
            <Link
              to="/blog"
              className="py-3 hover:text-tandablue"
              onClick={() => setIsMenuOpen(false)}
            >
              Блог
            </Link>
            
            {!isLoggedIn && (
              <div className="flex flex-col space-y-2 mt-4 pt-4 border-t">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Кіру
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full">Тіркелу</Button>
                </Link>
              </div>
            )}
            
            {isLoggedIn && (
              <div className="flex flex-col space-y-2 mt-4 pt-4 border-t">
                <p className="font-medium mb-2">Сәлем, {userName}!</p>
                <Button variant="outline" className="w-full" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Шығу
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
