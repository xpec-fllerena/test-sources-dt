import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Store } from '../types/Store';
import { StoreItem } from './StoreItem';
import { Loader } from 'lucide-react';

interface StoreListProps {
  stores: Store[];
  hasMore: boolean;
  loading: boolean;
  loadMore: () => void;
  onToggle: (id: string) => void;
  onDeliveryTypeToggle: (storeId: string, deliveryTypeId: string) => void;
}

export const StoreList: React.FC<StoreListProps> = ({ 
  stores, 
  hasMore, 
  loading,
  loadMore, 
  onToggle,
  onDeliveryTypeToggle 
}) => {
  if (stores.length === 0 && !loading) {
    return (
      <div className="h-[600px] flex items-center justify-center border border-gray-200 rounded-md bg-white">
        <p className="text-gray-500">No se encontraron tiendas</p>
      </div>
    );
  }

  return (
    <div id="scrollableDiv" className="h-[600px] overflow-auto border border-gray-200 rounded-md bg-white">
      <InfiniteScroll
        dataLength={stores.length}
        next={loadMore}
        hasMore={hasMore}
        loader={
          <div className="flex items-center justify-center p-4 text-gray-500">
            <Loader className="w-5 h-5 mr-2 animate-spin" />
            Cargando...
          </div>
        }
        scrollableTarget="scrollableDiv"
      >
        {stores.map((store) => (
          <StoreItem 
            key={store.id} 
            store={store} 
            onToggle={onToggle}
            onDeliveryTypeToggle={onDeliveryTypeToggle}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};