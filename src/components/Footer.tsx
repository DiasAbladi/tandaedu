import React from 'react';
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
const Footer: React.FC = () => {
  return <footer className="bg-gray-100 pt-12 pb-8">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-xl text-tandablue mb-4">TandaEdu</h3>
            <p className="text-gray-600 mb-4">
              Қазақстанның білім беру мүмкіндіктері туралы сенімді ақпарат
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-tandablue">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-tandablue">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-tandablue">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-tandablue">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Навигация</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-tandablue">Басты бет</Link>
              </li>
              <li>
                <Link to="/universities" className="text-gray-600 hover:text-tandablue">Университеттер</Link>
              </li>
              <li>
                <Link to="/majors" className="text-gray-600 hover:text-tandablue">Мамандықтар</Link>
              </li>
              <li>
                <Link to="/test" className="text-gray-600 hover:text-tandablue">Мансап тесті</Link>
              </li>
              <li>
                <Link to="/counseling" className="text-gray-600 hover:text-tandablue">Кеңес алу</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Жобалар</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/news" className="text-gray-600 hover:text-tandablue">Жаңалықтар</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-tandablue">Блог</Link>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-tandablue">Серіктестер</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-tandablue">Біз туралы</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Байланыс</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-tandablue mr-2 mt-0.5" />
                <span className="text-gray-600">Алматы қ., Сәтбаев көшесі 29Б</span>
              </div>
              <div className="flex items-start">
                <Phone className="w-5 h-5 text-tandablue mr-2 mt-0.5" />
                <span className="text-gray-600">+7 776 937 10 33</span>
              </div>
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-tandablue mr-2 mt-0.5" />
                <span className="text-gray-600">info@tandaedu.kz</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-10 pt-6">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} TandaEdu. Барлық құқықтар қорғалған.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;