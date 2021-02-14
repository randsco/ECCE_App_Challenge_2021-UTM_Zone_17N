import { AppConfig } from 'jimu-core';
export declare const enum TemplateType {
    Widget = "WIDGET",
    Section = "SECTION",
    Header = "HEADER",
    Footer = "FOOTER",
    Page = "PAGE",
    Dialog = "DIALOG",
    ScreenGroup = "SCREEN_GROUP",
    Screen = "SCREEN",
    App = "APP"
}
export interface Template {
    name: string;
    type: TemplateType;
    config?: Partial<AppConfig>;
    icon: string;
    label?: string;
    description?: string;
    widgetId?: string;
    sectionId?: string;
    pageId?: string;
    screenGroupId?: string;
}
