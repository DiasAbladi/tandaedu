
import React from 'react';

interface ConsultingSectionHeaderProps {
  title: string;
  description: string;
}

const ConsultingSectionHeader: React.FC<ConsultingSectionHeaderProps> = ({ title, description }) => {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold mb-3">{title}</h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        {description}
      </p>
    </div>
  );
};

export default ConsultingSectionHeader;
