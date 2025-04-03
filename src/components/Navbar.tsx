
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User, LogOut } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import LanguageSwitcher from './LanguageSwitcher';
import { AuthContext } from '@/contexts/AuthContext';
import { LanguageContext } from '@/contexts/LanguageContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const { currentLanguage, translations } = useContext(LanguageContext);
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and navigation */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center mr-8">
              <img src="/public/lovable-uploads/9f4a4e27-b330-408c-8835-141c0be40d78.png" alt="TandaEdu Logo" className="h-6 mr-2" />
              <span className="text-xl font-bold">TandaEdu</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/universities" className="text-gray-700 hover:text-blue-600 transition-colors">
                {translations.navUniversities[currentLanguage]}
              </Link>
              <Link to="/majors" className="text-gray-700 hover:text-blue-600 transition-colors">
                {translations.navMajors[currentLanguage]}
              </Link>
              <Link to="/test" className="text-gray-700 hover:text-blue-600 transition-colors">
                {translations.navTest[currentLanguage]}
              </Link>
              <Link to="/counseling" className="text-gray-700 hover:text-blue-600 transition-colors">
                {translations.navCounseling[currentLanguage]}
              </Link>
              <Link to="/news" className="text-gray-700 hover:text-blue-600 transition-colors">
                {translations.navNews[currentLanguage]}
              </Link>
              <Link to="/blog" className="text-gray-700 hover:text-blue-600 transition-colors">
                {translations.navBlog[currentLanguage]}
              </Link>
            </div>
          </div>

          {/* Right-aligned items */}
          <div className="flex items-center space-x-3">
            <LanguageSwitcher />
            
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
                    {currentLanguage === 'kk' ? 'Менің аккаунтым' : 'Мой аккаунт'}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="h-4 w-4 mr-2" />
                    <span>{currentLanguage === 'kk' ? 'Профиль' : 'Профиль'}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>{currentLanguage === 'kk' ? 'Шығу' : 'Выход'}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate('/login')}>
                  {translations.navLogin[currentLanguage]}
                </Button>
                <Button
                  variant="default"
                  onClick={() => navigate('/register')}
                >
                  {translations.navRegister[currentLanguage]}
                </Button>
              </>
            )}

            {/* Mobile menu button */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      navigate('/');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {translations.navHome[currentLanguage]}
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      navigate('/universities');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {translations.navUniversities[currentLanguage]}
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      navigate('/majors');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {translations.navMajors[currentLanguage]}
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      navigate('/news');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {translations.navNews[currentLanguage]}
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      navigate('/test');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {translations.navTest[currentLanguage]}
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      navigate('/counseling');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {translations.navCounseling[currentLanguage]}
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      navigate('/blog');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {translations.navBlog[currentLanguage]}
                  </Button>
                  
                  {isAuthenticated ? (
                    <>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => {
                          navigate('/profile');
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        {currentLanguage === 'kk' ? 'Менің аккаунтым' : 'Мой аккаунт'}
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => {
                          logout();
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        {currentLanguage === 'kk' ? 'Шығу' : 'Выход'}
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
                        {translations.navLogin[currentLanguage]}
                      </Button>
                      <Button
                        className="w-full justify-start"
                        onClick={() => {
                          navigate('/register');
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        {translations.navRegister[currentLanguage]}
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
