import { IDefinitionEditor, IExtent, IField, GeometryType, ISpatialReference, ITemplate } from '@esri/arcgis-rest-types';
export interface ServiceDefinition {
    /** Boolean value indicating whether the geometry of the features in the layer can be edited. */
    allowGeometryUpdates?: boolean;
    /** A comma separated list of supported capabilities, e.g. Query,Editing. */
    capabilities?: string;
    /** String value for the copyright text information for the layer. */
    copyrightText?: string;
    /** Numeric value indicating the server version of the layer. */
    currentVersion?: number;
    /** Boolean value indicating whether the layer's visibility is turned on. */
    defaultVisibility?: boolean;
    /** Stores interactive filters. */
    definitionEditor?: IDefinitionEditor;
    /** SQL-based definition expression string that narrows the data to be displayed in the layer. */
    definitionExpression?: string;
    /** String value of the layer as defined in the map service. */
    description?: string;
    /** A string value that summarizes the feature. */
    displayField?: string;
    /** Contains drawing, labeling, and transparency information. */
    drawingInfo?: any;
    /** An object defining the rectangular area. */
    extent?: IExtent | null;
    /** Feature reductions declutter the screen by hiding features that would otherwise intersect with other features on screen. */
    featureReduction?: any;
    /** An array of field objects containing information about the attribute fields for the feature collection or layer. */
    fields?: IField[];
    /** A string defining the type of geometry. Possible geometry types are: esriGeometryPoint, esriGeometryMultipoint, esriGeometryPolyline, esriGeometryPolygon, and esriGeometryEnvelope. */
    geometryType?: GeometryType;
    /** The unique identifier for a feature or table row within a geodatabase. */
    globalIdField?: string;
    /** Indicates whether attachments should be loaded for the layer. */
    hasAttachments?: boolean;
    /** Boolean value indicating whether data changes. True if it does not. */
    hasStaticData?: boolean;
    /** String value indicating the HTML popup type. */
    htmlPopupType?: 'esriServerHTMLPopupTypeNone' | 'esriServerHTMLPopupTypeAsURL' | 'esriServerHTMLPopupTypeAsHTMLText';
    /** The identifier assigned to the layer. */
    id?: number;
    /** Boolean value indicating whether the data is versioned. */
    isDataVersioned?: boolean;
    /** Numeric value indicating tbe maximum number of records that will be returned at once for a query. */
    maxRecordCount?: number;
    /** Represents the maximum scale at which the layer definition will be applied. This does not apply to layers of type: ArcGISMapServiceLayer, ImageServiceVectorLayer or ImageServiceLayer. */
    maxScale?: number;
    /** Represents the minimum scale at which the layer definition will be applied. This does not apply to layers of type: ArcGISMapServiceLayer, ImageServiceVectorLayer or ImageServiceLayer. */
    minScale?: number;
    /** Contains a unique name for the layer that can be displayed in a legend. */
    name?: string;
    /** Indicates the name of the object ID field in the dataset. */
    objectIdField?: string;
    /** Dictates whether a client can support having an end user modify symbols on individual features. */
    overrideSymbols?: boolean;
    /** Indicates range information */
    rangeInfos?: any;
    /** An object indicating the layerDefinition's layer source. */
    source?: any;
    /** An object containing the WKID or WKT identifying the spatial reference of the layer's geometry. */
    spatialReference?: ISpatialReference;
    /** String value indicating the output formats that are supported in a query. */
    supportedQueryFormats?: string;
    /** Boolean value indicating whether the layer supports orderByFields in a query operation. */
    supportsAdvancedQueries?: boolean;
    /** Boolean value indicating whether the layer supports uploading attachments with the Uploads operation. This can then be used in the Add Attachment and Update Attachment operations. */
    supportsAttachmentsByUploadId?: boolean;
    /** Boolean value indicating whether the layer supports the Calculate REST operation when updating features. */
    supportsCalculate?: boolean;
    /** Boolean value indicating whether the layer supports rolling back edits made on a feature layer if some of the edits fail. */
    supportsRollbackOnFailureParameter?: boolean;
    /** Boolean value indicating whether feature layer query operations support statistical functions. */
    supportsStatistics?: boolean;
    /** Boolean value indicating whether the validateSQL operation is supported across a feature service layer. */
    supportsValidateSql?: boolean;
    /** A property of the layer definition when there are no types defined; otherwise, templates are defined as properties of the types. */
    templates?: ITemplate[];
    /** The time info metadata of the layer. May be set for feature layers inside a feature collection item. */
    timeInfo?: any;
    /** Indicates the layerDefinition type. */
    type?: string;
    /** Indicates the scene layerDefinition type. */
    layerType?: string;
    /** Contains the name of the field holding the type ID for the features. */
    typeIdField?: string;
    /** Contains information about an attribute field. */
    types?: any;
    /** String value indicating the attribute field that is used to control the visibility of a feature.
     * If applicable, when rendering a feature the client should use this field to control visibility.
     * The field's values are 0 = do not display, 1 = display.
     */
    visibilityField?: string;
    relationships?: any[];
    editFieldsInfo?: {
        creationDateField?: string;
        creatorField?: string;
        editDateField?: string;
        editorField?: string;
    };
    parentLayerId?: number;
    ownershipBasedAccessControlForFeatures?: boolean;
    syncCanReturnChanges?: boolean;
    archivingInfo?: {
        supportsQueryWithHistoricMoment?: boolean;
        startArchivingMoment?: number;
    };
    supportsValidateSQL?: boolean;
    advancedQueryCapabilities?: {
        supportsPagination?: boolean;
        supportsTrueCurve?: boolean;
        supportsQueryWithDistance?: boolean;
        supportsReturningQueryExtent?: boolean;
        supportsStatistics?: boolean;
        supportsOrderBy?: boolean;
        supportsDistinct?: boolean;
        supportsSqlExpression?: boolean;
        supportsPercentileStatistics?: boolean;
    };
    allowTrueCurvesUpdates?: boolean;
    onlyAllowTrueCurveUpdatesByTrueCurveClients?: boolean;
    supportsApplyEditsWithGlobalIds?: boolean;
    subtypeField?: string;
    indexes?: any[];
    dateFieldsTimeReference?: {
        timeZone?: string;
        respectsDaylightSaving?: boolean;
    };
    useStandardizedQueries?: boolean;
    /** For map service,  indicating whether the map service supports dynamic layers/tables */
    supportsDynamicLayers?: boolean;
    /** For group layer */
    subLayers?: Layer[];
    layers?: Layer[];
    tables?: Table[];
}
export interface Layer {
    id: number;
    name?: string;
    parentLayerId?: number;
    defaultVisibility?: boolean;
    subLayerIds?: number[];
    minScale?: number;
    maxScale?: number;
    type?: string;
    geometryType?: GeometryType;
}
interface Table {
    id: number;
    name: string;
}
export {};
