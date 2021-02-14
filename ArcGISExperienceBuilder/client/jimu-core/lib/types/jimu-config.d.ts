/**
 * The config for jimu lib.
 */
export default interface JimuConfig {
    /**
     * The whole exb system is mounted to, such as: /abc/xyz/. End with slash
     */
    mountPath: string;
    /**
     * The app name in exb system, including: builder, experience, template. when deployed out of exb, appNamePath is empty
     */
    appFolderName: string;
    /**
     * rootPath = mountPath + appNamePath, end with slash
     */
    rootPath: string;
    /**
     * baseUrl is used to load modules dynamically, import-maps are relative this URL.
     *
     * baseUrl = buildNumber ? mountPath + buildNumber + '/' : mountPath; End with slash
     *
     */
    baseUrl: string;
    /**
     * If true, means all packages(widgets, jimu-core, ...) are in app folder.
     * If false, means packages and app are in the same root folder.
     *
     * When download, we will change this value to "true" to put all packages in the same folder
     * */
    packagesInAppFolder: boolean;
    /**
     * True means use this URL: :appId/page/:pageId
     * False means use this URL: ?id=:appId&page=:pageId
     */
    useStructuralUrl: boolean;
    /** Whether the app is builder */
    isBuilder: boolean;
    /** Whether the app is site */
    isSite: boolean;
    /** Whether the app is in builder or not */
    isInBuilder: boolean;
    arcgisJsApiUrl?: string;
    /** Build number is used to ban cache */
    buildNumber: string;
    exbVersion: string;
    hostEnv: 'dev' | 'qa' | 'prod';
    isDevEdition: boolean;
    /**
     * Experience is designed to be able to be deployed in/out portal/AGOL.
     * Whether it's in portal impact how to get the portalUrl.
     *
     * If it's in portal:
     * 	get portalUrl from window.location, we don't consider the portalUrl in app config
     * If it's not in portal/AGOL:
     * 	* If user has signed in, use user signed in portal
     * 	* if not signed in, use portalUrl in app config.
    */
    isInPortal: boolean;
}
