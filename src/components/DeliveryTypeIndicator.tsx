import React from 'react';
import { Check } from 'lucide-react';

interface DeliveryTypeIndicatorProps {
  id: string;
  enabled: boolean;
  name: string;
  onToggle: (id: string) => void;
}

export const DeliveryTypeIndicator: React.FC<DeliveryTypeIndicatorProps> = ({ 
  id, 
  enabled, 
  name, 
  onToggle 
}) => {
  return (
    <button
      onClick={() => onToggle(id)}
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mr-2 transition-colors duration-200 ease-in-out
        ${enabled 
          ? 'bg-green-100 text-green-800 border border-green-200 hover:bg-green-200' 
          : 'bg-gray-100 text-gray-500 border border-gray-200 hover:bg-gray-200'
        }`}
    >
      {enabled && <Check className="w-3 h-3 mr-1" />}
      {name}
    </button>
  );
};