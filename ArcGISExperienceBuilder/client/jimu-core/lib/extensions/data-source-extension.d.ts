import { DataSourceFactoryUri } from '../extension-spec/extension-spec';
export declare class JimuCoreDataSourceFactoryUriExtension implements DataSourceFactoryUri {
    id: string;
    getFactoryUri(dataSourceType: any): string;
}
