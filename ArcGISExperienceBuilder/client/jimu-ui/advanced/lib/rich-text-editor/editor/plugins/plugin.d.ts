/// <reference types="react" />
import { React } from 'jimu-core';
import { Editor, RichSelection, Formats } from '../../type';
export interface RichPluginInjectedProps {
    editor: Editor;
    formats: Formats;
    selection: RichSelection;
}
export interface RichEditorPluginProps {
    editor: Editor;
    /**
     * Rrender function or node.
     */
    children?: React.ReactNode | ((props: RichPluginInjectedProps) => React.ReactNode);
}
/**
 * Listening for change events，return the preprocessed selection and formats
 * For formats, handle unexpected format value:
 *  - Unrecognized formats value (e.g. formats brought by paste)
 *  - Multiple values for the same format
 * For selection, only respond to the change event when the editor has focus
 * @param editor
 * @param useAllSection if `true`, use all contents as section when editor is not enabled.
 */
export declare const useEditorSelectionFormats: (editor: any, useAllSection?: boolean) => [Formats, RichSelection];
export declare const RichEditorPlugin: (props: RichEditorPluginProps) => JSX.Element;
