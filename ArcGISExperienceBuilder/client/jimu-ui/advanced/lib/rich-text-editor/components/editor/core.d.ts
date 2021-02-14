/// <reference types="react" />
import { React } from 'jimu-core';
import { EdiotrValue, Editor, DeltaValue, Sources, UnprivilegedEditor, RichSelection } from '../../type';
export declare type CheckEditorOption = (options?: EditorOptions) => boolean;
/**
 * Changes to these properties cause the editor instance to be recreated
 * [Quill options documentation](https://quilljs.com/docs/configuration/).
 *
 * Note: We will use object.is to compare these values. When any value changes, the editor instance is recreated
 * So, unless you want the editor instance to be recreated, keep the same reference for these props
 *
 * Note2: If you want to control whether the editor is recreated or not by yourself, you can use the function `checkeditoroption`
 */
export interface EditorOptions {
    /**
     * Default: document.body
     * DOM Element or a CSS selector for a DOM Element, within which the editor’s ui elements (i.e. tooltips, etc.) should be confined. Currently, it only considers left and right boundaries.
     */
    bounds?: HTMLElement | string;
    /**
     * Default: All formats
     * Whitelist of formats to allow in the editor. See [Formats](https://quilljs.com/docs/formats/) for a complete list.
     */
    formats?: string[];
    /**
     * Collection of modules to include and respective options. See [Modules](https://quilljs.com/docs/modules/) for more information.
     */
    modules?: {
        [x: string]: any;
    };
    /**
     * Default: null
     * If you want to use theme of quill, please import the corresponding CSS manually: node_modules/quill/dist/quill.snow(or bubble).css
     * [Quill theme documentation](https://quilljs.com/docs/themes/).
     */
    editorTheme?: 'snow' | 'bubble';
    /**
     * Default: null
     * DOM Element or a CSS selector for a DOM Element, specifying which container has the scrollbars (i.e. overflow-y: auto),
     * if is has been changed from the default ql-editor with custom CSS. Necessary to fix scroll jumping bugs when Quill is set to
     * auto grow its height, and another ancestor container is responsible from the scrolling.
     */
    scrollingContainer?: HTMLElement | string;
    /**
     * If true, a pre tag is used for the editor area instead of the default div tag. This prevents editor from collapsing continuous whitespaces on paste.
     */
    preserveWhitespace?: boolean;
    /**
     * Placeholder text to show when editor is empty.
     */
    placeholder?: string;
    /**
     * Whether to instantiate the editor to read-only mode.
     */
    readOnly?: boolean;
}
/**
 * The changes of these properties will not recreate editor instance, will call editor's API to modify it
 */
export interface EditorPorps {
    /**
     * Set ability for user to edit, via input devices like the mouse or keyboard.
     * Does not affect capabilities of API calls, when the source is "api" or “silent”.
     *
     * Note: When readOnly is true, this property is not valid
     */
    enabled?: boolean;
    tabIndex?: number;
}
interface _RichEditorCoreProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /**
     * [Delta](https://quilljs.com/docs/delta/) or string
     */
    value?: EdiotrValue;
    defaultValue?: any;
    children?: never;
    /**
     * When the text in the editor changes
     */
    onChange?: (value: EdiotrValue, delta: DeltaValue, source: Sources, editor: UnprivilegedEditor) => any;
    /**
     * When the text selection in the editor changes
     */
    onSelectionChange?: (nextSelection: RichSelection, source: Sources, editor: UnprivilegedEditor) => any;
    /**
     * When the editor first focused
     */
    onEditorFocus?: (nextSelection: RichSelection, source: Sources, editor: UnprivilegedEditor) => any;
    /**
     * When the selection in the editor is removed
     * Note: Clicking on other elements that don't accept input now won't trigger this method, if you want this, please use onBlur instead
     */
    onEditorBlur?: (nextSelection: RichSelection, source: Sources, editor: UnprivilegedEditor) => any;
    /**
     * This is a function to determine whether an editor instance is recreated.
     * If defined, RichEditorCore will call this function with the editor options you passed in as parameters.
     * If true is returned, the instance will be recreated, otherwise not.
     *
     * Default: null
     *
     * Note: If not defined, use the default check by RichEditorCore
     * @param options: EditorOptions
     */
    checkEditorOption?: CheckEditorOption;
    /**
     * A ref that points to the used editor instance.
     */
    editorRef?: React.MutableRefObject<Editor> | ((Editor: any) => void);
    autoFocus?: boolean;
}
export declare type RichEditorCoreProps = _RichEditorCoreProps & EditorOptions & EditorPorps;
/**
 * Changing these parameters will change the `version`,
 * Changing the `version` will recreate the editor instance
 * [Quill options documentation](https://quilljs.com/docs/configuration/).
 * @param options
 */
export declare const useVersion: ({ readOnly, modules, formats, bounds, editorTheme, scrollingContainer, preserveWhitespace, checkEditorOption }: EditorOptions & {
    checkEditorOption: CheckEditorOption;
}, initVersion?: number) => number;
export declare const RichEditorCore: React.ComponentType<_RichEditorCoreProps & EditorOptions & EditorPorps & React.RefAttributes<HTMLElement>>;
export {};
