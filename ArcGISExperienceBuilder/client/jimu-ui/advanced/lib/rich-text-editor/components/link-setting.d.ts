/// <reference types="react" />
import { ImmutableArray, UseDataSource } from 'jimu-core';
import { RichTextFormatKeys, FormatType } from '../type';
import { IMLinkParam } from 'jimu-ui/advanced/setting-components';
import { LinkFormatValue } from '../quill/format';
export declare type LinkSettingProps = {
    open?: boolean;
    value?: IMLinkParam;
    className?: string;
    style?: any;
    widgetId: string;
    useDataSources?: ImmutableArray<UseDataSource>;
    onChange?: (key: RichTextFormatKeys, value: LinkFormatValue, type: FormatType) => void;
    disabled: boolean;
    active: boolean;
};
export declare const LinkSetting: (props: LinkSettingProps) => JSX.Element;
