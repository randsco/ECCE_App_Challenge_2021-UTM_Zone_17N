// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define(["dojo/dom-geometry","esri/dijit/geoenrichment/utils/MouseUtil"],function(e,b){var d;b.unitTesting_setCursorOverNode=function(a){a=e.position(a);b.unitTesting_setCursorPosition(a.x+a.w/2,a.y+a.h/2)};b.unitTesting_setCursorPosition=function(a,c){b._latestEvent={clientX:a,pageX:a,clientY:c,pageY:c}};b.unitTesting_lockPosition=function(a){d=a};b.unitTesting_shiftMousePosition=function(a,c){b.unitTesting_setCursorPosition(b._latestEvent.clientX+(a||0),b._latestEvent.clientY+(c||0))};b._setLatestEvent=
function(a){d||(b._latestEvent=a)};return b});