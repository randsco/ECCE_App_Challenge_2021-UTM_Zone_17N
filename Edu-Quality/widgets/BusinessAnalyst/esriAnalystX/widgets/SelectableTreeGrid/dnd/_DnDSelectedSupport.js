// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define(["dojo/_base/declare"],function(c){return c(null,{supportSelectedDnd:!0,_isChildSelected:function(a){var b=this.row(a).data;return this.getSelectedRowNodes().some(function(d){return d===b})},_getSelectedChildren:function(){return this._getSelectedNodesRows().rows},_startDnd:function(a,b){!this._isDragging&&this.unselectAllRows();this.inherited(arguments)}})});