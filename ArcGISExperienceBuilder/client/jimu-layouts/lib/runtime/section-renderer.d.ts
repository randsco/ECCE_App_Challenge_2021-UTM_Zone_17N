/// <reference types="react" />
import { React } from 'jimu-core';
import { LayoutItemProps, SectionProps, StateToLayoutItemProps } from '../types';
export declare class SectionRenderer extends React.PureComponent<LayoutItemProps & StateToLayoutItemProps & SectionProps> {
    render(): JSX.Element;
}
