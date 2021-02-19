// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define(["dojo/_base/array"],function(d){return{getStreamLayers:function(a){var b=[],c;d.forEach(a.graphicsLayerIds,function(e){c=a.getLayer(e);"esri.layers.StreamLayer"===c.declaredClass&&b.push(c)});b.reverse();return b},getStreamLayerName:function(a){a=/\/([^\/]+)\/StreamServer/.exec(a);return 1<a.length?a[1]:""}}});