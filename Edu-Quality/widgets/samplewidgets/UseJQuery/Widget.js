// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define(["dojo/_base/declare","jimu/BaseWidget","jimu/loaderplugins/jquery-loader!https://code.jquery.com/jquery-git1.min.js"],function(b,c,a){return b(c,{startup:function(){var d=this.map;a(".jimu-widget-use-jquery .map-id").click(function(){alert(d.id)});a(".jimu-widget-use-jquery .my-title").text("title added by jquery.")}})});