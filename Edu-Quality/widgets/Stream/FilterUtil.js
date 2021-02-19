// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define(["jimu/dijit/Filter","dojo/dom-construct"],function(d,e){return{buildFilterInfoFromString:function(b,c,f){var a=new d,g=e.create("div");a.placeAt(g);a.startup();return a.buildByExpr(b.url,c,b).then(function(){return{inherited:!0,definitionExpression:c,name:f,filterInfo:a.toJson()}},function(){return null})}}});