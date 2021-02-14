/** @jsx jsx */
import { React, jsx, AllWidgetProps, MessageManager, DataRecordsSelectionChangeMessage,
  DataSource, FeatureLayerDataSource/*getAppStore, appActions, DataRecord, IMSqlExpression*/} from 'jimu-core';
//import { JimuMapViewComponent } from 'jimu-arcgis';
import { Button, WidgetPlaceholder } from 'jimu-ui';
//import { IMDataSourceJson, IMUseDataSource } from './types/app-config';
import { IMConfig, FontSizeType } from '../config';
import {getStyle} from './lib/style';
import defaultMessages from './translations/default';
const featureInfoIcon = require('./assets/icon.svg');
import FeatureInfo from './components/feature-info';
import {DataLoader, CurrentData }from './components/data-loader';
import {versionManager} from '../version-manager';

export enum LoadStatus {
  Pending = 'Pending',
  Fulfilled = 'Fulfilled',
  Rejected = 'Rejected'
}

export interface WidgetProps extends AllWidgetProps<IMConfig> {
}

export interface WidgetState{
  //mapViewWidgetId: string;
  //layerDataSourceId: string;
  //selectedGraphicIndex: number;
  //currentData: CurrentData;
  currentDataId: string;
  currentDataIndex: number;
  loadDataStatus: LoadStatus;
  //sqlExprObj: any;
  //maxGraphics: number;
  //limitGraphics: boolean;
}


export default class Widget extends React.PureComponent<WidgetProps, WidgetState>{

  public  viewFromMapWidget: __esri.MapView | __esri.SceneView;
  private currentData: CurrentData;
  private dataSource: DataSource;

  public refs: {
    mapContainer: HTMLInputElement;
  }

  constructor(props) {
    super(props);
    //this.graphics = [];
    //this.records = [];
    this.currentData = null;

    //const useDataSource = this.props.useDataSources &&
    //                    this.props.useDataSources[0];
    //const sqlExprObj = useDataSource && useDataSource.query;
    this.state = {
      //mapViewWidgetId: null,
      //layerDataSourceId: null,
      currentDataId: null,
      currentDataIndex: 0,
      loadDataStatus: LoadStatus.Pending,
      //currentData: null,
      //selectedGraphicIndex: 0,
      //sqlExprObj: sqlExprObj || null,
      //maxGraphics: this.props.config.maxGraphics,
      //limitGraphics: this.props.config.limitGraphics
    };
  }

  static versionManager = versionManager;

  componentDidMount() {
  }

  componentDidUpdate() {
    // compatible with old version if 'displayFeature' action be configured.
    //if (this.props.mutableStateProps) {
    //  this.handleAction(this.props.mutableStateProps);
    //}
    const useDataSource = this.props.useDataSources &&
                        this.props.useDataSources[0];
    if(!useDataSource) {
      this.setState({
        currentDataId: null,
        currentDataIndex: 0
      });
      this.currentData = null;
    }
  }

  handleAction(mutableStateProps) {
    //const record = mutableStateProps.displayFeatureActionValue && mutableStateProps.displayFeatureActionValue.record;
    //if (record && this.dataSource.id === record.dataSource.id) {
    //  const selectedGraphicIndex = this.getIndexByRecord(record);
    //  if(selectedGraphicIndex > -1) {
    //    getAppStore().dispatch(appActions.widgetMutableStatePropChange(this.props.id, 'displayFeatureActionValue.record', null));
    //    this.setState({
    //      selectedGraphicIndex: selectedGraphicIndex
    //    });
    //  }
    //}
  }

  selectGraphic() {
    const record = this.currentData?.record;
    if(record && this.dataSource){
      MessageManager.getInstance().publishMessage(new DataRecordsSelectionChangeMessage(this.props.id, [record]));
      const selectedRecordIds = this.dataSource.getSelectedRecordIds();
      const recordId = record.getId();
      if(selectedRecordIds.indexOf(recordId) < 0) {
        (this.dataSource as FeatureLayerDataSource).queryById(recordId).then((record) => {
          this.dataSource.selectRecordsByIds([recordId], [record]);
        });
      }
    }
  }

  getStyleConfig() {
    if(this.props.config.style) {
      return this.props.config.style;
    } else {
      return {
        textColor: '',
        fontSizeType: FontSizeType.auto,
        fontSize: null,
        backgroundColor: ''
      }
    }
  }

  onPreGraphicBtnClick = () => {
    let index = this.state.currentDataIndex;
    if(index > 0) {
      this.setState({
        currentDataIndex: --index
      });
    }

  }

  onNextGraphictBtnClick = () => {
    let index = this.state.currentDataIndex;
    if(index < this.currentData.count - 1) {
      this.setState({
        currentDataIndex: ++index
      });
    }
  }

