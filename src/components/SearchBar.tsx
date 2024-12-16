import React from 'react';
import { Search, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SearchFormData, searchFormSchema } from '../types/form';

interface SearchBarProps {
  onSearch: (data: SearchFormData) => void;
  onClear: () => void;
  total: number;
  defaultValue?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  onClear,
  total,
  defaultValue = ''
}) => {
  const { register, handleSubmit, watch, reset } = useForm<SearchFormData>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      search: defaultValue
    }
  });

  const searchValue = watch('search');

  const handleClear = () => {
    reset({ search: '' });
    onClear();
  };

  return (
    <form onSubmit={handleSubmit(onSearch)} className="space-y-2">
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Buscar tienda/bodega..."
          {...register('search', {
            onChange: (e) => handleSubmit(onSearch)()
          })}
        />
        {searchValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>
      <div className="text-sm text-gray-500">
        {total} {total === 1 ? 'tienda encontrada' : 'tiendas encontradas'}
      </div>
    </form>
  );
};