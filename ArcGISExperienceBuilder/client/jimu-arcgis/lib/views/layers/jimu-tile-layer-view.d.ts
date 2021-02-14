import { JimuLayerView, JimuLayerViewConstructorOptions } from './jimu-layer-view';
export interface JimuTileLayerViewOptions extends JimuLayerViewConstructorOptions {
    url?: string;
}
export declare class JimuTileLayerView extends JimuLayerView {
    url: string;
    constructor(options: JimuTileLayerViewOptions);
}
