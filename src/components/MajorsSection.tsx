
import React from 'react';
import { Link } from "react-router-dom";
import { Laptop, BarChart2, FlaskConical, Heart } from "lucide-react";

interface Major {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: string;
}

const majors: Major[] = [
  {
    id: "it",
    name: "IT және бағдарламалау",
    icon: <Laptop className="h-10 w-10 text-tandablue" />,
    count: "150+ бағдарлама"
  },
  {
    id: "business",
    name: "Бизнес және менеджмент",
    icon: <BarChart2 className="h-10 w-10 text-tandablue" />,
    count: "120+ бағдарлама"
  },
  {
    id: "engineering",
    name: "Инженерия",
    icon: <FlaskConical className="h-10 w-10 text-tandablue" />,
    count: "200+ бағдарлама"
  },
  {
    id: "medicine",
    name: "Медицина",
    icon: <Heart className="h-10 w-10 text-tandablue" />,
    count: "80+ бағдарлама"
  }
];

const MajorCard: React.FC<{ major: Major }> = ({ major }) => {
  return (
    <div className="major-card">
      {major.icon}
      <h3 className="text-lg font-medium mt-4 mb-2">{major.name}</h3>
      <p className="text-sm text-gray-500 mb-3">{major.count}</p>
      <Link to={`/majors/${major.id}`} className="text-tandablue hover:underline text-sm">
        Көбірек білу
      </Link>
    </div>
  );
};

const MajorsSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl font-bold mb-8">Танымал мамандықтар</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {majors.map(major => (
            <MajorCard key={major.id} major={major} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MajorsSection;
