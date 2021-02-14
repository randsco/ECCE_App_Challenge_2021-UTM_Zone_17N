import { IntlShape } from 'jimu-core';
import { IFeature } from '@esri/arcgis-rest-types';
import { AbstractDataRecord } from '../ds-base-types';
import { AttachmentInfo, Geometry, FeatureDataRecord, FeatureSetDataSource, FeatureLayerDataSource, SceneLayerDataSource } from '../data-source-interface';
export declare class FeatureDataRecordImpl extends AbstractDataRecord implements FeatureDataRecord {
    feature: IFeature | __esri.Graphic;
    dataSource: FeatureSetDataSource | FeatureLayerDataSource | SceneLayerDataSource;
    attachmentInfos: AttachmentInfo[];
    protected _queryAllAttachmentsPromise: Promise<AttachmentInfo[]>;
    protected _getSymbolPreviewHTMLPromise: Promise<HTMLElement>;
    constructor(feature: IFeature | __esri.Graphic, dataSource: FeatureSetDataSource | FeatureLayerDataSource | SceneLayerDataSource, isBeforeMappingData?: boolean);
    private fillGeometry;
    queryAttachments(attachmentTypes?: string[]): Promise<AttachmentInfo[]>;
    getSymbolPreviewHTML(): Promise<HTMLElement>;
    getData(): {
        [key: string]: any;
    };
    getFormattedFieldValue(jimuFieldName: string, intl: IntlShape): string;
    getDataBeforeMapping(): {
        [key: string]: any;
    };
    getOriginData(): {
        [key: string]: any;
    };
    toJson(): IFeature | __esri.Graphic;
    getId(): string;
    setId(id: string): void;
    getGeometry(): Geometry;
    /**
     * @ignore
     * Returns whether `feature` is type of `__esri.Graphic`, some methods only work with `__esri.Graphic`.
     */
    private _isGraphicFeature;
}
