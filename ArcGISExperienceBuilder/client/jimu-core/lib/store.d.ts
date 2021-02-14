import { Store, Unsubscribe } from 'redux';
import { IMState } from './types/state';
export declare function createAppStore(initState?: any): Store<IMState>;
export declare function getAppStore(): Store<IMState>;
export declare function observeStore<T>(onChange: (preState: T, state: T) => void, keys?: string[]): Unsubscribe;
