/// <reference types="react" />
import { BaseTool, BaseToolProps, IconType } from '../layout/base/base-tool';
export default class ScaleBar extends BaseTool<BaseToolProps, unknown> {
    toolName: string;
    constructor(props: any);
    getTitle(): string;
    getIcon(): IconType;
    getExpandPanel(): JSX.Element;
}
