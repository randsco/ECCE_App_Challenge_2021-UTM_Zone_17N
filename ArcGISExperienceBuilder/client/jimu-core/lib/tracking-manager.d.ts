import { TrackInstance, TrackEvent, TrackError, IMAnalytics, IMGoogleAnalytics } from './types/tracking-manager';
export declare class TrackingManager {
    enable: boolean;
    gtag: any;
    googleAnalytics: IMGoogleAnalytics;
    track: TrackInstance;
    static instance: TrackingManager;
    static getInstance(): TrackingManager;
    constructor();
    private onStoreChange;
    initialize: (analytics: IMAnalytics) => Promise<any>;
    private initializeGtag;
    private createTracker;
    private compareGoogleAnalytics;
    private disableGaTrackForGtag;
    private addGaTrackIdToGtag;
    private updateGgTrackerDimensions;
    private updateGgTrackerMetrics;
    private updateGgTrackerAnonymizeip;
    private getGgTracker;
    private mutablePortalUser;
    private isTrackAvailable;
    logPageView(page: string): void;
    logEvent(event: TrackEvent): void;
    logError(error: TrackError): void;
}
