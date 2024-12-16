import React, { useState, useCallback } from 'react';
import { SearchBar } from './components/SearchBar';
import { StoreList } from './components/StoreList';
import { SaveButton } from './components/SaveButton';
import { JsonPreview } from './components/JsonPreview';
import { useStores } from './hooks/useStores';

const ITEMS_PER_PAGE = 20;

function App() {
  const {
    stores,
    hasMore,
    loading,
    loadMore,
    handleToggle,
    handleDeliveryTypeToggle,
    handleSearch,
    searchTerm,
    clearSearch,
    total
  } = useStores(ITEMS_PER_PAGE);

  const [showJsonPreview, setShowJsonPreview] = useState(false);

  const handleSave = useCallback(() => {
    setShowJsonPreview(true);
  }, []);

  const getFormattedData = useCallback(() => {
    const store = stores[0] || null;
    if (!store) return null;

    return {
      id: store.id,
      enabled: store.enabled,
      deliveryTypes: store.deliveryTypes.map(type => ({
        id: type.name,
        enabled: type.enabled
      }))
    };
  }, [stores]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Tiendas/bodegas</h1>
          <SaveButton onClick={handleSave} />
        </div>
        
        <SearchBar 
          onSearch={handleSearch}
          onClear={clearSearch}
          total={total}
          defaultValue={searchTerm}
        />
        
        <StoreList
          stores={stores}
          hasMore={hasMore}
          loading={loading}
          loadMore={loadMore}
          onToggle={handleToggle}
          onDeliveryTypeToggle={handleDeliveryTypeToggle}
        />

        {showJsonPreview && (
          <JsonPreview 
            data={getFormattedData()}
            onClose={() => setShowJsonPreview(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;