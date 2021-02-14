import { UserSession, ICredential, IUser } from '@esri/arcgis-rest-auth';
import { HostAuthListenMessage } from './post-message';
interface IDeferred<T> {
    promise: Promise<T>;
    resolve: (v: T) => void;
    reject: (v: any) => void;
}
interface PortalInfo {
    portalUrl: string;
    clientId?: string;
    isWebTier?: boolean;
    isMainPortal?: boolean;
}
/**
 * @ignore
 */
export declare enum SessionChangedReasonType {
    ArcGISJSSync = "ARCGIS_JS",
    OtherWindowSync = "OTHER_WINDOW",
    AddOrUpdate = "ADD_OR_UPDATE",
    Remove = "REMOVE"
}
/**
 * To manage sessions
 */
export declare class SessionManager {
    static instance: SessionManager;
    /**
     * The key is combined with urlKey and customBaseUrl for normal portal,
     * but if the customBaseUrl is a map url(start with maps|mapsqa|mapsdevext),
     * the customBaseUrl's prefix will be replaced by www|qaext|devext.
     *
     * urlKey is the first word of a url, such as 'www',
     * and customBaseUrl is a url part before 'sharing/rest' and after urlkey
     *
     * example1:
     * url: https://beijing.mapsqa.arcgis.com
     * urlKey: beijing
     * customBaseUrl: mapsqa.arcgis.com
     * key: qaext.arcgis.com
     *
     * example2:
     * url: http://private.test.com
     * urlKey: private
     * customBaseUrl: test.com
     * key: private.test.com
     *  */
    private _sessions;
    private _mainPortalInfo;
    private _trustedServers;
    private _waitingForHostAuth;
    private _arcgisJSIM;
    private _isSigning;
    private _signInQueue;
    private _onSessionChangedCallbacks;
    /**
     * Get main session
     * The main session is your portal session
     */
    getMainSession(): UserSession;
    /**
     * Get all sessions
     */
    getSessions(): Array<UserSession>;
    /**
     * Clear all sessions
     */
    clearSessions(): void;
    /**
     * @ignore
     * @param sessions
     */
    syncSessionsFromOtherWindow(sessions: Array<UserSession>): void;
    private _onSessionChanged;
    /**
     * Get singleton instance
     */
    static getInstance(): SessionManager;
    /**
     * @ignore
     */
    constructor();
    /**
     * because there is no clientId in esri auth info in the localStorage, so pass in here
     * @param portalInfo
     */
    tryToSignIn(portalInfo?: PortalInfo): void;
    /**
     * init session from localStorage or esri_aopc cookie.
     */
    private _tryToSignIn;
    private _checkMainSession;
    private _processInvalidSignInSession;
    /**
     *
     * Redirect to login page
     */
    gotoLoginInPage: () => void;
    /**
     * @param session
     */
    getUserInfo(): Promise<IUser>;
    private afterGetUserInfo;
    /**
     * After get portal self, the portalUrl may change, such as:
     * from `www.arcgis.com` to `esridevbeijing.maps.arcgis.com`
     * @param portalUrl
     */
    setSessionPortalUrl(session: UserSession, portalUrl: string): boolean;
    /**
     * because when init from auth info, the client id may be null, so set here
     * @param clientId
     */
    setClientId(clientId: string): void;
    /**
     * because when init from auth info, the portal may be null, so set here
     * @param portalUrl
     */
    setMainPortalUrl(portalUrl: string): void;
    /**
     * because when init from auth info, the portalInfo may be null, so set here
     * @param portalInfo
     */
    setMainPortal(portalInfo: PortalInfo): void;
    /**
     * Get your portal info
     */
    getMainPortal(): PortalInfo;
    getTrustedServers(): string[];
    isTrustedServer(serverUrl: any): boolean;
    /**
     * Remove the session from manager
     * @param session
     */
    removeSession(session: UserSession): boolean;
    private _syncToOtherWindowSessionManager;
    private _removeSessionByKey;
    /**
     * Add a new session, if the session's key has exist, replace it.
     * @param session
     */
    addOrReplaceSession(session: UserSession): boolean;
    private _addOrReplaceSession;
    private _setSession;
    /**
     * Get session by url
     * @param url
     */
    getSessionByUrl(url: string): UserSession;
    getSessionKeyFromUrl(url: string): string;
    /**
     * The key is used as session key.
     *
     * resource urls' session can't be used by sign in session,
     * but sign in session can be used by resource urls
     * @param url
     */
    private _getSessionKeyFromUrl;
    private _getPortalUrlInfo;
    private _getSessionFromAuthInfo;
    _readLocalStorage(key: string): any;
    private _getSessionFromLocalStorage;
    private getPortalFromAuthInfo;
    private _checkAuthInfo;
    private _checkSession;
    /**
     * Read cookie by cookie's name
     * @param cookieName
     */
    readCookie(cookieName: string): string[];
    writeAuthInfo(session: UserSession): void;
    private _getAuthInfoFromSession;
    private removeAuthInfo;
    /**
     * @ignore
     * @param credential
     */
    addFromArcGisJSCredential(credential: ICredential): boolean;
    private _getHostname;
    /**
     * Return the session key for AGOL.
     * If the url is not a public AGOL url or a org url, return undefined.
     * @param url
     */
    private _getStandardAGOLSessionKey;
    /**
     * This method is valid for AGOL only
     * @param sessionKey
     * @param orgUrlKey
     */
    private getOrgUrl;
    _getHostedService(url: string): Promise<string>;
    private _getHostedServiceArcgisKey;
    getLoginDomain(url: string, orgKey: string): Promise<string>;
    /**
     * Lanuch sign in
     * @param fromUrl The page you start sign in
     * @param popup If 'true', the window will popup, or, it will redirect to sign in page
     * @param desUrl The url you want to login
     */
    signIn(fromUrl?: string, popup?: boolean, desUrl?: string): Promise<UserSession>;
    /**
     * You can regist some callbacks for session changing
     * @param listener
     */
    addSessionChangeListener(listener: (session: Array<UserSession>, reasonType: SessionChangedReasonType) => void): void;
    private _executSignIn;
    /**
     * Use it where a request will occur error
     */
    handleAuthError: (error: any, popup?: boolean) => Promise<UserSession>;
    /**
     * Sign out from main portal
     */
    signOut(): void;
    switchAccount(): void;
    /**
     * @ignore
     * @param message
     */
    syncHostAuth(message: HostAuthListenMessage): void;
    /**
     * @ignore
     */
    defer<T>(): IDeferred<T>;
    private _generateToken;
    private _getPortalSelfInfo;
    getSessionFromWebTierPortal(portalUrl: string, getTokenParam?: string, portalSelfParam?: any): any;
    getSessionFromTrustedServer(serverUrl: any): Promise<any>;
}
export default SessionManager;
