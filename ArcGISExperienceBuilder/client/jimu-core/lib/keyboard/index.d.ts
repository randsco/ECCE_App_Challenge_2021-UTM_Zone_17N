import * as React from 'react';
declare type Props = {
    eventName: 'keydown' | 'keyup';
    bindings: {
        [eventName: string]: any;
    };
    monitor?: any;
    element?: HTMLElement;
    onKeyboardTrigger?: any;
};
declare class Keyboard extends React.PureComponent<Props> {
    subs: any[];
    keyboardListener: any;
    static defaultProps: {
        eventName: string;
        bindings: {};
        monitor: any;
    };
    constructor(props: Props);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): any;
}
export default Keyboard;
