import { useState, useEffect } from 'react';

export const useJsonData = <T extends { id?: string }>(data: T[]) => {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setLoading(true);
      setItems(data);
      setError(null);
    } catch (err) {
      console.error('Error loading data:', err);
      setError('Failed to load data');
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [data]);

  const getItem = (id: string): T | null => {
    return items.find(item => item.id === id) || null;
  };

  const getItems = (filterFn?: (item: T) => boolean): T[] => {
    if (filterFn) {
      return items.filter(filterFn);
    }
    return items;
  };

  return {
    items,
    loading,
    error,
    getItem,
    getItems
  };
};

