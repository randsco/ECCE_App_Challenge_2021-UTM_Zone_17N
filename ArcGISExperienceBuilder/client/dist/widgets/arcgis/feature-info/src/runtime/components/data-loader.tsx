import {React, DataSource, FeatureLayerQueryParams, DataSourceComponent, IMUseDataSource, QueriableDataSource, IMDataSourceInfo, DataSourceStatus, DataRecord,
  DataSourceTypes, QueryParams} from 'jimu-core';
import {loadArcGISJSAPIModules} from 'jimu-arcgis';

interface OnDataLoadFunc {
  (): void;
}

interface OnDataChangedFunc {
  (dataSource: DataSource, currentData: CurrentData): void;
}

interface OnSelectedRecordIdChanged{
  (index: number, dataSourceId: string): void;
}

interface Props {
  widgetId: string;
  useDataSource: IMUseDataSource;
  index: number;
  limitGraphics: boolean;
  maxGraphics: number;
  onDataLoading: OnDataLoadFunc;
  onDataFulfilled: OnDataLoadFunc;
  onDataChanged: OnDataChangedFunc;
  onSelectedRecordIdChanged: OnSelectedRecordIdChanged;
}

interface State{
  dataSourceId: string;
  dataSourceStatus: DataSourceStatus;
  dataSourceWidgetQueries: any;
  dataSourceVersion: number;
}

export interface CurrentData {
  id: string;
  count: number;
  index: number;
  graphic: __esri.Graphic;
  record: DataRecord;
  dataSourceId: string;
}

interface DataBuffer {
  count: number;
  dataMap: Record<number, CurrentData>;
  pagingNum: number;
  //dataObjectIds: string[];
}

export class DataLoader extends React.PureComponent<Props, State>{
  private previousIndex: number;
  private dataSource: QueriableDataSource;
  private dataBuffer: DataBuffer;
  private previousData: CurrentData;
  private isFirstLoad: boolean;

  constructor(props) {
    super(props);
    this.state = {
      dataSourceId: null,
      dataSourceStatus: DataSourceStatus.Loaded,
      dataSourceVersion: undefined,
      dataSourceWidgetQueries: undefined
    };

    this.previousIndex = null;
    this.previousData = {
      id: null,
      count: null,
      index: null,
      graphic: null,
      record: null,
      dataSourceId: null
    };
    this.dataBuffer = {
      count: null,
      dataMap: {},
      pagingNum: 30,
      //dataObjectIds: []
    }
    this.isFirstLoad = false;
  }

  componentDidMount() {
    //if(this.dataSource) {
    //  this.dataSource.startAutoRefresh();
    //}
  }

  componentDidUpdate() {
    // const sqlExprObj = this.props.useDataSource && this.props.useDataSource.query;
    const sqlExprObj = null;
    if(this.props.useDataSource && this.state.dataSourceId === this.props.useDataSource.dataSourceId &&
        (this.state.dataSourceStatus === DataSourceStatus.Loaded || this.state.dataSourceStatus === DataSourceStatus.Unloaded)) {

      let index;
      if(this.props.index === this.previousIndex) {
        this.clearData();
        //this.previousIndex = null;
        //index = 0;
        index = this.props.index;
      } else {
        this.previousIndex = this.props.index;
        index = this.props.index;
      }

      let currentData = this.getData(index);
      if(currentData) {
        this.onDataChanged(this.dataSource, currentData);
      } else {
        return this.dataSource.queryCount({}).then(result => {
          const realCount = result.count;
          if(index >= realCount) {
            index = 0;
          }
          //const start = Math.floor(index / this.dataBuffer.pagingNum) * this.dataBuffer.pagingNum;
          this.queryGraphics(this.dataSource, sqlExprObj, index, this.dataBuffer.pagingNum, realCount).then((results) => {
            if(results.graphics.length === 0) {
              currentData = null;
            } else {
              this.addData(results, this.dataSource.id);
              currentData = this.getData(results.index);
            }
            this.onDataChanged(this.dataSource, currentData);
          });
        });

      }
    }
  }

  onDataChanged(dataSource, currentData) {
    if(!currentData) {
      this.props.onDataChanged(this.dataSource, currentData);
    } else if(this.previousData?.dataSourceId !== currentData?.dataSourceId ||
              this.previousData?.id !== currentData?.id ||
              this.previousData?.count !== currentData?.count ||
              this.previousData?.index !== currentData?.index) {
      // previousData is null.
      // previousData is not null.
      // currentData is not null.
      // previousData !== currentData
      this.props.onDataChanged(this.dataSource, currentData);
    } else {
      //previousData is not null.
      //currentData is not null.
      //previousData === currentData
      this.props.onDataFulfilled();
    }
    this.previousData = currentData;
  }

