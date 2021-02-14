import { IItem } from '@esri/arcgis-rest-types';
import { ISearchOptions, SearchQueryBuilder, ISearchResult } from '@esri/arcgis-rest-portal';
export declare function searchItems(search: string | ISearchOptions | SearchQueryBuilder, isArcGisOnlineRequest?: boolean): Promise<ISearchResult<IItem>>;
