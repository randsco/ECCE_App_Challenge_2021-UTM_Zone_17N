import * as React from 'react';
interface ErrorState {
    error: Error;
}
export declare class ErrorBoundary extends React.Component<unknown, ErrorState> {
    constructor(props: any);
    componentDidCatch(error: any, info: any): void;
    render(): {};
}
export {};
