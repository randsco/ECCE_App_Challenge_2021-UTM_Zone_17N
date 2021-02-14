import {  } from 'jimu-core';
import {loadArcGISJSAPIModules} from 'jimu-arcgis';

export function getFeatureLayer(dataSource) {
  return loadArcGISJSAPIModules([
    'esri/layers/FeatureLayer'
  ]).then(modules => {
    const [FeatureLayer] = modules;
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
  }).catch((e) => {
    console.warn(e);
    return null;
  });
}
