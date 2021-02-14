/**
 * By default, all state should be stored in the app store.
 * However, the app store is designed to save plain, immutable object,
 * but there are some data which is complex and hard to make it immutable, such as featureSet, some 3rd lib object.
 * For these object, we can put them here.
 *
 * To make the mutable data change still trigger re-render, we save a state version in the app store.
 */
export default class MutableStoreManager {
    static instance: MutableStoreManager;
    private state;
    static getInstance(): MutableStoreManager;
    /**
     * @param widgetId
     * @param propKey support this format: a.b.c
     * @param value
     */
    updateStateValue(widgetId: string, propKey: string, value: any): void;
    getStateValue(keyPath: string[]): any;
    getState(): any;
}
