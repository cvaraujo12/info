import { useState, useEffect, useMemo } from 'react';

interface UseSearchOptions<T extends Record<string, any>> {
  data: T[];
  searchFields: (keyof T)[];
  filterFields?: Partial<Record<keyof T, T[keyof T]>>;
  sortField?: keyof T;
  sortDirection?: 'asc' | 'desc';
  itemsPerPage?: number;
}

function isValidDate(value: any): value is Date {
  return value instanceof Date && !isNaN(value.getTime());
}

export function useSearch<T extends Record<string, any>>({
  data,
  searchFields,
  filterFields = {},
  sortField,
  sortDirection = 'desc',
  itemsPerPage = 9
}: UseSearchOptions<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Partial<Record<keyof T, T[keyof T]>>>(filterFields);

  // Reset página quando mudar busca ou filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  // Filtrar dados
  const filteredData = useMemo(() => {
    return data.filter(item => {
      // Aplicar busca
      const matchesSearch = searchTerm === '' || searchFields.some(field => {
        const value = item[field];
        return value && String(value).toLowerCase().includes(searchTerm.toLowerCase());
      });

      // Aplicar filtros
      const matchesFilters = Object.entries(filters).every(([field, value]) => {
        if (!value) return true;
        return item[field as keyof T] === value;
      });

      return matchesSearch && matchesFilters;
    });
  }, [data, searchTerm, filters, searchFields]);

  // Ordenar dados
  const sortedData = useMemo(() => {
    if (!sortField) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (isValidDate(aValue) && isValidDate(bValue)) {
        return sortDirection === 'asc'
          ? aValue.getTime() - bValue.getTime()
          : bValue.getTime() - aValue.getTime();
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc'
          ? aValue - bValue
          : bValue - aValue;
      }

      return 0;
    });
  }, [filteredData, sortField, sortDirection]);

  // Paginar dados
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return sortedData.slice(start, end);
  }, [sortedData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  return {
    data: paginatedData,
    totalItems: sortedData.length,
    currentPage,
    totalPages,
    searchTerm,
    filters,
    setSearchTerm,
    setCurrentPage,
    setFilters: (newFilters: Partial<Record<keyof T, T[keyof T]>>) => setFilters(newFilters),
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
    nextPage: () => setCurrentPage(page => Math.min(page + 1, totalPages)),
    previousPage: () => setCurrentPage(page => Math.max(page - 1, 1)),
  };
} 