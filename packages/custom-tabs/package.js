Package.describe({
  summary: "A selection on top of the posts, to switch between new, top and best tabs",
  version: '0.1.0',
  name: 'custom-tabs'
});

Package.onUse(function (api) {

  // --------------------------- 1. Meteor packages dependencies ---------------------------

  // automatic (let the package specify where it's needed)

  api.use([
    'telescope-base',             // basic Telescope hooks and objects
    'telescope-lib',              // useful functions
    'fourseven:scss',             // SCSS compilation package
    'tap:i18n'
  ]);

  // client

  api.use([
    'jquery',                     // useful for DOM interactions
    'underscore',                 // JavaScript swiss army knife library
    'templating'                  // required for client-side templates
  ], ['client']);


  // ---------------------------------- 2. Files to include ----------------------------------

  api.add_files([
    'lib/tabs.js',
    'package-tap.i18n'
  ], ['client', 'server']);

  // client

  api.add_files([
    'lib/client/templates/tabs_nav.html',
    'lib/client/templates/tabs_nav.js'
    ], ['client']);

});
