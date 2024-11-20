import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

const useUpdateSearchParam = (): ((key: string, value?: string) => void) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const updateSearchParam = useMemo(() => {
    return (key: string, value?: string): void => {
      const newParams = new URLSearchParams(searchParams);
      if (value !== undefined) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
      setSearchParams(newParams);
    };
  }, [searchParams, setSearchParams]);

  return updateSearchParam;
};

export default useUpdateSearchParam;
