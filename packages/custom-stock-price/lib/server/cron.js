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
          Posts.update(post._id, { $set: { 'livePrice': livePrice}});
      });
    }
  });
}

Meteor.startup(function () {
  addJob();
})
