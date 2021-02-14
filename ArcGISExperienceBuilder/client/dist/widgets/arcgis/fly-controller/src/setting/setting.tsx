/** @jsx jsx */
import { React, jsx, Immutable, IMState, IMAppConfig, LayoutInfo, LayoutType } from 'jimu-core';
import { BaseWidgetSetting, AllWidgetSettingProps, getAppConfigAction } from 'jimu-for-builder';
import { JimuMapViewSelector, SettingSection, SettingRow } from 'jimu-ui/advanced/setting-components';
import { IMConfig, FlyStyle, RotateDirection, PathStyle, ControllerLayout } from '../config';
import { Checkbox, Radio, Label, Icon } from 'jimu-ui';
import { getStyle, getSettingSectionStyles } from './style';
import nls from './translations/default';

const rotateIconImage = require('../assets/icons/fly-rotate.svg');
const pathIconImage = require('../assets/icons/fly-path.svg');

const ControllerStyleSize = {
  [ControllerLayout.Horizontal]: { w: 340, h: 60 },//w: 264
  [ControllerLayout.Palette]: { w: 340, h: 98 }//w: 142
};

interface ExtraProps {
  appConfig: IMAppConfig;
  layoutInfo: LayoutInfo;
}

export default class Setting extends BaseWidgetSetting<AllWidgetSettingProps<IMConfig> & ExtraProps>{
  static mapExtraStateProps = (state: IMState, props: AllWidgetSettingProps<IMConfig>) => {
    const { id } = props;
    return {
      appConfig: state?.appStateInBuilder?.appConfig,
      layoutInfo: state?.appStateInBuilder?.widgetsState[id]?.layoutInfo
    }
  }

