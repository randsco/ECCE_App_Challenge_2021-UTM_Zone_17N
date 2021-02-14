export declare const MOCK_PORTAL_URL = "https://mock-portal-url.arcgis.com/portal";
export declare const MOCK_FEATURE_COLLECTION_ITEM_TWO_LAYERS_ID = "mock_feature_collection_two_layers_item";
export declare const MOCK_FEATURE_COLLECTION_ITEM_ONE_LAYER_ID = "mock_feature_collection_one_layer_item";
export declare const featureLayerMockData: {
    url: string;
    serverInfo: {
        currentVersion: number;
        fullVersion: string;
        soapUrl: string;
        secureSoapUrl: string;
        authInfo: {
            isTokenBasedSecurity: boolean;
            tokenServicesUrl: string;
            shortLivedTokenValidity: number;
        };
    };
    layerDefinition: {
        currentVersion: number;
        id: number;
        name: string;
        type: string;
        geometryType: string;
        objectIdField: string;
        globalIdField: string;
        displayField: string;
        typeIdField: string;
        subtypeField: string;
        fields: ({
            name: string;
            type: string;
            alias: string;
            domain: any;
            editable: boolean;
            nullable: boolean;
            length: number;
            defaultValue: any;
            modelName: string;
        } | {
            name: string;
            type: string;
            alias: string;
            domain: {
                type: string;
                name: string;
                codedValues: {
                    name: string;
                    code: number;
                }[];
                mergePolicy: string;
                splitPolicy: string;
            };
            editable: boolean;
            nullable: boolean;
            defaultValue: number;
            modelName: string;
            length?: undefined;
        })[];
    };
    queries: any[];
};
export declare const mapServiceMockData: {
    url: string;
    serverInfo: {
        currentVersion: number;
        fullVersion: string;
        soapUrl: string;
        secureSoapUrl: string;
        authInfo: {
            isTokenBasedSecurity: boolean;
            tokenServicesUrl: string;
            shortLivedTokenValidity: number;
        };
    };
    serviceDefinition: {
        currentVersion: number;
        mapName: string;
        layers: ({
            id: number;
            name: string;
            parentLayerId: number;
            defaultVisibility: boolean;
            subLayerIds: number[];
            minScale: number;
            maxScale: number;
            type: string;
            geometryType?: undefined;
        } | {
            id: number;
            name: string;
            parentLayerId: number;
            defaultVisibility: boolean;
            subLayerIds: any;
            minScale: number;
            maxScale: number;
            type: string;
            geometryType: string;
        })[];
        tables: any[];
    };
    layers: ({
        url: string;
        layerDefinition: {
            id: number;
            name: string;
            type: string;
            subLayers: {
                id: number;
                name: string;
            }[];
        };
    } | {
        url: string;
        layerDefinition: {
            id: number;
            name: string;
            currentVersion: number;
            type: string;
            geometryType: string;
            objectIdField: string;
            globalIdField: string;
            displayField: string;
            typeIdField: string;
            subtypeField: string;
            fields: ({
                name: string;
                type: string;
                alias: string;
                domain: any;
                editable: boolean;
                nullable: boolean;
                length: number;
                defaultValue: any;
                modelName: string;
            } | {
                name: string;
                type: string;
                alias: string;
                domain: {
                    type: string;
                    name: string;
                    codedValues: {
                        name: string;
                        code: number;
                    }[];
                    mergePolicy: string;
                    splitPolicy: string;
                };
                editable: boolean;
                nullable: boolean;
                defaultValue: number;
                modelName: string;
                length?: undefined;
            })[];
            subLayers?: undefined;
        };
    })[];
};
export declare const mapItemWithOneFeatureLayerMockData: {
    info: {
        id: string;
        owner: string;
        orgId: string;
        title: string;
        name: string;
        type: string;
        tags: string[];
        created: number;
        modified: number;
        numViews: number;
        size: number;
    };
    data: {
        operationalLayers: {
            id: string;
            layerType: string;
            url: string;
            title: string;
            name: string;
        }[];
    };
};
export declare const mapItemWithOneMapServiceMockData: {
    info: {
        id: string;
        owner: string;
        orgId: string;
        title: string;
        name: string;
        type: string;
        tags: string[];
        created: number;
        modified: number;
        numViews: number;
        size: number;
    };
    data: {
        operationalLayers: {
            id: string;
            layerType: string;
            url: string;
            title: string;
            name: string;
        }[];
    };
};
/**
 * Mocked map item. The map item contains one feature collection, the feature collection contains two feature layers and is saved in map item directly.
 */
