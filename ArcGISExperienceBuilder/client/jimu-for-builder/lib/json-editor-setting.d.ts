/// <reference types="react" />
import BaseWidgetSetting from './base-widget-setting';
import { AllWidgetSettingProps } from './props';
export default class Setting extends BaseWidgetSetting<AllWidgetSettingProps<any>, any> {
    render(): JSX.Element;
}
