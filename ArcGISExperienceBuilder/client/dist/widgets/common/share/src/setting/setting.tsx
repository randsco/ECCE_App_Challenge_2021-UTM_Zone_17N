/** @jsx jsx */
import { React, jsx, Immutable, IconResult, defaultMessages, IMState, IMAppConfig, LayoutInfo, LayoutType } from 'jimu-core';
import { AllWidgetSettingProps, getAppConfigAction } from 'jimu-for-builder';
import { SettingSection, SettingRow, DirectionSelector } from 'jimu-ui/advanced/setting-components';
import { Switch, TextInput, Select, Label, ButtonGroup, defaultMessages as commonMessages } from 'jimu-ui';
import { IMConfig, UiMode, InlineDirection, BtnIconSize, IconColorMode, DefaultIconConfig } from '../config';
import { getStyle } from './style';
import { ItemsSelector } from './components/items-selector';
import { IconPicker } from 'jimu-ui/advanced/resource-selector';
import nls from './translations/default';

const UiModeStyleSize = {
  Popup: { w: 100, h: 100 },
  InlineHorizontal: { w: 575, h: 68 }, //Horizontal
  InlineVertical: { w: 82, h: 535 }//Vertical
};
interface ExtraProps {
  appConfig: IMAppConfig;
  layoutInfo: LayoutInfo;
}

export default class Setting extends React.PureComponent<AllWidgetSettingProps<IMConfig> & ExtraProps>{
  static mapExtraStateProps = (state: IMState, props: AllWidgetSettingProps<IMConfig>) => {
    const { id } = props;
    return {
      appConfig: state?.appStateInBuilder?.appConfig,
      layoutInfo: state?.appStateInBuilder?.widgetsState[id]?.layoutInfo
    }
  }

