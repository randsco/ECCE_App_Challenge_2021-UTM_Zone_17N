import { React, MessageManager, DataRecordsSelectionChangeMessage} from 'jimu-core';

import {  AllWidgetProps } from 'jimu-core';
import * as MapView from 'esri/views/MapView';
import * as WebMap from 'esri/WebMap';
import * as PortalItem from 'esri/portal/PortalItem';
import * as Query from 'esri/tasks/support/Query';
import { FeatureDataRecordImpl } from 'jimu-core/data-source';

interface Config{
  webmapId: string;
}
export default class Widget extends React.PureComponent<AllWidgetProps<Config>, unknown>{
  mapContainer = React.createRef<HTMLDivElement>();
  mapView: MapView;
  webMap: WebMap;
  highLightHandle;

  componentDidMount() {
    const webmapId = this.props.config.webmapId;
    if (!webmapId) {
      console.error('Please config webmap id.')
      return;
    }

    if (!this.webMap) {
      this.webMap = new WebMap({
        portalItem: new PortalItem({
          id: webmapId
        })
      });
    }

    if (!this.mapView) {
      const options: __esri.MapViewProperties = {
        map: this.webMap,
        container: this.mapContainer.current,
        popup: null
      };
      this.mapView = new MapView(options);

      this.mapView.when(() => {
        this.mapView.on('click', this.onMapClick);
      });

    }
  }

  onMapClick = (screenPoint) => {
    this.mapView.hitTest(screenPoint).then(response => {
      if (response.results.length) {
        response.results.forEach(result => {
          const graphic = result.graphic;
          const layerId = graphic.layer.id;
          const layerView: __esri.FeatureLayerView = this.mapView.layerViews.toArray().find(v => v.layer.id === layerId) as __esri.FeatureLayerView;
          if(this.highLightHandle){
            this.highLightHandle.remove();
            this.highLightHandle = null;
          }
          this.highLightHandle = layerView.highlight(graphic);

          const query = new Query({
            where: `objectid = ${graphic.attributes['objectid']}`,
            outFields: ['*'],
            returnGeometry: true
          })

          const layer = graphic.layer as __esri.FeatureLayer;
          layer.queryFeatures(query).then((results) => {
            if (results.features && results.features[0]) {
              console.log(this.props.id);
              MessageManager.getInstance().publishMessage(new DataRecordsSelectionChangeMessage(this.props.id, [new  FeatureDataRecordImpl (results.features[0], null, false)]));
            }
          });
        });
      }
    });
  }

  render() {
    if (!this.props.config.webmapId) {
      return 'Please choose webmap in setting';
    }
    return <div style={{width: '100%', height: '100%'}}>
      <h5>This widget will publish <b>DATA_RECORDS_SELECTION_CHANGE</b>message</h5>
      <div className="widget-map" style={{width: '100%', height: 'calc(100% - 30px)'}} ref={this.mapContainer}></div>
    </div>;
  }
}
