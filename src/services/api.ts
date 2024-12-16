import { Store } from '../types/Store';
import { DELIVERY_TYPES } from '../constants/deliveryTypes';

// Simulated database with 1000 stores
const generateMockStores = (count: number): Store[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: `store-${index + 1}`,
    name: `Store ${index + 1} - ${Math.random().toString(36).substring(7).toUpperCase()}`,
    enabled: Math.random() > 0.3,
    deliveryTypes: DELIVERY_TYPES.map(type => ({
      ...type,
      enabled: Math.random() > 0.3
    }))
  }));
};

const MOCK_DB = generateMockStores(1000);

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface FetchStoresParams {
  page: number;
  limit: number;
  search?: string;
}

export interface FetchStoresResponse {
  stores: Store[];
  total: number;
  hasMore: boolean;
}

export const fetchStores = async ({
  page,
  limit,
  search = ''
}: FetchStoresParams): Promise<FetchStoresResponse> => {
  // Simulate API delay
  await delay(800);

  const filteredStores = MOCK_DB.filter(store =>
    store.name.toLowerCase().includes(search.toLowerCase())
  );

  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedStores = filteredStores.slice(start, end);

  return {
    stores: paginatedStores,
    total: filteredStores.length,
    hasMore: end < filteredStores.length
  };
};