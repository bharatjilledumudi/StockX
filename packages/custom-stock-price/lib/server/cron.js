SyncedCron.options = {
  log: false,
  collectionName: 'cronHistory',
  utc: false,
  collectionTTL: 172800
}

var addJob = function () {
  SyncedCron.add({
    name: 'Fetch Live Stock Price',
    schedule: function(parser) {
      return parser.text('every 15 seconds');
    },
    job: function() {
      Posts.find().forEach(function (post) {
          var categories = post.categories;
          var category = Categories.findOne(categories);
          var livePrice = Meteor.call('checkPrice', post.symbol, category.symbol);
          if(livePrice >= post.price) {
            var percentChange = Math.abs(((livePrice - post.price) / post.price) * 100).toFixed(2);
          } else {
            var percentChange = Math.abs(((livePrice - post.price) / post.price) * 100).toFixed(2) * -1;
          }
          Posts.update(post._id, { $set: { 'livePrice': parseFloat(livePrice).toFixed(2), 'percentChange': percentChange}});
      });
    }
  });
}

Meteor.startup(function () {
  addJob();
})
