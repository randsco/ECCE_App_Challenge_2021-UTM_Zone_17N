import { _MobilePanel, ExpandStage } from './index';
declare global {
    interface Window {
        _mobilePanelManager: any;
    }
}
export declare class MobilePanelGroup {
    groupId: string;
    mobilePanels: {
        [id: string]: _MobilePanel;
    };
    private currentExpandStage;
    private currentId;
    setGroupId(groupId: string): void;
    getGroupId(): string;
    setCurrentId(currentId: string): void;
    getCurrentId(): string;
    setCurrentExpandStage(currentExpandStage: ExpandStage): void;
    getCurrentExpandStage(): ExpandStage;
    addMobilePanel(mobilePanel: _MobilePanel): void;
    removeMobilePanel(mobilePanel: _MobilePanel): void;
    getMobilePanelById(id: string): _MobilePanel;
    closePanel(): void;
}
export default class MobilePanelManager {
    static instance: MobilePanelManager;
    static getInstance(): MobilePanelManager;
    private mobilePanelGroups;
    getCurrentIdInGroup(groupId: string): string;
    getCurrentExpandStageInGroup(groupId: string): ExpandStage;
    setCurrentExpandStageInGroup(groupId: string, expandStage: ExpandStage): void;
    setCurrentIdInGroup(currentId: string, groupId: string): void;
    getMobilePanelGroupByGroupId(groupId: string): MobilePanelGroup;
    addMobilePanelGroup(mobilePanelGroup: MobilePanelGroup): void;
    removeMobilePanelGroup(mobilePanelGroup: MobilePanelGroup): void;
    addMobilePanel(mobilePanel: _MobilePanel): void;
    removeMobilePanel(mobilePanel: _MobilePanel): void;
    checkDomIsContained(dom: HTMLElement): boolean;
}
