//for popper toggle
export function stopPropagation(evt: React.MouseEvent<HTMLDivElement>) {
  evt.stopPropagation();
  evt.nativeEvent?.stopImmediatePropagation();
}