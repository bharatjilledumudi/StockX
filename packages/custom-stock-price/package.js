Package.describe({
  summary: "Fetch Live Stock Price",
  version: '0.1.0',
  name: "custom-stock-price"
});

Package.onUse(function (api) {

  api.use([
    'telescope-lib',
    'telescope-base',
    'iron:router',
    'percolatestudio:synced-cron',
    'templating',
    ]);

  api.add_files([
    'lib/server/cron.js']);

});