  //1
  private onUIModeChanged = (e) => {
    const uiMode: UiMode = e.target.getAttribute('data-uimode');

    this.triggerLayoutItemSizeChange({ mode: uiMode });

    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set('uiMode', uiMode)
    });
  }

  //layout size
  private triggerLayoutItemSizeChange = (opts: { mode?: UiMode, dir?: InlineDirection }): void => {
    const { mode, dir } = opts

    const appConfigAction = getAppConfigAction();
    const { layoutInfo } = this.props;
    const size = this.getLayoutItemSize(mode, dir);
    const layoutType = this.getLayoutType();
    if (layoutType === LayoutType.FixedLayout) {
      appConfigAction.editLayoutItemSize(layoutInfo, size.w, size.h).exec();
    }
  }
  private getLayoutItemSize = (mode?: UiMode, dir?: InlineDirection) => {
    const uiMode = mode || this.props.config.uiMode;
    const direction = dir || this.props.config.inline.design.direction;

    if (uiMode === UiMode.Popup) {
      return UiModeStyleSize.Popup;
    } else if (uiMode === UiMode.Inline) {
      if (direction === InlineDirection.Horizontal) {
        return UiModeStyleSize.InlineHorizontal;
      } else {
        return UiModeStyleSize.InlineVertical;
      }
    }
  }
  private getLayoutType = (): LayoutType => {
    const { layoutInfo, appConfig } = this.props;
    const layoutId = layoutInfo.layoutId;
    const layoutType = appConfig?.layouts?.[layoutId]?.type;
    return layoutType;
  }

  private _activeUiModeStyle = (mode: UiMode) => {
    if (this.props.config.uiMode === mode) {
      return ' active'
    } else {
      return '';
    }
  }

  //2.1. popup mode
  // onIconColorChange = (color) => {
  //   this.props.onSettingChange({
  //     id: this.props.id,
  //     config: this.props.config.setIn(['popup', 'icon', 'color'], color)
  //   });
  // }
  // onBtnIconSizeChange = (e) => {
  //   var val = e.target.value;
  //   let popup = Immutable(this.props.config.popup);
  //   popup = popup.setIn(['icon', 'size'], val);

  //   this.props.onSettingChange({
  //     id: this.props.id,
  //     config: this.props.config.set('popup', popup)
  //   });
  // }
  onIconChange = (icon) => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.setIn(['popup', 'icon'], icon)
    });
  }
  onPopupItemsChange = (items: string[]) => {
    let popupSetting = Immutable(this.props.config.popup);
    popupSetting = popupSetting.set('items', items);

    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set('popup', popupSetting)
    });
  }
  onToolTipConfigChange = (e) => {
    const val = e.target.value;
    let popupSetting = Immutable(this.props.config.popup);
    popupSetting = popupSetting.set('tooltip', val);

    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set('popup', popupSetting)
    });
  }
  //2.1. popup mode

  //2.2 inline mode
  onInlineItemsChange = (items) => {
    let inlineSetting = Immutable(this.props.config.inline);
    inlineSetting = inlineSetting.set('items', items);

    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set('inline', inlineSetting)
    });
  }
  onInlineDirChange = (isVertical: boolean) => {
    var dir = isVertical ? InlineDirection.Vertical : InlineDirection.Horizontal;

    this.triggerLayoutItemSizeChange({ dir: dir });

    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.setIn(['inline', 'design', 'direction'], dir)
    });
  }
  onIconStyleChange = (radius) => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.setIn(['inline', 'design', 'btnRad'], radius)
    });
  }
  onHideLabelChange = (e) => {
    const isChecked = e.target.checked;
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.setIn(['inline', 'design', 'hideLabel'], isChecked)
    });
  }
  // onInlineBtnColorChange = (color) => {
  //   this.props.onSettingChange({
  //     id: this.props.id,
  //     config: this.props.config.setIn(['inline', 'design', 'btnColor'], color)
  //   });
  // }
  // onInlineIconColorChange = (color) => {
  //   this.props.onSettingChange({
  //     id: this.props.id,
  //     config: this.props.config.setIn(['inline', 'design', 'iconColor'], color)
  //   });
  // }
  onInlineIconColorChange = (e) => {
    const val = e.target.value;
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.setIn(['inline', 'design', 'iconColor'], val)
    });
  }
  onInlineSizeChange = (e) => {
    const val = e.target.value;
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.setIn(['inline', 'design', 'size'], val)
    });
  }
  //2.2 inline mode

  //for render
  //2.1
  _getShareWidgetIcons = (): Array<IconResult> => {
    const shareIcon1 = require('../assets/icons/share_1.svg'); //can't dynamic loading
    const shareIcon2 = require('../assets/icons/share_2.svg');
    const shareIcon3 = require('../assets/icons/share_3.svg');
    const shareIcon4 = require('../assets/icons/share_4.svg');
    const shareIcon5 = require('../assets/icons/share_5.svg');
    const shareIcon6 = require('../assets/icons/share_6.svg');
    const shareIcon7 = require('../assets/icons/share_7.svg');
    const shareIcon8 = require('../assets/icons/share_8.svg');
    const iconList = [shareIcon1, shareIcon2, shareIcon3, shareIcon4, shareIcon5, shareIcon6, shareIcon7, shareIcon8];

    const resList = [];
    for (let i = 0, len = 8; i < len; i++) {
      resList.push({
        svg: iconList[i],
        properties: {
          color: this.props.theme.colors.palette.dark[600],
          size: DefaultIconConfig.properties.size,
          inlineSvg: DefaultIconConfig.properties.inlineSvg
        }
      });
    }
    return resList;
  }
  renderPopupModeSetting = () => {
    let subSettingUI = null;

    const { theme, intl } = this.props;
    const items = this.props.config.popup.items.asMutable();

    const shareWidgetIcons = this._getShareWidgetIcons();
    const icon = this.props.config.popup.icon ? this.props.config.popup.icon : shareWidgetIcons[0];

    const iconTip = this.props.intl.formatMessage({ id: 'icon', defaultMessage: defaultMessages.icon });
    const shareOption = this.props.intl.formatMessage({ id: 'shareOption', defaultMessage: nls.shareOption });
    const tooltip = this.props.intl.formatMessage({ id: 'tooltip', defaultMessage: commonMessages.tooltip });

    subSettingUI = <div>
      <SettingSection>
        <SettingRow>
          <div className="d-flex justify-content-between align-items-center w-100 align-items-start">
            <h6 className="icon-tip">{iconTip}</h6>
            <IconPicker configurableOption="all" buttonOptions={{ type: 'default', size: 'sm' }} hideRemove icon={icon as any} groups={'none'}
              customIcons={shareWidgetIcons} onChange={(icon) => this.onIconChange(icon)}></IconPicker>
            {/*this.props.icon ? <label>{this.props.icon.properties.filename}</label> : null*/}
          </div>
        </SettingRow>
      </SettingSection>

      <SettingSection title={shareOption}>
        <ItemsSelector items={items} theme={theme} intl={intl}
          uiMode={this.props.config.uiMode} onItemsChange={this.onPopupItemsChange}></ItemsSelector>
      </SettingSection>

      <SettingSection>
        {/*<SettingRow label={tooltip}>
          <TextInput value={this.props.config.popup.tooltip} onChange={this.onToolTipConfigChange} className="w-50"/>
        </SettingRow>*/}
        <SettingRow label={tooltip}></SettingRow>
        <SettingRow>
          <TextInput value={this.props.config.popup.tooltip} onChange={this.onToolTipConfigChange} className="w-100" />
        </SettingRow>
      </SettingSection>
    </div>

    return subSettingUI;
  }
  //2.2
  renderInlineModeSetting = () => {
    let subSettingUI = null;
    const isVertical = (this.props.config.inline.design.direction === InlineDirection.Vertical);

    const { theme, intl } = this.props;
    const items = this.props.config.inline.items.asMutable();

    const shareOption = this.props.intl.formatMessage({ id: 'shareOption', defaultMessage: nls.shareOption });
    const design = this.props.intl.formatMessage({ id: 'design', defaultMessage: nls.design });
    const direction = this.props.intl.formatMessage({ id: 'direction', defaultMessage: commonMessages.direction });

    const hideMedia = this.props.intl.formatMessage({ id: 'hideMedia', defaultMessage: nls.hideMedia });
    const size = this.props.intl.formatMessage({ id: 'size', defaultMessage: nls.size });
    const small = this.props.intl.formatMessage({ id: 'small', defaultMessage: defaultMessages.small });
    const medium = this.props.intl.formatMessage({ id: 'medium', defaultMessage: defaultMessages.medium });
    const large = this.props.intl.formatMessage({ id: 'large', defaultMessage: defaultMessages.large });

    const color = this.props.intl.formatMessage({ id: 'color', defaultMessage: commonMessages.color });
    const defaultStr = this.props.intl.formatMessage({ id: 'default', defaultMessage: commonMessages.default });
    const white = this.props.intl.formatMessage({ id: 'white', defaultMessage: nls.white });
    const black = this.props.intl.formatMessage({ id: 'black', defaultMessage: nls.black });
    // var btnRad = this.props.config.inline.design.btnRad;
    // var rad0 = IconRadius.Rad00,
    //   rad1 = IconRadius.Rad20,
    //   rad2 = IconRadius.Rad50;

    subSettingUI = <div>
      <SettingSection title={shareOption}>
        <ItemsSelector items={items} theme={theme} intl={intl}
          uiMode={this.props.config.uiMode} onItemsChange={this.onInlineItemsChange}></ItemsSelector>
      </SettingSection>

      <SettingSection title={design}>
        <SettingRow label={direction}>
          <ButtonGroup>
            <DirectionSelector vertical={isVertical} onChange={this.onInlineDirChange}></DirectionSelector>
          </ButtonGroup>
        </SettingRow>

        <SettingRow label={color}>
          <Select value={(this.props.config.inline.design.iconColor || IconColorMode.Default)} onChange={this.onInlineIconColorChange} size="sm" className="w-50">
            <option value={IconColorMode.Default}>{defaultStr}</option>
            <option value={IconColorMode.White}>{white}</option>
            <option value={IconColorMode.Black}>{black}</option>
          </Select>
        </SettingRow>

        <SettingRow label={size}>
          <Select value={this.props.config.inline.design.size} onChange={this.onInlineSizeChange} size="sm" className="w-50">
            <option value={BtnIconSize.Small}>{small}</option>
            <option value={BtnIconSize.Medium}>{medium}</option>
            <option value={BtnIconSize.Large}>{large}</option>
          </Select>
        </SettingRow>
        {/*
        <SettingRow label={'Icon style'}>
          <RadiusSelector radius={rad0} btnRad={btnRad} themeVal={theme} onClick={() => this.onIconStyleChange(rad0)} className="pr-3"></RadiusSelector>
          <RadiusSelector radius={rad1} btnRad={btnRad} themeVal={theme} onClick={() => this.onIconStyleChange(rad1)} className="pr-3"></RadiusSelector>
          <RadiusSelector radius={rad2} btnRad={btnRad} themeVal={theme} onClick={() => this.onIconStyleChange(rad2)}></RadiusSelector>
        </SettingRow>
        */}
        <SettingRow label={hideMedia}>
          <Switch checked={this.props.config.inline.design.hideLabel} onChange={this.onHideLabelChange}></Switch>
        </SettingRow>
        {/*
        <SettingRow label={'Button color'}>
          <DefaultOrColorpicker className="d-flex" color={this.props.config.inline.design.btnColor} onColorChange={this.onInlineBtnColorChange} />
        </SettingRow>
        <SettingRow label={'Icon color'}>
          <DefaultOrColorpicker className="d-flex" color={this.props.config.inline.design.iconColor} onColorChange={this.onInlineIconColorChange} />
        </SettingRow>
        */}
      </SettingSection>
    </div>

    return subSettingUI;
  }
  //2.3
  renderSlideModeSetting = () => {
    let subSettingUI = null;
    const { theme, intl } = this.props;
    const items = this.props.config.popup.items.asMutable();
    const shareOption = this.props.intl.formatMessage({ id: 'shareOption', defaultMessage: nls.shareOption });

    subSettingUI = <div>
      <SettingSection title={shareOption}>
        <ItemsSelector items={items} theme={theme} intl={intl}
          uiMode={this.props.config.uiMode} onItemsChange={this.onPopupItemsChange}></ItemsSelector>
      </SettingSection>
    </div>

    return subSettingUI;
  }

  render() {
    const shareTypes = this.props.intl.formatMessage({ id: 'shareType', defaultMessage: nls.shareType });
    const popup = this.props.intl.formatMessage({ id: 'popup', defaultMessage: nls.popup });
    const inline = this.props.intl.formatMessage({ id: 'inline', defaultMessage: nls.inline });
    //const slide = this.props.intl.formatMessage({ id: 'inline', defaultMessage: nls.inline });
    let subSettingUI = null;
    let description = null;
    const uiMode = this.props.config.uiMode;
    if (uiMode === UiMode.Popup) {
      subSettingUI = this.renderPopupModeSetting();
      description = this.props.intl.formatMessage({ id: 'popupDes', defaultMessage: nls.popupDes });
    } else if (uiMode === UiMode.Inline) {
      subSettingUI = this.renderInlineModeSetting();
      description = this.props.intl.formatMessage({ id: 'inlineDes', defaultMessage: nls.inlineDes });
    } /*else if (uiMode === UiMode.Slide) {
      subSettingUI = this.renderSlideModeSetting();
      description = this.props.intl.formatMessage({ id: 'inlineDes', defaultMessage: nls.inlineDes });
    }*/

    return <div css={getStyle(this.props.theme)} className="widget-setting-menu jimu-widget-setting">
      {/*1. share type */}
      <SettingSection title={shareTypes}>
        <SettingRow>
          <div className="ui-mode-card-chooser">
            <div className="ui-mode-card-wapper">
              <img className={'ui-mode-card' + this._activeUiModeStyle(UiMode.Popup)} data-uimode={UiMode.Popup} id="uimode-0"
                src={require('./assets/style0.svg')} onClick={this.onUIModeChanged} />
              <Label for="uimode-0" className="mx-1 text-break ui-mode-label">{popup}</Label>
            </div>
            <div className="ui-mode-card-separator"></div>
            <div className="ui-mode-card-wapper">
              <img className={'ui-mode-card' + this._activeUiModeStyle(UiMode.Inline)} data-uimode={UiMode.Inline} id="uimode-1"
                src={require('./assets/style1.svg')} onClick={this.onUIModeChanged} />
              <Label for="uimode-1" className="mx-1 text-break ui-mode-label">{inline}</Label>
            </div>
            {/*<div className="ui-mode-card-wapper">
              <img className={'ui-mode-card' + this._activeUiModeStyle(UiMode.Slide)} data-uimode={UiMode.Slide} id="uimode-2"
                src={require('./assets/style0.svg')} onClick={this.onUIModeChanged} />
              <Label for="uimode-2" className="mx-1 text-break">{"TODO:"+slide}</Label>
            </div>*/}
          </div>
        </SettingRow>
        <SettingRow>
          <div className="text-break">
            {description}
          </div>
        </SettingRow>
      </SettingSection>
      {/*2. subSetting */}
      {subSettingUI}
      <SettingRow>
      </SettingRow>
    </div>
  }
}

