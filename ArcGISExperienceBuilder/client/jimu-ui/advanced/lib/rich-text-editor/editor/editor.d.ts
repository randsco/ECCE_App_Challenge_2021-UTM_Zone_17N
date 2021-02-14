/// <reference types="react" />
import { React } from 'jimu-core';
import { RichEditorCoreProps } from '../components/editor/core';
import { RichPluginInjectedProps } from './plugins/plugin';
import { Editor } from '../type';
export declare type RenderPlugin = ((props: RichPluginInjectedProps) => React.ReactNode);
export declare type PluginPorps = {
    plugin?: RenderPlugin;
};
export declare type RichTextEditorProps = RichEditorCoreProps & PluginPorps & {
    nowrap?: boolean;
};
export declare const useMixinModules: (props: RichTextEditorProps, editor: Editor) => {
    [x: string]: any;
} & {
    keyboard: any;
};
export declare const _RichTextEditor: (props: RichTextEditorProps) => JSX.Element;
/**
 *  A react component for rich text editing. RichTextEditor relies on the 3rd party library [Quill](https://github.com/quilljs/quill)
 */
export declare const RichTextEditor: React.ComponentType<RichTextEditorProps>;
