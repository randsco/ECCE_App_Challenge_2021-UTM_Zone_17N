/// <reference types="react" />
import { React, IntlShape } from 'jimu-core';
interface Props {
    intl?: IntlShape;
    symbol?: __esri.SimpleFillSymbol | __esri.PolygonSymbol3D;
    onSymbolChanged: (symbol: __esri.SimpleMarkerSymbol | __esri.PictureMarkerSymbol | __esri.PointSymbol3D | __esri.SimpleFillSymbol | __esri.PolygonSymbol3D | __esri.SimpleLineSymbol | __esri.LineSymbol3D) => void;
}
interface States {
    apiLoaded: boolean;
    currentIndex: number;
}
export declare class PolygonSymbolSelector extends React.PureComponent<Props, States> {
    jsonUtils: typeof __esri.jsonUtils;
    constructor(props: any);
    componentDidMount(): void;
    handleSymbolSelected: (index: number, symbol: any) => void;
    renderPolygonSymbolList: () => JSX.Element[];
    getPolygonSymbolParamsSetting: () => JSX.Element;
    onOpacityInputChanged: (value: any) => void;
    updateSymbolOutLineWeight: (value: any) => void;
    updateSymbolOutLineColor: (color: string) => void;
    convertSymbolColorToColorPickerValue: (symbolColor: __esri.Color) => string;
    updateSymbolFillColor: (color: string) => void;
    getOpacityInSymbol: () => number;
    updateSymbolOpacity: (value: any) => void;
    render(): JSX.Element;
}
export {};
