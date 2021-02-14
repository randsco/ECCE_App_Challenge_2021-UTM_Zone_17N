import { AbstractLayerFolderDataSource } from '../ds-base-types';
import { DataSourceTypes, GroupLayerDataSource } from '../data-source-interface';
/**
 * Data source from group layer a map service, which may contain multiple child data sources.
 */
export declare class GroupLayerDataSourceImpl extends AbstractLayerFolderDataSource implements GroupLayerDataSource {
    type: DataSourceTypes.GroupLayer;
    layer?: __esri.GroupLayer | __esri.Sublayer;
}
