Template[getTemplate('post_autocomplete')].helpers({
  symbol: function () {
    var stock = Stocks.findOne({name:this.name});
    return stock.symbol;
  },
  exchange: function () {
    var stock = Stocks.findOne({name:this.name});
    return stock.exchange;
  }
});
