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
export declare const featureServiceMockData: {
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
        maxRecordCount: number;
        maxRecordCountFactor: number;
        layers: {
            id: number;
            name: string;
            parentLayerId: number;
            defaultVisibility: boolean;
            subLayerIds: any;
            minScale: number;
            maxScale: number;
            type: string;
            geometryType: string;
        }[];
        tables: {
            id: number;
            name: string;
        }[];
    };
    layers: {
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
        };
    }[];
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
