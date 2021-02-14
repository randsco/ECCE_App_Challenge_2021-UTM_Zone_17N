const fs = require('fs');
const path = require('path');

const webpackExtCommon = require('./webpack-extensions.common');
const basePath = path.join(__dirname, '..');

let configs = [], widgetsConfigInfo = [], themesConfigInfo = [];

fs.readdirSync(basePath).forEach(repoFolder => {
  if(!fs.statSync(path.join(basePath, repoFolder)).isDirectory()){
    return;
  }
  if(!webpackExtCommon.isExtensionRepo(path.join(basePath, repoFolder))){
    return;
  }

  let widgetsFolder = path.join(basePath, repoFolder, 'widgets');
  if(fs.existsSync(widgetsFolder) && !webpackExtCommon.checkWidgets(widgetsFolder)){
    widgetsConfigInfo.push(webpackExtCommon.getWidgetsInfoForWebpack(widgetsFolder));
  }

  let themesFolder = path.join(basePath, repoFolder, 'themes');
  if(fs.existsSync(themesFolder) && !webpackExtCommon.checkThemes(themesFolder)){
    themesConfigInfo.push(webpackExtCommon.getThemesInfoForWebpack(themesFolder));
  }
});

let allWidgetInfo = webpackExtCommon.mergeWebpackInfo(widgetsConfigInfo, 'widgets');
let allThemeInfo = webpackExtCommon.mergeWebpackInfo(themesConfigInfo, 'themes');

let toBeCleanWidgets = allWidgetInfo.allInfos.map(info => {
  return `dist/${info.path}`;
});

let toBeCleanThemes = allThemeInfo.allInfos.map(info => {
  return `dist/${info.path}`;
});

Object.keys(allWidgetInfo.allEntries).length > 0 && configs.push(webpackExtCommon.getWidgetsWebpackConfig(allWidgetInfo.allEntries, allWidgetInfo.allToBeCopiedFiles, toBeCleanWidgets));
Object.keys(allThemeInfo.allEntries).length > 0 && configs.push(webpackExtCommon.getThemesWebpackConfig(allThemeInfo.allEntries, allThemeInfo.allToBeCopiedFiles, toBeCleanThemes));

module.exports = configs;

