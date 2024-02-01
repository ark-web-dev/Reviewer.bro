import { ISearchEntity, ISearchListItem } from '@/shared/types/types';
import { Icon } from '@/shared/ui-components';
import styles from './SearchListItem.module.css';

export type SearchListItemProps = {
  item: ISearchEntity;
};

export const SearchListItem: React.FC<
  SearchListItemProps & ISearchListItem
> = ({ item, listItemSvgIcon, onListItemClick }) => {
  const name: string = item.login ? item.login : item.name;
  const login: string = item.login ? item.login : item.owner!.login;

  return (
    <li
      className={styles.searchListItem}
      onClick={() => onListItemClick?.(name, login)}>
      {listItemSvgIcon && (
        <Icon
          Svg={listItemSvgIcon}
          className={styles.icon}
          width={16}
          height={16}
        />
      )}
      {name}
    </li>
  );
};
