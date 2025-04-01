
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CareerTestCTA: React.FC = () => {
  return (
    <section className="container px-4 md:px-6">
      <div className="cta-section text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Өзіңе лайықты мамандықты әлі таба алмадың ба?</h2>
        <p className="text-blue-100 mb-8">Біздің тегін мамандық таңдау тестін тапсырып көр</p>
        <Button className="bg-white text-tandablue hover:bg-blue-50">
          Тестті бастау <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  );
};

export default CareerTestCTA;
