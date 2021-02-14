const fs = require('fs');
const path = require('path');
var os = require('os');
var ignore = require('ignore');
const argv = require('yargs').argv;


const webpackCommon = require('./webpack.common').getCommon();

exports.checkWidgets = checkWidgets;
exports.checkThemes = checkThemes;
exports.getWidgetsInfoForWebpack = getWidgetsInfoForWebpack;
exports.getThemesInfoForWebpack = getThemesInfoForWebpack;

exports.getOneWidgetEntries = getOneWidgetEntries;
exports.getOneWidgetToBeCopiedFiles = getOneWidgetToBeCopiedFiles;

exports.getOneThemeEntries = getOneThemeEntries;
exports.getOneThemeToBeCopiedFiles = getOneThemeToBeCopiedFiles;
exports.getOneThemeInfo = getOneThemeInfo;

function getOneWidgetToBeCopiedFiles(rootFolder, widgetFolder){
  let rPath = webpackCommon.getRelativePath(widgetFolder, rootFolder);

  let files = [
    { from: `${widgetFolder}/manifest.json`, to: `${rPath}/manifest.json`, transform: (content, filePath) => {
      let widgetFolder = filePath.substring(0, filePath.length - 'manifest.json'.length);
      let manifestJson = JSON.parse(content);

      fixOneWidgetManifest(manifestJson, widgetFolder);

      return JSON.stringify(manifestJson, null, 2);
    }},
  ];

  if(process.env.NODE_ENV === 'production' && /^widgets/.test(rPath)){
    files.push({ from: `${widgetFolder}/src`, to: `${rPath}/src`});
    fs.existsSync(`${widgetFolder}/tests`) && files.push({ from: `${widgetFolder}/tests`, to: `${rPath}/tests`});
  }

  fs.existsSync(`${widgetFolder}/icon.svg`) && files.push({ from: `${widgetFolder}/icon.svg`, to: `${rPath}/icon.svg`});
  fs.existsSync(`${widgetFolder}/config.json`) && files.push({ from: `${widgetFolder}/config.json`, to: `${rPath}/config.json`});
  fs.existsSync(`${widgetFolder}/src/runtime/translations`) && files.push({ from: `${widgetFolder}/src/runtime/translations`, to: `${rPath}/dist/runtime/translations`});
  fs.existsSync(`${widgetFolder}/src/runtime/assets`) && files.push({ from: `${widgetFolder}/src/runtime/assets`, to: `${rPath}/dist/runtime/assets`});
  fs.existsSync(`${widgetFolder}/src/setting/translations`) && files.push({ from: `${widgetFolder}/src/setting/translations`, to: `${rPath}/dist/setting/translations`});
  fs.existsSync(`${widgetFolder}/src/setting/assets`) && files.push({ from: `${widgetFolder}/src/setting/assets`, to: `${rPath}/dist/setting/assets`});

  return files;
}

