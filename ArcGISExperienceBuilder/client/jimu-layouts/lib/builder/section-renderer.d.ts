/// <reference types="react" />
import { React } from 'jimu-core';
import { LayoutItemProps, SectionProps, StateToLayoutItemProps } from 'jimu-layouts/layout-runtime';
export declare class SectionRendererInBuilder extends React.PureComponent<LayoutItemProps & StateToLayoutItemProps & SectionProps> {
    render(): JSX.Element;
}
