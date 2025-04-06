
import React from 'react';

interface PasswordStrengthBarProps {
  strength: number; // 0-5 scale
}

export const PasswordStrengthBar: React.FC<PasswordStrengthBarProps> = ({ strength }) => {
  // Convert 0-5 scale to percentage
  const percentage = (strength / 5) * 100;
  
  // Determine color based on strength
  const getColor = () => {
    if (strength <= 1) return 'bg-red-500';
    if (strength <= 2) return 'bg-orange-500';
    if (strength <= 3) return 'bg-yellow-500';
    if (strength <= 4) return 'bg-lime-500';
    return 'bg-green-500';
  };
  
  // Determine strength text
  const getStrengthText = () => {
    if (strength <= 1) return 'Өте әлсіз';
    if (strength <= 2) return 'Әлсіз';
    if (strength <= 3) return 'Орташа';
    if (strength <= 4) return 'Жақсы';
    return 'Күшті';
  };

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-medium text-gray-700">Құпия сөз қауіпсіздігі:</span>
        <span className={`text-xs font-medium ${getColor().replace('bg-', 'text-')}`}>
          {getStrengthText()}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`${getColor()} h-2 rounded-full transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};