function getOneWidgetEntries(rootFolder, widgetFolder){
  let entries = {};
  let rPath = webpackCommon.getRelativePath(widgetFolder, rootFolder);
  //widget.tsx
  if(fs.existsSync(path.join(widgetFolder, 'src/runtime/widget.tsx'))){
    entries[`${rPath}/dist/runtime/widget`] = `${widgetFolder}/src/runtime/widget.tsx`;
  }

  //builder-support.tsx
  if(fs.existsSync(path.join(widgetFolder, 'src/runtime/builder-support.tsx'))){
    entries[`${rPath}/dist/runtime/builder-support`] = `${widgetFolder}/src/runtime/builder-support.tsx`;
  }

  //extensions
  let manifestJson = JSON.parse(fs.readFileSync(path.join(widgetFolder, 'manifest.json')));
  if(manifestJson.extensions){
    manifestJson.extensions.forEach(ext => {
      if(fs.existsSync(path.join(widgetFolder, `src/${ext.uri}.ts`))){
        entries[`${rPath}/dist/${ext.uri}`] = `${widgetFolder}/src/${ext.uri}.ts`;
      }else if(fs.existsSync(path.join(widgetFolder, `src/${ext.uri}.tsx`))){
        entries[`${rPath}/dist/${ext.uri}`] = `${widgetFolder}/src/${ext.uri}.tsx`;
      }else{
        console.error('Not find extension:', ext.uri)
      }
    });
  }

  //message actions
  if(manifestJson.messageActions){
    manifestJson.messageActions.forEach(action => {
      entries[`${rPath}/dist/${action.uri}`] = `${widgetFolder}/src/${action.uri}.ts`;

      if (action.settingUri) {
        entries[`${rPath}/dist/${action.settingUri}`] = `${widgetFolder}/src/${action.settingUri}.tsx`;
      }
    });
  }

  //data actions
  if(manifestJson.dataActions){
    manifestJson.dataActions.forEach(action => {
      entries[`${rPath}/dist/${action.uri}`] = `${widgetFolder}/src/${action.uri}.ts`;
    });
  }

  //setting.tsx
  if(fs.existsSync(path.join(widgetFolder, 'src/setting/setting.tsx'))){
    entries[`${rPath}/dist/setting/setting`] = `${widgetFolder}/src/setting/setting.tsx`;
  }

  //item-setting.tsx
  if(manifestJson.properties && manifestJson.widgetType === 'LAYOUT' &&
    fs.existsSync(path.join(widgetFolder, 'src/setting/item-setting.tsx'))) {
    entries[`${rPath}/dist/setting/item-setting`] = `${widgetFolder}/src/setting/item-setting.tsx`;
  }

  //guide.tsx
  if(fs.existsSync(path.join(widgetFolder, 'src/guide/guide.tsx'))) {
    entries[`${rPath}/dist/guide/guide`] = `${widgetFolder}/src/guide/guide.tsx`;
  }

  return entries;
}

function fixOneWidgetManifest(manifestJson, widgetFolder){
  if(!manifestJson.properties){
    manifestJson.properties = {};
  }

  //widget.tsx
  if(!fs.existsSync(path.join(widgetFolder, 'src/runtime/widget.tsx'))){
    manifestJson.properties.hasMainClass = false;
  }

  //setting.tsx
  if(!fs.existsSync(path.join(widgetFolder, 'src/setting/setting.tsx'))){
    manifestJson.properties.hasSettingPage = false;
  }

  //config.json
  if(!fs.existsSync(path.join(widgetFolder, 'config.json'))){
    manifestJson.properties.hasConfig = false;
  }

  if(fs.existsSync(path.join(widgetFolder, 'src/runtime/builder-support.tsx'))){
    manifestJson.properties.hasBuilderSupportModule = true;
  }

  //item-setting.tsx
  if(manifestJson.widgetType === 'LAYOUT' &&
    fs.existsSync(path.join(widgetFolder, 'src/setting/item-setting.tsx'))){
    manifestJson.properties.hasLayoutItemSettingPage = true;
  }

  //guide.tsx
  if(fs.existsSync(path.join(widgetFolder, 'src/guide/guide.tsx'))) {
    manifestJson.properties.hasGuide = true;
  }
}

/**
 * widgetsFolder: the folder contains all widgets, this is an absolute path
 */
function getWidgetsInfoForWebpack(widgetsFolder){
  let entries = {};
  let files = [];
  let infos = [];

  let widgetOrder = {
    1: {
      'arcgis-map': 1,
      legend: 2,
      'map-layers': 3,
      'feature-info': 4,
      list: 5,
      table: 6,
      filter: 7,
      bookmark: 8,
      card: 9,
      'fly-controller': 10,
      survey123: 11,
    },

    2: {
      text: 100,
      image: 101,
      button: 102,
      embed: 103,
      divider: 104,
    },

    3: {
      menu: 201,
      controller: 202,
      share: 203
    },

    4: {
      fixed: 301,
      sidebar: 302,
      row: 303,
      column: 304
    },

    5: {
      navigator: 16,
    },
  }

  let existedInfoPath = path.join(__dirname, `../dist/widgets/widgets-info-existed.json`);
  let existedInfos = [];
  if(fs.existsSync(existedInfoPath)){
    existedInfos = JSON.parse(fs.readFileSync(existedInfoPath));
  }

  webpackCommon.visitFolder(widgetsFolder, (widgetFolder, widgetName) => {
    if(argv.extName && argv.extName !== widgetName){
      return;
    }
    if(existedInfos.find(info => info.name === widgetName)){
      return;
    }
    Object.assign(entries, getOneWidgetEntries(path.resolve(widgetsFolder, '..'), widgetFolder));

    files = files.concat(getOneWidgetToBeCopiedFiles(path.resolve(widgetsFolder, '..'), widgetFolder));

    if(isIgnore(widgetsFolder, widgetFolder)){
      return;
    }
    infos.push(getOneWidgetInfo(path.resolve(widgetsFolder, '..'), widgetFolder));
  });

  infos.forEach(info => {
    const group = Object.keys(widgetOrder).find(group => !!widgetOrder[group][info.name]);
    if(group){
      info.order = widgetOrder[group][info.name];
      info.group = parseInt(group);
    }
  });

  infos = infos.sort((a, b) => a.order - b.order);

  return {entries, files, infos};
}

