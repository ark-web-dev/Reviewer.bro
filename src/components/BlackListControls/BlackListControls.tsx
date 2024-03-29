import React from 'react';
import styles from './BlackListControls.module.css';
import CloseIcon from '@/shared/assets/icons/close-icon.svg?react';
import groupIcon from '@/shared/assets/icons/group-icon.svg?react';
import userIcon from '@/shared/assets/icons/user-icon.svg?react';
import { Icon } from '@/shared/ui-components';
import { SearchBox } from '../SearchBox/SearchBox';
import { IUser } from '@/shared/types/types';
import { useBlackListMetaData } from './hooks/useBlackListMetaData';

export interface BlackListControlsProps {
  contributors: IUser[];
}

export const BlackListControls: React.FC<BlackListControlsProps> = ({
  contributors,
}) => {
  const blackList = useBlackListMetaData();

  return (
    <>
      <SearchBox
        placeholder="Add to Black List"
        searchList={contributors}
        onListItemClick={blackList.add}
        searchInputSvgIcon={groupIcon}
        listItemSvgIcon={userIcon}
      />

      {blackList.items.length > 0 && (
        <ul className={styles.blackList}>
          {blackList.items.map((item) => (
            <li key={item.id} className={styles.blackListItem}>
              {item.login}
              <Icon
                Svg={CloseIcon}
                clickable
                onClick={() => blackList.remove(item)}
                width={15}
                height={15}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
