import React from 'react';
import styles from './ShowMessage.module.css';
import { Svg } from '@/shared/types/types';
import { Icon } from '..';

interface ShowMessageProps {
  message: string;
  iconSvg?: Svg;
  color?: string;
  fontSize?: number;
}

export const ShowMessage: React.FC<ShowMessageProps> = ({
  message,
  color,
  fontSize,
  iconSvg,
}) => {
  return (
    <p className={styles.showMessage} style={{ color, fontSize }}>
      {Boolean(iconSvg) && <Icon Svg={iconSvg!} />}

      {message}
    </p>
  );
};
