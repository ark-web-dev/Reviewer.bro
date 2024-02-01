import { useOnClickOutside } from '@/shared/hooks/useOnClickOutside';
import { SearchList, Svg, ISearchListItem } from '@/shared/types/types';
import { Input } from '@/shared/ui-components';
import classNames from 'classnames';
import { memo, useState, useRef, useCallback, useLayoutEffect } from 'react';
import { SearchDropdown } from '../SearchDropdown/SearchDropdown';
import styles from './SearchBox.module.css';
import { useSearch } from './hooks/useSearch';

export type SearchBoxProps = {
  searchList: SearchList;
  placeholder?: string;
  searchInputSvgIcon: Svg;
};

export const SearchBox: React.FC<SearchBoxProps & ISearchListItem> = memo(
  ({
    searchList,
    placeholder = 'Search',
    searchInputSvgIcon,
    listItemSvgIcon,
    onListItemClick,
  }) => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const refSearchBox = useRef<HTMLDivElement | null>(null);
    const [searchResults, getSearchResults] = useSearch(searchList);

    const onListItemClickMemo = useCallback((name: string, login: string) => {
      setInputValue(name);
      setIsDropdownVisible(false);
      onListItemClick?.(name, login);
    }, []);

    useLayoutEffect(() => setInputValue(''), [searchList]);
    useOnClickOutside(refSearchBox, () => setIsDropdownVisible(false));

    return (
      <div className={styles.searchBox} ref={refSearchBox}>
        <Input
          className={classNames(
            styles.searchInput,
            isDropdownVisible && styles.inputFocus
          )}
          icon={searchInputSvgIcon}
          value={inputValue}
          onChangeCallback={(value) => {
            getSearchResults(value);
            setInputValue(value);
          }}
          onFocusCallback={() => setIsDropdownVisible(true)}
          placeholder={placeholder}
        />

        <SearchDropdown
          isVisible={isDropdownVisible}
          searchList={searchResults}
          onListItemClick={onListItemClickMemo}
          listItemSvgIcon={listItemSvgIcon}
        />
      </div>
    );
  }
);
