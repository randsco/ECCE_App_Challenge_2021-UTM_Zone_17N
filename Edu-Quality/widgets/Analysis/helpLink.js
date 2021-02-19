// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define(["dojo/_base/declare","dijit/_WidgetBase","dijit/_TemplatedMixin","dojo/dom-attr"],function(b,c,d,a){return b([c,d],{baseClass:"jimu-widget-analysis-helpLink",templateString:'\x3ca href\x3d"#" tabindex\x3d"-1"\x3e\x3cimg esriHelpTopic\x3d"toolDescription" data-dojo-attach-point\x3d"helpIcon"/\x3e\x3c/a\x3e',postCreate:function(){this.inherited(arguments);a.set(this.helpIcon,"class",this.iconClassName);a.set(this.helpIcon,"src",this.folderUrl+"images/helpIcon.png");a.set(this.helpIcon,"title",
this.toolLabel)}})});