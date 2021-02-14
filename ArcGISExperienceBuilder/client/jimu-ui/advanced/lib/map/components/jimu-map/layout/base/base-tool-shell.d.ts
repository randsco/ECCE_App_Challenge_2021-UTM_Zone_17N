/// <reference types="react" />
/** @jsx jsx */
import { IntlShape } from 'jimu-core';
import { UIComponent, UIComponentProps } from './ui-component';
import { ToolConfig } from '../../config';
import { LayoutJson } from '../config';
interface ToolShellProps extends UIComponentProps {
    layoutConfig: LayoutJson;
    toolConfig: ToolConfig;
    toolName: string;
    isMobile?: boolean;
    isHidden?: boolean;
    intl?: IntlShape;
    isLastElement?: boolean;
    className?: string;
    activeToolName: string;
    onActiveToolNameChange: (activeToolName: string) => void;
}
export default class BaseToolShell extends UIComponent<ToolShellProps, unknown> {
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export {};
