/// <reference types="react" />
import { React, ReactRedux } from 'jimu-core';
import { IMHistoryState } from '../lib/app-state-history-extension';
interface ExtraProps {
    currentPageId: string;
    stateHistory?: IMHistoryState;
}
declare class BuilderKeyboardComponentInner extends React.PureComponent<ExtraProps, unknown> {
    isSupportKeyboard: () => boolean;
    switchAppMode: () => void;
    undo: () => void;
    redo: () => void;
    onKeyboardTrigger: (event: KeyboardEvent) => void;
    isMac: () => boolean;
    render(): JSX.Element;
}
declare const _default: ReactRedux.ConnectedComponent<typeof BuilderKeyboardComponentInner, Pick<React.ClassAttributes<BuilderKeyboardComponentInner> & ExtraProps, "ref" | "key">>;
export default _default;
