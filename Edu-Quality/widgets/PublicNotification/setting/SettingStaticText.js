// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define(["dojo/_base/declare","jimu/utils","./settingComponents","./SettingObject"],function(b,c,d,e){return b(e,{constructor:function(a,f,g){this._name="";this._mainDiv=d.text(f,g)},setValue:function(a){this._mainDiv.innerHTML=c.sanitizeHTML(a||"")},getValue:function(){return this._mainDiv.innerHTML}})});