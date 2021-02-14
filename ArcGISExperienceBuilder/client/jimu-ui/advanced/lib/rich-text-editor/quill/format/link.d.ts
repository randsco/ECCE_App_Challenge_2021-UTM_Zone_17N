declare const Inline: any;
import { LinkParam } from 'jimu-ui/advanced/setting-components';
import { LinkTarget } from 'jimu-ui';
export interface LinkFormatValue {
    uniqueid: string;
    dsid: string;
    href: string;
    target: LinkTarget;
    link?: LinkParam;
}
export declare class Link extends Inline {
    static SANITIZED_URL: any;
    statics: any;
    domNode: HTMLLinkElement;
    static blotName: string;
    static tagName: string;
    static PROTOCOL_WHITELIST: Array<string>;
    static create(value: LinkFormatValue | string): any;
    static formats(domNode: any): {
        uniqueid: any;
        dsid: any;
        href: any;
        target: any;
        link: any;
    };
    static sanitize(url: any): any;
    format(name: any, value: LinkFormatValue | string): any;
}
export {};
