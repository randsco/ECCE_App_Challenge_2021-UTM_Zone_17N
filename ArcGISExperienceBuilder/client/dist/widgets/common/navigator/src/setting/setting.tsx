/** @jsx jsx */
/* eslint-disable prefer-const */
import { React, css, jsx, Immutable, polished, IMThemeSliderVariant, IMState, ReactRedux, ThemeVariables } from 'jimu-core';
import { AllWidgetSettingProps } from 'jimu-for-builder';
import { SettingSection, SettingRow, DirectionSelector } from 'jimu-ui/advanced/setting-components';
import { IMConfig, ViewType, IMViewNavigationData } from '../config';
import { NavigationVariant, MultiSelect} from 'jimu-ui';
import { Select, Radio, Label, Switch, TextInput, NumericInput, hooks } from 'jimu-ui';
import { getSectionLabel, useViewNavigationVariant, getViewNavigationVariant, getViewSelectItems, useContainerSections, useSectionViews } from './utils'
import { SliderStyleSetting } from './slider-style-setting';
import { IMViewNavigationDisplay } from '../runtime/components/view-navigation';
import { ThemeColorPicker } from 'jimu-ui/basic/color-picker';
import { IconPicker } from 'jimu-ui/advanced/resource-selector';
import { ComponentState, NavStyleSettingByState, NavIconPicker, InputUnit, TextAlignment } from 'jimu-ui/advanced/style-setting-components';
import defaultMessages from './translations/default';
const { useSelector } = ReactRedux;

type SettingProps = AllWidgetSettingProps<IMConfig>;

