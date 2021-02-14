/// <reference types="react" />
import { BaseTool, BaseToolProps, IconType } from '../layout/base/base-tool';
export default class Attribution extends BaseTool<BaseToolProps, unknown> {
    toolName: string;
    constructor(props: any);
    static getIsNeedSetting(): boolean;
    getTitle(): string;
    getIcon(): IconType;
    getExpandPanel(): JSX.Element;
}
