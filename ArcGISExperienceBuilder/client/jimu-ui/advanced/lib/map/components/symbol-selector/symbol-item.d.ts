/// <reference types="react" />
import { React } from 'jimu-core';
interface SymbolItemProps {
    index?: number;
    isActive?: boolean;
    isUsedForPreview?: boolean;
    symbol?: __esri.SimpleMarkerSymbol | __esri.PictureMarkerSymbol | __esri.PointSymbol3D | __esri.SimpleFillSymbol | __esri.PolygonSymbol3D | __esri.SimpleLineSymbol | __esri.LineSymbol3D;
    onSymbolSelected?: (index: number, symbol?: __esri.SimpleMarkerSymbol | __esri.PictureMarkerSymbol | __esri.PointSymbol3D | __esri.SimpleFillSymbol | __esri.PolygonSymbol3D | __esri.SimpleLineSymbol | __esri.LineSymbol3D) => void;
}
interface SymbolItemStates {
    apiLoaded: boolean;
}
export declare class SymbolItem extends React.PureComponent<SymbolItemProps, SymbolItemStates> {
    container: HTMLElement;
    symbolUtils: typeof __esri.symbolUtils;
    renderPreviewHTMLPromise: Promise<HTMLElement>;
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(prevProps: SymbolItemProps, prevState: unknown): void;
    onHandleSymbolClick: () => void;
    render(): JSX.Element;
}
export {};
