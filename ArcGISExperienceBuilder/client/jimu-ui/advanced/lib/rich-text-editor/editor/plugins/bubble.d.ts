/// <reference types="react" />
/** @jsx jsx */
import { React } from 'jimu-core';
import { Sources } from '../../type';
import { PopperProps } from 'jimu-ui';
import { RichPluginInjectedProps } from './plugin';
interface _BubblePluginPorps extends PopperProps {
    source?: Sources;
}
export declare type BubblePluginPorps = _BubblePluginPorps & RichPluginInjectedProps;
export declare const _Bubble: (props: BubblePluginPorps) => JSX.Element;
export declare const Bubble: React.ComponentType<any>;
export {};
