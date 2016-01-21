var path = require('path');
var fs = require('fs');

var getTemplate = function(config) {
  var indexHtml = fs.readFileSync(path.resolve(__dirname, './src/index.html'), 'utf8');
  indexHtml = indexHtml.replace(/__GZIP__/g, config.gzip ? '.gz' : '');
  if (!config.iso) {
    indexHtml = indexHtml
      .replace('__TITLE__', config.title || '')
      .replace('__STATE__', 'null')
      .replace('__DATA__', '{}')
      .replace('__CONTENT__', '')
      .replace('__LOCALE__', 'null');
  }
  return indexHtml;
};

var getHtmPluginConfig = function(config, bundle) {
  var htmlPluginConfig = {};
  htmlPluginConfig.inject = false;
  htmlPluginConfig.bundle = bundle;
  htmlPluginConfig.minify = bundle ? {} : false;
  htmlPluginConfig.templateContent = getTemplate(config);
  return htmlPluginConfig;
};


module.exports = {
  getHtmPluginConfig: getHtmPluginConfig
};