import { extensionSpec, LayoutType, IMLayoutItemJson, BrowserSizeMode, IMLayoutJson } from 'jimu-core';
export declare class FlowLayoutTransformer implements extensionSpec.LayoutTransformer {
    id: string;
    layoutType: LayoutType;
    transformLayout(layout: IMLayoutJson, fromSizeMode: BrowserSizeMode, toSizeMode: BrowserSizeMode): IMLayoutJson;
    transformLayoutItem(item: IMLayoutItemJson, index: number, fromLayoutId: string, toLayoutId: string, fromSizeMode: BrowserSizeMode, toSizeMode: BrowserSizeMode): {
        item: IMLayoutItemJson;
        index: number;
    };
}
