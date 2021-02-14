const RE_CSS = /\.css$/i;
const RE_JS_MAP = /\.js(|\.map)$/i;

class CssEntryPlugin {
  apply (compiler) {
    compiler.hooks.emit.tapAsync('CssEntryPlugin', (compilation, callback) => {
      compilation.chunks.filter(chunk => {
        return RE_CSS.test(chunk.name);
      }).forEach(chunk => {
        chunk.files.forEach(file => {
          if (RE_JS_MAP.test(file)) {
            delete compilation.assets[file];
          }
        });
      });
      callback();
    });
  }
}

module.exports = CssEntryPlugin;