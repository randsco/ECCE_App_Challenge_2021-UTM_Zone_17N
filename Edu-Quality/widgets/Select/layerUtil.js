// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define(["dojo/_base/array","dojo/promise/all","dojo/Deferred"],function(d,g,h){return{getLayerInfoArray:function(b){var e=new h,c=[];b.traversal(function(a){c.push(a)});b=d.map(c,function(a){return a.getLayerType()});g(b).then(function(a){var f=[];d.forEach(a,function(k,l){"FeatureLayer"===k&&f.push(c[l])});e.resolve(f)});return e}}});