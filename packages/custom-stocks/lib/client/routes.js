Meteor.startup(function () {

  Router.onBeforeAction(Router._filters.isAdmin, {only: ['stocks']});

  PostsStockController = PostsListController.extend({

    view: 'stock',

    getCurrentStock: function () {
      return Stocks.findOne({slug: this.params.slug});
    },

    getName: function () {
      var stock = this.getCurrentStock();
      return stock.name + ' - ' + getSetting('title', 'StockX');
    },

    getSymbol: function () {
      return this.getCurrentStock().symbol;
    }

  });

  // Stocks

  Router.route('/stock/:slug/:limit?', {
    name: 'posts_stock',
    controller: PostsStockController,
    onAfterAction: function() {
      this.slug = this.params.slug;
      Session.set('stockSlug', this.params.slug);
    }
  });

  // Stocks Admin

  Router.route('/stocks', {
    name: 'stocks'
  });

});
