import { JimuLayerView, JimuLayerViewConstructorOptions } from './jimu-layer-view';
export interface JimuMapImageLayerViewOptions extends JimuLayerViewConstructorOptions {
    url?: string;
}
export declare class JimuMapImageLayerView extends JimuLayerView {
    url: string;
    constructor(options: JimuMapImageLayerViewOptions);
}
