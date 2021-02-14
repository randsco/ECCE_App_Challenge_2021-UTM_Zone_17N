/// <reference types="react" />
/** @jsx jsx */
import { React, ThemeVariables, IntlShape } from 'jimu-core';
interface SymbolSelectorProps {
    intl?: IntlShape;
    className?: string;
    symbol?: __esri.SimpleMarkerSymbol | __esri.PictureMarkerSymbol | __esri.PointSymbol3D | __esri.SimpleFillSymbol | __esri.PolygonSymbol3D | __esri.SimpleLineSymbol | __esri.LineSymbol3D;
    onPointSymbolChanged?: (symbol: __esri.SimpleMarkerSymbol | __esri.PictureMarkerSymbol | __esri.PointSymbol3D) => void;
    onPolylineSymbolChanged?: (symbol: __esri.SimpleLineSymbol | __esri.LineSymbol3D) => void;
    onPolygonSymbolChanged?: (symbol: __esri.SimpleFillSymbol | __esri.PolygonSymbol3D) => void;
}
interface SymbolSelectorStates {
}
interface ExtraProps {
    theme: ThemeVariables;
}
declare class _SymbolSelector extends React.PureComponent<SymbolSelectorProps & ExtraProps, SymbolSelectorStates> {
    constructor(props: any);
    _cssStyle(): import("jimu-core").SerializedStyles;
    checkSymbolType: (symbol: __esri.SimpleMarkerSymbol | __esri.PictureMarkerSymbol | __esri.PointSymbol3D | __esri.SimpleFillSymbol | __esri.PolygonSymbol3D | __esri.SimpleLineSymbol | __esri.LineSymbol3D) => 'point' | 'polyline' | 'polygon' | '';
    handlePointSymbolChanged: (symbol: __esri.SimpleMarkerSymbol | __esri.PictureMarkerSymbol | __esri.PointSymbol3D) => void;
    handlePolylineSymbolChanged: (symbol: __esri.SimpleLineSymbol | __esri.LineSymbol3D) => void;
    handlePolygonSymbolChanged: (symbol: __esri.SimpleFillSymbol | __esri.PolygonSymbol3D) => void;
    render(): JSX.Element;
}
export declare const SymbolSelector: React.SFC<import("emotion-theming/types/helper").AddOptionalTo<SymbolSelectorProps & ExtraProps & React.RefAttributes<_SymbolSelector>, "theme">>;
export {};
