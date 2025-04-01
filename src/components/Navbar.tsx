
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Globe, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? "text-tandablue font-medium" : "text-tandatext hover:text-tandablue";
  };

  return (
    <header className="tanda-header">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="font-bold text-2xl text-tandablue">TandaEdu</Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/news" className={`text-sm ${isActive('/news')}`}>
              Жаңалықтар
            </Link>
            <Link to="/universities" className={`text-sm ${isActive('/universities')}`}>
              Университеттер
            </Link>
            <Link to="/majors" className={`text-sm ${isActive('/majors')}`}>
              Мамандықтар
            </Link>
            <Link to="/test" className={`text-sm ${isActive('/test')}`}>
              Тест
            </Link>
            <Link to="/counseling" className={`text-sm ${isActive('/counseling')}`}>
              Кеңес алу
            </Link>
            <Link to="/blog" className={`text-sm ${isActive('/blog')}`}>
              Блог
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="text-sm font-medium">Қаз</span>
          </div>
          <Button variant="outline" className="hidden md:flex h-9 rounded-md px-4">Кіру</Button>
          <Button className="h-9 rounded-md px-4">Тіркелу</Button>
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-tandatext" />
            ) : (
              <Menu className="h-6 w-6 text-tandatext" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b shadow-sm">
          <div className="container py-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/news" className="text-sm font-medium text-tandatext hover:text-tandablue" onClick={() => setMobileMenuOpen(false)}>
                Жаңалықтар
              </Link>
              <Link to="/universities" className="text-sm font-medium text-tandatext hover:text-tandablue" onClick={() => setMobileMenuOpen(false)}>
                Университеттер
              </Link>
              <Link to="/majors" className="text-sm font-medium text-tandatext hover:text-tandablue" onClick={() => setMobileMenuOpen(false)}>
                Мамандықтар
              </Link>
              <Link to="/test" className="text-sm font-medium text-tandatext hover:text-tandablue" onClick={() => setMobileMenuOpen(false)}>
                Тест
              </Link>
              <Link to="/counseling" className="text-sm font-medium text-tandatext hover:text-tandablue" onClick={() => setMobileMenuOpen(false)}>
                Кеңес алу
              </Link>
              <Link to="/blog" className="text-sm font-medium text-tandatext hover:text-tandablue" onClick={() => setMobileMenuOpen(false)}>
                Блог
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
