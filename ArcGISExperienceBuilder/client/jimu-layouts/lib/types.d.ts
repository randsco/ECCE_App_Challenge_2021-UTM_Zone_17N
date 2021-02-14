/// <reference types="react" />
import { React, IMLayoutItemJson, IMSizeModeLayoutJson, LayoutItemConstructorProps, IMLayoutJson, ImmutableArray, LayoutInfo, IMViewJson, IMWidgetJson, LayoutItemType, LayoutContextToolProps, IMSectionNavInfo, AnimationSetting, AnimationPlayMode } from 'jimu-core';
export interface Position {
    x?: number;
    y?: number;
    w: number;
    h: number;
}
export declare const enum OrderAdjustType {
    BringForward = 0,
    SendBackward = 1,
    BringToFront = 2,
    SendToBack = 3
}
export interface LayoutProps {
    layouts: IMSizeModeLayoutJson;
    className?: string;
    style?: any;
    isInSection?: boolean;
    isInWidget?: boolean;
    isRepeat?: boolean;
    isPageItem?: boolean;
    visible?: boolean;
    itemDraggable?: boolean;
    itemResizable?: boolean;
    itemSelectable?: boolean;
    droppable?: boolean;
    showDefaultTools?: boolean;
    isItemAccepted?: (item: LayoutItemConstructorProps, isReplacePlaceholder: boolean) => boolean;
    onItemClick?: (e: any, widgetId: string) => void;
    ignoreMinHeight?: boolean;
}
export interface LayoutItemProps {
    layoutId: string;
    layoutItemId: string;
    draggable?: boolean;
    resizable?: boolean;
    selectable?: boolean;
    forbidContextMenu?: boolean;
    forbidToolbar?: boolean;
    showDefaultTools?: boolean;
    isInSection?: boolean;
    className?: string;
    onClick?: (e: any, layoutInfo: LayoutInfo) => void;
    onDoubleClick?: (e: any, layoutInfo: LayoutInfo) => void;
    forceAspectRatio?: boolean;
    aspectRatio?: number;
    resizeObserver?: ResizeObserver;
    children?: any;
}
export interface StateToLayoutProps {
    layout: IMLayoutJson;
}
export interface StateToLayoutItemProps {
    layoutItem: IMLayoutItemJson;
    selected?: boolean;
    autoScroll?: boolean;
    animationPreview?: boolean;
    playMode?: AnimationPlayMode;
    previewId?: symbol;
    watchViewportVisibility?: boolean;
}
export interface WidgetProps {
    widgetId: string;
    isClassLoaded: boolean;
    isInlineEditing: boolean;
    isFunctionalWidget: boolean;
    hasEmbeddedLayout: boolean;
    widgetState?: any;
    supportInlineEditing: boolean;
    supportRepeat: boolean;
    canCrossLayoutBoundary: boolean;
    rotate?: number;
    widgetStyle: any;
    hasExtension?: boolean;
    widgetJson?: IMWidgetJson;
}
export interface SectionProps {
    sectionId: string;
    views: ImmutableArray<string>;
    activeView?: IMViewJson;
    rotate?: number;
    sectionStyle: any;
    navInfo: IMSectionNavInfo;
    transition?: {
        type: string;
        direction?: string;
    };
    autoPlay?: boolean;
    interval?: number;
    loop?: boolean;
}
export declare const COLS_IN_ONE_ROW = 12;
export declare const CONTEXT_MENU_ITEM_SIZE = 28;
export declare const CONTEXT_MENU_ICON_SIZE = 16;
export declare const MIN_LAYOUT_ITEM_SIZE = 16;
export declare const CLICK_TOLRERANCE = 5;
export declare const DEFAULT_AUTOPLAY_INTERVAL = 3;
export interface LayoutNode {
    layoutId: string;
    parentLayoutId?: string;
    parentType?: LayoutItemType;
    itemIdInParent?: string;
    containerWidgetId?: string;
    containerViewId?: string;
    containerSectionId?: string;
    embedLayouts?: string[];
}
export interface ContentNode {
    id: string;
    type: LayoutItemType;
    containerLayoutId: string;
    itemIdInParent: string;
    embedLayouts?: string[];
}
/**
 * A structure easy to search layout item and its content
 */
export interface LayoutMap {
    layouts: {
        [key: string]: LayoutNode;
    };
    widgets: {
        [key: string]: ContentNode;
    };
    sections: {
        [key: string]: ContentNode;
    };
}
export declare enum LayoutZIndex {
    Auto = "auto",
    Normal = 0,
    BoundaryDropArea = 10,
    DragMoveTip = 20,
    HandlerTools = 30,
    DraggingItem = 40
}
export interface CommonLayoutSetting {
    className?: string;
    style?: any;
    order?: number;
    lockChildren?: boolean;
    lockDescendants?: boolean;
}
export interface CommonLayoutItemSetting {
    lockParent?: boolean;
    style?: any;
    effect?: {
        [key: string]: AnimationSetting;
    };
    oneByOneEffect?: {
        [key: string]: AnimationSetting;
    };
    effectPlayMode?: AnimationPlayMode;
}
export interface FixedLayoutSetting extends CommonLayoutSetting {
    gridSize?: number;
}
export interface FlowLayoutSetting extends CommonLayoutSetting {
    gutter?: number;
}
export interface ColumnLayoutSetting extends CommonLayoutSetting {
    min: number;
    space: number;
    padding?: {
        number: number[];
        unit: string;
    };
}
export interface FlowLayoutItemSetting extends CommonLayoutItemSetting {
    heightMode?: 'auto' | 'fit' | 'fixed';
    isFloating?: boolean;
    floatingArea?: number;
    width?: number;
    offsetX?: number;
    offsetY?: number;
}
export declare enum LayoutItemSizeModes {
    Auto = "AUTO",
    Stretch = "STRETCH",
    Custom = "CUSTOM"
}
export interface FixedLayoutItemSetting extends CommonLayoutItemSetting {
    autoProps: {
        left?: boolean;
        right?: boolean;
        top?: boolean;
        bottom?: boolean;
        width?: LayoutItemSizeModes;
        height?: LayoutItemSizeModes;
    };
    hCenter?: boolean;
    vCenter?: boolean;
    heightMode?: 'fixed' | 'ratio';
    aspectRatio?: number | number;
    lockLayout?: boolean;
}
export interface ToolItemConfig {
    icon?: React.ComponentClass<React.SVGAttributes<SVGElement>> | ((props: LayoutContextToolProps) => React.ComponentClass<React.SVGAttributes<SVGElement>>);
    autoFlipIcon?: boolean;
    title?: string | ((props: LayoutContextToolProps & {
        formatMessage: (id: string) => string;
    }) => string);
    size?: number;
    label?: string | ((props: LayoutContextToolProps & {
        formatMessage: (id: string) => string;
    }) => string);
    disabled?: boolean | ((props: LayoutContextToolProps) => boolean);
    checked?: boolean | ((props: LayoutContextToolProps) => boolean);
    visible?: boolean | ((props: LayoutContextToolProps) => boolean);
    rotate?: number;
    className?: string;
    onClick?: (props: LayoutContextToolProps, evt?: React.MouseEvent<any>) => void;
    settingPanel?: React.ComponentClass;
    widgetId?: string;
    seperator?: boolean;
}
export declare type ToolbarConfig = (ToolItemConfig | ToolItemConfig[])[];
