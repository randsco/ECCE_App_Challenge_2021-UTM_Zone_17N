/// <reference types="react" />
/** @jsx jsx */
import { React, IntlShape } from 'jimu-core';
import { DropdownMenuProps } from './dropdown-menu';
export interface TagInputProps {
    /**
     * tag list data
     */
    data: Array<string>;
    /**
     * The input placeholder is Add ${name}.
     */
    name: string;
    intl: IntlShape;
    /**
     * The select list data
     */
    selectListData?: Array<string>;
    /**
     * If `false`, the select dropdown list will hide.
     */
    isShowSelectList?: boolean;
    /**
     * Callback fired when the tag value is changed.
     */
    onChange?: (data: Array<string>) => void;
    className?: string;
    /**
     * Applies to the internal DropdownMenu component.
     * @see {@link DropdownMenuProps} for details.
     */
    menuProps?: DropdownMenuProps;
}
interface State {
    selectData: Array<string>;
    textInputValue: string;
    isOpen: boolean;
}
export declare class _TagInput extends React.PureComponent<TagInputProps, State> {
    static defaultProps: Partial<TagInputProps>;
    constructor(props: any);
    initSelectData(data: Array<string>): string[];
    onTextInputChange: (e: any) => void;
    textInputOnConfirm: (e: any, isOnKeyUp?: boolean) => boolean;
    onTagChange: (data: any) => void;
    onSelect: (e: any, value: string) => void;
    updateTagList(value: string): void;
    clearTextInput(): void;
    toggleSelect(isOpen?: boolean): void;
    isEmptyString: (string: string) => boolean;
    nlsHtmString: (id: string) => string;
    nls: (id: string) => string;
    render(): JSX.Element;
}
export interface TagSelectDropdownMenuProps {
    /**
     * Select list Data
     */
    selectData: Array<string>;
    /**
     * Callback fired when select option.
     */
    onSelect: (e: any, el: any, index?: number) => void;
    /**
     *Option screening condition,the dropdown list shows only the matching options
     */
    filterText: string;
    /**
     * Applies to the internal DropdownMenu component.
     * @see {@link DropdownMenuProps} for details.
     */
    menuProps?: DropdownMenuProps;
    /**
     *Text displayed when the select list is empty
     */
    emptyMessage?: string;
}
export declare const TagSelectDropdownMenu: (TagInputDropdownMenuProps: TagSelectDropdownMenuProps) => JSX.Element;
export declare const TagInput: React.ComponentType<React.PropsWithChildren<import("react-intl").WithIntlProps<any>>>;
export {};