function getThemesInfoForWebpack(themesFolder){
  let entries = {};
  let files = [];
  let infos = [];

  let themeOrder = {
    default: 1,
    dark: 2,
    vivid: 3,
    'shared-theme': 4,
  }

  let existedInfoPath = path.join(__dirname, `../dist/themes/themes-info-existed.json`);
  let existedInfos = [];
  if(fs.existsSync(existedInfoPath)){
    existedInfos = JSON.parse(fs.readFileSync(existedInfoPath));
  }

  webpackCommon.visitFolder(themesFolder, (themeFolder, themeName) => {
    if(argv.extName && argv.extName !== themeName){
      return;
    }
    if(existedInfos.find(info => info.name === themeName)){
      return;
    }
    Object.assign(entries, getOneThemeEntries(path.resolve(themesFolder, '..'), themeFolder));

    files = files.concat(getOneThemeToBeCopiedFiles(path.resolve(themesFolder, '..'), themeFolder));

    if(isIgnore(themesFolder, themeFolder)){
      return;
    }
    let info = getOneThemeInfo(path.resolve(themesFolder, '..'), themeFolder);
    info.order = themeOrder[info.name];
    infos.push(info);
  });

  infos = infos.sort((a, b) => a.order - b.order);
  return {entries, files, infos};
}

function checkWidgets(widgetsFolder){
  return commonChecks(widgetsFolder);
}

function checkThemes(themesFolder){
  return commonChecks(themesFolder);
}

function commonChecks(folder){
  let items = [];
  let hasError = false;
  webpackCommon.visitFolder(folder, (folderPath, folderName) => {
    if(items.indexOf(folderName) > -1){
      console.error('Name is duplicated.', folderName);
      hasError = true;
      return;
    }

    let manifestJson = JSON.parse(fs.readFileSync(path.join(folderPath, 'manifest.json')));
    if(manifestJson.name !== folderName){
      console.error('Name in manifest.json is not the same with the folder name.', folderName);
      hasError = true;
      return;
    }
    items.push(folderName);
  });
  return hasError;
}

/**
 *
 * {
 *  "name": "arcgis-map",
    "path": "widgets/arcgis/arcgis-map/",
    "icon": "",
    "manifest": {},
    "i18nLabel": {
      "en": '',
      "zh-cn": ''
    },
    "i18nDescription": {
      "en": '',
      "zh-cn": ''
    }
   }
 * @param {*} rootFolder
 * @param {*} widgetFolder
 */
function getOneWidgetInfo(rootFolder, widgetFolder){
  let widget = {};
  let rPath = webpackCommon.getRelativePath(widgetFolder, rootFolder);
  let manifestFile = path.join(widgetFolder, 'manifest.json');

  let manifestJson = JSON.parse(fs.readFileSync(manifestFile));
  fixOneWidgetManifest(manifestJson, widgetFolder);

  widget.name = manifestJson.name;
  widget.manifest = manifestJson;
  let {labels, descriptions} = getI18nLabelAndDescription(widgetFolder, manifestJson, 'widget');
  widget.i18nLabel = labels;
  widget.i18nDescription = descriptions;
  widget.uri = rPath.charAt(rPath.length - 1) === '/' ? rPath : rPath + '/';

  if(fs.existsSync(`${widgetFolder}/icon.svg`)){
    widget.icon = `${rPath}/icon.svg`;
  }else{
    widget.icon = `${rPath}/icon.png`;
  }
  return widget;
}

