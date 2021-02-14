/// <reference types="seamless-immutable" />
/// <reference types="react" />
import { React, RepeatedDataSource, UseDataSource, ImmutableArray, ImmutableObject, Immutable } from 'jimu-core';
import { RichDisplayerProps } from './rich-displayer';
import { LinkParam } from 'jimu-ui/advanced/setting-components';
export interface RichTextDisplayerProps extends RichDisplayerProps {
    /**
     * The data source inherited from the parent widget to parse expressions in rich text
     */
    repeatedDataSource?: RepeatedDataSource;
    /**
     * The data source of the widget where the component is located to parse expressions in rich text
     */
    useDataSources?: ImmutableArray<UseDataSource>;
    /**
     * The id of the widget where the component is located
     */
    widgetId?: string;
    /**
     * Rich text to display in this component
     */
    value: string;
}
export declare const useHandleCurrentDlg: () => () => void;
export declare const useClickLink: (onClick: (evt: any) => void) => [HTMLLinkElement, string | LinkParam, (evt?: React.MouseEvent<HTMLElement>) => void];
export declare const useParsedExpressions: (html: string) => Immutable.ImmutableObject<import("jimu-core").ExpressionMap>;
export declare const useResolvedHtml: (propHtml: string, values: Immutable.ImmutableObject<{
    [id: string]: string;
}>) => string;
export declare const RichTextDisplayer: React.ForwardRefExoticComponent<RichTextDisplayerProps & React.RefAttributes<HTMLDivElement>>;
