Meteor.startup(function () {
  Template[getTemplate('stocksMenu')].helpers({
    hasStocks: function(){
      return typeof Stocks !== 'undefined' && Stocks.find().count();
    },
    stock: function () {
      return __('stocks')
    },
    stocks: function(){
      return Stocks.find({}, {sort: {order: 1, name: 1}});
    },
    stockLink: function () {
      return getStockUrl(this.slug);
    }
  });
});
