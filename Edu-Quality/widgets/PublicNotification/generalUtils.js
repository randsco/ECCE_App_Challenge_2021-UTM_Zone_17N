// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define(["jimu/utils"],function(c){return{sanitizeNoTags:function(b){if(!b)return b;var a=c.sanitizeHTML(b);b=/<(?:!--(?:(?:-*[^->])*--+|-?)|script\b(?:[^"'>]|"[^"]*"|'[^']*')*>[\s\S]*?<\/script\s*|style\b(?:[^"'>]|"[^"]*"|'[^']*')*>[\s\S]*?<\/style\s*|\/?[a-z](?:[^"'>]|"[^"]*"|'[^']*')*)>/gi;do{var d=a;a=a.replace(b,"")}while(a!==d);return a=a.replace(/</g,"\x26lt;").trim()}}});