/// <reference types="react" />
import { LayoutContextToolProps, AppMode, LayoutItemJson } from 'jimu-core';
export declare function getAppMode(): AppMode;
export declare function isLockLayout(): boolean;
export declare function isDesignMode(): boolean;
export declare function isNormalWidget(layoutItem: LayoutItemJson): boolean;
export declare const deleteMenuItem: {
    icon: any;
    title: (props: {
        formatMessage: (id: string) => string;
    }) => string;
    visible: (props: LayoutContextToolProps) => boolean;
    onClick: (props: LayoutContextToolProps) => void;
};
export declare const pendingMenuItem: {
    icon: any;
    title: (props: {
        formatMessage: (id: string) => string;
    }) => string;
    visible: () => boolean;
    onClick: (props: LayoutContextToolProps) => void;
};
export declare const settingMenuItem: {
    icon: any;
    title: (props: {
        formatMessage: (id: string) => string;
    }) => string;
    onClick: (props: LayoutContextToolProps) => void;
};
export declare const draggingMenuItem: {
    icon: any;
    title: (props: {
        formatMessage: (id: string) => string;
    }) => string;
    visible: () => boolean;
};
export declare const duplicateMenuItem: {
    icon: any;
    title: (props: {
        formatMessage: (id: string) => string;
    }) => string;
    visible: (props: LayoutContextToolProps) => boolean;
    onClick: (props: LayoutContextToolProps) => void;
};
export declare const floatingMenuItem: {
    icon: any;
    title: (props: {
        formatMessage: (id: string) => string;
    }) => string;
    visible: (props: LayoutContextToolProps) => boolean;
    settingPanel: import("react").ComponentType<any>;
    onClick: () => void;
};
export declare const sinkingMenuItem: {
    icon: any;
    title: (props: {
        formatMessage: (id: string) => string;
    }) => string;
    visible: (props: LayoutContextToolProps) => any;
    onClick: (props: LayoutContextToolProps) => void;
};
