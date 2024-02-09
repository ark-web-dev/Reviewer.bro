import { Svg } from '@/shared/types/types';
import styles from './Icon.module.css';
import classNames from 'classnames';

type IconProps = {
  className?: string;
  id?: string;
  title?: string;
  Svg: Svg;
  width?: number;
  height?: number;
  clickable?: boolean;
  onClick?: () => void;
};

export const Icon: React.FC<IconProps> = ({
  className,
  id,
  Svg,
  title,
  width = 20,
  height = 20,
  clickable,
  onClick,
  ...otherProps
}) => {
  const icon = (
    <span
      className={classNames(!clickable && className)}
      id={id}
      title={title}
      style={{ width, height }}>
      <Svg width={width} height={height} {...otherProps} />
    </span>
  );

  return clickable ? (
    <button
      type="button"
      className={classNames(styles.btn, className)}
      onClick={onClick}
      title={title}>
      {icon}
    </button>
  ) : (
    icon
  );
};
