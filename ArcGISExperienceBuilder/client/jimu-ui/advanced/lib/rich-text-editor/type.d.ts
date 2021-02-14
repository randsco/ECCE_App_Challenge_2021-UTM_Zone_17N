import { TextFontStyle } from 'jimu-ui';
import { ImmutableObject } from 'seamless-immutable';
import { Blot } from 'parchment/dist/src/blot/abstract/blot';
import { LinkParam } from 'jimu-ui/advanced/setting-components';
export declare type IMLinkParamMap = ImmutableObject<{
    [id: string]: LinkParam;
}>;
export declare enum FormatType {
    INLINE = 0,
    BLOCK = 1,
    EMBED = 2
}
export declare type Formats = {
    [x: string]: any;
};
export declare type IMFormats = ImmutableObject<Formats>;
export declare type Operation = {
    insert?: string | Record<string, unknown>;
    delete?: number;
    retain?: number;
    attributes?: Formats;
};
/**
 * [Delta](https://quilljs.com/docs/delta/)
 */
export interface DeltaValue {
    ops: Operation[];
    length?: () => any;
    diff?: (delta: DeltaValue) => DeltaValue;
    partition?: (func: (op: Operation) => boolean) => [Operation[], Operation[]];
    filter?: (func: (op: Operation) => boolean) => Operation[];
    forEach?: (func: (op: Operation) => void) => void;
    map?: (func: (op: Operation) => any) => Operation[];
}
/**
 * Types of values supported by the rich text editor
 */
export declare type EdiotrValue = DeltaValue | string;
export interface RichSelection {
    index: number;
    length: number;
}
export interface ClipboardStatic {
    convert(html?: string): DeltaValue;
    addMatcher(selectorOrNodeType: string | number, callback: (node: any, delta: DeltaValue) => DeltaValue): void;
    dangerouslyPasteHTML(html: string, source?: Sources): void;
    dangerouslyPasteHTML(index: number, html: string, source?: Sources): void;
    matchers?: [string | number, (node: any, delta: DeltaValue) => DeltaValue][];
}
export interface Key {
    key: string | number;
    shortKey?: boolean;
}
export interface KeyboardStatic {
    addBinding(key: Key, callback: (range: RichSelection, context: any) => void): void;
    addBinding(key: Key, context: any, callback: (range: RichSelection, context: any) => void): void;
    bindings: {
        [x: string]: any;
    };
}
/**
 * [Quill editor API](https://quilljs.com/docs/api/#editor)
 */
export declare type UnprivilegedEditor = {
    focus: () => void;
    blur: () => void;
    getLength: () => number;
    getText: (index?: number, length?: number) => string;
    getContents: (index?: number, length?: number) => DeltaValue;
    getSelection: (focus?: boolean) => RichSelection | null;
    getBounds: (index: number, length?: number) => ClientRect;
    getFormat: (range?: RichSelection) => Formats;
    getIndex: (blot: any) => number;
    getLeaf: (index: number) => [any, number];
    getHTML: () => string;
};
export declare type TextChangeHandler = (delta: DeltaValue, oldContents: DeltaValue, source: Sources) => any;
export declare type SelectionChangeHandler = (range: RichSelection, oldRange: RichSelection, source: Sources) => any;
export declare type EditorChangeHandler = ((name: 'text-change', delta: DeltaValue, oldContents: DeltaValue, source: Sources) => any) | ((name: 'selection-change', range: RichSelection, oldRange: RichSelection, source: Sources) => any);
export declare type EventType = 'text-change' | 'selection-change' | 'editor-change' | 'scroll-optimize';
export declare type Hanldes = TextChangeHandler | SelectionChangeHandler | EditorChangeHandler;
export interface EventEmitter {
    on: (eventName: EventType, handler?: Hanldes) => EventEmitter;
    off: (eventName: EventType, handler?: Hanldes) => EventEmitter;
    once: (eventName: EventType, handler?: Hanldes) => EventEmitter;
}
export interface EditorProperties {
    options?: {
        [x: string]: any;
    };
    editor?: any;
}
export interface InsertText {
    insertText(index: number, text: string, source?: Sources): DeltaValue;
    insertText(index: number, text: string, format: string, value: any, source?: Sources): DeltaValue;
    insertText(index: number, text: string, formats: {
        [x: string]: any;
    }, source?: Sources): DeltaValue;
}
/**
 * [Quill editor API](https://quilljs.com/docs/api/#editor)
 */
