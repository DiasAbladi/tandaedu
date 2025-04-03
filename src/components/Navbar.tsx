
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User } from "lucide-react";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import LanguageSwitcher from './LanguageSwitcher';
import { AuthContext } from '@/contexts/AuthContext';
import { LanguageContext } from '@/contexts/LanguageContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const { currentLanguage, translations } = useContext(LanguageContext);
  const navigate = useNavigate();

  // Fixed DOM nesting issues by separating the navigation trigger from the Link component
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center">
          {/* Logo - Left aligned */}
          <Link to="/" className="flex-shrink-0 mr-8">
            <span className="text-xl font-bold text-tandablue">TandaEdu</span>
          </Link>

          {/* Desktop Nav - centered */}
          <div className="hidden md:flex justify-center flex-1">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                <NavigationMenuItem>
                  <div 
                    onClick={() => handleNavigation('/')} 
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "cursor-pointer"
                    )}
                  >
                    {translations.navHome[currentLanguage]}
                  </div>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    {translations.navUniversities[currentLanguage]}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 md:w-[400px]">
                      <div
                        onClick={() => handleNavigation('/universities')}
                        className="flex h-full w-full flex-col justify-end rounded-md bg-gradient-to-b from-tandablue/20 to-tandablue/50 p-6 no-underline outline-none focus:shadow-md cursor-pointer"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">
                          {translations.navUniversities[currentLanguage]}
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          {currentLanguage === 'kk' 
                            ? 'Қазақстандағы барлық жоғары оқу орындары' 
                            : 'Все высшие учебные заведения Казахстана'}
                        </p>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <div 
                    onClick={() => handleNavigation('/majors')} 
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "cursor-pointer"
                    )}
                  >
                    {translations.navMajors[currentLanguage]}
                  </div>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <div 
                    onClick={() => handleNavigation('/news')} 
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "cursor-pointer"
                    )}
                  >
                    {translations.navNews[currentLanguage]}
                  </div>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <div 
                    onClick={() => handleNavigation('/test')} 
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "cursor-pointer"
                    )}
                  >
                    {translations.navTest[currentLanguage]}
                  </div>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <div 
                    onClick={() => handleNavigation('/counseling')} 
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "cursor-pointer"
                    )}
                  >
                    {translations.navCounseling[currentLanguage]}
                  </div>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <div 
                    onClick={() => handleNavigation('/blog')} 
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "cursor-pointer"
                    )}
                  >
                    {translations.navBlog[currentLanguage]}
                  </div>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right-aligned items (language switcher and auth buttons) */}
          <div className="flex items-center ml-auto space-x-2">
            <LanguageSwitcher />
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative rounded-full h-9 w-9 p-0">
                    <div className="flex items-center justify-center rounded-full bg-gray-100 h-full w-full">
                      <User className="h-4 w-4" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    {currentLanguage === 'kk' ? 'Менің аккаунтым' : 'Мой аккаунт'}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    {currentLanguage === 'kk' ? 'Шығу' : 'Выход'}
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
                  className="hidden md:inline-flex"
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
