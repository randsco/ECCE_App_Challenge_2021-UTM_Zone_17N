import { ImmutableObject } from 'seamless-immutable';
export interface TrackEvent {
    category: string;
    action: string;
    label: string;
    [x: string]: any;
}
export interface TrackError {
    error: string;
    urlRequested: string;
    statusCode: number;
    [x: string]: any;
}
export interface TrackAction {
    logPageView: (page: string) => void;
    logEvent: (event: TrackEvent) => void;
    logError: (error: TrackError) => void;
}
export interface GoogleTracker {
    name: string;
    dimensions?: GaDimensions;
    metrics?: GaMetrics;
    [x: string]: any;
}
export declare type TrackInstance = {
    disabled?: boolean;
    trackers?: GoogleTracker[];
} & TrackAction;
export interface GaDimensions {
    [x: string]: number;
}
export declare type IMGaDimensions = ImmutableObject<GaDimensions>;
export declare type IMGaMetrics = ImmutableObject<GaMetrics>;
export declare type GaMetrics = GaDimensions;
export interface GoogleAnalytics {
    trackId: string;
    anonymizeip?: boolean;
    dimensions?: IMGaDimensions;
    metrics?: IMGaMetrics;
}
export declare type IMGoogleAnalytics = ImmutableObject<GoogleAnalytics>;
export interface Analytics {
    enable: boolean;
    google?: IMGoogleAnalytics;
}
export declare type IMAnalytics = ImmutableObject<Analytics>;
