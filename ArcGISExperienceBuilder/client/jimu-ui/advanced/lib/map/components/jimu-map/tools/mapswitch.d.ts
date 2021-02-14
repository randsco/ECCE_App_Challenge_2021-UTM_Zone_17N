/// <reference types="react" />
import { BaseTool, BaseToolProps, IconType } from '../layout/base/base-tool';
export default class MapSwitch extends BaseTool<BaseToolProps, unknown> {
    toolName: string;
    constructor(props: any);
    static getIsNeedSetting(): boolean;
    getStyle(): import("jimu-core").SerializedStyles;
    getTitle(): string;
    getIcon(): IconType;
    switchMap: () => void;
    getExpandPanel(): JSX.Element;
    getContent: (isShowMapSwitchBtn: boolean, dataSourceIds: string[], activeDataSourceId: string, switchMap: any) => JSX.Element;
    getIconContent: (isShowMapSwitchBtn: boolean, dataSourceIds: string[], activeDataSourceId: string, switchMap: any) => JSX.Element;
    render(): JSX.Element;
}
