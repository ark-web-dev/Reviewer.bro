import { debounce } from '@/shared/lib';
import { SearchList } from '@/shared/types/types';
import { useState, useCallback, useEffect, useMemo } from 'react';

export const useSearch = (
  list: SearchList
): [SearchList, (value: string) => void] => {
  const [filteredResults, setFilteredResults] = useState<SearchList>([...list]);

  const setSearchResult = useCallback(
    (value: string) => {
      const lowerCaseValue = value.toLowerCase();

      const filteredData = list.filter((item) => {
        const targetString = 'login' in item ? item.login : item.name;
        return targetString.toLowerCase().includes(lowerCaseValue);
      });

      setFilteredResults(filteredData);
    },
    [list]
  );
  const debouncedSetSearchResult = useMemo(
    () =>
      debounce((value: string) => {
        setSearchResult(value);
      }, 300),
    []
  );

  useEffect(() => {
    setFilteredResults(list);
  }, [list]);

  return [filteredResults, debouncedSetSearchResult];
};
