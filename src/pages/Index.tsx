
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import UniversitySection from '@/components/UniversitySection';
import MajorsSection from '@/components/MajorsSection';
import CareerTestCTA from '@/components/CareerTestCTA';
import ConsultingSection from '@/components/ConsultingSection';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <UniversitySection />
      <MajorsSection />
      <CareerTestCTA />
      <ConsultingSection />
      <Footer />
    </div>
  );
};

export default Index;
