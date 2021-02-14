/// <reference types="seamless-immutable" />
import { IMDataSourceJson, Immutable, ServiceDefinition } from 'jimu-core';
import { AbstractSetDataSource } from '../ds-base-types/abstract-set-data-source';
import { DataSourceConstructorOptions, DataSourceTypes, DataSource, SceneServiceDataSource } from '../data-source-interface';
export interface SceneServiceDataSourceConstructorOptions extends DataSourceConstructorOptions {
}
export declare class SceneServiceDataSourceImpl extends AbstractSetDataSource implements SceneServiceDataSource {
    type: DataSourceTypes.SceneService;
    private serviceDefinition;
    constructor(options: SceneServiceDataSourceConstructorOptions);
    ready(): Promise<DataSource[]>;
    getServiceDefinition(): ServiceDefinition;
    protected _createChildDataSources(): Promise<DataSource[]>;
    fetchSchema(): Promise<Immutable.ImmutableObject<import("jimu-core").DataSourceSchema>>;
    fetchServiceDefinition(): Promise<ServiceDefinition>;
    protected _getDsJsonsFromSupportedLayerDefinitions(res: {
        def: ServiceDefinition;
        url?: string;
    }[], dsJsonInConfig: IMDataSourceJson): IMDataSourceJson[];
    protected _getDsJsonsFromSingleLayerDefinition(url: string, layerDefinition: ServiceDefinition, dsJsonInConfig: IMDataSourceJson): IMDataSourceJson[];
}
