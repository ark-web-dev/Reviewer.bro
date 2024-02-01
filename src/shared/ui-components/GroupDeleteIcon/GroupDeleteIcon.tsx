import React from 'react';
import styles from './GroupDeleteIcon.module.css';
import classNames from 'classnames';
import { Icon } from '..';
import { Svg } from '@/shared/types/types';

export interface GroupDeleteIconProps {
  icon: Svg;
  onClick: () => void;
  className?: string;
}

export const GroupDeleteIcon: React.FC<GroupDeleteIconProps> = ({
  icon,
  onClick,
  className,
}) => {
  return (
    <Icon
      className={classNames(styles.icon, className)}
      Svg={icon}
      width={26}
      height={26}
      clickable
      onClick={() => {
        onClick();
      }}
      title="Open Sidebar Button"
    />
  );
};
