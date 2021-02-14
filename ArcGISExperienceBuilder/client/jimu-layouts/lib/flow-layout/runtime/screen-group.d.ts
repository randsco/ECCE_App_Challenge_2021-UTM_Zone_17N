/// <reference types="react" />
/** @jsx jsx */
import { IMLayoutItemJson } from 'jimu-core';
import { LayoutItemProps } from '../../types';
interface OwnProps {
    itemIndex: number;
    layoutItem: IMLayoutItemJson;
}
export declare function ScreenGroup(props: LayoutItemProps & OwnProps): JSX.Element;
export {};
