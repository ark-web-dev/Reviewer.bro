import styles from './UserCard.module.css';
import bookIcon from '@/shared/assets/icons/book-icon.svg?react';
import groupIcon from '@/shared/assets/icons/group-icon.svg?react';
import { IUser } from '@/shared/types/types';
import { Icon } from '@/shared/ui-components';
import classNames from 'classnames';
import { FC, memo } from 'react';

export type UserCardProps = {
  user: IUser;
  size?: 'small' | 'large' | 'default';
};

export const UserCard: FC<UserCardProps> = memo(
  ({ user, size = 'default' }) => {
    const {
      avatar_url,
      login,
      name,
      html_url,
      location,
      public_repos,
      followers,
      bio,
    } = user;

    return (
      <div className={classNames(styles.userCard, styles[size])}>
        <img className={styles.userCardImg} src={avatar_url} alt={login} />

        <div className={styles.infoWrapper}>
          <h4 className={styles.title}>
            <a href={html_url} target="_blank">
              <span className={styles.login}>{login}</span>
              {Boolean(name) && name !== login && (
                <span className={styles.name}>{name}</span>
              )}
            </a>
          </h4>

          {Boolean(bio) && <p className={styles.bio}>{bio}</p>}

          <div className={styles.info}>
            <span className={styles.infoItem}>{location}</span>
          </div>

          <div className={styles.info}>
            {Boolean(public_repos) && (
              <span className={styles.infoItem} title="Repositories">
                <Icon Svg={bookIcon} width={16} height={16} /> {public_repos}
              </span>
            )}

            {Boolean(followers) && (
              <span className={styles.infoItem} title="Followers">
                <Icon Svg={groupIcon} /> {followers}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
);
