/// <reference types="react" />
/** @jsx jsx */
import { React, ThemeVariables, SerializedStyles, IntlShape, ImmutableArray, IMWidgetJson, ReactRedux } from 'jimu-core';
interface State {
}
/**
 * Properties for the JimuMapViewSelector component.
 */
export interface JimuMapViewSelectorProps {
    /**
     * The array of Map widget IDs. It is returned from the onSelect function.
     */
    useMapWidgetIds?: ImmutableArray<string>;
    /**
     * The function will be called when a Map widget item listed in this component is selected.
     */
    onSelect?: (useMapWidgetIds: string[]) => void;
}
interface StateExtraProps {
    mapWidgetJsons: IMWidgetJson[];
}
interface ExtraProps {
    theme: ThemeVariables;
    intl: IntlShape;
}
declare class _JimuMapViewSelector extends React.PureComponent<JimuMapViewSelectorProps & StateExtraProps & ExtraProps, State> {
    noneMapWidget: IMWidgetJson;
    constructor(props: any);
    getStyle: (theme: ThemeVariables) => SerializedStyles;
    onSelect: (e: any) => void;
    getSelectedMapWidget: () => IMWidgetJson;
    render(): JSX.Element;
}
/**
 * A react component for selecting Map widgets. It is usually used on the setting page of a widget,
 * and works with JimuMapViewComponent, JimuLayerViewComponent and JimuLayerViewSelector.
 */
export declare const JimuMapViewSelector: ReactRedux.ConnectedComponent<React.FC<import("react-intl").WithIntlProps<import("emotion-theming/types/helper").AddOptionalTo<JimuMapViewSelectorProps & StateExtraProps & ExtraProps & React.RefAttributes<_JimuMapViewSelector>, "theme">>> & {
    WrappedComponent: React.ComponentType<import("emotion-theming/types/helper").AddOptionalTo<JimuMapViewSelectorProps & StateExtraProps & ExtraProps & React.RefAttributes<_JimuMapViewSelector>, "theme">>;
}, Pick<import("react-intl").WithIntlProps<import("emotion-theming/types/helper").AddOptionalTo<JimuMapViewSelectorProps & StateExtraProps & ExtraProps & React.RefAttributes<_JimuMapViewSelector>, "theme">>, "ref" | "theme" | "onSelect" | "key" | "useMapWidgetIds" | "forwardedRef"> & JimuMapViewSelectorProps>;
export {};
