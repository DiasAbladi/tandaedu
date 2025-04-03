
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import LanguageSwitcher from './LanguageSwitcher';
import { AuthContext } from '@/contexts/AuthContext';
import { LanguageContext } from '@/contexts/LanguageContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const { currentLanguage, translations } = useContext(LanguageContext);

  return (
    <header className="bg-white border-b">
      <div className="container px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-tandablue">TandaBilim</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-2">
              <NavigationMenu className="mx-auto justify-center">
                <NavigationMenuList className="gap-2">
                  <NavigationMenuItem>
                    <Link to="/">
                      <NavigationMenuLink className={cn(
                        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus:bg-accent hover:bg-accent hover:text-accent-foreground",
                      )}>
                        {translations.navHome[currentLanguage]}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      {translations.navUniversities[currentLanguage]}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <Link
                              className="flex flex-col justify-end bg-gradient-to-b from-tandablue/20 to-tandablue/50 rounded-md p-6 no-underline outline-none focus:shadow-md h-full"
                              to="/universities"
                            >
                              <div className="mb-2 mt-4 text-lg font-medium">
                                {currentLanguage === 'kk' ? 'Барлық университеттер' : 'Все университеты'}
                              </div>
                              <p className="text-sm leading-tight text-muted-foreground">
                                {currentLanguage === 'kk' 
                                  ? 'Қазақстандағы барлық жоғары оқу орындары' 
                                  : 'Все высшие учебные заведения Казахстана'}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <Link
                            to="/universities?type=national"
                            className="block select-none rounded-md p-3 hover:bg-accent hover:text-accent-foreground outline-none focus:bg-accent focus:text-accent-foreground"
                          >
                            {currentLanguage === 'kk' ? 'Ұлттық университеттер' : 'Национальные университеты'}
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/universities?type=private"
                            className="block select-none rounded-md p-3 hover:bg-accent hover:text-accent-foreground outline-none focus:bg-accent focus:text-accent-foreground"
                          >
                            {currentLanguage === 'kk' ? 'Жеке меншік университеттер' : 'Частные университеты'}
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/universities?type=medical"
                            className="block select-none rounded-md p-3 hover:bg-accent hover:text-accent-foreground outline-none focus:bg-accent focus:text-accent-foreground"
                          >
                            {currentLanguage === 'kk' ? 'Медициналық университеттер' : 'Медицинские университеты'}
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/universities?type=technical"
                            className="block select-none rounded-md p-3 hover:bg-accent hover:text-accent-foreground outline-none focus:bg-accent focus:text-accent-foreground"
                          >
                            {currentLanguage === 'kk' ? 'Техникалық университеттер' : 'Технические университеты'}
                          </Link>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/majors">
                      <NavigationMenuLink className={cn(
                        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus:bg-accent hover:bg-accent hover:text-accent-foreground",
                      )}>
                        {translations.navMajors[currentLanguage]}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/news">
                      <NavigationMenuLink className={cn(
                        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus:bg-accent hover:bg-accent hover:text-accent-foreground",
                      )}>
                        {translations.navNews[currentLanguage]}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/test">
                      <NavigationMenuLink className={cn(
                        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus:bg-accent hover:bg-accent hover:text-accent-foreground",
                      )}>
                        {translations.navTest[currentLanguage]}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/counseling">
                      <NavigationMenuLink className={cn(
                        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus:bg-accent hover:bg-accent hover:text-accent-foreground",
                      )}>
                        {translations.navCounseling[currentLanguage]}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/blog">
                      <NavigationMenuLink className={cn(
                        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus:bg-accent hover:bg-accent hover:text-accent-foreground",
                      )}>
                        {translations.navBlog[currentLanguage]}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <LanguageSwitcher />
            
            {isAuthenticated ? (
              <Button variant="outline" onClick={logout}>
                {currentLanguage === 'kk' ? 'Шығу' : 'Выход'}
              </Button>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">
                    {translations.navLogin[currentLanguage]}
                  </Button>
                </Link>
                <Link to="/register" className="hidden md:inline-block">
                  <Button variant="default">
                    {translations.navRegister[currentLanguage]}
                  </Button>
                </Link>
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
                  <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      {translations.navHome[currentLanguage]}
                    </Button>
                  </Link>
                  <Link to="/universities" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      {translations.navUniversities[currentLanguage]}
                    </Button>
                  </Link>
                  <Link to="/majors" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      {translations.navMajors[currentLanguage]}
                    </Button>
                  </Link>
                  <Link to="/news" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      {translations.navNews[currentLanguage]}
                    </Button>
                  </Link>
                  <Link to="/test" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      {translations.navTest[currentLanguage]}
                    </Button>
                  </Link>
                  <Link to="/counseling" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      {translations.navCounseling[currentLanguage]}
                    </Button>
                  </Link>
                  <Link to="/blog" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      {translations.navBlog[currentLanguage]}
                    </Button>
                  </Link>
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
                      <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start">
                          {translations.navLogin[currentLanguage]}
                        </Button>
                      </Link>
                      <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button className="w-full justify-start">
                          {translations.navRegister[currentLanguage]}
                        </Button>
                      </Link>
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