function getI18nLabelAndDescription(widgetFolder, manifest, type){
  let locales = manifest.translatedLocales;
  if(!locales || locales.length === 0){
    if(manifest.supportedLocales){
      console.warn('***supportedLocales is renamed to translatedLocales***');
    }
    return {};
  }
  let ret = {
    labels: {},
    descriptions: {}
  }
  locales.forEach((locale, i) => {
    let filePath;
    if(type === 'widget'){
      if(i === 0){
        filePath = `${widgetFolder}/src/runtime/translations/default.ts`;
      }else{
        filePath = `${widgetFolder}/src/runtime/translations/${locale}.js`;
      }
    }else{
      if(i === 0){
        filePath = `${widgetFolder}/translations/default.ts`;
      }else{
        filePath = `${widgetFolder}/translations/${locale}.js`;
      }
    }

    if(fs.existsSync(filePath)){
      let content = fs.readFileSync(filePath, 'utf-8');
      let label = getValueFromTranslation(content, manifest, type === 'widget' ? '_widgetLabel' : '_themeLabel', i === 0);
      if(label){
        ret.labels[locale] = label;
      }

      let description = getValueFromTranslation(content, manifest, type === 'widget' ? '_widgetDescription' : '_themeDescription', i === 0);
      if(label){
        ret.descriptions[locale] = description;
      }
    }
  });

  return ret;
}

function getValueFromTranslation(translationContent, manifest, key, isDefault){
  let lines = translationContent.split(os.EOL);
  let labelLine = lines.find(line => line.indexOf(key) > -1);
  if(!labelLine){
    if(isDefault){
      if(key === '_widgetLabel' || key === '_themeLabel'){
        console.error(`Does not find ${key}, ${manifest.name}`);
      }
    }
    return null;
  }

  let label = labelLine.split(':')[1];
  if(label.indexOf('"') > -1){
    // for double quotes, the \" is allowed
    return label.match(/"(.+)"/)[1].replace('\\\"', '\"');
  }else if(label.indexOf("'") > -1){
    // for single quotes, the \' is allowed
    return label.match(/'(.+)'/)[1].replace('\\\'', '\'');
  }else{
    return null;
  }
}

function isIgnore(rootFolder, folder){
  // the ignore pattern: https://git-scm.com/docs/gitignore
  if(!fs.existsSync(path.join(rootFolder, '.ignore'))){
    return false;
  }
  let ignorePatterns = fs.readFileSync(path.join(rootFolder, '.ignore'), 'utf-8').split(os.EOL);
  let igCheck = ignore().add(ignorePatterns);

  let rPath = webpackCommon.getRelativePath(folder, rootFolder);
  return igCheck.ignores(rPath);
}

function getOneThemeEntries(rootFolder, themeFolder){
  let entries = {};
  let rPath = webpackCommon.getRelativePath(themeFolder, rootFolder);

  if(fs.existsSync(themeFolder)){
    if(fs.existsSync(`${themeFolder}/style.scss`)) {
      entries[`${rPath}/style`] = `${themeFolder}/style.scss`;
    }else if(fs.existsSync(`${themeFolder}/style.ts`)) {
      entries[`${rPath}/style`] = `${themeFolder}/style.ts`;
    }
  }

  return entries;
}

function getOneThemeToBeCopiedFiles(rootFolder, themeFolder){
  let rPath = webpackCommon.getRelativePath(themeFolder, rootFolder);
  let files = [];

  files = files.concat([
    { from: `${themeFolder}/variables.json`, to: `${rPath}/variables.json`},
    { from: `${themeFolder}/manifest.json`, to: `${rPath}/manifest.json`, transform: extendOneThemeManifest},
    { from: `${themeFolder}/thumbnail.png`, to: `${rPath}/thumbnail.png`}
  ]);

  fs.existsSync(path.join(themeFolder, 'assets')) && files.push({ from: `${themeFolder}/assets`, to: `${rPath}/assets`});

  return files;
}

function getOneThemeInfo(rootFolder, themeFolder){
  let manifestFile = path.join(themeFolder, 'manifest.json');
  let manifestJson = JSON.parse(fs.readFileSync(manifestFile));
  let themeName = manifestJson.name;
  let rPath = webpackCommon.getRelativePath(themeFolder, rootFolder);

  let {labels, descriptions} = getI18nLabelAndDescription(themeFolder, manifestJson, 'theme');

  return {
    name: themeName,
    label: manifestJson.label,
    uri: rPath.charAt(rPath.length - 1) === '/' ? rPath : rPath + '/',
    colors: manifestJson.colors,
    font: manifestJson.font,
    i18nLabel: labels,
    i18nDescription: descriptions
  };
}

