/// <reference types="react" />
/** @jsx jsx */
import { React } from 'jimu-core';
import { LayoutItemProps } from '../types';
interface ChildEmement {
    children?: Element | React.ReactNode;
}
export interface OwnProps {
    isParentPlaying?: boolean;
    isParentRevert?: boolean;
    isParentEnableScroll?: boolean;
    parentAnimationStyle?: any;
    parentPlayId?: symbol;
}
export default function LayoutItem(props: LayoutItemProps & OwnProps & ChildEmement): JSX.Element;
export {};
