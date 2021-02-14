/** @jsx jsx */
import { jsx, css, polished, lodash, Immutable, ImmutableArray } from 'jimu-core';
import { NavQuickStyleItem, QuickStylePopper, QuickStylePopperProps } from 'jimu-ui/advanced/setting-components';
import { NavTemplate, generateDisplayKey } from './utils';
import { IMViewNavigationDisplay, ViewNavigation } from './components/view-navigation';
import { NavigationItem } from 'jimu-ui';

const dummyNavData = Immutable([{ name: 'v1', value: 'p1,v1' }, { name: 'v2' }, { name: 'v3' }, { name: 'v4' }]) as ImmutableArray<NavigationItem>;

export interface NavQuickStyleProps extends Omit<QuickStylePopperProps, 'onChange'> {
  templates: NavTemplate[];
  display: IMViewNavigationDisplay;
  onChange: (template: NavTemplate) => void;
}

const style = css`
  .body {
    display: flex;
    padding: ${polished.rem(10)} ${polished.rem(20)} ${polished.rem(20)} ${polished.rem(20)};
    width: ${polished.rem(260)};
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .quick-style-item:not(:last-of-type) {
      margin-bottom: 10px;
    }
  }
`;

export const NavQuickStyle = (props: NavQuickStyleProps) => {
  const { templates, display, onChange, children, ...others } = props;

  return <QuickStylePopper {...others} css={style}>
    <div className="body">
      {
        templates.map((item, index) => {
          const template = { ...item };
          const title = template.label;
          delete template.label;

          const navBtnStandard = item.type === 'navButtonGroup' ? {
            current: 1,
            totalPage: 4,
            disablePrevious: true,
            disableNext: false
          } : {};

          const navStandard = item.type === 'nav' ? {
            scrollable: false
          } : {};

          const starndard = lodash.assign({}, template.standard, navBtnStandard, navStandard);

          return <NavQuickStyleItem key={index} title={title}
            selected={display?.advanced ? false : generateDisplayKey(template) === generateDisplayKey(display as any)}
            onClick={() => onChange(template)}>
            <ViewNavigation type={template.type} data={dummyNavData} navStyle={template.navStyle} activeView="v1" standard={starndard} />
          </NavQuickStyleItem>

        })
      }
    </div>
  </QuickStylePopper>
}

export default { NavQuickStyle };