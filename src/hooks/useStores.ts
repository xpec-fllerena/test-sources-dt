import { useState, useCallback, useEffect } from 'react';
import { Store } from '../types/Store';
import { SearchFormData, StoreFormData } from '../types/form';
import { fetchStores } from '../services/api';
import { useDebounce } from './useDebounce';

export const useStores = (itemsPerPage: number) => {
  const [stores, setStores] = useState<Store[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [total, setTotal] = useState(0);
  
  const debouncedSearch = useDebounce(searchTerm, 300);

  const loadStores = useCallback(async (currentPage: number, search: string) => {
    try {
      setLoading(true);
      const response = await fetchStores({
        page: currentPage,
        limit: itemsPerPage,
        search
      });

      if (currentPage === 1) {
        setStores(response.stores);
      } else {
        setStores(prev => [...prev, ...response.stores]);
      }

      setTotal(response.total);
      setHasMore(response.hasMore);
    } catch (error) {
      console.error('Error loading stores:', error);
    } finally {
      setLoading(false);
    }
  }, [itemsPerPage]);

  useEffect(() => {
    setPage(1);
    loadStores(1, debouncedSearch);
  }, [debouncedSearch, loadStores]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadStores(nextPage, debouncedSearch);
    }
  }, [loading, hasMore, page, debouncedSearch, loadStores]);

  const handleSearch = useCallback((data: SearchFormData) => {
    setSearchTerm(data.search || '');
  }, []);

  const handleToggle = useCallback((id: string, data: StoreFormData) => {
    setStores(prevStores =>
      prevStores.map(store =>
        store.id === id ? { ...store, ...data } : store
      )
    );
  }, []);

  const handleDeliveryTypeToggle = useCallback((storeId: string, deliveryTypeId: string) => {
    setStores(prevStores =>
      prevStores.map(store => {
        if (store.id === storeId) {
          return {
            ...store,
            deliveryTypes: store.deliveryTypes.map(type =>
              type.id === deliveryTypeId ? { ...type, enabled: !type.enabled } : type
            )
          };
        }
        return store;
      })
    );
  }, []);

  const clearSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  return {
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
  };
};