export declare const mapItemWithOneFeatureCollectionHasTwoLayersDirectlySavedInMapMockData: {
    info: {
        id: string;
        owner: string;
        orgId: string;
        title: string;
        name: string;
        type: string;
        tags: string[];
        created: number;
        modified: number;
        numViews: number;
        size: number;
    };
    data: {
        operationalLayers: {
            layerType: string;
            id: string;
            title: string;
            name: string;
            featureCollection: {
                layers: ({
                    layerDefinition: {
                        currentVersion: number;
                        id: number;
                        name: string;
                        type: string;
                        objectIdField: string;
                        fields: ({
                            name: string;
                            type: string;
                            alias: string;
                            sqlType: string;
                            nullable: boolean;
                            editable: boolean;
                            domain: any;
                            defaultValue: any;
                            length?: undefined;
                        } | {
                            name: string;
                            type: string;
                            alias: string;
                            sqlType: string;
                            length: number;
                            nullable: boolean;
                            editable: boolean;
                            domain: any;
                            defaultValue: any;
                        })[];
                        geometryType?: undefined;
                    };
                    featureSet: {
                        features: {
                            geometry: {
                                x: number;
                                y: number;
                                spatialReference: {
                                    wkid: number;
                                    latestWkid: number;
                                };
                            };
                            attributes: {
                                FID: number;
                                OBJECTID: number;
                                DISASTER: string;
                            };
                        }[];
                        geometryType: string;
                    };
                } | {
                    layerDefinition: {
                        currentVersion: number;
                        id: number;
                        name: string;
                        type: string;
                        geometryType: string;
                        objectIdField: string;
                        fields: ({
                            name: string;
                            type: string;
                            alias: string;
                            sqlType: string;
                            nullable: boolean;
                            editable: boolean;
                            domain: any;
                            defaultValue: any;
                            length?: undefined;
                        } | {
                            name: string;
                            type: string;
                            alias: string;
                            sqlType: string;
                            length: number;
                            nullable: boolean;
                            editable: boolean;
                            domain: any;
                            defaultValue: any;
                        })[];
                    };
                    featureSet: {
                        features: {
                            attributes: {
                                FID: number;
                                OBJECTID: number;
                                EOC_ID: number;
                                NAME: string;
                            };
                        }[];
                        geometryType: string;
                    };
                })[];
            };
        }[];
    };
};
/**
 * Mocked map item. The map item contains one feature collection, the feature collection contains one feature layer and is saved in map item directly.
 */
export declare const mapItemWithOneFeatureCollectionHasOneLayerDirectlySavedInMapMockData: {
    info: {
        id: string;
        owner: string;
        orgId: string;
        title: string;
        name: string;
        type: string;
        tags: string[];
        created: number;
        modified: number;
        numViews: number;
        size: number;
    };
    data: {
        operationalLayers: {
            layerType: string;
            id: string;
            title: string;
            name: string;
            featureCollection: {
                layers: {
                    layerDefinition: {
                        currentVersion: number;
                        id: number;
                        name: string;
                        type: string;
                        geometryType: string;
                        objectIdField: string;
                        fields: ({
                            name: string;
                            type: string;
                            alias: string;
                            sqlType: string;
                            nullable: boolean;
                            editable: boolean;
                            domain: any;
                            defaultValue: any;
                            length?: undefined;
                        } | {
                            name: string;
                            type: string;
                            alias: string;
                            sqlType: string;
                            length: number;
                            nullable: boolean;
                            editable: boolean;
                            domain: any;
                            defaultValue: any;
                        })[];
                    };
                    featureSet: {
                        features: {
                            attributes: {
                                FID: number;
                                OBJECTID: number;
                                EOC_ID: number;
                                NAME: string;
                            };
                        }[];
                        geometryType: string;
                    };
                }[];
            };
        }[];
    };
};
/**
 * Mocked map item. The map item contains one feature collection item and the item contains two feature layers.
 */
export declare const mapItemWithFeaureCollectionItemHasTwoLayersMockData: {
    info: {
        id: string;
        owner: string;
        orgId: string;
        title: string;
        name: string;
        type: string;
        tags: string[];
        created: number;
        modified: number;
        numViews: number;
        size: number;
    };
    data: {
        operationalLayers: {
            layerType: string;
            id: string;
            title: string;
            name: string;
            visibility: boolean;
            type: string;
            itemId: string;
        }[];
    };
};
/**
 * Mocked map item. The map item contains one feature collection item and the item contains one feature layer.
 */
export declare const mapItemWithFeaureCollectionItemHasOneLayerMockData: {
    info: {
        id: string;
        owner: string;
        orgId: string;
        title: string;
        name: string;
        type: string;
        tags: string[];
        created: number;
        modified: number;
        numViews: number;
        size: number;
    };
    data: {
        operationalLayers: {
            layerType: string;
            id: string;
            title: string;
            name: string;
            visibility: boolean;
            type: string;
            itemId: string;
        }[];
    };
};
