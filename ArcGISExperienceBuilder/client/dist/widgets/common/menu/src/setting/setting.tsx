/** @jsx jsx */
/* eslint-disable prefer-const */
import { React, css, jsx, IconResult, IMState, ReactRedux, ThemeVariables, ImmutableObject, ThemePaper, Immutable } from 'jimu-core';
import { AllWidgetSettingProps } from 'jimu-for-builder';
import { SettingSection, SettingRow } from 'jimu-ui/advanced/setting-components';
import { IMConfig, MenuType } from '../config';
import { Select, Radio, Label, Switch, LinearUnit, AnchorDirection, NavigationVariant, hooks, TextAlignValue } from 'jimu-ui';
import { MenuNavigationStandard } from '../runtime/menu-navigation';
import { IconPicker } from 'jimu-ui/advanced/resource-selector';
import { InputUnit, NavStyleSettingByState, ComponentState, TextAlignment } from 'jimu-ui/advanced/style-setting-components';
import { ThemeColorPicker } from 'jimu-ui/basic/color-picker';
import { useMenuNavigationVariant, getMenuNavigationVariant } from './utils';
import defaultMessage from './translations/default'
const { useSelector } = ReactRedux;

const defaultIcon = {
  // eslint-disable-next-line max-len
  svg: '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="css-1i7frhi jimu-icon"><path d="M2 1a1 1 0 100 2h12a1 1 0 100-2H2zm0-1h12a2 2 0 010 4H2a2 2 0 010-4zm0 7a1 1 0 100 2h12a1 1 0 100-2H2zm0-1h12a2 2 0 010 4H2a2 2 0 010-4zm0 7a1 1 0 100 2h12a1 1 0 100-2H2zm0-1h12a2 2 0 010 4H2a2 2 0 010-4z" fill="currentColor" fill-rule="nonzero"></path></svg>',
  properties: {
    color: '#121212',
    size: 20,
    inlineSvg: true
  }
} as IconResult;

const getPaperFromTheme = (theme: ThemeVariables): ImmutableObject<ThemePaper> => {
  return theme?.components?.paper;
}

type SettingProps = AllWidgetSettingProps<IMConfig>;

const style = css`
  .radio-container {
    display: flex;
    width: 100%;
    margin-top: 0.5rem;
    > span.jimu-radio {
      flex-shrink: 0;
      margin-top: 0.1rem;
    }
    > label {
      margin-bottom: 0;
    }
  }
`;

