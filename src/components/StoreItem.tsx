import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Store } from '../types/Store';
import { StoreFormData, storeFormSchema } from '../types/form';
import { DeliveryTypes } from './DeliveryTypes';
import { StoreToggle } from './StoreToggle';

interface StoreItemProps {
  store: Store;
  onToggle: (id: string, data: StoreFormData) => void;
  onDeliveryTypeToggle: (storeId: string, deliveryTypeId: string) => void;
}

export const StoreItem: React.FC<StoreItemProps> = ({ 
  store, 
  onToggle,
  onDeliveryTypeToggle 
}) => {
  const { handleSubmit, setValue, watch } = useForm<StoreFormData>({
    resolver: zodResolver(storeFormSchema),
    defaultValues: store
  });

  const enabled = watch('enabled');

  const handleToggle = () => {
    setValue('enabled', !enabled);
    handleSubmit((data) => onToggle(store.id, data))();
  };

  return (
    <div className="flex flex-col p-4 border-b border-gray-200 hover:bg-gray-50">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-900">{store.name}</span>
        <StoreToggle enabled={enabled} onChange={handleToggle} />
      </div>
      <DeliveryTypes 
        storeId={store.id}
        deliveryTypes={store.deliveryTypes}
        onDeliveryTypeToggle={onDeliveryTypeToggle}
      />
    </div>
  );
};