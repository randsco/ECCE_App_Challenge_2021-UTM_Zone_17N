import { TemplateType } from '../type';
export declare const blank: {
    type: TemplateType;
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
