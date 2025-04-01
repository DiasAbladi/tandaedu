
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Globe } from "lucide-react";

const Navbar: React.FC = () => {
  return (
    <header className="tanda-header">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="font-bold text-xl text-tandablue">TandaEdu</Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/jobs" className="text-sm font-medium text-tandatext hover:text-tandablue">
              Жаңалықтар
            </Link>
            <Link to="/universities" className="text-sm font-medium text-tandatext hover:text-tandablue">
              Университеттер
            </Link>
            <Link to="/majors" className="text-sm font-medium text-tandatext hover:text-tandablue">
              Мамандықтар
            </Link>
            <Link to="/test" className="text-sm font-medium text-tandatext hover:text-tandablue">
              Тест
            </Link>
            <Link to="/counseling" className="text-sm font-medium text-tandatext hover:text-tandablue">
              Кеңес алу
            </Link>
            <Link to="/blog" className="text-sm font-medium text-tandatext hover:text-tandablue">
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
        </div>
      </div>
    </header>
  );
};

export default Navbar;