export declare type Editor = {
    root: HTMLDivElement;
    scroll: Blot;
    clipboard: ClipboardStatic;
    keyboard: KeyboardStatic;
    hasFocus: () => boolean;
    disable: () => void;
    enable: (enabled?: boolean) => void;
    setContents: (delta: DeltaValue, source?: Sources) => DeltaValue;
    updateContents: (delta: DeltaValue, source?: Sources) => DeltaValue;
    setSelection: (range: RichSelection | number, source?: Sources) => void;
    getLeaf: (index: number) => any;
    deleteText: (index: number, length: number, source?: Sources) => DeltaValue;
    insertEmbed: (index: number, type: string, value: any, source?: Sources) => DeltaValue;
    format: (name: string, value: any, source?: Sources) => DeltaValue;
    formatLine: (index: number, length: number, format: string, value: any, source?: Sources) => DeltaValue;
    formatText: (index: number, length: number, format: string, value: any, source?: Sources) => DeltaValue;
    removeFormat: (index: number, length: number, source?: Sources) => DeltaValue;
    getLine: (index: number) => any;
    getLines(index?: number, length?: number): any[];
} & UnprivilegedEditor & EventEmitter & EditorProperties & InsertText;
export declare type Sources = 'api' | 'user' | 'silent';
export declare enum RichTextFormatKeys {
    Bold = "bold",
    Italic = "italic",
    Underline = "underline",
    Strike = "strike",
    Color = "color",
    Background = "background",
    Font = "font",
    Size = "size",
    Letterspace = "letterspace",
    Linespace = "linespace",
    Textshadow = "textshadow",
    Align = "align",
    Blockquote = "blockquote",
    Code = "code",
    Direction = "direction",
    Header = "header",
    Indent = "indent",
    Link = "link",
    List = "list",
    Script = "script",
    Expression = "expression",
    Clear = "clear"
}
export declare enum ListValue {
    BULLET = "bullet",
    ORDERED = "ordered"
}
export declare enum HeaderValue {
    Normal = 0,
    H1 = 1,
    H2 = 2,
    H3 = 3,
    H4 = 4,
    H5 = 5,
    H6 = 6
}
export declare enum IndentValue {
    ZERO = 0,
    ONE = 1,
    TWO = 2,
    THREE = 3,
    FOUR = 4,
    FIVE = 5,
    SIX = 6,
    SEVEN = 7,
    EIGHT = 8
}
export declare enum DirectionValue {
    RTL = "rtl"
}
export interface SeniorTextStyle {
    [RichTextFormatKeys.Textshadow]?: string;
    [RichTextFormatKeys.Blockquote]?: boolean;
    [RichTextFormatKeys.Code]?: boolean;
    [RichTextFormatKeys.Direction]?: DirectionValue;
    [RichTextFormatKeys.Header]?: HeaderValue;
    [RichTextFormatKeys.Indent]?: IndentValue;
    [RichTextFormatKeys.Link]?: LinkParam;
    [RichTextFormatKeys.List]?: ListValue;
    [RichTextFormatKeys.Script]?: boolean;
    [RichTextFormatKeys.Expression]?: string;
}
export declare type RichTextStyle = TextFontStyle & SeniorTextStyle;
export declare type IMRichTextStyle = ImmutableObject<RichTextStyle>;