/* for image selector
  <SettingRow>
    <div className="d-flex justify-content-between w-100 align-items-center">
      <label className="m-0">source</label>
      <div style={{ width: '70px' }} className="uploadFileName"
        title={fileName ? fileName : "noneSource"}>
        {fileName ? fileName : "noneSource"}
      </div>
      <div style={{ width: '60px' }}><ImageSelector className="text-dark d-flex justify-content-center btn-browse" color="secondary"
        widgetId={this.props.id} label="Set" size="sm"
        onChange={this.onImageResourceChange} imageParam={this.props.config.imageParam} />
      </div>
    </div>
  </SettingRow>
*/
// onImageResourceChange = (imageParam: ImageParam) => {
//   let tempImageParam: ImageParam = imageParam;
//   if (!tempImageParam) {
//     tempImageParam = {};
//   }

//   let config = Immutable(this.props.config);
//   if (config.imageParam && config.imageParam.cropParam) {
//     tempImageParam.cropParam = {
//       svgViewBox: config.imageParam.cropParam.svgViewBox,
//       svgPath: config.imageParam.cropParam.svgPath,
//       cropShape: config.imageParam.cropParam.cropShape,
//     }
//   }
//   //config = config.set('imageParam', tempImageParam);

//   this.props.onSettingChange({
//     //widgetId: this.props.id,
//     id: this.props.id,
//     config: this.props.config.set('imageParam', tempImageParam)
//   });
// }