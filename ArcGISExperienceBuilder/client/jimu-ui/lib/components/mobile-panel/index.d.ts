/// <reference types="react" />
import { React } from 'jimu-core';
import MobilePanelManager from './mobile-panel-manager';
import { VirtualReference } from '../popper';
import ResizeObserver from 'resize-observer-polyfill';
interface Props {
    title?: string;
    open?: boolean;
    children?: React.ReactNode;
    className?: string;
    toggle: (evt?: any) => void;
    mapWidgetId?: string;
}
export declare enum ExpandStage {
    INITSCREEN = "initscreen",
    HALFSCREEN = "halfscreen",
    FULLSCREEN = "fullscreen"
}
interface States {
    parentReferenceHeight: number;
    currentExpandStage: ExpandStage;
    mobilePanelHeight: number;
    generation: number;
}
export declare class _MobilePanel extends React.PureComponent<Props, States> {
    id: string;
    groupId: string;
    currentBottomPanelHeight: number;
    resizeTimeout: any;
    startDrag: boolean;
    moveY: number;
    startY: number;
    sliding: boolean;
    _isMounted: boolean;
    _retryMapWidgetIdTimes: number;
    parentReference: VirtualReference | HTMLElement;
    resizeObserver: ResizeObserver;
    constructor(props: any);
    updateProperties: () => {
        mobilePanelHeight: any;
        generation: any;
        parentReferenceHeight: any;
    };
    getExpectedHeightForStage: (currentStage: ExpandStage) => number;
    componentDidMount(): void;
    resize: () => void;
    actualResize: () => void;
    componentDidUpdate(prevProps: Props, prevState: States): void;
    sendToggle: () => void;
    componentWillUnmount(): void;
    start: (event: any, type: any) => void;
    preventTouceMove: (event: any) => void;
    move: (event: any, type: any) => void;
    end: (event: any, type: any) => void;
    handleClickCloseBtn: (evt: any) => void;
    onMobilePanelContainerResize: (width: any, height: any) => void;
    disablePageScroll: () => void;
    enablePageScroll: () => void;
    getReferenceWidth: () => number;
    changeMobilePanelHeightInMap: (targetExpandStage: ExpandStage) => void;
    render(): JSX.Element;
}
export declare const MobilePanel: React.ComponentType<Props>;
export { MobilePanelManager };
