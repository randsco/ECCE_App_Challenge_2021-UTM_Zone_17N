/// <reference types="react" />
import { React, LayoutType } from 'jimu-core';
import { LayoutProps } from './types';
export declare function registerLayoutBuilder(type: LayoutType, component: React.ComponentClass<LayoutProps>): void;
export declare function registerLayoutViewer(type: LayoutType, component: React.ComponentClass<LayoutProps>): void;
export declare function findLayoutBuilder(type: LayoutType): React.ComponentClass<LayoutProps>;
export declare function findLayoutViewer(type: LayoutType): React.ComponentClass<LayoutProps>;
