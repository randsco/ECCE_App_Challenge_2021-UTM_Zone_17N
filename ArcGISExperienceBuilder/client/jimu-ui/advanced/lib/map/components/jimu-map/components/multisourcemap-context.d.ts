/// <reference types="react" />
import { React } from 'jimu-core';
export declare const MultiSourceMapContext: React.Context<{
    isShowMapSwitchBtn: boolean;
    dataSourceIds: any[];
    activeDataSourceId: any;
    switchMap: () => void;
    fullScreenMap: () => void;
    initialMapState: any;
}>;
