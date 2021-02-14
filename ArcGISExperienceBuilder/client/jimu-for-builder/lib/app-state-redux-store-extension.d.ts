import { extensionSpec, IMAppConfig } from 'jimu-core';
import { IMState } from 'jimu-core';
declare module 'jimu-core/lib/types/state' {
    interface State {
        appStateInBuilder?: IMState;
    }
}
declare module 'jimu-core' {
    interface State {
        appStateInBuilder?: IMState;
    }
}
export declare enum ExtActionKeys {
    InAppAppStateChanged = "IN_APP_APP_STATE_CHANGED",
    InBuilderAppConfigChanged = "IN_BUILDER_APP_CONFIG_CHANGED"
}
export interface InAppAppStateChangeAction {
    type: ExtActionKeys.InAppAppStateChanged;
    appState: IMState;
}
export interface InBuilderAppConfigChangeAction {
    type: ExtActionKeys.InBuilderAppConfigChanged;
    appConfig: IMAppConfig;
}
declare const actions: {
    inAppAppStateChanged: (appState: IMState) => InAppAppStateChangeAction;
    inBuilderAppConfigChanged: (appConfig: IMAppConfig) => InBuilderAppConfigChangeAction;
};
declare type ActionTypes = InAppAppStateChangeAction | InBuilderAppConfigChangeAction;
export { ActionTypes as AppStateActionTypes, actions as appStateActions };
export default class BuilderAppStateReduxStoreExtension implements extensionSpec.ReduxStoreExtension {
    id: string;
    getActions(): any[];
    getInitLocalState(): any;
    getReducer(): (appState: IMState, action: ActionTypes, builderState: IMState) => IMState;
    getStoreKey(): string;
}
