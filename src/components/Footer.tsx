
import React from 'react';
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Phone, Mail, Linkedin, Telegram } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
                <Link to="/" className="text-gray-400 hover:text-white text-sm">
                  Басты бет
                </Link>
              </li>
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
                <Link to="/test" className="text-gray-400 hover:text-white text-sm">
                  Мамандық тесті
                </Link>
              </li>
              <li>
                <Link to="/counseling" className="text-gray-400 hover:text-white text-sm">
                  Кеңес алу
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white text-sm">
                  Блог
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
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Жазылу</h3>
            <div className="flex space-x-2">
              <Input 
                type="email" 
                placeholder="Email" 
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Button type="submit" className="shrink-0">
                <span className="sr-only">Send</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 256"
                  className="h-4 w-4"
                >
                  <path
                    fill="currentColor"
                    d="m224.49 136.49l-72 72a12 12 0 0 1-17-17L172.69 156H40a12 12 0 0 1 0-24h132.69l-37.17-36.49a12 12 0 0 1 17-17l72 72a12 12 0 0 1-.03 16.98Z"
                  />
                </svg>
              </Button>
            </div>
            
            <div className="mt-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Әлеуметтік желілер</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Telegram</span>
                  <Telegram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">LinkedIn</span>
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-400">
          <p>© 2025 TandaEdu. Барлық құқықтар қорғалған.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
