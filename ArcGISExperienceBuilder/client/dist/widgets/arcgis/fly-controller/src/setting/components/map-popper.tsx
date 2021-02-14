/** @jsx jsx */
import {
  UseDataSource, React, jsx, ImmutableArray, APP_FRAME_NAME_IN_BUILDER, Immutable, /*lodash,*/
  ThemeVariables, css, polished, getAppStore, /*ImmutableObject, LayoutType, ResourceType,*/ IntlShape
} from 'jimu-core';
import { Button, /*Modal, ModalBody, ModalFooter,*/ FloatingPanel, /*ImageFillMode,*/ Icon } from 'jimu-ui';
import { JimuMapView, loadArcGISJSAPIModules, JimuMapViewGroup } from 'jimu-arcgis';
import { Draw, JimuMap/*, DrawToolClass*/ } from 'jimu-ui/advanced/map';
import { IMConfig } from '../../config';
//import { AppResourceManager, ResourceItemInfo } from 'jimu-for-builder';
import InteractivePanel from '../../common/interactive-panel';

//import * as externalRenderers from 'esri/views/3d/externalRenderers';

interface Props {
  theme: ThemeVariables;
  useMapWidgetIds?: ImmutableArray<string>
  useDataSources?: ImmutableArray<UseDataSource>;
  jimuMapView: JimuMapView;
  config?: IMConfig;
  buttonLabel?: string;
  title?: string;
  intl: IntlShape;
  widgetId?: string;
  isShowDialog?: boolean;
  onShowDialogChange:((isShow:boolean)=>void);
}

interface States {
  //isShowDialog: boolean;
  // currentDrawTool: DrawToolClass;
  jimuMapView: JimuMapView;
  // graphics?: any[];
  apiLoaded: boolean;
  graphicsLayer?: __esri.GraphicsLayer;// | __esri.FeatureLayer;
  // isSwitching: boolean;
  // expand: boolean;
  // bookmarkActiveId: number;
  // configUpdate: boolean;
  // updateFlag: string;
  // updateConfig?: ImmutableObject<Bookmark>;
  // viewGroup: JimuMapViewGroup;
  // closeConfirmOpen: boolean;
  mapSize: SizeObj;
  mapRatio: number;
  // isDrawToolsOpen: boolean;
  // viewEditable: boolean;
}

interface SizeObj {
  width: number;
  height: number;
}

export class MapPopper extends React.PureComponent<Props, States>{
  panelRef: InteractivePanel;
  graphicsLayersMap: Map<string, __esri.GraphicsLayer>;
  Graphic: typeof __esri.Graphic = null;
  GraphicsLayer: typeof __esri.GraphicsLayer = null;

  constructor(props){
    super(props);

    this.state = {
      //isShowDialog: this.props.isShowDialog,
      // currentDrawTool: null,
      jimuMapView: null,
      // graphics: [],
      apiLoaded: false,
      // isSwitching: false,
      // expand: false,
      // bookmarkActiveId: 0,
      // configUpdate: false,
      // updateFlag: 'new',
      // viewGroup: undefined,
      // closeConfirmOpen: false,
      mapSize: this.getDefalutSize(),
      mapRatio: 1,//this.getMapRatio(),
      // isDrawToolsOpen: true,
      // viewEditable: true,
    }

    this.graphicsLayersMap = new Map();
  }

  onRef = (ref) => {
    this.panelRef = ref;
  }

  // componentDidUpdate(prevProps: Props, prevState: States) {
  //   if (this.props.isShowDialog !== prevProps.isShowDialog) {

  //     if(this.props.isShowDialog){
  //       this.handleClickOpen();
  //     }else{
  //       this.handleClickClose();
  //     }
  //   }
  // }
  componentDidMount() {
    if (!this.state.apiLoaded) {
      loadArcGISJSAPIModules([
        'esri/Graphic',
        'esri/layers/GraphicsLayer',
        //'esri/widgets/LayerList',
        //'esri/geometry/Extent',
        //'esri/Viewpoint'
      ]).then(modules => {
        [this.Graphic, this.GraphicsLayer/*, this.LayerList, this.Extent, this.Viewpoint*/] = modules;
        this.setState({apiLoaded: true});
      })
    }
  }

