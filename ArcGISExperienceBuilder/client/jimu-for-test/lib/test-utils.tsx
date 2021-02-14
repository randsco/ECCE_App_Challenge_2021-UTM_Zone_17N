import { render as _render, RenderOptions, queries as _queries, RenderResult } from '@testing-library/react'
import { React, IntlProvider, ThemeVariables, IMState, ReactRedux, getAppStore, ThemeProvider } from 'jimu-core'
import { Store } from 'redux'
import { mount, render as enzymeRender } from 'enzyme';
import * as customQueries from './custom-queries'
const queries = { ..._queries, ...customQueries };

export type WithRenderResult = (ui: any, options?: RenderOptions<typeof queries>) => RenderResult<typeof queries>;

export const render: WithRenderResult = (ui, options) => _render<typeof queries>(ui, { queries, ...options });

export const ThemeIntlWrapper = (theme: ThemeVariables, locale: string, messages: { [x: string]: string }) => {
  return ({ children }) => {
    return (
      <ThemeProvider theme={theme}>
        <IntlProvider locale={locale} messages={messages}>
          {children}
        </IntlProvider>
      </ThemeProvider>
    )
  }
}

export const ThemeWrapper = (theme: ThemeVariables) => {
  return ({ children }) => {
    return (
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    )
  }
}

export const IntlWrapper = (locale: string, messages: { [x: string]: string }) => {
  return ({ children }) => {
    return (
      <IntlProvider locale={locale} messages={messages}>
        {children}
      </IntlProvider>
    )
  }
}

export const StoreWrapper = (store: Store<IMState>) => {
  return ({ children }) => {
    return (
      <ReactRedux.Provider store={store}>
        {children}
      </ReactRedux.Provider>
    )
  }
}

export const StoreIntlWrapper = (store: Store<IMState>, locale: string, messages: { [x: string]: string }) => {
  return ({ children }) => {
    return (
      <ReactRedux.Provider store={store}>
        <IntlProvider locale={locale} messages={messages}>
          {children}
        </IntlProvider>
      </ReactRedux.Provider>
    )
  }
}

export const StoreThemeIntlWrapper = (store: Store<IMState>, theme: ThemeVariables, locale: string, messages: { [x: string]: string }) => {
  return ({ children }) => {
    return (
      <ReactRedux.Provider store={store}>
        <ThemeProvider theme={theme}>
          <IntlProvider locale={locale} messages={messages}>
            {children}
          </IntlProvider>
        </ThemeProvider>
      </ReactRedux.Provider>
    )
  }
}

export const withThemeIntlRender = (theme = {} as ThemeVariables, locale: string = 'en', messages = {}): WithRenderResult => {
  return (ui, options?: RenderOptions<typeof queries>) => render(ui, { wrapper: ThemeIntlWrapper(theme, locale, messages), ...options });
}

export const withThemeRender = (theme = {} as ThemeVariables): WithRenderResult => {
  return (ui, options?: RenderOptions<typeof queries>) => render(ui, { wrapper: ThemeWrapper(theme), ...options });
}

export const withIntlRender = (locale: string = 'en', messages = {}): WithRenderResult => {
  return (ui, options?: RenderOptions<typeof queries>) => render(ui, { wrapper: IntlWrapper(locale, messages), ...options });
}

export const withStoreRender = (store: Store<IMState> = getAppStore()): WithRenderResult => {
  return (ui, options?: RenderOptions<typeof queries>) => render(ui, { wrapper: StoreWrapper(store), ...options });
}

export const withStoreIntlRender = (store: Store<IMState> = getAppStore(), locale: string = 'en', messages = {}): WithRenderResult => {
  return (ui, options?: RenderOptions<typeof queries>) => render(ui, { wrapper: StoreIntlWrapper(store, locale, messages), ...options });
}

export const withStoreThemeIntlRender = (store: Store<IMState> = getAppStore(), theme = {} as ThemeVariables, locale: string = 'en', messages = {}): WithRenderResult => {
  return (ui, options?: RenderOptions<typeof queries>) => render(ui, { wrapper: StoreThemeIntlWrapper(store, theme, locale, messages), ...options });
}

export const widgetRender = (store: Store<IMState> = getAppStore(), theme = {} as ThemeVariables, locale: string = 'en', messages = {}): WithRenderResult => {
  return (ui, options?: RenderOptions<typeof queries>) => render(ui, { wrapper: StoreThemeIntlWrapper(store, theme, locale, messages), ...options });
}

export const mountWithStoreEnzyme = (store: Store<IMState>, children) => {
  return (
    mount(<ReactRedux.Provider store={store}>
      {children}
    </ReactRedux.Provider>)
  )
}

export const renderWithStoreEnzyme = (store: Store<IMState>, children) => {
  return (
    enzymeRender(<ReactRedux.Provider store={store}>
      {children}
    </ReactRedux.Provider>)
  )
}

export const runFuncAsync = (timeout: number = 0, useFakeTimers?: boolean) => (callback, ...args) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(callback.apply(null, args));
      } catch (error) {
        reject(error);
      }
    }, timeout);
    useFakeTimers && jest.runOnlyPendingTimers();
  });
}
