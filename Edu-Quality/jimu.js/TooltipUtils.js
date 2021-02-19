// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define("dijit/TooltipDialog dijit/popup dojo/_base/html dojo/on dojo/mouse dojo/query".split(" "),function(k,f,e,g,h,l){function m(b,a){b=e.create("div",{innerHTML:b,"class":"dialog-content"});var c=new k({content:b}),d;g(a,h.enter,function(){clearTimeout(d);d=-1;d=setTimeout(function(){f.open({parent:null,popup:c,around:a,position:["below"]})},200)});g(a,h.leave,function(){clearTimeout(d);d=-1;f.close(c)});return c}return{initTooltips:function(b){l("[title]",b).forEach(function(a){if(a){var c=e.getAttr(a,
"title");e.setAttr(a,"title","");m(c,a)}})}}});