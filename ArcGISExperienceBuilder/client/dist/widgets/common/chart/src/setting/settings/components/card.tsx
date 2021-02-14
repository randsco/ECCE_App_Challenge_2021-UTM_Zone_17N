/** @jsx jsx */
import { React, jsx, css, ReactRedux, IMState, classNames } from 'jimu-core';
import { Icon } from 'jimu-ui';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: any;
  active?: boolean;
}

const useStyle = () => {
  const theme = ReactRedux.useSelector((state: IMState) => state.theme);
  const white = theme?.colors?.white;
  const primary = theme?.colors?.primary;

  return React.useMemo(() => {
    return  css`
    .wrapper {
      cursor: pointer;
      width: 100%;
      height: 100%;
      border: 1px solid transparent;
      background-color: ${white};
      &.active {
        border: 2px solid ${primary};
      }
    }
  `;
  }, [primary, white])
}

export const Card = (props: CardProps) => {
  const { icon, active, onClick, ...others } = props;

  const style = useStyle();
  return <div css={style} onClick={onClick} {...others}>
    <Icon className={classNames('wrapper', {active})} icon={icon} />
  </div>
}