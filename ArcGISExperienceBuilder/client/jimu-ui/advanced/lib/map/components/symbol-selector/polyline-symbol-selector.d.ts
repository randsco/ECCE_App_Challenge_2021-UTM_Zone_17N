/// <reference types="react" />
import { React, IntlShape } from 'jimu-core';
interface Props {
    intl?: IntlShape;
    symbol?: __esri.SimpleLineSymbol | __esri.LineSymbol3D;
    onSymbolChanged: (symbol: __esri.SimpleMarkerSymbol | __esri.PictureMarkerSymbol | __esri.PointSymbol3D | __esri.SimpleFillSymbol | __esri.PolygonSymbol3D | __esri.SimpleLineSymbol | __esri.LineSymbol3D) => void;
}
interface States {
    apiLoaded: boolean;
    currentIndex: number;
}
export declare class PolylineSymbolSelector extends React.PureComponent<Props, States> {
    jsonUtils: typeof __esri.jsonUtils;
    constructor(props: any);
    componentDidMount(): void;
    handleSymbolSelected: (index: number, symbol: any) => void;
    onSelectChanged: (e: any) => void;
    updateSymbolLineWidth: (value: any) => void;
    getOpacityInSymbol: () => number;
    updateSymbolOpacity: (value: any) => void;
    convertSymbolColorToColorPickerValue: (symbolColor: __esri.Color) => string;
    updateSymbolFillColor: (color: string) => void;
    renderPolylineSymbolList: () => JSX.Element[];
    getPolylineSymbolParamsSetting: () => JSX.Element;
    onOpacityInputChanged: (value: any) => void;
    render(): JSX.Element;
}
export {};
