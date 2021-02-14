import { IMDataSourceSchema, DataSource, FeatureLayerDataSource, MapServiceDataSource, FeatureDataRecord, GroupLayerDataSource, SceneLayerDataSource } from 'jimu-core';
export declare enum DataSourceTypes {
    Map = "MAP",
    WebMap = "WEB_MAP",
    WebScene = "WEB_SCENE"
}
export declare enum LayerTypes {
    BaseDynamicLayer = "base-dynamic",
    BaseElevationLayer = "base-elevation",
    BaseTileLayer = "base-tile",
    BuildingSceneLayer = "building-scene",
    CSVLayer = "csv",
    ElevationLayer = "elevation",
    FeatureLayer = "feature",
    GeoJSONLayer = "geojson",
    GeoRSSLayer = "geo-rss",
    GraphicsLayer = "graphics",
    GroupLayer = "group",
    ImageryLayer = "imagery",
    IntegratedMeshLayer = "integrated-mesh",
    KMLLayer = "kml",
    MapImageLayer = "map-image",
    MapNotesLayer = "map-notes",
    PointCloudLayer = "point-cloud",
    SceneLayer = "scene",
    TileLayer = "tile",
    UnknownLayer = "unknown",
    UnsupportedLayer = "unsupported",
    VectorTileLayer = "vector-tile",
    WMSLayer = "wms",
    WMTSLayer = "wmts",
    WebTileLayer = "web-tile"
}
export declare type MapChildDataSource = FeatureLayerDataSource | MapServiceDataSource | GroupLayerDataSource | SceneLayerDataSource;
export interface MapDataSource extends DataSource {
    type: DataSourceTypes.Map | DataSourceTypes.WebMap | DataSourceTypes.WebScene;
    map: __esri.Map;
    ready: () => Promise<MapChildDataSource[]>;
    fetchSchema: () => Promise<IMDataSourceSchema>;
}
export interface WebMapDataSource extends MapDataSource {
    type: DataSourceTypes.WebMap;
    map: __esri.WebMap;
}
export interface WebSceneDataSource extends MapDataSource {
    type: DataSourceTypes.WebScene;
    map: __esri.WebScene;
}
export { FeatureLayerDataSource, FeatureDataRecord, DataSourceTypes as ArcGISDataSourceTypes };
