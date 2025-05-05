
import React from 'react';
import ConsultingSectionHeader from './consulting/ConsultingSectionHeader';
import ConsultantsList from './consulting/ConsultantsList';
import ConsultingAdvantages from './consulting/ConsultingAdvantages';
import { consultants } from '../data/consultants';

const ConsultingSection: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container px-4 md:px-6">
        <ConsultingSectionHeader 
          title="Кәсіби кеңес алу" 
          description="Мамандық таңдау, карьера қалыптастыру және жоғары оқу орнын таңдау бойынша сарапшылардан кеңес алыңыз"
        />

        <ConsultantsList 
          consultants={consultants} 
        />

        <ConsultingAdvantages />
      </div>
    </section>
  );
};

export default ConsultingSection;
