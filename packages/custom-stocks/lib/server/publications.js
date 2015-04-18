Meteor.startup(function () {
  Stocks._ensureIndex({name: 1});
});

Meteor.publish('stocks', function() {
  if(can.viewById(this.userId)){
    return Stocks.find();
  }
  return [];
});

Meteor.publish("autocompleteStocks", function(selector, options) {
  Autocomplete.publishCursor(Stocks.find(selector, options), this);
  this.ready();
});
