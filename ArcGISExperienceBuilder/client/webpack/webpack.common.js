let buildReportFileMap = {};

exports.getCommon = function (commonOptions = {}) {
  const path = require('path');
  const fs = require('fs');

  const MiniCssExtractPlugin = require('mini-css-extract-plugin');
  const HappyPack = require('happypack');
  // remove unnecessary js files when entries are css
  const CssEntryPlugin = require('./css-entry-plugin');
  const {CleanWebpackPlugin} = require('clean-webpack-plugin');
  const CopyWebpackPlugin = require('copy-webpack-plugin');
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
  const RtlCssPlugin = require('rtlcss-webpack-plugin');
  const {StatsWriterPlugin} = require("webpack-stats-plugin");
  const {program} = require('commander');

  if(program.options.length == 0){
    program.storeOptionsAsProperties(true);
  }
  const defaultAcceptedCommand = program.version('1.3.0').allowUnknownOption()
    .option('--path <path>', 'Mount path')
    .option('-p, --portal', 'embed in portal')
    .option('-b, --buildNumber <buildNumber>', 'build number')
    .option('-a, --jsApiUrl <jsApiUrl>', 'arcgis js api url');

  (commonOptions.additionalArgs || []).reduce((command, arg = []) => {
    const [methodName, ...methodArgs] = arg;
    return arg.length < 2 ? command : command[methodName](...methodArgs);
  }, defaultAcceptedCommand).parse(process.argv);

  let mountPath = program.path || process.env.EXB_MOUNT_PATH;
  if(mountPath){
    mountPath = /\/$/.test(mountPath) ? mountPath : mountPath + '/';
    mountPath = /^\//.test(mountPath) ? (/^\/\//.test(mountPath) ? mountPath.replace(/^\//, '') : mountPath) : '/' + mountPath;
  }

  const buildNumber = program.buildNumber || process.env.BUILD_NUMBER || '';
  const jsApiUrl = program.jsApiUrl || process.env.ARCGIS_JSAPI_URL || 'https://js.arcgis.com/4.18/';

  const extractThemeStylePlugin = new MiniCssExtractPlugin({
    filename: '[name].css'
  });

  const extractRtlThemeStylePlugin = new RtlCssPlugin({
    filename: '[name]-rtl.css'
  });

  let stats = {
    chunks: false,
    chunkModules: false,
    assets: false,
    children: false,
    hash: false,
    reasons: false,
    modules: false,
    errorDetails: true,
    colors: true,
    entrypoints: true
  };

  if(process.env.NODE_ENV === 'production'){
    stats.chunks = true;
    stats.chunkModules = true;
  }

  if( process.env.TREE){
    stats.chunks = true;
    stats.chunkModules = true;
    stats.modules = true;
    stats.reasons = true;
    stats.children = true;
  }

  let cssLoaders = [{
    loader: 'css-loader',
    options: {
      sourceMap: process.env.NODE_ENV === 'production'? false: true,
      url: false
    }
  }, {
    loader: 'resolve-url-loader',
    options: {}
  }, {
    loader: 'sass-loader',
    options: {
      sourceMap: process.env.NODE_ENV === 'production'? false: true,
      sassOptions: {
        sourceMapContents: false
      }
    }
  }];

  let htmlLoader = {loader: 'html-loader'};
  let urlLoader = {
    loader: 'url-loader',
    options: {
      limit: 10000,
      fallback: path.join(__dirname, './webpack-file-loader/main.js'),
      outputPath: (rPath, fullPath) => {
        return path.relative(__dirname, fullPath).replace(/\\/g, '/');
      },
      useRelativePath: true,
      name: fullPath => {
        //the path is relative to '__webpack_public_path__', because widgets folder is in the same folder with experience, so use '..' here
        return '../' + path.relative(__dirname, fullPath).replace(/\\/g, '/');
      },
      esModule: false,
    }
  }

  let isThemeStyle = (styleFile) => /themes\/(.)+\/style\.(scss|css)$/.test(styleFile) ||
    /jimu-ui\/lib\/styles\/(.)+\.(scss|css)/.test(styleFile);
  let tsLoader = {loader: 'happypack/loader', options: {id: 'happy-ts'}};
  let bundleAnalyzerPluginPorts = {
    'jimu-arcgis': 9001,
    'jimu-core': 9002,
    'jimu-layouts': 9003,
    'themes': 9004,
    'experience': 9005,
    'widgets': 9006,
    'jimu-ui': 9007,
    'jimu-for-builder': 9009,
    'builder': 9000,
    'site': 8001
  };
  let commonPlugins = [new HappyPack({
    id: tsLoader.options.id,
    threads: require('os').cpus().length - 1,
    verbose: false,
    loaders: [{
      loader: 'ts-loader',
      options: {
        happyPackMode: true,
        configFile: commonOptions.tsConfigPath || undefined
      }
    }]
  }), {
    apply(compiler) {
      compiler.hooks.done.tap('CustomPostBuildPlugin-for-StatsWriterPlugin', stats => {
        const reportFilename = (((stats.compilation.options.plugins || []).find(i => i.constructor === StatsWriterPlugin) || {}).opts || {}).filename;
        if (reportFilename) {
          buildReportFileMap[reportFilename] = true;
          const buildReportFiles = Object.entries(buildReportFileMap || {});
          if (buildReportFiles.every(f => !!f[1])) {
            const { getBuildReportData } = require('../scripts/find-duplicate-modules.js');
            const buildReportData = getBuildReportData(buildReportFiles.map(f => path.resolve(__dirname, f[0])), {});
            const outputFile = path.resolve(__dirname, `../dist-report/build-report-duplicate-modules.json`);
            fs.writeFileSync(outputFile, `${JSON.stringify(buildReportData.duplicatedModuleMap, null, 2)}`, 'utf-8');
          }
          buildReportFileMap = {};
        }
      });
    }
  }];

  exports.getCommander = () => program;
  exports.commonPlugins = commonPlugins;
  exports.extractThemeStylePlugin = extractThemeStylePlugin;
  exports.extractRtlThemeStylePlugin = extractRtlThemeStylePlugin;
  exports.cssEntryPlugin = new CssEntryPlugin();
  exports.cssLoaders = cssLoaders;
  exports.htmlLoader = htmlLoader;
  exports.urlLoader = urlLoader;
  exports.buildNumber = buildNumber;

  exports.getModuleRules = (tsConfigPath) => {
    const commonRule = [{
      test: file => {
        return  /'[\\/]node_modules[\\/]quill[\\/]dist'/.test(file) && /\.js$/.test(file);
      },
      use: [{
        loader: 'ts-loader',
        options: {
          compilerOptions: {
            declaration: false,
            allowJs: true,
            target: 'es5',
            module: 'commonjs'
          },
          files: [
            "dist/quill.js"
          ],
          transpileOnly: true
        }
      }]
    }, {
      test: file => {
        return isThemeStyle(file.replace(/\\/g, '/'))
      },
      use: [{
        loader: MiniCssExtractPlugin.loader
      }].concat(cssLoaders)
    }, {
      test: (file) => {
        return /\.(scss|css)$/.test(file) && !isThemeStyle(file.replace(/\\/g, '/'));
      },
      use: [{
        loader: 'style-loader'
      }].concat(cssLoaders)
    }, {
      test: /\.(html)$/,
      exclude: [/index\.html/, /index-template\.html/],
      use: htmlLoader
    }, {
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      exclude: [
        /jimu-ui[\\/](.*)lib[\\/](.*)icons/,
        /widgets[\\/](.*)[\\/]assets[\\/]icon/,
        /widgets[\\/](.*)[\\/]assets[\\/]icons/
      ],
      use: urlLoader
    }, {
      test: /\.svg$/,
      include: [
        /jimu-ui[\\/](.*)lib[\\/](.*)icons/,
        /widgets[\\/](.*)[\\/]assets[\\/]icon/,
        /widgets[\\/](.*)[\\/]assets[\\/]icons/
      ],
      use: [{
          loader: 'svg-inline-loader'
        },{
          loader: 'svgo-loader',
          options: {
            plugins: [
              {removeTitle: true},
              {convertColors: {shorthex: true}},
              {removeDimensions: true},
              {removeViewBox: false}
            ]
          }
        }
      ]
    }];

    let moduleRules;

    if(process.env.TYPING){
      moduleRules = commonRule.concat({
        test: file => {
          return /\.tsx?$/.test(file)
        },
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: false,
            happyPackMode: false,
            configFile: tsConfigPath
          }
        }
      });
    }else{
      moduleRules = commonRule.concat({
        test: file => {
          return /\.tsx?$/.test(file)
        },
        exclude: /node_modules/,
        use: tsLoader
      });
    }

    return moduleRules;
  };

  exports.getPlugins = (chunkName, toBeCopiedFiles, toBeCleanFiles = [], tsConfig) => {
    let plugins;

    if(process.env.STAT){
      plugins = [
        new BundleAnalyzerPlugin({
          analyzerPort: bundleAnalyzerPluginPorts[chunkName]
        })
      ];
    }else{
      plugins = [];
      if((!process.env.TSCHECK && !process.env.TREE) || process.env.TSCHECK === 'check-build'){
        plugins = plugins.concat([
          new CleanWebpackPlugin({
            dry: false,
            verbose: true,
            cleanStaleWebpackAssets: false,
            cleanOnceBeforeBuildPatterns: toBeCleanFiles,
          }),
          ...((toBeCopiedFiles || []).length ? [new CopyWebpackPlugin({ patterns: toBeCopiedFiles })] : [])
        ]);
      }
      if(process.env.TSCHECK){
        plugins = plugins.concat([
          new ForkTsCheckerWebpackPlugin({
            async: true,
            typescript: {
              configFile: tsConfig ? tsConfig : `./tsconfig/tsconfig-${chunkName}.json`
            }
          })
        ]);
      }
      if(process.env.NODE_ENV === 'production'){
        const filename = `../dist-report/build-report/${chunkName}.json`;
        buildReportFileMap[filename] = false;
        plugins = plugins.concat(new StatsWriterPlugin({
          filename: filename,
          stats: stats,
          transform: (data, options) => {
            let d = {
              entrypoints: {},
              errors: data.errors,
              warnings: data.warnings,
              outputPath: data.outputPath,
              publicPath: data.publicPath,
              version: data.version
            };

            Object.keys(data.entrypoints).forEach(entryName => {
              if(!d.entrypoints[entryName]){
                d.entrypoints[entryName] = {};
              }
              d.entrypoints[entryName].chunks = data.entrypoints[entryName].chunks.map(chunkId => {
                let c = data.chunks.find(c => c.id === chunkId);
                if(c){
                  let modules = [];
                  c.modules.forEach(m => {
                    let simpleModule = m.name;
                    if(/node_modules/.test(simpleModule)){
                      modules.push(simpleModule);
                    }else{
                      modules.unshift(simpleModule);
                    }
                  });
                  return {
                    id: c.id,
                    names: c.names,
                    modules
                  }
                }else{
                  return null;
                }
              });

            });

            return JSON.stringify(d, null, 2);
          }
        }));
      }
    }

    return plugins.concat(commonPlugins);
  }

  exports.resolveMainFields = ['module', 'main'];
  exports.extensions = ['.ts', '.tsx', '.js', '.jsx'];
  exports.stats = stats;
  exports.devServer = {
    contentBase: ['./dist'],
    stats: {
      chunks: true,
    }
  };
  exports.sourceMapOption = process.env.NODE_ENV === 'production'? false: 'cheap-module-eval-source-map';
  exports.moduleAlias = {
    'jimu-core': path.resolve(__dirname, '../jimu-core'),
    'jimu-ui': path.resolve(__dirname, '../jimu-ui'),
    'jimu-arcgis': path.resolve(__dirname, '../jimu-arcgis'),
    'jimu-for-builder': path.resolve(__dirname, '../jimu-for-builder'),
    'builder': path.resolve(__dirname, '../builder'),
    'jimu-for-test': path.resolve(__dirname, '../jimu-for-test'),
    'jimu-layouts': path.resolve(__dirname, '../jimu-layouts')
  };

  exports.externalFunction = function(context, request, callback) {
    if (isRequestExternal(request)) {
      if(['react', 'react-dom', 'react-dom/server'].indexOf(request) > -1){
        callback(null, 'system jimu-core/' + request);
      }else{
        callback(null, 'system ' + request);
      }
    }else{
      callback();
    }
  }


  function isRequestExternal(request){
    const partialMatchPackages = ['dojo/', 'dijit/', 'dojox/', 'esri/', 'moment', 'dgrid', 'dstore'];

    const fullMatchPackages = [
      'react', 'react-dom', 'react-dom/server',
      'jimu-core', 'jimu-core/dnd', 'jimu-core/data-source',

      'jimu-arcgis', 'jimu-arcgis/arcgis-data-source',

      'jimu-layouts/layout-builder', 'jimu-layouts/layout-runtime',

      'jimu-for-builder', 'jimu-for-builder/service', 'jimu-for-builder/json-editor-setting', 'jimu-for-builder/templates',

      'jimu-ui',

      'jimu-ui/basic/date-picker', 'jimu-ui/basic/sql-expression-runtime', 'jimu-ui/basic/qr-code', 'jimu-ui/basic/color-picker',
      'jimu-ui/basic/item-selector', 'jimu-ui/basic/file-uploader', 'jimu-ui/basic/imagecrop', 'jimu-ui/basic/guide',

      'jimu-ui/advanced/data-source-selector', 'jimu-ui/advanced/expression-builder', 'jimu-ui/advanced/setting-components', 'jimu-ui/advanced/sql-expression-builder',
      'jimu-ui/advanced/style-setting-components', 'jimu-ui/advanced/rich-text-editor', 'jimu-ui/advanced/setting-components', 'jimu-ui/advanced/resource-selector',
      'jimu-ui/advanced/theme-components', 'jimu-ui/advanced/map', 'jimu-ui/advanced/chart',
    ].filter(commonOptions.filterExternals || (() => true));
    return partialMatchPackages.filter(p => request.substring(0, p.length) === p).length > 0 || fullMatchPackages.filter(p => request === p).length > 0;
  };

  exports.getJimuAMDLayer = function(request){
    let jimuCoreStatFile = path.join(__dirname, 'dist/jimu-core/stat.json');
    let statJson = JSON.parse(fs.readFileSync(jimuCoreStatFile));
    let chunks = statJson.chunks.filter(chunk => {
      return chunk.modules.filter(module => {
        return module.name.indexOf(request) > -1;
      }).length > 0;
    });

    if(chunks.length === 0){
      return;
    }
    return chunks[0].names[0];//why names not name?
  };

  exports.arcgisJsApiUrl = jsApiUrl;
  exports.useStructuralUrl = program.portal ? false : true;
  exports.isInPortal = program.portal ? true : false;
  exports.isDevEdition = false;
  exports.mountPath = mountPath;
  exports.visitFolder = visitFolder;
  exports.getRelativePath = getRelativePath;

  /**
   * Visit the folder to find widgets/themes, identified by manifest.json
   * @param {*} folderPath
   */
  function visitFolder(folderPath, cb) {
    var files = fs.readdirSync(folderPath);
    files.forEach(fileName => {
      var filePath = path.normalize(folderPath + '/' + fileName);

      if(fs.statSync(filePath).isDirectory()){
        if(fs.existsSync(path.join(filePath, 'manifest.json'))){
          cb(filePath, fileName);
        }else{
          visitFolder(filePath, cb);
        }
      }
    });
  }

  function getRelativePath(fullPath, rootPath){
    fullPath = fullPath.replace(/\\/g, '/');
    rootPath = rootPath.replace(/\\/g, '/');
    if(!/\/$/.test(rootPath)){
      rootPath = rootPath + '/';
    }
    return fullPath.substring(rootPath.length);
  }

  return exports;
}