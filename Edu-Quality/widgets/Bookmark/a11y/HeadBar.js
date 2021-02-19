// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define(["dojo/_base/lang","dojo/on","dijit/a11yclick"],function(b,c,d){return{a11y_initEvents:function(){this.own(c(this.addBtn,d,b.hitch(this,function(){this.addingBookmark()})));this.own(c(this.cardsBtn,d,b.hitch(this,function(a){this._toggleLayoutBtnDisplay("cards");this._isKeyEvent(a)&&this.listBtn&&this.listBtn.focus()})));this.own(c(this.listBtn,d,b.hitch(this,function(a){this._toggleLayoutBtnDisplay("list");this._isKeyEvent(a)&&this.cardsBtn&&this.cardsBtn.focus()})))},_isKeyEvent:function(a){return a&&
a._origType?!0:!1}}});