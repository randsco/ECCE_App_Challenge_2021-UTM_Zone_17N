// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define(["dojo/_base/declare","jimu/BaseWidget","jimu/DataSourceManager"],function(c,d,e){return c([d],{baseClass:"jimu-widget-dsc",startup:function(){var a=e.getInstance().getData(this.config.dataSourceId);a&&this._updateUI(a)},onDataSourceDataUpdate:function(a,b){a===this.config.dataSourceId&&this._updateUI(b)},_updateUI:function(a){this.countNode.innerText=a.features?a.features.length:0;this.sumNode.innerText=a.features?a.features.reduce(function(b,f){return b+f.attributes[this.config.summaryField]}.bind(this),
0):0}})});