const Setting = (props: SettingProps) => {
  const translate = hooks.useTranslate();
  const translateLocal = hooks.useTranslate(defaultMessage);
  const appTheme = useSelector((state: IMState) => state?.appStateInBuilder?.theme);

  const { config: _config, id, onSettingChange } = props;

  const { vertical, type, menuStyle, variant: cfVariant, advanced, standard } = _config;
  const { anchor, textAlign, icon, submenuMode, gap, showIcon } = standard || {} as MenuNavigationStandard;

  const variant = useMenuNavigationVariant('nav', menuStyle, advanced, cfVariant, showIcon);
  const paper = advanced ? _config?.paper : getPaperFromTheme(appTheme);

  const menuType = type === 'drawer' ? MenuType.Icon : vertical ? MenuType.Vertical : MenuType.Horizontal;


  const generateNavTypes = () => {
    return [{ label: translate('default'), value: 'default' },
      { label: translate('underline'), value: 'underline' },
      { label: translate('pills'), value: 'pills' }];
  }

  const onSettingConfigChange = (key: string | string[], value: any) => {
    onSettingChange({
      id,
      config: Array.isArray(key) ? _config.setIn(key, value) : _config.set(key, value)
    });
  }

  const onAdvancedChange = () => {
    const advanced = !_config?.advanced;

    let config = _config.set('advanced', advanced);
    if (advanced) {
      const variant = getMenuNavigationVariant('nav', menuStyle, showIcon);
      const paper = getPaperFromTheme(appTheme);
      config = config.set('variant', variant).set('paper', paper);
    } else {
      config = config.without('variant').without('paper');
    }

    onSettingChange({ id, config });
  }

  const onTypeChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const menuType = evt.target.value as MenuType;
    const type = menuType === MenuType.Icon ? 'drawer' : 'nav';

    const anchor = menuType === MenuType.Icon ? 'left' : '' as AnchorDirection;
    const vertical = menuType !== MenuType.Horizontal;
    const submenuMode = !vertical ? 'dropdown' : 'foldable';
    const icon = menuType === MenuType.Icon ? Immutable(defaultIcon) : null;
    const standard: Partial<MenuNavigationStandard> = {
      icon,
      anchor,
      submenuMode,
      textAlign: TextAlignValue.CENTER,
      gap: '0px'
    };

    const config = _config.set('type', type)
      .set('menuStyle', 'default')
      .set('standard', standard)
      .set('advanced', false)
      .without('variant')
      .without('paper')
      .set('vertical', vertical);

    onSettingChange({ id, config });
  }

  const onNavTypeRadioChange = (e: React.ChangeEvent<HTMLInputElement>, value) => {
    const checked = e.currentTarget.checked;
    if (!checked) {
      return;
    }
    let config = _config.set('menuStyle', value)
      .set('advanced', false)
      .set('variant', null);

    onSettingChange({ id, config });
  }

  const handleVariantItemChange = (state: ComponentState, key: string, value: any) => {
    onSettingConfigChange(['variant', 'item', state, key], value);
  }

  return <div css={style} className="widget-setting-menu jimu-widget-setting">

    <SettingSection>
      <SettingRow label={translate('type')}>
        <Select value={menuType} onChange={onTypeChange} style={{ width: '50%' }}>
          <option value={MenuType.Icon}>{translate('icon')}</option>
          <option value={MenuType.Vertical}>{translate('vertical')}</option>
          <option value={MenuType.Horizontal}>{translate('horizontal')}</option>
        </Select>
      </SettingRow>

      {type === 'drawer' && <SettingRow label={translate('location')} flow="no-wrap">
        <Select style={{ width: '50%' }} value={anchor} onChange={(evt) => onSettingConfigChange(['standard', 'anchor'], evt.target.value)}>
          <option value="left">{translate('left')}</option>
          <option value="right">{translate('right')}</option>
        </Select>
      </SettingRow>}

      {vertical && <SettingRow label={translateLocal('subMenuExpandMode')} flow="wrap">
        <Select value={submenuMode} onChange={(evt) => onSettingConfigChange(['standard', 'submenuMode'], evt.target.value)}>
          <option value="foldable">{translate('foldable')}</option>
          <option value="static">{translate('expand')}</option>
        </Select>
      </SettingRow>}

      {type === 'drawer' &&
        <React.Fragment>
          <SettingRow label={translate('icon')} flow="no-wrap">
            <IconPicker hideRemove icon={icon as IconResult} previewOptions={{ color: true, size: false }}
              onChange={(icon) => onSettingConfigChange(['standard', 'icon'], icon)}></IconPicker>
          </SettingRow>
          <SettingRow label={translate('iconSize')} flow="no-wrap">
            <InputUnit value={`${icon?.properties?.size ?? 0}px`} onChange={(value: LinearUnit) => onSettingConfigChange(['standard', 'icon', 'properties', 'size'], value.distance)} />
          </SettingRow>
        </React.Fragment>}
    </SettingSection>

    <SettingSection title={translate('appearance')}>

      <SettingRow label={translate('style')} flow="wrap">
        {generateNavTypes().map((item, index) =>
          <div className="radio-container" key={index}>
            <Radio id={'nav-style-type' + index} style={{ cursor: 'pointer' }}
              name="style-type" onChange={e => onNavTypeRadioChange(e, item.value)} checked={menuStyle === item.value} />
            <Label style={{ cursor: 'pointer' }} for={'nav-style-type' + index} className="ml-2 text-break">{item.label}</Label>
          </div>)
        }
      </SettingRow>

      <SettingRow label={translate('space')} flow="no-wrap">
        <InputUnit className="w-50" value={gap} onChange={(value) => onSettingConfigChange(['standard', 'gap'], `${value.distance}${value.unit}`)} />
      </SettingRow>

      <SettingRow flow="no-wrap" label={translate('alignment')}>
        <TextAlignment buttonType="secondary" textAlign={textAlign} onChange={(value) => onSettingConfigChange(['standard', 'textAlign'], value)} />
      </SettingRow>

      <SettingRow flow="no-wrap" label={translate('showIcon')}>
        <Switch checked={showIcon} onChange={(_, value) => onSettingConfigChange(['standard', 'showIcon'], value)} ></Switch>
      </SettingRow>

    </SettingSection>

    <SettingSection>

      <SettingRow flow="no-wrap" label={translate('advance')}>
        <Switch checked={advanced} onChange={onAdvancedChange}></Switch>
      </SettingRow>
      {advanced &&
        <React.Fragment>

          {type !== 'drawer' && <SettingRow label={translate('background')} flow="no-wrap">
            <ThemeColorPicker specificTheme={appTheme} value={variant?.root?.bg} onChange={(value) => onSettingConfigChange(['variant', 'root', 'bg'], value)} />
          </SettingRow>}

          {type === 'drawer' && <SettingRow label={translate('background')} flow="no-wrap">
            <ThemeColorPicker specificTheme={appTheme} value={paper?.bg} onChange={(value) => onSettingConfigChange(['paper', 'bg'], value)} />
          </SettingRow>}

          <NavStyleSettingByState
            variant={variant as NavigationVariant}
            onlyBorderColor={menuStyle === 'underline'}
            text={true}
            icon={false}
            iconInText={showIcon}
            onChange={handleVariantItemChange} />

        </React.Fragment>}
    </SettingSection>
  </div>
}

export default Setting;