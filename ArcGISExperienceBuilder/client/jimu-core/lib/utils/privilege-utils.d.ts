export interface ExbAccess {
    valid: boolean;
    capabilities: Capabilities;
    invalidInfo: InvalidInfo;
    invalidMessage: string;
}
export interface ExbLicense {
    valid: boolean;
    viewOnly: boolean;
    messageCode?: string;
}
export interface ResourcePermission {
    valid: boolean;
    isExperience: boolean;
    isValidItem: boolean;
    hasPermissionToAccess: boolean;
}
export interface Capabilities {
    canViewExperience: boolean;
    canCreateExperience: boolean;
    canUpdateExperience: boolean;
    canDeleteExperience: boolean;
    canShareExperience: boolean;
}
export declare enum CheckTarget {
    AppList = "AppList",
    Builder = "Builder",
    Experience = "Experience"
}
export declare enum InvalidInfo {
    InvalidUserLevel = "InvalidUserLevel",
    InvalidPrivilege = "InvalidPrivilege",
    InvalidLicense = "InvalidLicense",
    InvalidAppBlockedByOrg = "InvalidAppBlockedByOrg",
    InvalidResourceExperience = "InvalidResourceExperience",
    InvalidResourceItem = "InvalidResourceItem",
    InvalidResourcePermission = "InvalidResourcePermission",
    NullInfo = ""
}
export declare function checkAccess(checkTarget: CheckTarget): Promise<boolean>;
export declare function getAccessCapabilities(checkTarget: CheckTarget): Promise<Capabilities>;
export declare function checkExbAccess(checkTarget: CheckTarget): Promise<ExbAccess>;
