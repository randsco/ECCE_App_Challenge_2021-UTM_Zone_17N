/** @jsx jsx */
import { React, IMIconResult, css, jsx, ThemePaper, ReactRedux, IMState } from 'jimu-core';
import { Button, Icon, Drawer, NavigationProps, Navigation, PanelHeader, AnchorDirection, NavigationVariant } from 'jimu-ui';
import { useDrawerAdvanceStyle, useNavAdvanceStyle } from './utils';

export type DrawerMenuProps = NavigationProps & {
  icon?: IMIconResult;
  anchor: AnchorDirection;
  advanced?: boolean;
  variant?: NavigationVariant;
  paper?: ThemePaper;
}

const style = css`
    width: 260px;
`;

export const DrawerMenu = (props: DrawerMenuProps) => {
  const [open, setOpen] = React.useState(false);
  const {
    icon,
    anchor,
    advanced,
    type,
    variant,
    paper,
    vertical,
    ...others
  } = props;

  const toggle = () => setOpen(open => !open);
  const drawerStyle = useDrawerAdvanceStyle(advanced, variant, paper);
  const navStyle = useNavAdvanceStyle(advanced, type, variant, true);
  const currentPageId = ReactRedux.useSelector((state: IMState) => state.appRuntimeInfo.currentPageId);
  React.useEffect(() => {
    setOpen(false);
  }, [currentPageId]);
  return <React.Fragment>
    <div className="button-container w-100 h-100 d-flex align-items-center justify-content-center">
      <Button icon type="tertiary" onClick={toggle}>
        <Icon className="caret-icon" icon={icon?.svg} color={icon?.properties?.color} size={icon?.properties?.size} />
      </Button>
    </div>
    <Drawer anchor={anchor} open={open} toggle={toggle} autoFlip={false} css={drawerStyle}>
      <PanelHeader className="header" onClose={toggle}></PanelHeader>
      <Navigation vertical={vertical} css={[style, navStyle]} type={type} {...others}></Navigation>
    </Drawer>
  </React.Fragment>;
}