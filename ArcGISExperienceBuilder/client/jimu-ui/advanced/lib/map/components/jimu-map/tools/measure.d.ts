/// <reference types="react" />
import { BaseTool, BaseToolProps, IconType } from '../layout/base/base-tool';
declare type MeasureType = (__esri.DistanceMeasurement2D | __esri.AreaMeasurement2D | __esri.DirectLineMeasurement3D | __esri.AreaMeasurement3D);
interface States {
    activeTabIndex: number;
    measureInstances: MeasureType[];
}
export default class Measure extends BaseTool<BaseToolProps, States> {
    toolName: string;
    measureModules2D: {
        name: string;
        title: string;
        path: string;
        src: any;
    }[];
    measureModules3D: {
        name: string;
        title: string;
        path: string;
        src: any;
    }[];
    constructor(props: any);
    getTitle(): string;
    getIcon(): IconType;
    destroy(): void;
    handleMeasurceInstanceCreated: (measurceInstance: MeasureType, activeTabIndex: number) => void;
    onTabClick: (index: number) => void;
    onClosePanel: () => void;
    onShowPanel: () => void;
    getExpandPanel(): JSX.Element;
}
export {};
