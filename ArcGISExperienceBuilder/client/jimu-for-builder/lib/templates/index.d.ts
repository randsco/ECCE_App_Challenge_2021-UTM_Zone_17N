export declare function init(): Promise<any>;
export declare function getAppTemplates(): import("./type").Template[];
export declare function getFullScreenPageTemplates(): import("./type").Template[];
export declare function getAutoScrollPageTemplates(): {
    name: string;
    type: import("./type").TemplateType;
    icon: any;
}[];
export declare function getDialogTemplates(): import("./type").Template[];
export declare function getHeaderTemplates(): {
    name: string;
    type: import("./type").TemplateType;
    icon: any;
    config: any;
}[];
export declare function getFooterTemplates(): {
    name: string;
    type: import("./type").TemplateType;
    icon: any;
    config: any;
}[];
export declare function getBlockTemplates(): ({
    name: string;
    type: import("./type").TemplateType;
    widgetId: string;
    icon: any;
    config: {
        widgets: {
            widget_0: {
                uri: string;
                layouts: {
                    DEFAULT: {
                        LARGE: string;
                    };
                };
            };
            widget_1: {
                uri: string;
                layouts: {
                    DEFAULT: {
                        LARGE: string;
                    };
                };
            };
            widget_2: {
                uri: string;
                config: {
                    placeholder: string;
                    style: {
                        verticalAlign: string;
                        wrap: boolean;
                    };
                };
                layouts?: undefined;
            };
            widget_3: {
                uri: string;
                config: {
                    placeholder: string;
                    style: {
                        verticalAlign: string;
                        wrap: boolean;
                    };
                };
                layouts?: undefined;
            };
            widget_4: {
                uri: string;
                config?: undefined;
                layouts?: undefined;
            };
            widget_5?: undefined;
            widget_6?: undefined;
            widget_7?: undefined;
            widget_8?: undefined;
            widget_9?: undefined;
            widget_10?: undefined;
            widget_11?: undefined;
            widget_12?: undefined;
        };
        layouts: {
            layout_0: {
                content: {
                    0: {
                        id: string;
                        bbox: {
                            left: number;
                            width: number;
                        };
                        type: import("jimu-core").LayoutItemType;
                        widgetId: string;
                        setting: {
                            heightMode: string;
                            aspectRatio: number;
                        };
                    };
                    1: {
                        id: string;
                        bbox: {
                            left: number;
                            width: number;
                            height: string;
                        };
                        type: import("jimu-core").LayoutItemType;
                        widgetId: string;
                        setting?: undefined;
                    };
                    2?: undefined;
                    3?: undefined;
                };
                order: string[];
                type: string;
            };
            layout_1: {
                content: {
                    0: {
                        id: string;
                        bbox: {
                            height: string;
                        };
                        type: import("jimu-core").LayoutItemType;
                        widgetId: string;
                        setting?: undefined;
                    };
                    1: {
                        id: string;
                        bbox: {
                            height: string;
                        };
                        type: import("jimu-core").LayoutItemType;
                        widgetId: string;
                        setting: {
                            heightMode: string;
                        };
                    };
                    2?: undefined;
                };
                order: string[];
                type: string;
            };
            layout_2?: undefined;
            layout_3?: undefined;
            layout_4?: undefined;
        };
    };
} | {
    name: string;
    type: import("./type").TemplateType;
    widgetId: string;
    icon: any;
    config: {
        widgets: {
            widget_0: {
                uri: string;
                layouts: {
                    DEFAULT: {
                        LARGE: string;
                    };
                };
            };
            widget_1: {
                uri: string;
                layouts: {
                    DEFAULT: {
                        LARGE: string;
                    };
                };
            };
            widget_2: {
                uri: string;
                layouts: {
                    DEFAULT: {
                        LARGE: string;
                    };
                };
                config?: undefined;
            };
            widget_3: {
                uri: string;
                config: {
                    placeholder: string;
                    style: {
                        verticalAlign: string;
                        wrap?: undefined;
                    };
                };
                layouts?: undefined;
            };
            widget_4: {
                uri: string;
                config: {
                    placeholder: string;
                    style: {
                        verticalAlign: string;
                    };
                };
                layouts?: undefined;
            };
            widget_5: {
                uri: string;
                config: {
                    placeholder: string;
                    style: {
                        verticalAlign: string;
                    };
                };
            };
            widget_6: {
                uri: string;
                config: {
                    placeholder: string;
                    style: {
                        verticalAlign: string;
                    };
                };
            };
            widget_7: {
                uri: string;
                config?: undefined;
            };
            widget_8: {
                uri: string;
                config?: undefined;
            };
            widget_9?: undefined;
            widget_10?: undefined;
            widget_11?: undefined;
            widget_12?: undefined;
        };
        layouts: {
            layout_0: {
                content: {
                    0: {
                        id: string;
                        bbox: {
                            left: number;
                            width: number;
                        };
                        type: import("jimu-core").LayoutItemType;
                        widgetId: string;
                        setting: {
                            heightMode: string;
                            aspectRatio: number;
                        };
                    };
                    1: {
                        id: string;
                        bbox: {
                            left: number;
                            width: number;
                            height?: undefined;
                        };
                        type: import("jimu-core").LayoutItemType;
                        widgetId: string;
                        setting: {
                            heightMode: string;
                            aspectRatio: number;
                        };
                    };
                    2?: undefined;
                    3?: undefined;
                };
                order: string[];
                type: string;
            };
            layout_1: {
                content: {
                    0: {
                        id: string;
                        bbox: {
                            height: string;
                        };
                        type: import("jimu-core").LayoutItemType;
                        widgetId: string;
                        setting: {
                            heightMode: string;
                        };
                    };
                    1: {
                        id: string;
                        bbox: {
                            height: string;
                        };
                        type: import("jimu-core").LayoutItemType;
                        widgetId: string;
                        setting?: undefined;
                    };
                    2: {
                        id: string;
                        bbox: {
                            height: string;
                        };
                        type: import("jimu-core").LayoutItemType;
                        widgetId: string;
                    };
                };
                order: string[];
                type: string;
            };
            layout_2: {
                content: {
                    0: {
                        id: string;
                        bbox: {
                            height: string;
                        };
                        type: import("jimu-core").LayoutItemType;
                        widgetId: string;
                        setting: {
                            heightMode: string;
                        };
                    };
                    1: {
                        id: string;
                        bbox: {
                            height: string;
                        };
                        type: import("jimu-core").LayoutItemType;
                        widgetId: string;
                    };
                    2: {
                        id: string;
                        bbox: {
                            height: string;
                        };
                        type: import("jimu-core").LayoutItemType;
                        widgetId: string;
                    };
                };
                order: string[];
                type: string;
            };
            layout_3?: undefined;
            layout_4?: undefined;
        };
    };
} | {
    name: string;
    type: import("./type").TemplateType;
    widgetId: string;
    icon: any;
    config: {
        widgets: {
            widget_0: {
                uri: string;
                layouts: {
                    DEFAULT: {
                        LARGE: string;
                    };
                };
            };
            widget_1: {
                uri: string;
                layouts: {
                    DEFAULT: {
                        LARGE: string;
                    };
                };
            };
            widget_2: {
                uri: string;
                config?: undefined;
                layouts?: undefined;
            };
            widget_3: {
                uri: string;
                config?: undefined;
                layouts?: undefined;
            };
            widget_4: {
                uri: string;
                config?: undefined;
                layouts?: undefined;
            };
            widget_5?: undefined;
            widget_6?: undefined;
            widget_7?: undefined;
            widget_8?: undefined;
            widget_9?: undefined;
            widget_10?: undefined;
            widget_11?: undefined;
            widget_12?: undefined;
        };
        layouts: {
            layout_0: {
                content: {
                    0: {
                        id: string;
                        bbox: {
                            left: number;
                            width: number;
                        };
                        type: import("jimu-core").LayoutItemType;
                        widgetId: string;
                        setting: {
                            heightMode: string;
                            aspectRatio?: undefined;
                        };
                    };
                    1: {
                        id: string;
                        bbox: {
                            left: number;
                            width: number;
                            height?: undefined;
                        };
                        type: import("jimu-core").LayoutItemType;
                        widgetId: string;
                        setting: {
                            heightMode: string;
                            aspectRatio: number;
                        };
                    };
                    2?: undefined;
                    3?: undefined;
                };
                order: string[];
                type: string;
            };
            layout_1: {
                content: {
                    0: {
                        id: string;
                        bbox: {
                            height: string;
                        };
                        type: import("jimu-core").LayoutItemType;
                        widgetId: string;
                        setting: {
                            heightMode: string;
                        };
                    };
                    1: {
                        id: string;
                        bbox: {
                            height: string;
                        };
                        type: import("jimu-core").LayoutItemType;
                        widgetId: string;
                        setting: {
                            heightMode: string;
                        };
                    };
                    2?: undefined;
                };
                order: string[];
                type: string;
            };
            layout_2?: undefined;
            layout_3?: undefined;
            layout_4?: undefined;
        };
    };
} | {
    name: string;
    type: import("./type").TemplateType;
    widgetId: string;
    icon: any;
    config: {
        widgets: {
            widget_0: {
                uri: string;
                layouts: {
                    DEFAULT: {
                        LARGE: string;
                    };
                };
            };
            widget_1: {
                uri: string;
                layouts: {
                    DEFAULT: {
                        LARGE: string;
                    };
                };
            };
            widget_2: {
                uri: string;
                layouts: {
                    DEFAULT: {
                        LARGE: string;
                    };
                };
                config?: undefined;
            };
            widget_3: {
                uri: string;
                layouts: {
                    DEFAULT: {
                        LARGE: string;
                    };
                };
                config?: undefined;
            };
            widget_4: {
                uri: string;
                config: {
                    placeholder: string;
                    style: {
                        verticalAlign: string;
                    };
                };
                layouts?: undefined;
            };
            widget_5: {
                uri: string;
                config: {
                    placeholder: string;
                    style: {
                        verticalAlign: string;
                    };
                };
            };
            widget_6: {
                uri: string;
                config: {
                    placeholder: string;
                    style: {
                        verticalAlign: string;
                    };
                };
            };
            widget_7: {
                uri: string;
                config: {
                    placeholder: string;
                    style: {
                        verticalAlign: string;
                    };
                };
            };
            widget_8: {
                uri: string;
                config: {
                    placeholder: string;
                    style: {
                        verticalAlign: string;
                    };
                };
            };
            widget_9: {
                uri: string;
                config: {
                    placeholder: string;
                    style: {
                        verticalAlign: string;
                    };
                };
            };
            widget_10: {
                uri: string;
            };
            widget_11: {
                uri: string;
            };
            widget_12: {
                uri: string;
            };
        };
        layouts: {
            layout_0: {
                content: {
                    0: {
                        id: string;
                        bbox: {
                            left: number;
                            width: number;
                        };
                        type: import("jimu-core").LayoutItemType;
                        widgetId: string;
                        setting: {
                            heightMode: string;
                            aspectRatio: number;
                        };
                    };
                    1: {
                        id: string;
                        bbox: {
                            left: number;
                            width: number;
                            height?: undefined;
                        };
                        type: import("jimu-core").LayoutItemType;
                        widgetId: string;
                        setting: {
                            heightMode: string;
                            aspectRatio: number;
                        };
                    };
                    2: {
                        id: string;
                        bbox: {
                            left: number;
                            width: number;
                        };
                        type: import("jimu-core").LayoutItemType;
                        widgetId: string;
                        setting: {
                            heightMode: string;
                            aspectRatio: number;
                        };
                    };
                    3?: undefined;
                };
                order: string[];
                type: string;
            };
            layout_1: {
                content: {
                    0: {
                        id: string;
                        bbox: {
                            height: string;
                        };
                        type: import("jimu-core").LayoutItemType;
                        widgetId: string;
                        setting: {
                            heightMode: string;
                        };
                    };
                    1: {
                        id: string;
                        bbox: {
                            height: string;
                        };
                        type: import("jimu-core").LayoutItemType;
                        widgetId: string;
                        setting?: undefined;
                    };
                    2: {
                        id: string;
                        bbox: {
                            height: string;
                        };
                        type: import("jimu-core").LayoutItemType;
                        widgetId: string;
                    };
                };
                order: string[];
                type: string;
            };
            layout_2: {
                content: {
                    0: {
                        id: string;
                        bbox: {
                            height: string;
                        };
                        type: import("jimu-core").LayoutItemType;
                        widgetId: string;
                        setting: {
                            heightMode: string;
                        };
                    };
                    1: {
                        id: string;
                        bbox: {
                            height: string;
                        };
                        type: import("jimu-core").LayoutItemType;
                        widgetId: string;
                    };
                    2: {
                        id: string;
                        bbox: {
                            height: string;
                        };
                        type: import("jimu-core").LayoutItemType;
                        widgetId: string;
                    };
                };
                order: string[];
                type: string;
            };
            layout_3: {
                content: {
                    0: {
                        id: string;
                        bbox: {
                            height: string;
                        };
                        type: import("jimu-core").LayoutItemType;
                        widgetId: string;
                        setting: {
                            heightMode: string;
                        };
                    };
                    1: {
                        id: string;
                        bbox: {
                            height: string;
                        };
                        type: import("jimu-core").LayoutItemType;
                        widgetId: string;
                    };
                    2: {
                        id: string;
                        bbox: {
                            height: string;
                        };
                        type: import("jimu-core").LayoutItemType;
                        widgetId: string;
                    };
                };
                order: string[];
                type: string;
            };
            layout_4?: undefined;
        };
    };
} | {
    name: string;
    type: import("./type").TemplateType;
    widgetId: string;
    icon: any;
    config: {
        widgets: {
            widget_0: {
                uri: string;
                layouts: {
                    DEFAULT: {
                        LARGE: string;
                    };
                };
            };
            widget_1: {
                uri: string;
                layouts: {
                    DEFAULT: {
                        LARGE: string;
                    };
                };
            };
            widget_2: {
                uri: string;
                layouts: {
                    DEFAULT: {
                        LARGE: string;
                    };
                };
                config?: undefined;
            };
            widget_3: {
                uri: string;
                config: {
                    placeholder: string;
                    style: {
                        verticalAlign: string;
                        wrap?: undefined;
                    };
                };
                layouts?: undefined;
            };
            widget_4: {
                uri: string;
                config: {
                    placeholder: string;
                    style: {
                        verticalAlign: string;
                    };
                };
                layouts?: undefined;
            };
            widget_5: {
                uri: string;
                config: {
                    placeholder: string;
                    style: {
                        verticalAlign: string;
                    };
                };
            };
            widget_6: {
                uri: string;
                config: {
                    placeholder: string;
                    style: {
                        verticalAlign: string;
                    };
                };
            };
            widget_7: {
                uri: string;
                config?: undefined;
            };
            widget_8: {
                uri: string;
                config?: undefined;
            };
            widget_9?: undefined;
            widget_10?: undefined;
            widget_11?: undefined;
            widget_12?: undefined;
        };
        layouts: {
            layout_0: {
                content: {
                    0: {
                        id: string;
                        bbox: {
                            left: number;
                            width: number;
                        };
                        type: import("jimu-core").LayoutItemType;
                        widgetId: string;
                        setting: {
                            heightMode: string;
                            aspectRatio: number;
                        };
                    };
                    1: {
                        id: string;
                        bbox: {
                            left: number;
                            width: number;
                            height?: undefined;
                        };
                        type: import("jimu-core").LayoutItemType;
                        widgetId: string;
                        setting: {
                            heightMode: string;
                            aspectRatio?: undefined;
                        };
                    };
                    2: {
                        id: string;
                        bbox: {
                            left: number;
                            width: number;
                        };
                        type: import("jimu-core").LayoutItemType;
                        widgetId: string;
                        setting: {
                            heightMode: string;
                            aspectRatio: number;
                        };
                    };
                    3: {
                        id: string;
                        bbox: {
                            left: number;
                            width: number;
                        };
                        type: import("jimu-core").LayoutItemType;
                        widgetId: string;
                        setting: {
                            heightMode: string;
                            aspectRatio?: undefined;
                        };
                    };
                };
                order: string[];
                type: string;
            };
            layout_1: {
                content: {
                    0: {
                        id: string;
                        bbox: {
                            height: string;
                        };
                        type: import("jimu-core").LayoutItemType;
                        widgetId: string;
                        setting?: undefined;
                    };
                    1: {
                        id: string;
                        bbox: {
                            height: string;
                        };
                        type: import("jimu-core").LayoutItemType;
                        widgetId: string;
                        setting?: undefined;
                    };
                    2?: undefined;
                };
                order: string[];
                type: string;
            };
            layout_2: {
                content: {
                    0: {
                        id: string;
                        bbox: {
                            height: string;
                        };
                        type: import("jimu-core").LayoutItemType;
                        widgetId: string;
                        setting?: undefined;
                    };
                    1: {
                        id: string;
                        bbox: {
                            height: string;
                        };
                        type: import("jimu-core").LayoutItemType;
                        widgetId: string;
                    };
                    2?: undefined;
                };
                order: string[];
                type: string;
            };
            layout_3?: undefined;
            layout_4?: undefined;
        };
    };
} | {
    name: string;
    type: import("./type").TemplateType;
    widgetId: string;
    icon: any;
    config: {
        widgets: {
            widget_0: {
                uri: string;
                layouts: {
                    DEFAULT: {
                        LARGE: string;
                    };
                };
            };
            widget_1: {
                uri: string;
                layouts: {
                    DEFAULT: {
                        LARGE: string;
                    };
                };
            };
            widget_2: {
                uri: string;
                layouts: {
                    DEFAULT: {
                        LARGE: string;
                    };
                };
                config?: undefined;
            };
            widget_3: {
                uri: string;
                layouts: {
                    DEFAULT: {
                        LARGE: string;
                    };
                };
                config?: undefined;
            };
            widget_4: {
                uri: string;
                layouts: {
                    DEFAULT: {
                        LARGE: string;
                    };
                };
                config?: undefined;
            };
            widget_5: {
                uri: string;
                config: {
                    placeholder: string;
                    style: {
                        verticalAlign: string;
                    };
                };
            };
            widget_6: {
                uri: string;
                config: {
                    placeholder: string;
                    style: {
                        verticalAlign: string;
                    };
                };
            };
            widget_7: {
                uri: string;
                config: {
                    placeholder: string;
                    style: {
                        verticalAlign: string;
                    };
                };
            };
            widget_8: {
                uri: string;
                config: {
                    placeholder: string;
                    style: {
                        verticalAlign: string;
                    };
                };
            };
            widget_9: {
                uri: string;
                config?: undefined;
            };
            widget_10: {
                uri: string;
            };
            widget_11: {
                uri: string;
            };
            widget_12: {
                uri: string;
            };
        };
        layouts: {
            layout_0: {
                content: {
                    0: {
                        id: string;
                        bbox: {
                            left: number;
                            width: number;
                        };
                        type: import("jimu-core").LayoutItemType;
                        widgetId: string;
                        setting: {
                            heightMode: string;
                            aspectRatio: number;
                        };
                    };
                    1: {
                        id: string;
                        bbox: {
                            left: number;
                            width: number;
                            height?: undefined;
                        };
                        type: import("jimu-core").LayoutItemType;
                        widgetId: string;
                        setting: {
                            heightMode: string;
                            aspectRatio: number;
                        };
                    };
                    2: {
                        id: string;
                        bbox: {
                            left: number;
                            width: number;
                        };
                        type: import("jimu-core").LayoutItemType;
                        widgetId: string;
                        setting: {
                            heightMode: string;
                            aspectRatio: number;
                        };
                    };
                    3: {
                        id: string;
                        bbox: {
                            left: number;
                            width: number;
                        };
                        type: import("jimu-core").LayoutItemType;
                        widgetId: string;
                        setting: {
                            heightMode: string;
                            aspectRatio: number;
                        };
                    };
                };
                order: string[];
                type: string;
            };
            layout_1: {
                content: {
                    0: {
                        id: string;
                        bbox: {
                            height: string;
                        };
                        type: import("jimu-core").LayoutItemType;
                        widgetId: string;
                        setting: {
                            heightMode: string;
                        };
                    };
                    1: {
                        id: string;
                        bbox: {
                            height: string;
                        };
                        type: import("jimu-core").LayoutItemType;
                        widgetId: string;
                        setting?: undefined;
                    };
                    2?: undefined;
                };
                order: string[];
                type: string;
            };
            layout_2: {
                content: {
                    0: {
                        id: string;
                        bbox: {
                            height: string;
                        };
                        type: import("jimu-core").LayoutItemType;
                        widgetId: string;
                        setting: {
                            heightMode: string;
                        };
                    };
                    1: {
                        id: string;
                        bbox: {
                            height: string;
                        };
                        type: import("jimu-core").LayoutItemType;
                        widgetId: string;
                    };
                    2?: undefined;
                };
                order: string[];
                type: string;
            };
            layout_3: {
                content: {
                    0: {
                        id: string;
                        bbox: {
                            height: string;
                        };
                        type: import("jimu-core").LayoutItemType;
                        widgetId: string;
                        setting: {
                            heightMode: string;
                        };
                    };
                    1: {
                        id: string;
                        bbox: {
                            height: string;
                        };
                        type: import("jimu-core").LayoutItemType;
                        widgetId: string;
                    };
                    2?: undefined;
                };
                order: string[];
                type: string;
            };
            layout_4: {
                content: {
                    0: {
                        id: string;
                        bbox: {
                            height: string;
                        };
                        type: import("jimu-core").LayoutItemType;
                        widgetId: string;
                        setting: {
                            heightMode: string;
                        };
                    };
                    1: {
                        id: string;
                        bbox: {
                            height: string;
                        };
                        type: import("jimu-core").LayoutItemType;
                        widgetId: string;
                    };
                };
                order: string[];
                type: string;
            };
        };
    };
})[];
export declare function getScreenGroupTemplates(): {
    name: string;
    type: import("./type").TemplateType;
    screenGroupId: string;
    icon: any;
    gifIcon: string;
    config: any;
}[];
export declare function getScreenTemplates(): {
    type: import("./type").TemplateType;
    screenId: string;
    icon: any;
    config: any;
}[];
export declare function getBlankScreenTemplate(): {
    type: import("./type").TemplateType;
    screenId: string;
    hasPanel: boolean;
    icon: any;
    config: {
        layouts: {
            layout13: {
                type: string;
                order: string[];
                content: {
                    0: {
                        type: string;
                        bbox: {
                            left: number;
                            right: number;
                            top: number;
                            bottom: number;
                            width: string;
                            height: string;
                        };
                        isPending: boolean;
                        setting: {
                            vCenter: boolean;
                            hCenter: boolean;
                            autoProps: {
                                left: boolean;
                                right: boolean;
                                top: boolean;
                                bottom: boolean;
                                height: string;
                                width: string;
                            };
                        };
                    };
                };
            };
        };
        widgets: {};
        screens: {
            screen7: {
                id: string;
                main: {
                    layout: {
                        LARGE: string;
                    };
                    background: {
                        color: string;
                        fillType: string;
                        image: {
                            url: string;
                        };
                    };
                };
            };
        };
    };
};
export * from './type';
export declare function addLabelAndDescription(templates: any, ignoreDesc?: boolean): void;
export declare function replaceI18nPlaceholders(templates: any): void;
