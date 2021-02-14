import {React, DataSource} from 'jimu-core';
import {loadArcGISJSAPIModules} from 'jimu-arcgis';

export enum LoadStatus {
  Pending = 'Pending',
  Fulfilled = 'Fulfilled',
  Rejected = 'Rejected'
}

interface VisibleElements{
  title: boolean;
  content: {
    fields: boolean;
    text: boolean;
    media: boolean;
    attachments: boolean;
  };
  lastEditedInfo: boolean;
}

interface Props{
  dataSource: DataSource;
  graphic: __esri.Graphic;
  visibleElements: VisibleElements;
}

interface State{
  loadStatus: LoadStatus;
}

export default class FeatureInfo extends React.PureComponent<Props, State>{
  private Feature: typeof __esri.Feature;
  private feature: __esri.Feature;

  public refs: {
    featureContainer: HTMLInputElement;
  }
  constructor(props) {
    super(props);
    this.state = {
      loadStatus: LoadStatus.Pending
    };
  }

  componentDidMount() {
    this.createFeature();
  }

  componentDidUpdate() {
    if(this.feature) {
      const graphic = {popupTemplate: {content: ''}};
      //@ts-ignore
      this.feature.graphic = this.props.graphic || graphic;
      this.feature.visibleElements = this.props.visibleElements;
    }
  }

  destoryFeature() {
    this.feature && !this.feature.destroyed && this.feature.destroy();
  }

  createFeature() {
    let featureModulePromise;
    if(this.Feature) {
      featureModulePromise = Promise.resolve();
    } else {
      featureModulePromise = loadArcGISJSAPIModules([
        'esri/widgets/Feature'
      ]).then(modules => {
        [
          this.Feature
        ] = modules;
      });
    }
    return featureModulePromise.then( () => {
      const container = document && document.createElement('div');
      container.className = 'jimu-widget';
      this.refs.featureContainer.appendChild(container);

      const rootDataSource = this.props.dataSource.getRootDataSource();

      this.destoryFeature();
      this.feature = new this.Feature({
        container: container,
        defaultPopupTemplateEnabled: true,
        //@ts-ignore
        spatialReference: this.props.dataSource?.layer?.spatialReference || null,
        //@ts-ignore
        map: rootDataSource?.map || null
      });
    }).then(() => {
      this.setState({loadStatus: LoadStatus.Fulfilled});
    });
  }

  render() {
    return (
      <div className="feature-info-component">
        <div ref="featureContainer"></div>
      </div>
    );
  }
}
