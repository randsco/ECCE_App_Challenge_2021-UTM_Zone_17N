// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define(["dojo/_base/declare","dijit/Destroyable"],function(b,c){return b(c,{"-chains-":{setConfig:"after",getConfig:"before"},_name:null,_config:null,_mainDiv:null,constructor:function(a){this._name=a},div:function(){return this._mainDiv},setConfig:function(a){this._name&&(this._config=a[this._name])},getConfig:function(a,d){this._name&&(a[this._name]=this._config)}})});