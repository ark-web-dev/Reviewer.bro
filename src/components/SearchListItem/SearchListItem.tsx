import { ISearchEntity, ISearchListItem } from '@/shared/types/types';
import { Icon } from '@/shared/ui-components';
import styles from './SearchListItem.module.css';

export type SearchListItemProps = {
  element: ISearchEntity;
};

export const SearchListItem: React.FC<
  SearchListItemProps & ISearchListItem
> = ({ element, listItemSvgIcon, onListItemClick }) => {
  const name: string = 'login' in element ? element.login : element.name;

  return (
    <li
      className={styles.searchListItem}
      onClick={() => onListItemClick?.(name, element)}>
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
