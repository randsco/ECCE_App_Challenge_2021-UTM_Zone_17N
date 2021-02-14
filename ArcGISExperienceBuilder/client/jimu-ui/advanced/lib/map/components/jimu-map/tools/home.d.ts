/// <reference types="react" />
import { BaseTool, BaseToolProps, IconType } from '../layout/base/base-tool';
import { InitialMapState } from '../config';
export default class Home extends BaseTool<BaseToolProps, unknown> {
    toolName: string;
    constructor(props: any);
    getTitle(): string;
    getIcon(): IconType;
    getHomeContent: (initialMapState: InitialMapState) => JSX.Element;
    getExpandPanel(): JSX.Element;
}
