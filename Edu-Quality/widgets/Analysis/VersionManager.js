// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define(["jimu/shared/BaseVersionManager"],function(f){function c(){this.versions=[{version:"1.0",upgrader:function(a){return a}},{version:"1.1",upgrader:function(a){return a}},{version:"1.2",upgrader:function(a){return a}},{version:"1.3",upgrader:function(a){var e=[],b,g=a.analysisTools.length;for(b=0;b<g;b++){var d=a.analysisTools[b];d={name:d.name,showHelp:!0,showCredits:!0,showChooseExtent:!0,showReadyToUseLayers:!0};e.push(d)}return{analysisTools:e}}}]}c.prototype=new f;return c.prototype.constructor=
c});