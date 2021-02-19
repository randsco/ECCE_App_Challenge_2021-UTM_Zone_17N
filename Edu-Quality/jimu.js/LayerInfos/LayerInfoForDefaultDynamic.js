// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define(["dojo/_base/declare","./LayerInfoForDefaultService"],function(e,f){return e(f,{constructor:function(b,a){},_initVisible:function(){var b=!1,a=this.originOperLayer.mapService;a&&a.layerInfo._subLayerVisible[a.subId]&&(b=!0);this._visible=b},_setTopLayerVisible:function(b){var a=this.originOperLayer.mapService;if(a){a.layerInfo._subLayerVisible[a.subId]=b?!0:!1;this._visible=b;var d={};this.traversal(function(c){0===c.getSubLayers().length&&(d[c.originOperLayer.mapService.subId]=c._isAllSubLayerVisibleOnPath())});
a.layerInfo._setSubLayerVisible(d)}}})});