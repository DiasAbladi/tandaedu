
import React from 'react';
import ConsultantCard from './ConsultantCard';

interface ConsultantsListProps {
  consultants: any[];
  currentLanguage: string;
  translations: any;
}

const ConsultantsList: React.FC<ConsultantsListProps> = ({ consultants, currentLanguage, translations }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {consultants.map(consultant => (
        <ConsultantCard 
          key={consultant.id}
          {...consultant}
          currentLanguage={currentLanguage}
          translations={translations}
        />
      ))}
    </div>
  );
};

export default ConsultantsList;
