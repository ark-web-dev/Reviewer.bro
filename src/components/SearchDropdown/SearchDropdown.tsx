import { generateId } from '@/shared/lib';
import { SearchList, ISearchListItem } from '@/shared/types/types';
import { ShowMessage } from '@/shared/ui-components';
import classNames from 'classnames';
import { FC, memo } from 'react';
import { SearchListItem } from '../SearchListItem/SearchListItem';
import warningIcon from '@/shared/assets/icons/warn-icon.svg?react';
import styles from './SearchDropdown.module.css';

export type SearchDropdownProps = {
  searchList: SearchList;
  isVisible: boolean;
};

export const SearchDropdown: FC<SearchDropdownProps & ISearchListItem> = memo(
  ({ searchList, isVisible, onListItemClick, listItemSvgIcon }) => {
    return (
      <div
        className={classNames(
          styles.searchDropdownWrapper,
          isVisible && styles.show
        )}
        id="search-dropdown">
        <div className={styles.searchDropdownInner}>
          <ul className={styles.searchList}>
            {searchList.length > 0 ? (
              searchList.map((item) => (
                <SearchListItem
                  key={generateId()}
                  item={item}
                  listItemSvgIcon={listItemSvgIcon}
                  onListItemClick={onListItemClick}
                />
              ))
            ) : (
              <li>
                <ShowMessage
                  iconSvg={warningIcon}
                  message="There's nothing left here"
                />
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
);
