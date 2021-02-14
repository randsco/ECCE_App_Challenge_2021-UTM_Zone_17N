export declare const appConfig: {
    pages: {
        default: {
            label: string;
            layout: {
                LARGE: string;
            };
            header: boolean;
            isDefault: boolean;
            backgroundColor: string;
        };
        template: {
            label: string;
            layout: {
                LARGE: string;
            };
            header: boolean;
        };
    };
    widgets: {
        header: {
            uri: string;
        };
        'choose-template': {
            uri: string;
        };
        'setting-navigator': {
            uri: string;
            config: {
                sectionId: string;
            };
        };
        toc: {
            uri: string;
        };
        'app-loader': {
            uri: string;
        };
        'builder-entry': {
            uri: string;
        };
        'data-source-setting': {
            uri: string;
        };
        'element-selector': {
            uri: string;
        };
        'theme-setting': {
            uri: string;
        };
        'dynamic-setting': {
            uri: string;
        };
        'left-sidebar': {
            uri: string;
            config: {
                direction: string;
                collapseSide: string;
                resizable: boolean;
                overlay: boolean;
                size: string;
                toggleBtn: {
                    icon: string;
                    visible: boolean;
                    offsetX: number;
                    offsetY: number;
                    position: string;
                    iconSize: number;
                    width: number;
                    height: number;
                    color: {
                        normal: {
                            icon: {
                                useTheme: boolean;
                                color: string;
                            };
                            bg: {
                                useTheme: boolean;
                                color: string;
                            };
                        };
                        hover: {
                            icon: {
                                useTheme: boolean;
                                color: string;
                            };
                        };
                    };
                    expandStyle: {
                        style: {
                            borderRadius: string;
                        };
                    };
                    collapseStyle: {
                        style: {
                            borderRadius: string;
                        };
                    };
                };
                divider: {
                    visible: boolean;
                    lineStyle: {
                        type: string;
                        color: string;
                        width: {
                            distance: number;
                            unit: string;
                        };
                    };
                };
            };
            layouts: {
                FIRST: {
                    LARGE: string;
                };
                SECOND: {
                    LARGE: string;
                };
            };
        };
        'right-sidebar': {
            uri: string;
            config: {
                direction: string;
                collapseSide: string;
                resizable: boolean;
                overlay: boolean;
                size: string;
                toggleBtn: {
                    icon: string;
                    visible: boolean;
                    offsetX: number;
                    offsetY: number;
                    position: string;
                    iconSize: number;
                    width: number;
                    height: number;
                    color: {
                        normal: {
                            icon: {
                                useTheme: boolean;
                                color: string;
                            };
                            bg: {
                                useTheme: boolean;
                                color: string;
                            };
                        };
                        hover: {
                            icon: {
                                useTheme: boolean;
                                color: string;
                            };
                        };
                    };
                    expandStyle: {
                        style: {
                            borderRadius: string;
                        };
                    };
                    collapseStyle: {
                        style: {
                            borderRadius: string;
                        };
                    };
                };
                divider: {
                    visible: boolean;
                    lineStyle: {
                        type: string;
                        color: string;
                        width: {
                            distance: number;
                            unit: string;
                        };
                    };
                };
            };
            layouts: {
                FIRST: {
                    LARGE: string;
                };
                SECOND: {
                    LARGE: string;
                };
            };
        };
    };
    sections: {
        'opts-section': {
            views: string[];
        };
    };
    views: {
        'toc-view': {
            layout: {
                LARGE: string;
            };
            backgroundColor: string;
        };
        'data-source-view': {
            layout: {
                LARGE: string;
            };
            backgroundColor: string;
        };
        'element-selector-view': {
            layout: {
                LARGE: string;
            };
            backgroundColor: string;
        };
        'theme-view': {
            layout: {
                LARGE: string;
            };
            backgroundColor: string;
        };
    };
    header: {
        layout: {
            LARGE: string;
        };
        height: {
            LARGE: number;
        };
    };
    layouts: {
        'config-page-layout-large': {
            order: string[];
            type: string;
            setting: {
                space: number;
            };
            content: {
                0: {
                    bbox: {
                        left: number;
                        top: number;
                        bottom: number;
                        width: number;
                    };
                    type: string;
                    widgetId: string;
                };
                1: {
                    type: string;
                    widgetId: string;
                    bbox: {
                        left: number;
                        right: number;
                        top: number;
                        bottom: number;
                    };
                };
            };
        };
        'choose-template-layout-large': {
            order: string[];
            type: string;
            content: {
                0: {
                    bbox: {
                        left: number;
                        right: number;
                        top: number;
                        bottom: number;
                    };
                    type: string;
                    widgetId: string;
                };
            };
        };
        'toc-view-layout': {
            order: string[];
            type: string;
            content: {
                0: {
                    bbox: {
                        left: number;
                        right: number;
                        top: number;
                        bottom: number;
                    };
                    setting: {
                        active: boolean;
                    };
                    type: string;
                    widgetId: string;
                };
            };
        };
        'data-source-view-layout': {
            order: string[];
            type: string;
            content: {
                0: {
                    bbox: {
                        left: number;
                        right: number;
                        top: number;
                        bottom: number;
                    };
                    setting: {
                        active: boolean;
                    };
                    type: string;
                    widgetId: string;
                };
            };
        };
        'element-selector-view-layout': {
            order: string[];
            type: string;
            content: {
                0: {
                    bbox: {
                        left: number;
                        right: number;
                        top: number;
                        bottom: number;
                    };
                    setting: {
                        active: boolean;
                    };
                    type: string;
                    widgetId: string;
                };
            };
        };
        'theme-view-layout': {
            order: string[];
            type: string;
            content: {
                0: {
                    bbox: {
                        left: number;
                        right: number;
                        top: number;
                        bottom: number;
                    };
                    setting: {
                        active: boolean;
                    };
                    type: string;
                    widgetId: string;
                };
            };
        };
        'header-layout': {
            order: string[];
            type: string;
            content: {
                0: {
                    bbox: {
                        left: number;
                        right: number;
                        height: number;
                    };
                    type: string;
                    widgetId: string;
                };
            };
        };
        'left-sidebar-left-layout': {
            order: string[];
            type: string;
            content: {
                0: {
                    bbox: {
                        left: number;
                        right: number;
                        top: number;
                        bottom: number;
                    };
                    type: string;
                    sectionId: string;
                };
            };
        };
        'left-sidebar-right-layout': {
            order: string[];
            type: string;
            content: {
                0: {
                    bbox: {
                        left: number;
                        right: number;
                        top: number;
                        bottom: number;
                    };
                    type: string;
                    widgetId: string;
                };
            };
        };
        'right-sidebar-left-layout': {
            order: string[];
            type: string;
            content: {
                0: {
                    bbox: {
                        left: number;
                        right: number;
                        top: number;
                        bottom: number;
                    };
                    type: string;
                    widgetId: string;
                };
            };
            setting: {
                style: {
                    background: {
                        color: string;
                    };
                };
            };
        };
        'right-sidebar-right-layout': {
            order: string[];
            type: string;
            content: {
                0: {
                    bbox: {
                        left: number;
                        right: number;
                        top: number;
                        bottom: number;
                    };
                    type: string;
                    widgetId: string;
                };
            };
        };
    };
    theme: string;
    attributes: {};
    analytics: {
        enable: boolean;
        google: {
            trackId: string;
            dimensions: {
                user: number;
                orgId: number;
                lastLogin: number;
                userSince: number;
                internalUser: number;
                accountType: number;
            };
        };
    };
    mainSizeMode: string;
};
