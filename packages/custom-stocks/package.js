Package.describe({summary: "Custom Stocks package"});

Package.onUse(function (api) {

  api.use([
    'telescope-lib',
    'telescope-base',
    'aldeed:simple-schema',
    'aldeed:autoform',
    'tap:i18n',
    'fourseven:scss',
    'matb33:collection-hooks',
    'mizzao:autocomplete'
  ], ['client', 'server']);

  api.use([
    'jquery',
    'underscore',
    'iron:router',
    'templating'
  ], 'client');

  api.add_files([
    'lib/stocks.js',
    'lib/custom_fields.js',
    'lib/hooks.js',
    'package-tap.i18n'
  ], ['client', 'server']);

  api.add_files([
    'lib/client/routes.js',
    'lib/client/scss/stocks.scss',
    'lib/client/templates/stocks.html',
    'lib/client/templates/stocks.js',
    'lib/client/templates/stock_item.html',
    'lib/client/templates/stock_item.js',
    'lib/client/templates/stocks_menu.html',
    'lib/client/templates/stocks_menu.js',
    'lib/client/templates/post_stocks.html',
    'lib/client/templates/post_stocks.js'
    ], ['client']);

  api.add_files(['lib/server/publications.js'], ['server']);

  api.add_files([
    "i18n/en.i18n.json"
    ], ["client", "server"]);

  api.export([
    'preloadSubscriptions',
    'adminMenu',
    'Stocks',
    'addToPostSchema',
    'primaryNav',
    'postModules',
    'getPostStocks'
  ]);
});
