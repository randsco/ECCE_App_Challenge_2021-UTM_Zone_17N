declare function createListener(listenForEvent?: string, element?: any): false | {
    subscribe: (name: any, callback: any) => {
        unsubscribe: () => void;
    };
    setMonitor: (monitor?: any) => void;
    startListening: () => void;
    stopListening: () => void;
    setKeyboardTriggerFunction: (keyboardTriggerFunction: any) => void;
};
export default createListener;
