import { JimuLayerView, JimuLayerViewConstructorOptions } from './jimu-layer-view';
export interface JimuGroupLayerViewOptions extends JimuLayerViewConstructorOptions {
    url?: string;
}
export declare class JimuGroupLayerView extends JimuLayerView {
    url: string;
    constructor(options: JimuGroupLayerViewOptions);
}