function extendOneThemeManifest(content, manifestFile){
  let themeFolder = manifestFile.substring(0, manifestFile.length - 'manifest.json'.length);
  let manifestJson = JSON.parse(content.toString('utf-8'));

  manifestJson.styleFiles = {
    css: fs.existsSync(`${themeFolder}/style.scss`),
    js: fs.existsSync(`${themeFolder}/style.ts`)
  }

  return JSON.stringify(manifestJson, null, 2);
}

exports.isExtensionRepo = isExtensionRepo;
function isExtensionRepo(folder){
  if(!fs.existsSync(path.join(folder, 'manifest.json'))){
    return false;
  }

  let manifestJson = JSON.parse(fs.readFileSync(path.join(folder, 'manifest.json')));
  if(manifestJson.type === 'exb-web-extension-repo'){
    return true;
  }else{
    return false;
  }
}

exports.getWidgetsWebpackConfig = getWidgetsWebpackConfig;
function getWidgetsWebpackConfig(entries, toBeCopiedFiles, toBeCleanFiles){
  return {
    entry: entries,
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, '../dist'),
      libraryTarget: "system",
    },
    devtool: webpackCommon.sourceMapOption,
    resolve: {
      alias: webpackCommon.moduleAlias,
      extensions: webpackCommon.extensions,
      mainFields: webpackCommon.resolveMainFields
    },
    module: {
      rules: webpackCommon.getModuleRules(path.resolve(__dirname, '../tsconfig/tsconfig-widgets.json'))
    },
    plugins: webpackCommon.getPlugins('widgets', toBeCopiedFiles, toBeCleanFiles),
    externals: [
      webpackCommon.externalFunction
    ],
    stats: webpackCommon.stats,
    devServer: webpackCommon.devServer,
  };
}

exports.getThemesWebpackConfig = getThemesWebpackConfig;
function getThemesWebpackConfig(entries, toBeCopiedFiles, toBeCleanFiles){
  return {
    entry: entries,
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, '../dist'),
      libraryTarget: "system",
    },
    devtool: webpackCommon.sourceMapOption,
    resolve: {
      alias: webpackCommon.moduleAlias,
      extensions: webpackCommon.extensions,
      mainFields: webpackCommon.resolveMainFields
    },
    module: {
      rules: webpackCommon.getModuleRules(path.resolve(__dirname, '../tsconfig/tsconfig-themes.json'))
    },
    plugins: webpackCommon.getPlugins('themes', toBeCopiedFiles, toBeCleanFiles).concat([
      webpackCommon.cssEntryPlugin,
      webpackCommon.extractThemeStylePlugin,
      webpackCommon.extractRtlThemeStylePlugin
    ]),
    externals: [
      webpackCommon.externalFunction
    ],
    stats: webpackCommon.stats,
    devServer: webpackCommon.devServer,
  };
}

exports.mergeWebpackInfo = mergeWebpackInfo;
function mergeWebpackInfo(configInfo, type){
  let allInfos = [], allEntries = {}, allToBeCopiedFiles = [];
  configInfo.forEach(cInfo => {
    allInfos = allInfos.concat(cInfo.infos);
    allToBeCopiedFiles = allToBeCopiedFiles.concat(cInfo.files);
    allEntries = Object.assign(allEntries, cInfo.entries);
  });

  let from = `./webpack/${type}-info.json`;
  if(fs.existsSync(from)){
    allToBeCopiedFiles = allToBeCopiedFiles.concat([{
      from,
      to: `${type}/${type}-info.json`,
      transform (content, _path) {
        let existedInfoPath = path.join(__dirname, `../dist/${type}/${type}-info-existed.json`);
        let existedInfos = [];
        if(fs.existsSync(existedInfoPath)){
          existedInfos = JSON.parse(fs.readFileSync(existedInfoPath));
        }

        let finalInfos = existedInfos.concat(allInfos);
        return JSON.stringify(finalInfos, null, 2);
      }
    }]);
  }

  return {allEntries, allToBeCopiedFiles, allInfos};
}
