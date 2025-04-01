
import React from 'react';
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Phone, Mail } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Link to="/" className="inline-flex items-center text-xl font-bold mb-4">TandaEdu</Link>
            <p className="text-gray-400 text-sm">
              Қазақстандағы жоғары білім беру саласындағы сенімді серіктесіңіз
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Навигация</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/universities" className="text-gray-400 hover:text-white text-sm">
                  Университеттер
                </Link>
              </li>
              <li>
                <Link to="/majors" className="text-gray-400 hover:text-white text-sm">
                  Мамандықтар
                </Link>
              </li>
              <li>
                <Link to="/career-test" className="text-gray-400 hover:text-white text-sm">
                  Мамандық тесті
                </Link>
              </li>
              <li>
                <Link to="/counseling" className="text-gray-400 hover:text-white text-sm">
                  Кеңес алу
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Байланыс</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400 text-sm">
                <Phone className="h-4 w-4 mr-2" /> +7 (777) 777-77-77
              </li>
              <li className="flex items-center text-gray-400 text-sm">
                <Mail className="h-4 w-4 mr-2" /> info@tandaedu.kz
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Әлеуметтік желілер</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-400">
          <p>© 2023 TandaEdu. Барлық құқықтар қорғалған.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
