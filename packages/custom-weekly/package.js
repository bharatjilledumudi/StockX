Package.describe({summary: "Custom weekly view"});

Package.onUse(function (api) {

  api.use([
    'telescope-lib',
    'telescope-base',
    'iron:router',
    'meteorhacks:fast-render',
    'meteorhacks:subs-manager',
    'tap:i18n',
    'custom-singleweek',
    'fourseven:scss'
  ], ['client', 'server']);

  api.use([
    'jquery',
    'underscore',
    'templating'
  ], 'client');

  api.add_files([
    'package-tap.i18n',
    'lib/weekly.js',
    'lib/routes.js',
  ], ['client', 'server']);

  api.add_files([
    'lib/client/templates/posts_weekly.html',
    'lib/client/templates/after_week.html',
    'lib/client/templates/before_week.html',
    'lib/client/templates/posts_weekly.js',
    'lib/client/stylesheets/weekly.scss',
    ], ['client']);

  api.add_files([

    "i18n/en.i18n.json",




  ], ["client", "server"]);

  api.export(['PostsWeeklyController']);
});
