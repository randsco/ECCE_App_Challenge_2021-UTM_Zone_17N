/// <reference types="react" />
import { React, IntlShape } from 'jimu-core';
interface SymbolPreviewerProps {
    intl?: IntlShape;
    symbol?: __esri.SimpleMarkerSymbol | __esri.PictureMarkerSymbol | __esri.PointSymbol3D | __esri.SimpleFillSymbol | __esri.PolygonSymbol3D | __esri.SimpleLineSymbol | __esri.LineSymbol3D;
}
export declare class SymbolPreviewer extends React.PureComponent<SymbolPreviewerProps, unknown> {
    constructor(props: any);
    render(): JSX.Element;
}
export {};
