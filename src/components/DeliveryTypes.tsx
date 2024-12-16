import React from 'react';
import { DeliveryTypeIndicator } from './DeliveryTypeIndicator';
import { DeliveryType } from '../types/Store';

interface DeliveryTypesProps {
  storeId: string;
  deliveryTypes: DeliveryType[];
  onDeliveryTypeToggle: (storeId: string, deliveryTypeId: string) => void;
}

export const DeliveryTypes: React.FC<DeliveryTypesProps> = ({ 
  storeId,
  deliveryTypes,
  onDeliveryTypeToggle 
}) => {
  return (
    <div className="flex flex-wrap gap-1 mt-2">
      {deliveryTypes.map((type) => (
        <DeliveryTypeIndicator
          key={type.id}
          id={type.id}
          enabled={type.enabled}
          name={type.name}
          onToggle={(deliveryTypeId) => onDeliveryTypeToggle(storeId, deliveryTypeId)}
        />
      ))}
    </div>
  );
};