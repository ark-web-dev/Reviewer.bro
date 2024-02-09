export const onClickOutside = (
  event: MouseEvent,
  ref: React.MutableRefObject<HTMLElement | null>,
  callback: (event: MouseEvent) => void
) => {
  if (ref.current == null || ref.current?.contains(event.target as Node))
    return;
  callback(event);
};
