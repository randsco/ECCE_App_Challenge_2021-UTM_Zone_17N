import { ImmutableArray } from 'seamless-immutable';
import { IntlShape } from 'react-intl';
export declare function getLocaleToLoad(locale: string, translatedLocales: string[] | ImmutableArray<string>): string;
/**
 * Get the user's preferred language from the browser.
 *
 * @param navigator https://developer.mozilla.org/en-US/docs/Web/API/Navigator
 */
export declare function getBrowserLanguage(navigator: Navigator): any;
/**
 *
 * @param locale user's current locale
 * @param translatedLocales a list of locales that translated by the library or widget
 */
export declare function getTranslatedLocale(locale: string, translatedLocales?: string[] | ImmutableArray<string>): string;
export declare function isSameLanguage(locale1: string, locale2: string): boolean;
export interface I18nMessages {
    [index: string]: string;
}
/**
 * @param baseUrl base URL of library or widget translation files
 * @param locale user's current locale
 */
export declare function loadLocaleMessages(baseUrl: string, locale: string): Promise<I18nMessages>;
export declare function isRTLLocale(locale: any): boolean;
/**
 * @param widgetId if no widgetId, means frameworks'
 * @param context use widget runtime or setting's i18n message
 *
 * You can use this method to getIntl for builder's widget
 */
export declare function getIntl(widgetId?: string, context?: 'runtime' | 'setting'): IntlShape;
export declare type DecimalSeparator = ',' | '.';
export declare function getDecimalSeparator(locale: string): DecimalSeparator;
/**
 * Find the locale from the locales list. If not mached, return undefined.
 * @param locale
 * @param locales
 */
export declare function findLocale(locale: string, locales?: string[] | ImmutableArray<string>): string;
