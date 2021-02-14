export interface DefaultMapInfo {
    defaultMapId: string;
    defaultExtent: any;
}
export declare function checkDefaultBaseMapIsExist(): boolean;
export declare function getDefaultWebMap(_portalUrl: string): Promise<DefaultMapInfo>;
