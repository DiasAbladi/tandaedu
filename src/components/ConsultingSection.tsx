
import React, { useContext } from 'react';
import { LanguageContext } from '@/contexts/LanguageContext';
import ConsultingSectionHeader from './consulting/ConsultingSectionHeader';
import ConsultantsList from './consulting/ConsultantsList';
import ConsultingAdvantages from './consulting/ConsultingAdvantages';
import { consultants } from '../data/consultants';

const ConsultingSection: React.FC = () => {
  const { currentLanguage, translations } = useContext(LanguageContext);

  return (
    <section className="py-16">
      <div className="container px-4 md:px-6">
        <ConsultingSectionHeader 
          title={translations.consultingTitle[currentLanguage]} 
          description={translations.consultingDescription[currentLanguage]}
        />

        <ConsultantsList 
          consultants={consultants} 
          currentLanguage={currentLanguage} 
          translations={translations} 
        />

        <ConsultingAdvantages currentLanguage={currentLanguage} />
      </div>
    </section>
  );
};

export default ConsultingSection;