  getPoperStyle = (theme: ThemeVariables) => {
    return css`
        .popper-content {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        .popper-header {
            width: 100%;
            flex-shrink: 0;
            flex-grow: 0;
            cursor: move;
        }
        .map-container{
            width: 800px;
            height: 800px;
            background-color: gray;
            display: contents;
        }
        .popper-footer{
            background:${theme.colors.palette.light[300]};
            color:${theme.colors.palette.dark[600]};
            padding: ${polished.rem(8)} ${polished.rem(12)};
            .left-btn {
            position: absolute;
            margin: 6px;
            }
            .left-tool {
            position: absolute;
            left: 55px;
            z-index: 10;
            }
            .right-btn{
            height: 45px;
            padding: 6px 2px;
            .btn {
                min-width: 80px;
            }
            }
        }
        }
    `;
  }

  // handleClickOpen = () => {
  //   this.setState({
  //     isShowDialog: true,
  //     //viewEditable: true,
  //   });
  // }
  handleClickClose = () => {
    this.props.onShowDialogChange(false);
    // this.setState({
    //   isShowDialog: false,
    //   //viewEditable: true,
    // });
  }

  resizeRatio = (size) => {
    const maxElem = this.querySelector('body');
    const maxClientRect = maxElem.getBoundingClientRect();
    const { mapRatio } = this.state;
    let { width } = size;
    if(width > 1080) width = 1080;
    let height = width/mapRatio + 111;
    if(height > maxClientRect.height) {
      height = maxClientRect.height;
      width = (maxClientRect.height - 111)*mapRatio;
    }
    this.setState({ mapSize: { width, height } });
  }
  querySelector(selector: string): HTMLElement {
    const appFrame: HTMLFrameElement = document.querySelector(`iframe[name="${APP_FRAME_NAME_IN_BUILDER}"]`);
    if (appFrame) {
      const appFrameDoc = appFrame.contentDocument || appFrame.contentWindow.document;
      return appFrameDoc.querySelector(selector);
    }
    return null;
  }
  getDefalutSize = () => {
    let innerSize = { width: 770, height: 850 };
    if(!this.props.useMapWidgetIds){
      return innerSize;
    }

    const layoutElem = this.querySelector(`div.widget-renderer[data-widgetid="${this.props.useMapWidgetIds[0]}"]`);
    const maxHeight = document.querySelector('#default').clientHeight - 20;

    if (layoutElem) {
      const clientRect = layoutElem.getBoundingClientRect();
      const ratio = clientRect.width/clientRect.height || 1;
      let defaultExpandWidth = clientRect.width*1.1;
      let defaultExpandHeight = clientRect.height*1.1 + 111;
      // width
      if(defaultExpandWidth < 770) {
        defaultExpandWidth = 770;
        defaultExpandHeight = 770/ratio + 111;
      } else if(defaultExpandWidth > 1080) {
        defaultExpandWidth = 1080;
        defaultExpandHeight = 1080/ratio + 111;
      }
      // height
      if(defaultExpandHeight > maxHeight) {
        defaultExpandHeight = maxHeight;
        defaultExpandWidth = (maxHeight - 111)*ratio > 770 ? (maxHeight - 111)*ratio : 770;
      }
      innerSize = {
        width: defaultExpandWidth,
        height: defaultExpandHeight
      }
    }
    return innerSize;
  }
  getWidgetPosition = () => {
    let pos = { x: 500, y: 50 };
    const innerSize = this.getDefalutSize();
    pos = { x: document.body.clientWidth - innerSize.width - 260, y: 50 };
    return pos;
  }


