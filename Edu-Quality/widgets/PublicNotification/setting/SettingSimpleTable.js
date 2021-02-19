// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define(["dojo/_base/declare","dojo/_base/html","jimu/dijit/SimpleTable"],function(d,e,f){return d(f,{_onRowMoved:null,constructor:function(a){},deleteRow:function(a){if(a){var b=this.getRowData(a);var c=a.rowIndex;e.destroy(a);this.updateUI();this._onDeleteRow(a,b,c)}},_onDeleteRow:function(a,b,c){this.emit("row-delete",a,b,c)}})});