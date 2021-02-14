/// <reference types="react" />
/// <reference types="seamless-immutable" />
import { React, ReactRedux, ImmutableArray, IMJimuMapViewInfo, ImmutableObject } from 'jimu-core';
import { JimuMapView } from '../views/jimu-map-view';
import { MapViewManager } from '../mapview-manager';
import { JimuMapViewGroup } from '../views/jimu-map-view-group';
/** @ignore */
interface ViewRenderFunction {
    (views: {
        [viewId: string]: JimuMapView;
    }): React.ReactNode;
}
/** @ignore */
interface ExtraProps {
    viewInfos: ImmutableObject<{
        [jimuMapViewId: string]: IMJimuMapViewInfo;
    }>;
}
/**
 * The JimuMapViewComponent properties
 */
export interface JimuMapViewComponentProps {
    /**
     * The array of the map widget id selected from the JimuMapViewSelector component.
     */
    useMapWidgetIds: ImmutableArray<string>;
    /** @ignore */
    children?: ViewRenderFunction | React.ReactNode;
    onViewGroupCreate?: (viewGroup: JimuMapViewGroup) => void;
    /**
     * The function will be called when the JimuMapView instance is created.
     */
    onViewsCreate?: (views: {
        [viewId: string]: JimuMapView;
    }) => void;
    /**
     * The function will be called when the current active view of the map widget is changed.
     * For example, when we click on the switch-map tool for multi-source map or change datasources for the map widget.
     */
    onActiveViewChange?: (activeView: JimuMapView, previousActiveViewId: string) => void;
}
/** @ignore */
interface State {
    activeViewId: string;
    isActiveViewCreated: boolean;
    areAllViewsCreated: boolean;
}
declare class _JimuMapViewComponent extends React.PureComponent<JimuMapViewComponentProps & ExtraProps, State> {
    viewManager: MapViewManager;
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(prevProps: JimuMapViewComponentProps & ExtraProps, prevState: State): void;
    onViewInfosChange: (infos: import("seamless-immutable").ImmutableObject<{
        [jimuMapViewId: string]: import("seamless-immutable").ImmutableObject<import("jimu-core").JimuMapViewInfo>;
    }>, useMapWidgetIds: ImmutableArray<string>) => void;
    onViewsCreate: (views: {
        [viewId: string]: JimuMapView;
    }) => void;
    onViewGroupCreate: () => void;
    getActiveViewId: () => string;
    getWhetherAllViewsCreated: (viewIds: string[], infos: import("seamless-immutable").ImmutableObject<{
        [jimuMapViewId: string]: import("seamless-immutable").ImmutableObject<import("jimu-core").JimuMapViewInfo>;
    }>) => boolean;
    getWhetherViewCreated: (viewId: any, infos: import("seamless-immutable").ImmutableObject<{
        [jimuMapViewId: string]: import("seamless-immutable").ImmutableObject<import("jimu-core").JimuMapViewInfo>;
    }>) => boolean;
    getViewIdsFromUseMapWidgetIds: (useMapWidgetIds: ImmutableArray<string>, infos: import("seamless-immutable").ImmutableObject<{
        [jimuMapViewId: string]: import("seamless-immutable").ImmutableObject<import("jimu-core").JimuMapViewInfo>;
    }>) => string[];
    getViewIdsFromMapWidgetId: (mapWidgetId: string, infos: import("seamless-immutable").ImmutableObject<{
        [jimuMapViewId: string]: import("seamless-immutable").ImmutableObject<import("jimu-core").JimuMapViewInfo>;
    }>) => string[];
    getViews: (viewIds: string[]) => {
        [viewId: string]: JimuMapView;
    };
    render(): {};
}
/**
 * A react component that makes it easy to use JimuMapView from the map widget.
 * In most cases, you can pass on `useMapWidgetIds`, and use `onViewsCreate`, `onActiveViewChange` to get callback from the JimuMapViewComponent.
 */
export declare const JimuMapViewComponent: ReactRedux.ConnectedComponent<typeof _JimuMapViewComponent, Pick<React.ClassAttributes<_JimuMapViewComponent> & JimuMapViewComponentProps & ExtraProps, "ref" | "children" | "key" | "onActiveViewChange" | "onViewGroupCreate" | "useMapWidgetIds" | "onViewsCreate"> & JimuMapViewComponentProps>;
export {};
