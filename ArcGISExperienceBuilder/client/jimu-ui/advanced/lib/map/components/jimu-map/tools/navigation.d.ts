/// <reference types="react" />
import { BaseTool, BaseToolProps, IconType } from '../layout/base/base-tool';
export default class Navigation extends BaseTool<BaseToolProps, unknown> {
    toolName: string;
    constructor(props: any);
    getTitle(): string;
    getIcon(): IconType;
    getExpandPanel(): JSX.Element;
}
