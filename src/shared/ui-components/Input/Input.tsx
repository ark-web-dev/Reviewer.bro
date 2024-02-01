import { Svg } from '@/shared/types/types';
import styles from './Input.module.css';
import classNames from 'classnames';
import { Icon } from '..';
import { useState } from 'react';

type InputProps = {
  className?: string;
  value?: string;
  onChangeCallback?: (value: string) => void;
  onFocusCallback?: (value: string) => void;
  icon?: Svg;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<InputProps> = ({
  className,
  value,
  icon,
  onFocusCallback,
  onChangeCallback,
  ...otherProps
}) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <div className={styles.inputWrapper}>
      {icon && (
        <Icon className={styles.icon} Svg={icon} width={23} height={23} />
      )}

      <input
        type="text"
        className={classNames(
          styles.input,
          icon && styles.withIcon,
          (isFocus || value) && styles.focus,
          className
        )}
        value={value}
        onFocus={(e: React.ChangeEvent<HTMLInputElement>) => {
          setIsFocus(true);
          onFocusCallback?.(e.target.value);
        }}
        onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (!e.target.value.length) setIsFocus(false);
        }}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChangeCallback?.(e.target.value)
        }
        {...otherProps}
      />
    </div>
  );
};
