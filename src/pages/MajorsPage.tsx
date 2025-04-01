
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MajorsSection from '@/components/MajorsSection';

const MajorsPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <MajorsSection />
      <Footer />
    </div>
  );
};

export default MajorsPage;
