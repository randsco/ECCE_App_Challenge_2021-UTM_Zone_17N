// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define(["dojo/_base/declare","jimu/BaseFeatureAction","jimu/WidgetManager","dojo/_base/array"],function(f,g,c,h){return f(g,{map:null,iconFormat:"png",isFeatureSupported:function(a){var b=!1,d=c.getInstance().loaded;d&&h.forEach(d,function(e){"SituationAwareness"===e.name&&0<e.incidents.length&&(b=!0)});return 1===a.features.length&&b&&a.features[0].geometry?!0:!1},onExecute:function(a){return c.getInstance().triggerWidgetOpen(this.widgetId).then(function(b){b._setEventLocation({feature:a.features[0],
type:"addRemove"})})}})});