  handleActiveViewChange = (mapView: JimuMapView) => {
    //this.setState({jimuMapView: jimuMapView});
    //const { /*jimuMapView, graphicsLayer*/ } = this.state;

    let currentGraphicsLayer;
    if (mapView) {
      //const mapViewId = mapView.id;
      currentGraphicsLayer = this.graphicsLayersMap.get(mapView.id);
      if (!currentGraphicsLayer) {
        currentGraphicsLayer = new this.GraphicsLayer({ title: 'Bookmark edit layer'});
        //jimuMapView.view.map.add(graphicsLayer);
        this.graphicsLayersMap.set(mapView.id, currentGraphicsLayer);
      }
    }

    this.setState({
      graphicsLayer: currentGraphicsLayer,
      jimuMapView: mapView,
    });
  }
  handleViewGroupCreate = (viewGroup: JimuMapViewGroup) => {
    // Object.keys(viewGroup.jimuMapViews).forEach(function(key){
    //   let view = viewGroup.jimuMapViews[key];

    //   if(view.datasourceId === this.props.activeMapviewId && false===view.isActive) {
    //     viewGroup.switchMap().then(() => {
    //       //       this.showDialogAndEdit();
    //     })
    //     return;
    //   }
    // });
  }

  onDrawToolCreatedCallback = (drawTool) => {
    // this.setState({
    //   currentDrawTool: drawTool
    // });
  }

  // toggleDrawTools = () => {
  //   const { isDrawToolsOpen } = this.state;
  //   this.setState({ isDrawToolsOpen: !isDrawToolsOpen });
  // }

  onDrawEndCallback = (newGraphic: __esri.Graphic) => {
    // const { graphics } = this.state;
    // const newGraphicJson = newGraphic.toJSON();
    // // use id to edit and delete graphics, id is now already produce by Draw
    // //newGraphicJson.attributes.id = utils.getUUID();
    // this.setState({
    //   configUpdate: true,
    //   graphics: graphics.concat(newGraphicJson),
    // });

    //const newGraphicJson = newGraphic.toJSON();
  }

  onGraphicEditedCallback = (result: {type: 'deleted' | 'modified', graphic: __esri.Graphic}) => {
    // const { graphics:originGraphics } = this.state;
    // const jsonGraphic = result.graphic.toJSON();
    // const updateIndex = originGraphics.findIndex(item => item.attributes.id === jsonGraphic.attributes.id);
    // // Handle the problem of triggering a callback function when clicked
    // const orgGraphicGeo = updateIndex > -1 ? originGraphics[updateIndex].geometry : {};
    // const newGraphicGeo = jsonGraphic.geometry;
    // const orgGraphicSym = updateIndex > -1 ? originGraphics[updateIndex].symbol : {};
    // const newGraphicSym = jsonGraphic.symbol;
    // // when click save button trigger the editCallback
    // if(this.isSaving) {
    //   if(lodash.isDeepEqual(orgGraphicGeo,newGraphicGeo) && lodash.isDeepEqual(orgGraphicSym,newGraphicSym)) {
    //     return;
    //   }
    // } else {
    //   if(lodash.isDeepEqual(orgGraphicGeo,newGraphicGeo) && result.type === 'modified') {
    //     return;
    //   }
    // }
    // if(result.type === 'deleted') {
    //   if(updateIndex > -1) originGraphics.splice(updateIndex, 1);
    // } else if(result.type === 'modified') {
    //   if(updateIndex > -1) originGraphics[updateIndex] = jsonGraphic;
    // }
    // this.setState({
    //   configUpdate: true,
    //   graphics: originGraphics,
    // });
  }

  onDrawToolClearedCallback = () => {

  }


