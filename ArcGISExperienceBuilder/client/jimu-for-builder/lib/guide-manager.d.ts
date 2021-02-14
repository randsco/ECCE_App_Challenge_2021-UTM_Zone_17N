/// <reference types="react" />
import { React } from 'jimu-core';
declare type GuideComponent = React.ComponentType<any>;
export default class GuideManager {
    private guideModules;
    private static instance;
    static getInstance(): GuideManager;
    registerGuideModule(entryName: string, guideModule: GuideComponent): void;
    getGuideModule(entryName: string): Promise<GuideComponent>;
}
export {};
