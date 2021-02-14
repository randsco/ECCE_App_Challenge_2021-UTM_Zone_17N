import { ImmutableObject } from 'seamless-immutable';
export interface UrlParameters {
    locale?: string;
    apiurl?: string;
    /** these are for buidler only */
    title?: string;
    tags?: string;
    summary?: string;
    folder?: string;
    template?: string;
    id?: string;
    page?: string;
    /** end */
    views?: string;
    dlg?: string;
    /**
     * the data select, use this format: <dsId:selectIndex>, the dsId is the main data source id.
     * the select index can be:
     *    * <i>, means index <i> is selected.
     *    * <i1+i2+i3>, means index <i1, i2, i3> is selected.
     *    * <i1-i3>, means index <from i1 to i3> is selected.
     *    * <i1-i3>+<i8-i9>, means index <from i1 to i3> and <from i8 to i9>  is selected.
     */
    data_index?: string;
    /**
     * The data_id will be used before data_index
     * the data select, use this format: <dsId:selectId>, the dsId is the main data source id.
     * the select id can be:
     *    * <id>
     *    * <id1+id2+id3> this means the id must not contain "+"
     */
    data_id?: string;
    /**
     * The app config parameter.
     * It can be:
     *    * item:<itemId>, use the current portal and this item id to fetch config
     *    * a URL, use this URL to fetch config
     */
    config?: string;
    app_config?: string;
    /**
     * embedded = <true | 1>
     */
    embedded?: string;
    /**
     * by default, app will load config from item data.
     * But before publish, the item data is empty, we can set draft=1 to load config from item resource
     * draft = <true | 1>
     */
    draft?: string;
    /**
     * The org short name (urlKey), valid on AGOL only. Will be used when login
     */
    org?: string;
    theme?: string;
    /**
     * this is for make widget to support custom URL parameters. the suggest pattern is: ?widget1=p1=v1,p2=v2, but every widget can define it's own pattern
     */
    [widgetId: string]: string;
}
export declare type IMUrlParameters = ImmutableObject<UrlParameters>;
