/// <reference types="react" />
import { BaseTool, BaseToolProps, IconType } from '../layout/base/base-tool';
export default class Fullscreen extends BaseTool<BaseToolProps, unknown> {
    toolName: string;
    constructor(props: any);
    getTitle(): string;
    getIcon(): IconType;
    fullScreenMap: () => void;
    getExpandPanel(): JSX.Element;
    getContent: (fullScreenMap: any) => JSX.Element;
    render(): JSX.Element;
}
