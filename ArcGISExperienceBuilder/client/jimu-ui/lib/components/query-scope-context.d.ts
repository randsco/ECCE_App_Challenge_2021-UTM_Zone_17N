/// <reference types="react" />
import { React, QueryScope } from 'jimu-core';
export declare type QueryScopeContextProps = {
    scope: QueryScope;
    widgetId?: string;
};
export declare const QueryScopeContext: React.Context<QueryScopeContextProps>;
