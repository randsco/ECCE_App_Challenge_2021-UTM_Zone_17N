import { IMAppConfig, AppMode, Selection, BrowserSizeMode, AppInfo, PagePart, LayoutInfo, SectionNavInfo, AnimationPlayMode, DialogInfos } from 'jimu-core';
export declare function publishAppConfigChangeToApp(appConfig: IMAppConfig): void;
export declare function publishAppInfoChangeToApp(appInfo: AppInfo): void;
export declare function publishDialogInfosChangeToApp(dialogInfos: DialogInfos): void;
export declare function publishAppModeChangeToApp(appMode: AppMode): void;
export declare function publishPageChangeToApp(pageId: string): void;
export declare function publishDialogChangeToApp(dialogId: string): void;
export declare function publishChangeSelectionToApp(selection: Selection): void;
export declare function publishChangeWidgetStatePropToApp(alterState: {
    widgetId: string;
    propKey: string;
    value: any;
}): void;
export declare function publishChangeWidgetMutableStatePropToApp(alterState: {
    widgetId: string;
    propKey: string;
    value: any;
}): void;
export declare function publishKeyboardToApp(event: KeyboardEvent): void;
export declare function publishChangeBrowserSizeModeToApp(mode: BrowserSizeMode): void;
export declare function publishChangeSessionToApp(): void;
export declare function publichChangeZoomScaleToApp(zoomScale: number): void;
export declare function publichActivePagePartChangeToApp(pagePart: PagePart): void;
export declare function publishAnimationPreviewToApp(data: {
    layoutInfo?: LayoutInfo;
    pageId?: string;
    dialogId?: string;
    playMode?: AnimationPlayMode;
    id: symbol;
}): void;
export declare function publishSectionNavInfoToApp(sectionId: string, navInfo: SectionNavInfo): void;
export declare function publishScreenGroupNavInfoToApp(screenGroupId: string, activeIndex: number): void;
export declare function listenAppEvents(): void;
