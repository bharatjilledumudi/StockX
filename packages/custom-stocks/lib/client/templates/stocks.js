Meteor.startup(function () {
  Template[getTemplate('stocks')].helpers({
    stocks: function(){
      return Stocks.find({}, {sort: {order: 1, name: 1}});
    },
    stockItem: function () {
      return getTemplate('stockItem');
    }
  });

  Template[getTemplate('stocks')].events({
    'click input[type=submit]': function(e){
      e.preventDefault();

      var name = $('#name').val();
      var numberOfStocks = Stocks.find().count();
      var order = parseInt($('#order').val()) || (numberOfStocks + 1);
      var slug = slugify(name);

      Meteor.call('submitStock', {
        name: name,
        symbol: symbol,
        exchange: exchange,
        order: order,
        slug: slug
      }, function(error, stockName) {
        if(error){
          console.log(error);
          flashMessage(error.reason, "error");
          clearSeenMessages();
        }else{
          $('#name').val('');
          // flashMessage('New stock "'+stockName+'" created', "success");
        }
      });
    }
  });
});
