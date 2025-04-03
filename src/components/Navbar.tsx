
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Globe } from "lucide-react";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import LanguageSwitcher from './LanguageSwitcher';
import { AuthContext } from '@/contexts/AuthContext';
import { LanguageContext } from '@/contexts/LanguageContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const { currentLanguage, translations } = useContext(LanguageContext);
  const navigate = useNavigate();

  // Fixed DOM nesting issues by separating the navigation trigger from the Link component
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-tandablue">TandaBilim</span>
          </Link>

          {/* Desktop Nav - centered */}
          <div className="hidden md:flex items-center justify-center flex-1">
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
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                      <li className="row-span-3">
                        <div
                          onClick={() => handleNavigation('/universities')}
                          className="flex h-full w-full flex-col justify-end rounded-md bg-gradient-to-b from-tandablue/20 to-tandablue/50 p-6 no-underline outline-none focus:shadow-md cursor-pointer"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            {currentLanguage === 'kk' ? 'Барлық университеттер' : 'Все университеты'}
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            {currentLanguage === 'kk' 
                              ? 'Қазақстандағы барлық жоғары оқу орындары' 
                              : 'Все высшие учебные заведения Казахстана'}
                          </p>
                        </div>
                      </li>
                      <li>
                        <div
                          onClick={() => handleNavigation('/universities?type=national')}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        >
                          {currentLanguage === 'kk' ? 'Ұлттық университеттер' : 'Национальные университеты'}
                        </div>
                      </li>
                      <li>
                        <div
                          onClick={() => handleNavigation('/universities?type=private')}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        >
                          {currentLanguage === 'kk' ? 'Жеке меншік университеттер' : 'Частные университеты'}
                        </div>
                      </li>
                      <li>
                        <div
                          onClick={() => handleNavigation('/universities?type=medical')}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        >
                          {currentLanguage === 'kk' ? 'Медициналық университеттер' : 'Медицинские университеты'}
                        </div>
                      </li>
                      <li>
                        <div
                          onClick={() => handleNavigation('/universities?type=technical')}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        >
                          {currentLanguage === 'kk' ? 'Техникалық университеттер' : 'Технические университеты'}
                        </div>
                      </li>
                    </ul>
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

          <div className="flex items-center space-x-2">
            <LanguageSwitcher />
            
            {isAuthenticated ? (
              <Button variant="outline" onClick={logout}>
                {currentLanguage === 'kk' ? 'Шығу' : 'Выход'}
              </Button>
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
