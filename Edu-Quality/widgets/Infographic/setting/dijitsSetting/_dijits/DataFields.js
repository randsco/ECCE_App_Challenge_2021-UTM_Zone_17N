// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define(["dojo/_base/declare","dojo/query","jimu/dijit/_DataFields"],function(b,a,c){return b([c],{uncheckAllFields:function(){a(".field-item",this.fieldsContent).forEach(function(d){a("input",d)[0].checked=!1}.bind(this))}})});