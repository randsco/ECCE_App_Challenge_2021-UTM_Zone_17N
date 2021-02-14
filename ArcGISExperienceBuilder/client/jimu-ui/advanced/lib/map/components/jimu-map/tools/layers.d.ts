/// <reference types="react" />
import { BaseTool, BaseToolProps, IconType } from '../layout/base/base-tool';
interface States {
    activeTabIndex: number;
}
export default class Layers extends BaseTool<BaseToolProps, States> {
    toolName: string;
    constructor(props: any);
    getTitle(): string;
    getIcon(): IconType;
    getExpandPanel(): JSX.Element;
    handleTabIndexChange: (activeTabIndex: number) => void;
}
export {};