const useStyle = (theme: ThemeVariables) => {
  const dark600 = theme?.colors?.palette.dark[600];
  return React.useMemo(() => {
    return css`
        .jimu-multi-select {
          width: 100%;
          > .jimu-dropdown {
            width: 100%;
          }
          > .jimu-menu-item {
            width: 100%;
            height: ${polished.rem(26)};
          }
        }
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
        .title-1 {
          > label {
            font-size: ${polished.rem(14)};
            color: ${dark600};
          }
        }
      `;
  }, [dark600])
}
const Setting = (props: SettingProps) => {
  const appTheme = useSelector((state: IMState) => state?.appStateInBuilder?.theme);
  const translate = hooks.useTranslate();
  const translateLocal = hooks.useTranslate(defaultMessages);
  const { config, id, onSettingChange, theme } = props;
  const data = config?.data ?? Immutable({}) as IMViewNavigationData;
  const display = config?.display ?? Immutable({}) as IMViewNavigationDisplay;
  const { section, type: viewType, views: cfView } = data;
  const { vertical, type, navStyle, variant: cfVariant, advanced, standard } = display;
  const { showIcon, showText, showTitle, alternateIcon, activedIcon, previousText, previousIcon, nextText, nextIcon, hideThumb, step = 1, textAlign: textAlign, gap } = standard || {};
  const variant = useViewNavigationVariant(type, navStyle, advanced, cfVariant, showIcon);
  const background = variant?.root?.bg;
  const sections = useContainerSections(id);
  const views = useSectionViews(section);
  const style = useStyle(theme);

  const onSettingConfigChange = (key: string | string[], value: any) => {
    onSettingChange({
      id,
      config: Array.isArray(key) ? config.setIn(key, value) : config.set(key, value)
    });
  }

  const renderSelectText = (values: string[]) => {
    const viewNumber = values ? values.length : 0;
    return translate('viewsSelected', { viewNumber });
  }

  const onViewsSelectClick = (_, __, vs: string[]) => {
    //sort views by section.views
    vs.sort((a, b) => {
      return views?.indexOf(a) - views?.indexOf(b);
    });
    onSettingConfigChange(['data', 'views'], vs);
  }

  const onAdvancedChange = () => {
    const advanced = !config?.display.advanced;

    let display = config.display.set('advanced', advanced);
    if (advanced) {
      const variant = getViewNavigationVariant(type, navStyle, showIcon);
      display = display.set('variant', variant);
    } else {
      display = display.set('variant', undefined);
    }

    onSettingConfigChange('display', display);
  }

  const handleVariantItemChange = (state: ComponentState, key: string, value: any) => {
    onSettingConfigChange(['display', 'variant', 'item', state, key], value);
  }

  return <div className="widget-setting-navigator jimu-widget-setting" css={style}>
    <SettingSection>
      <SettingRow flow="wrap" label={translate('linkTo')}>
        <Select value={section} onChange={e => onSettingConfigChange(['data', 'section'], e.target.value)}>
          {sections.map((sid, index) => <option key={index} value={sid}>{getSectionLabel(sid)}</option>)}
        </Select>
      </SettingRow>

      {section && <React.Fragment>

        {type === 'nav' && <SettingRow label={translate('views')} flow="wrap">
          <div className="radio-container">
            <Radio id="view-type-auto" style={{ cursor: 'pointer' }}
              name="view-type" onChange={e => onSettingConfigChange(['data', 'type'], ViewType.Auto)} checked={viewType === ViewType.Auto} />
            <Label style={{ cursor: 'pointer' }} for="view-type-auto" className="ml-2">{translate('auto')}</Label>
          </div>

          <div className="radio-container">
            <Radio id="view-type-custom" style={{ cursor: 'pointer' }}
              name="view-type" onChange={e => onSettingConfigChange(['data', 'type'], ViewType.Custom)} checked={viewType === ViewType.Custom} />
            <Label style={{ cursor: 'pointer' }} for="view-type-custom" className="ml-2">{translate('custom')}</Label>
          </div>
        </SettingRow>}

        {viewType === ViewType.Custom && <SettingRow flow="wrap">
          <MultiSelect values={cfView} items={getViewSelectItems(views)} onClickItem={onViewsSelectClick} displayByValues={renderSelectText} ></MultiSelect>
        </SettingRow>}

        {type !== 'slider' && <SettingRow flow="no-wrap" label={translate('direction')}>
          <DirectionSelector vertical={vertical} onChange={(vertical) => onSettingConfigChange(['display', 'vertical'], vertical)}></DirectionSelector>
        </SettingRow>}

        {type === 'nav' && <SettingRow label={translate('space')} flow="no-wrap">
          <InputUnit className="w-50" value={gap} onChange={(value) => onSettingConfigChange(['display', 'standard', 'gap'], `${value.distance}${value.unit}`)} />
        </SettingRow>}

        {type === 'nav' && <SettingRow flow="no-wrap" label={translate('alignment')}>
          <TextAlignment buttonType="secondary" textAlign={textAlign} onChange={(value) => onSettingConfigChange(['display', 'standard', 'textAlign'], value)} />
        </SettingRow>}

        {
          (type === 'nav' && showIcon && !showText) && <SettingRow flow="no-wrap" label={translate('tooltip')} >
            <Switch checked={showTitle} onChange={() => onSettingConfigChange(['display', 'standard', 'showTitle'], !showTitle)}></Switch>
          </SettingRow>
        }

        {(type === 'nav' && showIcon) && <React.Fragment>
          <SettingRow flow="no-wrap" label={translate('symbol')} className="title-1" ></SettingRow>
          <SettingRow flow="no-wrap" label={translate('currentView')} >
            <NavIconPicker hideRemove size={8} icon={activedIcon as any} onChange={(icon) => onSettingConfigChange(['display', 'standard', 'activedIcon'], icon)}></NavIconPicker>
          </SettingRow>
          <SettingRow flow="no-wrap" label={translate('others')} >
            <NavIconPicker hideRemove size={8} icon={alternateIcon as any} onChange={(icon) => onSettingConfigChange(['display', 'standard', 'alternateIcon'], icon)}></NavIconPicker>
          </SettingRow>
        </React.Fragment>
        }

        {
          type === 'navButtonGroup' && <SettingRow flow="no-wrap" label={translate('step')} >
            <NumericInput size="sm" value={step} style={{ width: '27%' }} showHandlers={false}
              min={0.1} max={1} onAcceptValue={value => onSettingConfigChange(['display', 'standard', 'step'], +value)} />
          </SettingRow>
        }

        {
          type === 'navButtonGroup' && <React.Fragment>
            <SettingRow flow="wrap" label={translate('previous')} className="justify-content-between">
              <TextInput size="sm" style={{ width: '61%' }} value={previousText} onAcceptValue={(value) => onSettingConfigChange(['display', 'standard', 'previousText'], value)} />
              <IconPicker icon={previousIcon as any} onChange={(icon) => onSettingConfigChange(['display', 'standard', 'previousIcon'], icon)}></IconPicker>
            </SettingRow>

            <SettingRow flow="wrap" label={translate('next')} className="justify-content-between">
              <TextInput size="sm" style={{ width: '61%' }} value={nextText} onAcceptValue={(value) => onSettingConfigChange(['display', 'standard', 'nextText'], value)} />
              <IconPicker icon={nextIcon as any} onChange={(icon) => onSettingConfigChange(['display', 'standard', 'nextIcon'], icon)}></IconPicker>
            </SettingRow>

          </React.Fragment>
        }

        {type === 'slider' && <SettingRow label={translate('thumbHandle')} flow="no-wrap">
          <Switch checked={!hideThumb} onChange={() => onSettingConfigChange(['display', 'standard', 'hideThumb'], !hideThumb)}></Switch>
        </SettingRow>}

      </React.Fragment>}

    </SettingSection>

    {section && <SettingSection>
      <SettingRow flow="no-wrap" label={translate('advance')}>
        <Switch checked={advanced} onChange={onAdvancedChange}></Switch>
      </SettingRow>
      {advanced && <React.Fragment>

        <SettingRow label={translate('background')} flow="no-wrap">
          <ThemeColorPicker specificTheme={appTheme} value={background} onChange={(value) => onSettingConfigChange(['display', 'variant', 'root', 'bg'], value)} />
        </SettingRow>

        {type === 'nav' && !showIcon && <SettingRow label={translateLocal('tabStyle')} flow="no-wrap"></SettingRow>}
        {type === 'navButtonGroup' && <SettingRow label={translateLocal('navBtnStyle')} flow="no-wrap"></SettingRow>}

        {type === 'nav' && <NavStyleSettingByState
          variant={variant as NavigationVariant}
          onlyBorderColor={navStyle === 'underline'}
          text={showText}
          icon={showIcon}
          onChange={handleVariantItemChange} />}
        {type === 'slider' && <SliderStyleSetting hideThumb={hideThumb} variant={variant as IMThemeSliderVariant} onChange={onSettingConfigChange} />}
        {type === 'navButtonGroup' && <NavStyleSettingByState
          variant={variant as NavigationVariant}
          states={['default', 'hover', 'disabled']}
          onlyBorderColor={false}
          text={true}
          icon={false}
          iconInText={true}
          onChange={handleVariantItemChange} />}
      </React.Fragment>}
    </SettingSection>}

  </div >
}

export default Setting;