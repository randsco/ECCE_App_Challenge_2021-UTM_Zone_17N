import { IMAppConfig } from 'jimu-core';
import { Template } from '../templates/type';
interface ContentIdMapping {
    [key: string]: string;
}
/**
 *
 * @param templateJson
 * @param widgetId widget name is used to get translation. This is for the case that widget has internal templates such as list, card, etc.
 *    for other templates, pass null
 * @param defaultMessages
 */
export declare function processForTemplate(templateJson: Template, widgetId: string, defaultMessages: any): Template;
export declare function updateWidgetByTemplate(appConfig: IMAppConfig, templateJson: Template, widgetId: string, templateWidgetId: string, contentMapping: ContentIdMapping, settingDefaultMessages: any): Promise<IMAppConfig>;
export declare function createWidgetFromTemplate(appConfig: IMAppConfig, templateJson: Template, widgetId: string, contentMapping: ContentIdMapping, isBlock?: boolean): Promise<{
    appConfig: IMAppConfig;
    newWidgetId: string;
}>;
export declare function createSectionFromTemplate(appConfig: IMAppConfig, templateJson: Template, sectionId: string, contentMapping: ContentIdMapping): Promise<{
    appConfig: IMAppConfig;
    newSectionId: string;
}>;
export declare function createLayoutFromTemplate(appConfig: IMAppConfig, templateJson: Template, layoutId: string, contentMapping: ContentIdMapping): Promise<{
    appConfig: IMAppConfig;
    newLayoutId: string;
}>;
export declare function createViewFromTemplate(appConfig: IMAppConfig, templateJson: Template, viewId: string, contentMapping: ContentIdMapping): Promise<{
    appConfig: IMAppConfig;
    newViewId: string;
}>;
export declare function createPageFromTemplate(appConfig: IMAppConfig, templateJson: Template, contentMapping: ContentIdMapping): Promise<{
    appConfig: IMAppConfig;
    newPageId: string;
}>;
export declare function createScreenGroupFromTemplate(appConfig: IMAppConfig, templateJson: Template, screenGroupId: string, contentMapping: ContentIdMapping): Promise<{
    appConfig: IMAppConfig;
    newScreenGroupId: string;
}>;
export declare function createScreenFromTemplate(appConfig: IMAppConfig, templateJson: Template, screenId: string, contentMapping: ContentIdMapping): Promise<{
    appConfig: IMAppConfig;
    newScreenId: string;
}>;
export declare function createDialogFromTemplate(appConfig: IMAppConfig, templateJson: Template, contentMapping: ContentIdMapping): Promise<{
    appConfig: IMAppConfig;
    newDialogId: string;
}>;
export declare function applyPageTemplateToHeader(appConfig: IMAppConfig, templatePageJson: Template): Promise<{
    appConfig: IMAppConfig;
}>;
export declare function applyPageTemplateToFooter(appConfig: IMAppConfig, templatePageJson: Template): Promise<{
    appConfig: IMAppConfig;
}>;
export declare function applyPageTemplateToBody(appConfig: IMAppConfig, pageId: string, templatePageJson: Template): Promise<{
    appConfig: IMAppConfig;
}>;
export declare function applyPageTemplateToDialog(appConfig: IMAppConfig, dialogId: string, templatePageJson: Template): Promise<{
    appConfig: IMAppConfig;
}>;
export {};
