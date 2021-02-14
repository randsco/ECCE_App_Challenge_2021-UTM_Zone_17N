// NOTE: w/o this mock we were getting a the following error:
// SyntaxError: Unexpected token import
// at import { cedarAmCharts } from '@esri/cedar-amcharts'
// in node_modules/@esri/cedar/dist/esm/Chart.js:1

// TODO: remove this mock module once the cedar module loading issues are resolved

// mock cedar Chart class
module.exports = function() {
  this.prototype.show = function() {}
};