  render() {
    const isDrawToolsOpen = true;
    const { /*isShowDialog,*/ mapSize, jimuMapView, graphicsLayer } = this.state;
    // const { currentJimuMapView, isShowDialog, graphicsLayer, isSwitching,
    //   configUpdate, closeConfirmOpen, mapSize, isDrawToolsOpen, viewEditable } = this.state;
    const { title, theme, isShowDialog/*, intl, jimuMapView*/ } = this.props;
    //const settingConfig = this.props.config;

    const useMapWidget = this.props.useMapWidgetIds && this.props.useMapWidgetIds[0];
    const config = getAppStore().getState().appStateInBuilder.appConfig;
    const isRTL = getAppStore().getState().appStateInBuilder.appContext.isRTL;
    if (!config.widgets[useMapWidget]) {
      return null;
    }

    const useDataSource = config.widgets[useMapWidget].useDataSources;
    // const toolConfig = {
    //   canZoom: true,
    //   canHome: true,
    //   canSearch: true,
    //   canCompass: true,
    //   canLayers: true
    // }

    let jimuMapConfig;
    if(this.props.jimuMapView?.datasourceId){
      const initialMapDataSourceID = this.props.jimuMapView?.datasourceId;
      jimuMapConfig = Immutable({} as any).set('initialMapDataSourceID', initialMapDataSourceID);
      //this.props.jimuMapConfig ? this.props.jimuMapConfig.set('toolConifg', toolConfig) : Immutable({} as any);
    }

    const panelHeader = css`.header{
          background:${theme.colors.palette.light[300]};
          color:${theme.colors.palette.dark[600]};
          height: 50px;
          flex-shrink: 0;
          font-size: 1rem;
          font-weight: 500;
        }`;
    const floatingPanel = <FloatingPanel
      onHeaderClose={this.handleClickClose}
      defaultPosition={this.getWidgetPosition()}
      headerTitle={title}
      size={mapSize}
      minSize={{ width: 770, height: 850 }}
      disableResize
      css={panelHeader}
      className="surface-3"
      disableActivateOverlay={true}
      dragBounds="body"
    >
      <div className="rounded w-100 h-100" css={this.getPoperStyle(theme)}>
        <div className="popper-content">
          <div className="map-container" style={{height:'600px',width:'700px'}}>
            <JimuMap
              id={`${this.props.widgetId}editor`}
              useDataSources={useDataSource}
              jimuMapConfig={jimuMapConfig}
              onActiveViewChange={this.handleActiveViewChange}
              onViewGroupCreate={this.handleViewGroupCreate}
              // onExtentChanged={this.handleExtentChanged}
              // onViewPointChanged={this.handleViewPointChanged}
            />
          </div>
          <div className="popper-footer">
            <div className="left-btn">
              <Button icon type="tertiary" onClick={() => alert('111')}>
                <Icon css={css`${isRTL && 'transform: scaleX(-1);'}`}
                  icon={isDrawToolsOpen ? require('jimu-ui/lib/icons/arrow-left-12.svg') : require('jimu-ui/lib/icons/theme.svg')} className="mr-1" size={16} />
              </Button>

              {/*
              <InteractivePanel
                onRef={this.onRef}
                config={settingConfig}
                theme={theme}
                intl={intl}
                jimuMapView={this.state.jimuMapView}
              ></InteractivePanel>
              */}
            </div>

            <div className="left-tool">
              {
                jimuMapView &&//&& jimuMapView.view && !isSwitching && graphicsLayer && isDrawToolsOpen &&
                <Draw jimuMapView={jimuMapView}
                  onDrawToolCreated={this.onDrawToolCreatedCallback}
                  onDrawEnd={this.onDrawEndCallback}
                  onGraphicEdited={this.onGraphicEditedCallback}
                  onDrawToolCleared={this.onDrawToolClearedCallback}
                  layer={graphicsLayer}
                  creationMode={'continuous'}
                />
              }
            </div>

            <div className="float-right right-btn">
              {/*<Button className="mr-2" type="primary" onClick={this.handleClickUpdate}>{"save"}</Button>
              <Button className="mr-1" onClick={this.handleClickReset} disabled={!configUpdate}>{this.formatMessage('reset')}</Button>
               "float-right"*/}
            </div>
          </div>
        </div>
      </div>
    </FloatingPanel>;

    return <div className="w-100">
      {
        /* <Button className="w-100 text-dark map-popper-btn" type="primary" disabled={!viewEditable} onClick={() => this.handleNewOrEdit()}>
         {this.props.buttonLabel}
         </Button>*/
      }
      {isShowDialog && floatingPanel}
      {/*
        //closeConfirmOpen &&
        <Modal className="d-flex justify-content-center" isOpen={closeConfirmOpen} centered={true}>
          <ModalBody>
            {this.formatMessage('confirmUnsave')}
          </ModalBody>
          <ModalFooter>
            <Button type="primary" onClick={this.handleCloseOk}>
              {this.formatMessage('yes')}
            </Button>
            <Button type="secondary" onClick={this.handleCloseBtn}>
              {this.formatMessage('cancel')}
            </Button>
          </ModalFooter>
        </Modal>
      */}
    </div>;
  }
}