  //onActiveViewChange = (view) => {
  //  this.viewFromMapWidget = view;
  //  const useMapWidget = this.props.useMapWidgetIds &&
  //                      this.props.useMapWidgetIds[0];
  //  if(view || !useMapWidget) {
  //    this.setState({
  //      mapViewWidgetId: useMapWidget
  //    });
  //  }
  //}

  onSelectedRecordIdChanged = (index, dataSourceId) => {
    if(index > -1 && this.dataSource.id === dataSourceId) {
      this.setState({
        currentDataIndex: index
      });
    }
  }

  onDataLoading = () => {
    this.setState({ loadDataStatus: LoadStatus.Pending});
  }

  onDataFulfilled = () => {
    this.setState({ loadDataStatus: LoadStatus.Fulfilled});
  }

  onDataChanged = (dataSource, currentData) => {
    this.dataSource = dataSource;
    this.currentData = currentData;
    this.setState({
      currentDataId: this.currentData ? this.currentData.id : null,
      currentDataIndex: this.currentData ? this.currentData.index : null,
      loadDataStatus: LoadStatus.Fulfilled
    });
    this.selectGraphic();
  }

  render() {
    const useMapWidget = this.props.useMapWidgetIds &&
                        this.props.useMapWidgetIds[0];
    const useDataSource = this.props.useDataSources &&
                        this.props.useDataSources[0];

    let dataSourceContent = null;
    dataSourceContent = (
      <DataLoader useDataSource={useDataSource}
        widgetId={this.props.id}
        index={this.state.currentDataIndex}
        limitGraphics={this.props.config.limitGraphics}
        maxGraphics={this.props.config.maxGraphics}
        onSelectedRecordIdChanged={this.onSelectedRecordIdChanged}
        onDataLoading={this.onDataLoading}
        onDataFulfilled={this.onDataFulfilled}
        onDataChanged={this.onDataChanged}/>
    );

    let content = null;
    if(this.props.config.useMapWidget ? !useMapWidget : !useDataSource) {
      content = (
        <div className="widget-featureInfo">
          <WidgetPlaceholder icon={featureInfoIcon} message={this.props.intl.formatMessage({id: '_widgetLabel', defaultMessage: defaultMessages._widgetLabel})} widgetId={this.props.id}/>
        </div>
      );
      this.currentData = null;
    } else {
      let loadingContent = null;
      if(this.state.loadDataStatus === LoadStatus.Pending) {
        loadingContent = (
          <div style={{ position: 'absolute', left: '50%', top: '50%'}} className="jimu-secondary-loading"/>
        );
      }
      let navContent = null;
      if(this.currentData && this.currentData.count > 1) {
        const featureNumbers = this.props.intl.formatMessage({id: 'featureNumbers', defaultMessage: defaultMessages.featureNumbers},
          {index: this.currentData.index + 1, count: this.currentData.count});
        navContent = (
          <div className="nav-section d-flex justify-content-center align-items-center">
            <Button className="nav-btn" type="tertiary" size="sm" onClick={this.onPreGraphicBtnClick}> {'<'} </Button>
            <span> {featureNumbers} </span>
            <Button className="nav-btn" type="tertiary" size="sm" onClick={this.onNextGraphictBtnClick}> {'>'} </Button>
          </div>
        );
      }

      const visibleElements = {
        title: this.props.config.title,
        content: {
          fields: this.props.config.fields,
          text: this.props.config.fields,
          media: this.props.config.media,
          attachments: this.props.config.attachments
        },
        lastEditedInfo: this.props.config.lastEditInfo
      };

      let featureInfoContent;
      if(this.currentData && this.dataSource) {
        featureInfoContent = (
          <FeatureInfo graphic={this.currentData.graphic}
            visibleElements={visibleElements}
            dataSource={this.dataSource}/>
        );
      } else {
        featureInfoContent = (
          <div className="no-data-message p-4 font-weight-bold"
            dangerouslySetInnerHTML=
              {{__html: this.props.config.noDataMessage || this.props.intl.formatMessage({id: 'noDeataMessageDefaultText', defaultMessage: defaultMessages.noDeataMessageDefaultText})}}>
          </div>
        );
      }

      content = (
        <div className="widget-featureInfo">
          {loadingContent}
          {navContent}
          {featureInfoContent}
          <div style={{position: 'absolute', opacity: 0}} ref="mapContainer">mapContainer</div>
          <div style={{position: 'absolute', display: 'none'}}>
            {dataSourceContent}
          </div>
        </div>
      );
    }

    return (
      <div css={getStyle(this.props.theme, this.props.config.styleType, this.getStyleConfig())} className="jimu-widget">
        {content}
      </div>
    );
  }
}