  addData(queryResult, dataSourceId) {
    queryResult.records.forEach((record, i) => {
      const index = queryResult.start + i;
      this.dataBuffer.dataMap[index] = {
        id: record.getId(),
        count: this.dataBuffer.count,
        index: index,
        graphic: queryResult.graphics[i],
        record: record,
        dataSourceId: dataSourceId
      }
    });
  }

  initData(count)  {
    //const maxCount = this.props.limitGraphics ? this.props.maxGraphics : Infinity;
    //this.dataBuffer.count = count < maxCount ? count : maxCount;
    this.dataBuffer.count = count;
    //this.dataBuffer.dataObjectIds = objectIds;
  }

  getData(index) {
    return this.dataBuffer.dataMap[index];
  }

  //getDataIndexByObjectId(objectId) {
  //  let index = -1;
  //  this.dataBuffer.dataObjectIds.some((oId, i) => {
  //    if(oId.toString() === objectId.toString()) {
  //      index = i;
  //      return true;
  //    } else {
  //      return false;
  //    }
  //  });
  //  return index;
  //}

  getDataIndexByObjectId(objectId): Promise<number> {
    let index = -1;
    const dataEntries = Object.entries(this.dataBuffer.dataMap);
    dataEntries.some( entry => {
      if(objectId === entry[1]?.id) {
        index = Number(entry[0]);
        return true;
      } else {
        return false;
      }
    });
    if(index < 0 && this.dataSource) {
      const idField = this.dataSource.getIdField();
      return this.dataSource.queryCount({where: `${idField}<=${objectId}`} as QueryParams).then(result => {
        index = result.count - 1;
        return index;
      });
    } else {
      return Promise.resolve(index);
    }
  }

  clearData() {
    this.dataBuffer.count = null;
    this.dataBuffer.dataMap = {};
    //this.dataBuffer.dataObjectIds = [];
  }

  isEmptyData() {
    return this.dataBuffer.count === null ? true : false;
  }

  getFeatureLayer(dataSource, FeatureLayer) {
    let featureLayer;
    if(dataSource.layer) {
      //return Promise.resolve(dataSource.layer);
      featureLayer = dataSource.layer;
    } else {
      if(dataSource.itemId) {
        featureLayer = new FeatureLayer({
          portalItem: {
            id: dataSource.itemId,
            portal: {
              url: dataSource.portalUrl
            }
          }
        });
      } else {
        featureLayer = new FeatureLayer({
          url: dataSource.url
        });
      }
    }

    // Bug: js-api does not enter the when callback if there is no load method here.
    return featureLayer.load().then(() => {
      return Promise.resolve(featureLayer);
    });

    /*
    return new Promise((resovle, reject) => {
      featureLayer.when(() => {
        console.log("when");
        resovle(featureLayer);
      }, () => {
        reject();
        console.log("when error");
      })
    });
    */
  }

  queryGraphics(dataSource, sqlExprObj, indexParam, num, realCount) {
    let index = indexParam;
    let start;
    this.props.onDataLoading();
    return loadArcGISJSAPIModules([
      //'esri/Graphic',
      //'esri/tasks/support/Query',
      //'esri/geometry/Extent',
      'esri/layers/FeatureLayer'
    ]).then(modules => {
      const [FeatureLayer] = modules;
      let featureLayer;
      ///const queryParams = this.getQueryParamsFromDataSource(dataSource);

      return this.getFeatureLayer(dataSource, FeatureLayer).then(layer => {
        featureLayer = layer;
        if(this.isEmptyData()) {
          this.initData(realCount);
        }
        if(this.isFirstLoad) {
          const selectedRecordId = dataSource.getSelectedRecordIds()[0];
          if(selectedRecordId !== undefined) {
            return this.getDataIndexByObjectId(selectedRecordId).then( (_index) => {
              index = (_index === -1) ?  0 : _index;
            });
          }
        }
      }).then(() => {

        start = Math.floor(index / this.dataBuffer.pagingNum) * this.dataBuffer.pagingNum;
        const query = {
          //where: where,
          outFields: ['*'],
          returnGeometry: true,
          //orderByFields: orderBy,
          page: Math.floor(start / num) + 1,
          pageSize: num
          //resultOffset: start,
          //resultRecordCount: num,
          //start: start,
          //num: num
        }

        return dataSource.query(query);

      }).then((queryResults) => {
        const records = queryResults.records;
        let graphics;
        if(dataSource.layer) {
          graphics = records.map(record => record.feature);
        } else {
          graphics = records.map(record => {
            record.feature.sourceLayer = featureLayer;
            return record.feature;
          });
        }
        this.isFirstLoad = false;
        return {
          index: index,
          start: start,
          num: num,
          graphics: graphics,
          records: records
        };
      });
    }).catch((e) => {
      console.warn(e);
      return {
        graphics: [],
        records: []
      };
    });
  }

