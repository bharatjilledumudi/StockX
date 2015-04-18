Template[getTemplate('postStock')].helpers({
  name: function(stocks){
    return Stocks.findOne(this.stocks).name;
  },
  slug: function(stocks){
    return Stocks.findOne(this.stocks).slug;
  },
  stockLink: function(stocks){
    return getStockUrl(Stocks.findOne(this.stocks).slug);
  }
});
