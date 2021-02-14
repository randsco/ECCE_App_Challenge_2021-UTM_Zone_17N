import * as React from 'react';
export default class AppKeyboardComponentInner extends React.PureComponent<unknown, unknown> {
    onKeyboardTrigger: (event: KeyboardEvent) => void;
    isMac: () => boolean;
    render(): JSX.Element;
}
