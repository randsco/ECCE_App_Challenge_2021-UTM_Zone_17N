export declare const VIRTUAL_REFERENCE_CLASS = "virtual-reference";
export declare class VirtualReference {
    top: number;
    left: number;
    bottom: number;
    right: number;
    width: number;
    height: number;
    declareClass: string;
    constructor(options: ClientRect);
    getBoundingClientRect(): {
        top: number;
        left: number;
        bottom: number;
        right: number;
        width: number;
        height: number;
    };
    get clientWidth(): number;
    get clientHeight(): number;
}
