/// <reference types="react" />
/// <reference types="cheerio" />
import { RenderOptions, queries as _queries, RenderResult } from '@testing-library/react';
import { React, ThemeVariables, IMState } from 'jimu-core';
import { Store } from 'redux';
declare const queries: {
    queryAllBySelector: (...args: any[]) => any;
    queryBySelector: import("@testing-library/react").QueryMethod<any[], HTMLElement>;
    getAllBySelector: import("@testing-library/react").QueryMethod<any[], HTMLElement[]>;
    getBySelector: import("@testing-library/react").QueryMethod<any[], HTMLElement>;
    findBySelector: import("@testing-library/react").QueryMethod<[any, any, import("@testing-library/react").waitForOptions], Promise<HTMLElement[]>>;
    getByLabelText: _queries.GetByText;
    getAllByLabelText: _queries.AllByText;
    queryByLabelText: _queries.QueryByText;
    queryAllByLabelText: _queries.AllByText;
    findByLabelText: _queries.FindByText;
    findAllByLabelText: _queries.FindAllByText;
    getByPlaceholderText: _queries.GetByBoundAttribute;
    getAllByPlaceholderText: _queries.AllByBoundAttribute;
    queryByPlaceholderText: _queries.QueryByBoundAttribute;
    queryAllByPlaceholderText: _queries.AllByBoundAttribute;
    findByPlaceholderText: _queries.FindByBoundAttribute;
    findAllByPlaceholderText: _queries.FindAllByBoundAttribute;
    getByText: _queries.GetByText;
    getAllByText: _queries.AllByText;
    queryByText: _queries.QueryByText;
    queryAllByText: _queries.AllByText;
    findByText: _queries.FindByText;
    findAllByText: _queries.FindAllByText;
    getByAltText: _queries.GetByBoundAttribute;
    getAllByAltText: _queries.AllByBoundAttribute;
    queryByAltText: _queries.QueryByBoundAttribute;
    queryAllByAltText: _queries.AllByBoundAttribute;
    findByAltText: _queries.FindByBoundAttribute;
    findAllByAltText: _queries.FindAllByBoundAttribute;
    getByTitle: _queries.GetByBoundAttribute;
    getAllByTitle: _queries.AllByBoundAttribute;
    queryByTitle: _queries.QueryByBoundAttribute;
    queryAllByTitle: _queries.AllByBoundAttribute;
    findByTitle: _queries.FindByBoundAttribute;
    findAllByTitle: _queries.FindAllByBoundAttribute;
    getByDisplayValue: _queries.GetByBoundAttribute;
    getAllByDisplayValue: _queries.AllByBoundAttribute;
    queryByDisplayValue: _queries.QueryByBoundAttribute;
    queryAllByDisplayValue: _queries.AllByBoundAttribute;
    findByDisplayValue: _queries.FindByBoundAttribute;
    findAllByDisplayValue: _queries.FindAllByBoundAttribute;
    getByRole: _queries.GetByRole;
    getAllByRole: _queries.AllByRole;
    queryByRole: _queries.QueryByRole;
    queryAllByRole: _queries.AllByRole;
    findByRole: _queries.FindByRole;
    findAllByRole: _queries.FindAllByRole;
    getByTestId: _queries.GetByBoundAttribute;
    getAllByTestId: _queries.AllByBoundAttribute;
    queryByTestId: _queries.QueryByBoundAttribute;
    queryAllByTestId: _queries.AllByBoundAttribute;
    findByTestId: _queries.FindByBoundAttribute;
    findAllByTestId: _queries.FindAllByBoundAttribute;
};
export declare type WithRenderResult = (ui: any, options?: RenderOptions<typeof queries>) => RenderResult<typeof queries>;
export declare const render: WithRenderResult;
export declare const ThemeIntlWrapper: (theme: ThemeVariables, locale: string, messages: {
    [x: string]: string;
}) => ({ children }: {
    children: any;
}) => JSX.Element;
export declare const ThemeWrapper: (theme: ThemeVariables) => ({ children }: {
    children: any;
}) => JSX.Element;
export declare const IntlWrapper: (locale: string, messages: {
    [x: string]: string;
}) => ({ children }: {
    children: any;
}) => JSX.Element;
export declare const StoreWrapper: (store: Store<IMState>) => ({ children }: {
    children: any;
}) => JSX.Element;
export declare const StoreIntlWrapper: (store: Store<IMState>, locale: string, messages: {
    [x: string]: string;
}) => ({ children }: {
    children: any;
}) => JSX.Element;
export declare const StoreThemeIntlWrapper: (store: Store<IMState>, theme: ThemeVariables, locale: string, messages: {
    [x: string]: string;
}) => ({ children }: {
    children: any;
}) => JSX.Element;
export declare const withThemeIntlRender: (theme?: ThemeVariables, locale?: string, messages?: {}) => WithRenderResult;
export declare const withThemeRender: (theme?: ThemeVariables) => WithRenderResult;
export declare const withIntlRender: (locale?: string, messages?: {}) => WithRenderResult;
export declare const withStoreRender: (store?: Store<IMState>) => WithRenderResult;
export declare const withStoreIntlRender: (store?: Store<IMState>, locale?: string, messages?: {}) => WithRenderResult;
export declare const withStoreThemeIntlRender: (store?: Store<IMState>, theme?: ThemeVariables, locale?: string, messages?: {}) => WithRenderResult;
export declare const widgetRender: (store?: Store<IMState>, theme?: ThemeVariables, locale?: string, messages?: {}) => WithRenderResult;
export declare const mountWithStoreEnzyme: (store: Store<IMState>, children: any) => import("enzyme").ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
export declare const renderWithStoreEnzyme: (store: Store<IMState>, children: any) => Cheerio;
export declare const runFuncAsync: (timeout?: number, useFakeTimers?: boolean) => (callback: any, ...args: any[]) => Promise<unknown>;
export {};
