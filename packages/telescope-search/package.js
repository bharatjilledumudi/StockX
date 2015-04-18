Package.describe({summary: "Telescope search package"});

Package.onUse(function (api) {

  api.use(['telescope-lib', 'telescope-base', 'aldeed:simple-schema'], ['client', 'server']);

  api.use([
    'jquery',
    'underscore',
    'iron:router',
    'templating',
    'tap:i18n',
    'fourseven:scss'
  ], 'client');

  api.add_files([
    'lib/search.js',
    'package-tap.i18n'
  ], ['client', 'server']);

  api.add_files([
    'lib/client/routes.js',
    'lib/client/templates/search.html',
    'lib/client/templates/search.js',
    'lib/client/templates/search_logs.html',
    'lib/client/templates/search_logs.js',
    'lib/client/stylesheets/search.scss'
    ], ['client']);

  api.add_files([
    'lib/server/log_search.js',
    'lib/server/publications.js'
    ], ['server']);

  api.add_files([
    "i18n/en.i18n.json"
  ], ["client", "server"]);

  api.export(['adminMenu', 'viewParameters']);
});