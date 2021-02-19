// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define("esri/main dojo/_base/lang dojo/_base/kernel dojo/_base/Deferred dojo/DeferredList dojo/_base/array".split(" "),function(k,l,d,e){var h=function(a){function c(b){a[b]||(a[b]=function(){var f=arguments;return e.when(a,function(g){Array.prototype.unshift.call(f,g.features||g);return h(d[b].apply(d,f))})})}if(!a)return a;a.then&&(a=l.delegate(a));a.total||(a.total=e.when(a,function(b){return k._isDefined(b.total)?b.total:b.length||0}));c("forEach");c("filter");c("map");c("some");c("every");return a};
return h});