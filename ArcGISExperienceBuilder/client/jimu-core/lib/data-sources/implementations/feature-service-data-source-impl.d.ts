import { DataSourceTypes, FeatureServiceDataSource } from '../data-source-interface';
import { AbstractLayerFolderDataSource } from '../ds-base-types';
/**
 * Data source from a feature service, which may contain multiple child data sources.
 */
export declare class FeatureServiceDataSourceImpl extends AbstractLayerFolderDataSource implements FeatureServiceDataSource {
    type: DataSourceTypes.FeatureService;
}
