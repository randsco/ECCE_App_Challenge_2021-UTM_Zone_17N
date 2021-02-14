import { DataSource, DataSourceConstructorOptions, DataSourceFactory } from './data-source-interface';
import { FeatureDataRecordImpl } from './implementations/feature-record-impl';
import { CsvDataSourceImpl } from './implementations/csv-data-source-impl';
import type { FeatureLayerDataSourceConstructorOptions } from './implementations/feature-layer-data-source-impl';
import type { SceneLayerDataSourceConstructorOptions } from './implementations/scene-layer-data-source-impl';
import type { SceneServiceDataSourceConstructorOptions } from './implementations/scene-service-data-source-impl';
import { FeatureLayerDataSourceImpl } from './implementations/feature-layer-data-source-impl';
import { FeatureServiceDataSourceImpl } from './implementations/feature-service-data-source-impl';
import type { FeatureSetDataSourceConstructorOptions } from './implementations/feature-set-data-source-impl';
import { FeatureSetDataSourceImpl } from './implementations/feature-set-data-source-impl';
import { GroupLayerDataSourceImpl } from './implementations/group-layer-data-source-impl';
import { MapServiceDataSourceImpl } from './implementations/map-service-data-source-impl';
import { SimpleLocalDataSourceImpl } from './implementations/simple-local-data-source-impl';
import { SceneServiceDataSourceImpl } from './implementations/scene-service-data-source-impl';
import { SceneLayerDataSourceImpl } from './implementations/scene-layer-data-source-impl';
export declare class JimuCoreDataSourceFactory implements DataSourceFactory {
    createDataSource(options: DataSourceConstructorOptions): DataSource;
}
export * from './ds-base-types';
export * from './data-source-interface';
export { FeatureDataRecordImpl, CsvDataSourceImpl, FeatureLayerDataSourceImpl, FeatureServiceDataSourceImpl, FeatureSetDataSourceImpl, GroupLayerDataSourceImpl, MapServiceDataSourceImpl, SimpleLocalDataSourceImpl, SceneServiceDataSourceImpl, SceneLayerDataSourceImpl, FeatureLayerDataSourceConstructorOptions, FeatureSetDataSourceConstructorOptions, SceneLayerDataSourceConstructorOptions, SceneServiceDataSourceConstructorOptions };
