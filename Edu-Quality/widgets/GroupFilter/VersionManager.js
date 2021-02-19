// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define(["jimu/shared/BaseVersionManager"],function(e){function c(){this.versions=[{version:"2.1",upgrader:function(a){return a}},{version:"2.2",upgrader:function(a){a.webmapAppendMode=!1;a.slAppendChoice="OR";a.zoomMode=!0;for(var b=0;b<a.groups.length;b++){a.groups[b].appendSameLayer=!1;a.groups[b].appendSameLayerConjunc="OR";for(var d=0;d<a.groups[b].layers.length;d++)a.groups[b].layers[d].useZoom=!1}return a}},{version:"2.5",upgrader:function(a){a.persistOnClose=!0;return a}}]}c.prototype=new e;
return c.prototype.constructor=c});