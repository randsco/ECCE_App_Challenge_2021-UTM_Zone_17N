import { UrlParameters } from './types/url-parameters';
export declare enum PostMessageType {
    JimuPageChanged = "JIMU_PAGE_CHANGED",
    JimuQueryChanged = "JIMU_QUERY_CHANGED"
}
export declare enum ListenMessageType {
    ChangePage = "CHANGE_PAGE",
    ChangeQuery = "CHANGE_QUERY",
    HostAuth = "HOST_AUTH"
}
export declare type PostMessage = PageChangedPostMessage | QueryChangedPostMessage;
export declare type ListenMessage = PageChangedListenMessage | QueryChangedListenMessage | HostAuthListenMessage;
export interface PageChangedPostMessage {
    type: PostMessageType.JimuPageChanged;
    pageId: string;
}
export interface QueryChangedPostMessage {
    type: PostMessageType.JimuQueryChanged;
    queryObject: UrlParameters;
}
export interface PageChangedListenMessage {
    type: ListenMessageType.ChangePage;
    pageId: string;
}
export interface QueryChangedListenMessage {
    type: ListenMessageType.ChangeQuery;
    queryObject: UrlParameters;
}
export interface HostAuthListenMessage {
    type: ListenMessageType.HostAuth;
    serializedSession?: string;
}
export declare function postPageChangeMessage(pageId: string): void;
export declare function postQueryChangeMessage(queryObject: UrlParameters): void;
export declare function postMessage(message: PostMessage): void;
/**
 * start listening for messages of the given type and call the specified callback
 *
 * @param type the type of messages to listen for
 * @param callback the function to execute whenever one of those messages is received
 * @return event listener that can be removed using removeMessageListener()
 */
export declare function listenForMessage(type: ListenMessageType, callback: (message: ListenMessage) => void): (evt: MessageEvent) => void;
/**
 * resolve a promise w/ the message the next time the host posts that type of message
 *
 * @param type the type of message to listen for
 * @return Promise that resolves w/ the message of the given type
 */
export declare function listenForMessageOnce(type: ListenMessageType): Promise<ListenMessage>;
/**
 * remove an event message listener
 *
 * @param listener
 */
export declare function removeMessageListener(listener: any): void;
