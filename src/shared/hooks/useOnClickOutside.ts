import { useEffect } from 'react';
import { onClickOutside } from '../lib/dom/onClickOutside';

export const useOnClickOutside = (
  ref: React.MutableRefObject<HTMLElement | null>,
  callback: () => void
) => {
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      onClickOutside(event, ref, callback);
    };

    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [ref]);
};
