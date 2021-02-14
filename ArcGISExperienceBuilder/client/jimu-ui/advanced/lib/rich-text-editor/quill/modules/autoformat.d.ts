declare const Module: any;
export declare class Autoformat extends Module {
    transforms: any;
    quill: any;
    currentHelper: any;
    static DEFAULTS: any;
    constructor(quill: any, options: any);
    registerPasteListener(): void;
    registerTypeListener(): void;
    hasTransFormText: (transform: any, text: any) => boolean;
    forwardKeyboard(range: any, context: any): void;
    forwardKeyboardUp(range: any, context: any): void;
    forwardKeyboardDown(range: any, context: any): void;
    openHelper(transform: any, index: any): void;
    closeHelper(transform: any): void;
}
export declare const AutoformatHelperAttribute: any;
export {};
