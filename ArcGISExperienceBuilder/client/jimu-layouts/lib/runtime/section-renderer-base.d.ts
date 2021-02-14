/// <reference types="react" />
/** @jsx jsx */
import { React } from 'jimu-core';
import { LayoutItemProps, SectionProps, LayoutProps, StateToLayoutItemProps } from '../types';
interface OwnProps {
    layoutEntryComponent: React.ComponentClass<LayoutProps>;
    viewVisibilityContext: React.ComponentClass;
}
declare type Props = LayoutItemProps & StateToLayoutItemProps & SectionProps & OwnProps;
export declare function SectionRendererBase(props: Props): JSX.Element;
export {};