  getOrderBy(dataSource, sqlExprObj) {
    const orderBy = [];
    let result;
    if(sqlExprObj && sqlExprObj.orderBy && sqlExprObj.orderBy.length > 0){

      sqlExprObj.orderBy.forEach(sortData => {
        if(sortData.jimuFieldName){
          orderBy.push(`${sortData.jimuFieldName} ${sortData.order}`);
        }
      })
      if(dataSource.type === DataSourceTypes.FeatureLayer){
        result = orderBy.join(',');
      }else{
        result = orderBy;
      }
    }
    return result;
  }

  getQueryParamsFromDataSource(dataSource: QueriableDataSource): FeatureLayerQueryParams{
    return dataSource.getRealQueryParams({}, 'query');
  }

  loadGraphics(dataSource, sqlExprObj) {
    this.props.onDataLoading();
    return loadArcGISJSAPIModules([
      'esri/layers/FeatureLayer',
      'esri/tasks/support/Query',
    ]).then(modules => {
      const [FeatureLayer, Query] = modules;
      const query = new Query();
      let featureLayer = dataSource.layer;
      const sqlExpr = sqlExprObj && sqlExprObj.where.sql;
      let num;
      query.where = sqlExpr ? sqlExpr : '1=1';
      //query.outSpatialReference = view.spatialReference;
      query.returnGeometry = false;
      query.outFields = ['*'];
      this.props.maxGraphics === 0 ? num = null : num = this.props.maxGraphics;
      query.num = this.props.limitGraphics ? num : null;

      if(!featureLayer && dataSource.url) {
        featureLayer = new FeatureLayer({
          url: dataSource.url
        });
      }
      if(featureLayer) {
        return featureLayer.queryFeatures(query).then((featureSet) => {
          return featureSet.features;
        });
      } else {
        return [];
      }
    }).catch((e) => {
      console.warn(e);
      return [];
    });
  }

  onDataSourceCreated = (dataSource: QueriableDataSource): void => {
    this.dataSource = dataSource;
    this.previousIndex = this.props.index;
    this.isFirstLoad = true;
    this.setState({
      dataSourceId: this.dataSource.id
    });
  }

  //onQueryStatusChange = (status: DataSourceStatus): void => {
  //}

  onCreateDataSourceFailed = (error): void => {
  }

  onDataSourceInfoChange = (info: IMDataSourceInfo) => {
    if (!info) {
      return;
    }
    if(this.isFirstLoad) {
      return;
    }
    // handle filter change
    this.setState({
      //dataSourceStatus: info.status,
      //dataSourceVersion: info.version,
      dataSourceWidgetQueries: info.widgetQueries
    });

    // handle selection change
    const selectedId = info.selectedIds && info.selectedIds[0];
    if(selectedId) {
      this.getDataIndexByObjectId(selectedId).then( index => {
        if(index > -1 && index < this.dataBuffer.count) {
          this.props.onSelectedRecordIdChanged(index, this.dataSource.id);
        }
      });
    }
  }

  render() {
    return (
      <DataSourceComponent useDataSource={this.props.useDataSource}
        query={{}}
        widgetId={this.props.widgetId}
        onDataSourceCreated={this.onDataSourceCreated}
        //onQueryStatusChange={this.onQueryStatusChange}
        onDataSourceInfoChange={this.onDataSourceInfoChange}
        onCreateDataSourceFailed={this.onCreateDataSourceFailed}/>
      //<DataQueryComponent useDataSource={this.props.useDataSource}
      //  query={null}
      //  onDataSourceCreated={this.onDataSourceCreated}
      //  //onQueryStatusChange={this.onQueryStatusChange}
      //  onDataSourceInfoChange={this.onDataSourceInfoChange}
      //  onCreateDataSourceFailed={this.onCreateDataSourceFailed}/>
    );
  }
}
