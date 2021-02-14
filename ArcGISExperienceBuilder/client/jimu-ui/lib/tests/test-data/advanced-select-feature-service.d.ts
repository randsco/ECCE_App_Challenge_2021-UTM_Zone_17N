declare const _default: {
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
        parentLayer: any;
        defaultVisibility: boolean;
        minScale: number;
        maxScale: number;
        geometryType: string;
        description: string;
        copyrightText: string;
        editFieldsInfo: any;
        ownershipBasedAccessControlForFeatures: any;
        syncCanReturnChanges: boolean;
        relationships: any[];
        isDataVersioned: boolean;
        isDataArchived: boolean;
        isCoGoEnabled: boolean;
        supportsRollbackOnFailureParameter: boolean;
        archivingInfo: {
            supportsQueryWithHistoricMoment: boolean;
            startArchivingMoment: number;
        };
        supportsStatistics: boolean;
        supportsAdvancedQueries: boolean;
        supportsValidateSQL: boolean;
        supportsCoordinatesQuantization: boolean;
        supportsCalculate: boolean;
        advancedQueryCapabilities: {
            supportsPagination: boolean;
            supportsTrueCurve: boolean;
            supportsQueryWithDistance: boolean;
            supportsReturningQueryExtent: boolean;
            supportsStatistics: boolean;
            supportsHavingClause: boolean;
            supportsOrderBy: boolean;
            supportsDistinct: boolean;
            supportsCountDistinct: boolean;
            supportsQueryWithResultType: boolean;
            supportsReturningGeometryCentroid: boolean;
            supportsSqlExpression: boolean;
        };
        extent: {
            xmin: number;
            ymin: number;
            xmax: number;
            ymax: number;
            spatialReference: {
                wkid: number;
                latestWkid: number;
            };
        };
        sourceSpatialReference: {
            wkid: number;
            latestWkid: number;
        };
        drawingInfo: {
            renderer: {
                type: string;
                field1: string;
                field2: any;
                field3: any;
                defaultSymbol: any;
                defaultLabel: any;
                uniqueValueInfos: {
                    symbol: {
                        type: string;
                        url: string;
                        imageData: string;
                        contentType: string;
                        width: number;
                        height: number;
                        angle: number;
                        xoffset: number;
                        yoffset: number;
                    };
                    value: string;
                    label: string;
                    description: string;
                }[];
                fieldDelimiter: string;
            };
            transparency: number;
            labelingInfo: any;
        };
        hasM: boolean;
        hasZ: boolean;
        allowGeometryUpdates: boolean;
        allowTrueCurvesUpdates: boolean;
        onlyAllowTrueCurveUpdatesByTrueCurveClients: boolean;
        hasAttachments: boolean;
        supportsAttachmentsByUploadId: boolean;
        supportsApplyEditsWithGlobalIds: boolean;
        htmlPopupType: string;
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
                description: string;
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
        geometryField: {
            name: string;
            type: string;
            alias: string;
            domain: any;
            editable: boolean;
            nullable: boolean;
            defaultValue: any;
            modelName: string;
        };
        indexes: {
            name: string;
            fields: string;
            isAscending: boolean;
            isUnique: boolean;
            description: string;
        }[];
        dateFieldsTimeReference: {
            timeZone: string;
            respectsDaylightSaving: boolean;
        };
        types: {
            id: string;
            name: string;
            domains: {
                status: {
                    type: string;
                };
            };
            templates: {
                name: string;
                description: string;
                prototype: {
                    attributes: {
                        req_id: any;
                        district: any;
                        status: number;
                        req_type: string;
                        req_date: any;
                        req_time: any;
                        address: any;
                    };
                };
                drawingTool: string;
            }[];
        }[];
        templates: any[];
        maxRecordCount: number;
        supportedQueryFormats: string;
        capabilities: string;
        useStandardizedQueries: boolean;
        standardMaxRecordCount: number;
        tileMaxRecordCount: number;
        maxRecordCountFactor: number;
    };
    queries: ({
        url: string;
        result: {
            abc: number;
            count?: undefined;
            fields?: undefined;
            features?: undefined;
        };
    } | {
        url: string;
        result: {
            count: number;
            abc?: undefined;
            fields?: undefined;
            features?: undefined;
        };
    } | {
        url: string;
        result: {
            fields: {
                alias: string;
                defaultValue: any;
                domain: any;
                name: string;
                sqlType: string;
                type: string;
            }[];
            features: {
                attributes: {
                    objectid: number;
                };
            }[];
            abc?: undefined;
            count?: undefined;
        };
    })[];
};
export default _default;
