import { IMDataSourceJson, IntlShape } from 'jimu-core';
import { AllDataSourceTypes } from '../../types';
import { IItem } from '@esri/arcgis-rest-types';
export declare enum AddDataErrorCode {
    ItemInaccessible = "ITEM_INACCESSIBLE",
    SceneLayerWithoutAssociatedLayer = "SCENE_LAYER_WITHOUT_ASSOCIATED_LAYER"
}
/**
 * @ignore
 * only used inside external-data-source-selector, indicating the structure of one original data (which is not yet a data source).
 */
export interface DataSchema {
    id: string;
    label: string;
    type: AllDataSourceTypes;
    isHidden?: boolean;
    parentSchema?: DataSchema;
    childSchemas?: {
        [childId: string]: DataSchema;
    };
}
export declare function getErrorTextFromErrorCode(errorCode: AddDataErrorCode, intl: IntlShape): string;
export declare function fetchDataFromMapItem(item: IItem, dsId: string, portalUrl: string): Promise<{
    dsJson: IMDataSourceJson;
    dataSchema?: DataSchema;
}>;
export declare function fetchDataFromFeatureCollectionItem(item: IItem, dsId: string, portalUrl: string): Promise<{
    dsJson: IMDataSourceJson;
    dataSchema?: DataSchema;
}>;
export declare function fetchDataSchemaFromItem(dsJson: IMDataSourceJson, parentSchema: DataSchema, itemData: any, item: IItem): Promise<DataSchema>;
export declare function fetchDataFromService(url: string, dsId: string, title?: string, portalUrl?: string, itemId?: string): Promise<{
    dsJson: IMDataSourceJson;
    dataSchema?: DataSchema;
}>;
export declare function traverseHideChildDs(dataSchema: DataSchema, rootDsJson: IMDataSourceJson): IMDataSourceJson;
export declare function traverseUnhideParentDs(dataSchema: DataSchema, rootDsJson: IMDataSourceJson): IMDataSourceJson;
