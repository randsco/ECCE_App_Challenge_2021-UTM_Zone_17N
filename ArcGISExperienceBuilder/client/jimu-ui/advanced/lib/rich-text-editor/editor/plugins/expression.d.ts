/// <reference types="react" />
/** @jsx jsx */
import { React, Expression as ExpressionValue, ImmutableArray, ImmutableObject, UseDataSource } from 'jimu-core';
import { Sources } from '../../type';
import { PanelHeaderProps, PopperProps } from 'jimu-ui';
import { RichPluginInjectedProps } from './plugin';
export interface Expressions {
    [x: string]: ExpressionValue;
}
export declare type IMExpressions = ImmutableObject<Expressions>;
interface _ExpressionPluginPorps extends PopperProps {
    widgetId: string;
    useDataSources?: ImmutableArray<UseDataSource>;
    header?: PanelHeaderProps;
    source?: Sources;
}
export declare type ExpressionPluginPorps = _ExpressionPluginPorps & RichPluginInjectedProps;
export declare const _Expression: (props: ExpressionPluginPorps) => JSX.Element;
export declare const Expression: React.ComponentType<any>;
export {};
