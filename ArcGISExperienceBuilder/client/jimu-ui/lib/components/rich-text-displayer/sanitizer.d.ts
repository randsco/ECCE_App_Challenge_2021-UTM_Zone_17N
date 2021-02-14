export declare const RICH_TEXT_SANITIZER_OPTION: {
    whiteList: any;
    safeAttrValue: (tag: any, name: any, value: any, cssFilter: any) => string;
    onIgnoreTagAttr: (tag: any, name: any, value: any, isWhiteAttr: any) => string;
    css: {
        onIgnoreAttr: (name: any, value: any) => string;
    };
};
export declare const sanitizer: import("@esri/arcgis-html-sanitizer").Sanitizer;
