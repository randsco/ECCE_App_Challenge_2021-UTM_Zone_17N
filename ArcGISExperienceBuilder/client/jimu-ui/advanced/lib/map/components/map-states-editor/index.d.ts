/// <reference types="react" />
/** @jsx jsx */
import { UseDataSource, React, ImmutableArray } from 'jimu-core';
import { JimuMapView } from 'jimu-arcgis';
import { IMJimuMapConfig } from '../jimu-map';
interface Props {
    useDataSources?: ImmutableArray<UseDataSource>;
    jimuMapConfig?: IMJimuMapConfig;
    buttonLabel?: string;
    title?: string;
    id?: string;
    isUseWidgetSize?: boolean;
    className?: string;
    style?: React.CSSProperties;
    onConfigChanged?: (config: IMJimuMapConfig) => void;
}
interface States {
    isShowDialog: boolean;
    currentJimuMapView: JimuMapView;
}
export declare class MapStatesEditor extends React.PureComponent<Props, States> {
    constructor(props: any);
    handleClickOk: () => void;
    handleClickClose: () => void;
    showDialog: () => void;
    handleActiveViewChange: (jimuMapView: JimuMapView) => void;
    querySelector(selector: string): HTMLElement;
    getWidgetSize: () => {
        width: number;
        height: number;
    };
    getRightSize: (innerSize: {
        width: number;
        height: number;
    }) => {
        width: number;
        height: number;
    };
    render(): JSX.Element;
}
export {};