  //0
  onMapWidgetChange = (useMapWidgetIds: string[]) => {
    this.props.onSettingChange({
      id: this.props.id,
      useMapWidgetIds: useMapWidgetIds
    });
  }
  onInUseRadioChange = (e: React.ChangeEvent<HTMLInputElement>, idx) => {
    const checked = e.currentTarget.checked; //show / hide
    const items = this.props.config.itemsList.asMutable({ deep: true });
    var $item = Immutable(items[idx]);
    if ($item.name === FlyStyle.Rotate) {
      const item = $item.set('isInUse', checked);
      items.splice(idx, 1, item.asMutable({ deep: true }));
    } else if ($item.name === FlyStyle.Path) {
      const item = $item.set('isInUse', checked);
      items.splice(idx, 1, item.asMutable({ deep: true }));
    }/* else if ($item.name === FlyStyle.Record) {
      const item = $item.set('isInUse', checked);
      items.splice(idx, 1, item.asMutable({ deep: true }));
    }*/

    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set('itemsList', items)
    });
  }

  //ControllerLayout
  private activeControllerLayout = (style: ControllerLayout) => {
    if (this.props.config.layout === style) {
      return ' active'
    } else {
      return '';
    }
  }
  private onControllerLayoutChanged = (e) => {
    const style: ControllerLayout = e.target.getAttribute('data-uimode');

    const appConfigAction = getAppConfigAction();
    const { layoutInfo } = this.props;
    const size = ControllerStyleSize[style];
    const layoutType = this.getLayoutType();
    if (layoutType === LayoutType.FixedLayout) {
      appConfigAction.editLayoutItemSize(layoutInfo, size.w, size.h).exec();
    }

    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set('layout', style)
    });
  }
  private getLayoutType = (): LayoutType => {
    const { layoutInfo, appConfig } = this.props;
    const layoutId = layoutInfo.layoutId;
    const layoutType = appConfig?.layouts?.[layoutId]?.type;
    return layoutType;
  }

  //1 Rotate Setting
  onRotateRadioChange = (dir, idx) => {
    const items = this.props.config.itemsList.asMutable({ deep: true });
    var $item = Immutable(items[idx]);
    if ($item.name === FlyStyle.Rotate) {
      const item = $item.set('direction', dir);
      items.splice(idx, 1, item.asMutable({ deep: true }));

      this.props.onSettingChange({
        id: this.props.id,
        config: this.props.config.set('itemsList', items)
      });
    }
  }

  //2 Path Setting
  onPathRadioChange = (style, idx) => {
    const items = this.props.config.itemsList.asMutable({ deep: true });
    var $item = Immutable(items[idx]);
    if ($item.name === FlyStyle.Path) {
      const item = $item.set('style', style);
      items.splice(idx, 1, item.asMutable({ deep: true }));

      this.props.onSettingChange({
        id: this.props.id,
        config: this.props.config.set('itemsList', items)
      });
    }
  }

  //for render
  renderRotateSetting = (styleConfig, idx) => {
    const isCW = (styleConfig.direction === RotateDirection.CW);
    const klass = getSettingSectionStyles(this.props.config.itemsList, idx);

    const label = this.props.intl.formatMessage({ id: 'styleLabelRotate', defaultMessage: nls.styleLabelRotate });
    const cw = this.props.intl.formatMessage({ id: 'CW', defaultMessage: nls.CW });
    const ccw = this.props.intl.formatMessage({ id: 'CCW', defaultMessage: nls.CCW });

    return <SettingSection className={'d-2 ' + klass}>
      <SettingRow>
        <Label className="flystyle-label">{label}</Label>
      </SettingRow>
      <SettingRow className="mt-2 radio-wapper">
        <Radio checked={isCW} id="CW" style={{ cursor: 'pointer' }} onChange={e => this.onRotateRadioChange(/*e, */'CW', idx)} />
        <Label style={{ cursor: 'pointer' }} for="CW" className="ml-1 text-break">{cw}</Label>
      </SettingRow>
      <SettingRow className="mt-2 radio-wapper">
        <Radio checked={!isCW} id="CCW" style={{ cursor: 'pointer' }} onChange={e => this.onRotateRadioChange(/*e, */'CCW', idx)} />
        <Label style={{ cursor: 'pointer' }} for="CCW" className="ml-1 text-break">{ccw}</Label>
      </SettingRow>
    </SettingSection>
  }
  renderPathSetting = (styleConfig, idx) => {
    const isCurve = (styleConfig.style === PathStyle.Smoothed);
    const klass = getSettingSectionStyles(this.props.config.itemsList, idx);

    const label = this.props.intl.formatMessage({ id: 'styleLabelPath', defaultMessage: nls.styleLabelPath });
    const smoothedCurve = this.props.intl.formatMessage({ id: 'pathTypeSmoothedCurve', defaultMessage: nls.pathTypeSmoothedCurve });
    const realPath = this.props.intl.formatMessage({ id: 'pathTypeRealPath', defaultMessage: nls.pathTypeRealPath });

    return <SettingSection className={'d-2 ' + klass}>
      <SettingRow>
        <Label className="flystyle-label text-truncate">{label}</Label>
      </SettingRow>
      <SettingRow className="mt-2 radio-wapper">
        <Radio checked={isCurve} id="CURVED" style={{ cursor: 'pointer' }} onChange={e => this.onPathRadioChange(/*e, */'CURVED', idx)} />
        <Label style={{ cursor: 'pointer' }} for="CURVED" className="ml-1 text-break">{smoothedCurve}</Label>
      </SettingRow>
      <SettingRow className="mt-2 radio-wapper">
        <Radio checked={!isCurve} id="LINE" style={{ cursor: 'pointer' }} onChange={e => this.onPathRadioChange(/*e, */'LINE', idx)} />
        <Label style={{ cursor: 'pointer' }} for="LINE" className="ml-1 text-break">{realPath}</Label>
      </SettingRow>
    </SettingSection>
  }
  // renderRecordSetting = (styleConfig, idx) => {
  //   return <div>Records list</div>
  // }

  render() {
    const itemsList = this.props.config.itemsList.asMutable();

    const selectMapTips = this.props.intl.formatMessage({ id: 'selectMap', defaultMessage: nls.selectMap });

    const controllerStyle = this.props.intl.formatMessage({ id: 'controllerStyle', defaultMessage: nls.controllerStyle });
    const bar = this.props.intl.formatMessage({ id: 'bar', defaultMessage: nls.bar });
    const palette = this.props.intl.formatMessage({ id: 'palette', defaultMessage: nls.palette });

    const selectStyleTips = this.props.intl.formatMessage({ id: 'selectStyle', defaultMessage: nls.selectStyle });
    const flyStyleRotate = this.props.intl.formatMessage({ id: 'flyStyleRotate', defaultMessage: nls.flyStyleRotate });
    const flyStylePath = this.props.intl.formatMessage({ id: 'flyStylePath', defaultMessage: nls.flyStylePath });
    //const flyStyleRecord = this.props.intl.formatMessage({ id: 'flyStylePath', defaultMessage: nls.flyStylePath });

    return <div css={getStyle(this.props.theme)}>
      <div className="widget-setting-fly-controller">
        <SettingSection className="map-selector-section">
          <SettingRow flow="wrap">
            <div className="select-map-descript text-break">{selectMapTips}</div>
          </SettingRow>
          <SettingRow>
            <JimuMapViewSelector onSelect={this.onMapWidgetChange} useMapWidgetIds={this.props.useMapWidgetIds} />
          </SettingRow>
        </SettingSection>

        <SettingSection title={controllerStyle} >
          <SettingRow>
            <div className="ui-mode-card-chooser">
              <div className="ui-mode-card-wapper">
                <img className={'ui-mode-card' + this.activeControllerLayout(ControllerLayout.Horizontal)} data-uimode={ControllerLayout.Horizontal} id="uimode-0"
                  src={require('./assets/style0.svg')} onClick={this.onControllerLayoutChanged} />
                <Label for="uimode-0" className="mx-1 text-break ui-mode-label">{bar}</Label>
              </div>
              <div className="ui-mode-card-separator"></div>
              <div className="ui-mode-card-wapper">
                <img className={'ui-mode-card' + this.activeControllerLayout(ControllerLayout.Palette)} data-uimode={ControllerLayout.Palette} id="uimode-1"
                  src={require('./assets/style1.svg')} onClick={this.onControllerLayoutChanged} />
                <Label for="uimode-1" className="mx-1 text-break ui-mode-label">{palette}</Label>
              </div>
            </div>
          </SettingRow>
        </SettingSection>

        <SettingSection title={selectStyleTips} >
          {itemsList.map((styleConfig, idx) => {
            const style = styleConfig.name;
            if (FlyStyle.Rotate === style) {
              return <div key={idx}>
                <SettingRow className="d-flex align-items-center">
                  <Checkbox id="rotate-cb" checked={styleConfig.isInUse} style={{ cursor: 'pointer' }} onChange={e => this.onInUseRadioChange(e, idx)} />
                  <Label style={{ cursor: 'pointer' }} for="rotate-cb" ><Icon icon={rotateIconImage} className="m-2"></Icon>{flyStyleRotate}</Label>
                </SettingRow>

                {this.renderRotateSetting(styleConfig, idx)}
              </div>
            } else if (FlyStyle.Path === style) {
              return <div key={idx}>
                <SettingRow className="d-flex align-items-center">
                  <Checkbox id="path-cb" checked={styleConfig.isInUse} style={{ cursor: 'pointer' }} onChange={e => this.onInUseRadioChange(e, idx)} />
                  <Label style={{ cursor: 'pointer' }} for="path-cb" ><Icon icon={pathIconImage} className="m-2"></Icon>{flyStylePath}</Label>
                </SettingRow>

                {this.renderPathSetting(styleConfig, idx)}
              </div>
            } /*else if (FlyStyle.Record === style) {
              return <div key={idx}>
                <SettingRow className="d-flex align-items-center">
                  <Checkbox id="path-cb" checked={styleConfig.isInUse} style={{ cursor: 'pointer' }} onChange={e => this.onInUseRadioChange(e, idx)} />
                  <Label style={{ cursor: 'pointer' }} for="path-cb" ><Icon icon={pathIconImage} className="m-2"></Icon>{flyStyleRecord}</Label>
                </SettingRow>

                {this.renderRecordSetting(styleConfig, idx)}
              </div>
            }*/
          })}
        </SettingSection>
      </div>
    </div>
  }
}