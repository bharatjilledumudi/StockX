// stock schema
var Schema = {};
var stockSchemaObject = {
  _id: {
    type: String,
    optional: true,
    autoform: {
      omit: true
    }
  },
  name: {
    type: String,
  },
  symbol: {
    type: String,
  },
  exchange: {
    type: String
  },
  livePrice: {
    type: Number,
    optional: true,
    decimal: true,
    autoform: {
      omit: true
    }
  },
  upvotes: {
    type: Number,
    optional: true,
    autoform: {
      omit: true
    }
  },
  upvoters: {
    type: [String], // XXX
    optional: true,
    autoform: {
      omit: true
    }
  },
  downvotes: {
    type: Number,
    optional: true,
    autoform: {
      omit: true
    }
  },
  downvoters: {
    type: [String], // XXX
    optional: true,
    autoform: {
      omit: true
    }
  },
  score: {
    type: Number,
    decimal: true,
    optional: true,
    autoform: {
      omit: true
    }
  },
  status: {
    type: Number,
    optional: true,
    autoform: {
      omit: true
    }
  },
  createdAt: {
    type: Date,
    optional: true,
    autoform: {
      omit: true
    }
  },
  slug: {
    type: String,
    optional: true,
    autoform: {
      omit: true
    }
  }
};

Stocks = new Meteor.Collection("stocks");
Stocks.attachSchema(stockSchemaObject);

Schema.Stocks = new SimpleSchema(stockSchemaObject);

Stocks.before.insert(function (userId, doc) {
  // if no slug has been provided, generate one
  if (!doc.slug)
    doc.slug = slugify(doc.name);
});

// stock post list parameters
viewParameters.stock = function (terms) {
  var stockId = Stocks.findOne({slug: terms.stock})._id;
  return {
    find: {'stocks': {$in: [stockId]}} ,
    options: {sort: {sticky: -1, score: -1}} // for now stocks views default to the "top" view
  };
}

Meteor.startup(function () {
  if (!Stocks.find().count()) {
  //  insertStocks();
  }

  Stocks.allow({
    insert: isAdminById,
    update: isAdminById,
    remove: isAdminById
  });

  Meteor.methods({
    submitStock: function(stock){
      console.log(stock)
      if (!Meteor.user() || !isAdmin(Meteor.user()))
        throw new Meteor.Error(i18n.t('you_need_to_login_and_be_an_admin_to_add_a_new_stock'));
      var stockId=Stocks.insert(stock);
      return stock.name;
    }
  });
});


getPostStocks = function (post) {
  return !!post.stocks ? Stocks.find({_id: post.stocks}).fetch() : [];
};

getStockUrl = function(slug){
  return getSiteUrl()+'stock/'+slug;
};

// add callback that adds stocks CSS classes
postClassCallbacks.push(function (post, postClass){
  var classArray = _.map(getPostStocks(post), function (stock){return "stock-"+stock.slug});
  return postClass + " " + classArray.join(' ');
});

// ------------------------------------------------------------------------------------------- //
// ---------------------------------- Insert initial Stock Data ------------------------------ //
// ------------------------------------------------------------------------------------------- //

submitStock = function (stock) {

  var exchangeName = stock.exchange;
      exchange = Categories.findOne({name:exchangeName});
  // ------------------------------ Properties ------------------------------ //

  defaultProperties = {
    createdAt: new Date(),
    upvotes: 0,
    downvotes: 0,
    score: 0,
    livePrice: 0,
    status: 1
  };

  //Get live price
  stock.livePrice = Meteor.call('checkPrice', stock.symbol, exchange.symbol);

  // -------------------------------- Insert ------------------------------- //

  stock._id = Stocks.insert(stock);

  return stock;
}

// ------------------------------------------------------------------------------------------- //

var createStock = function (symbol, name, exchange) {
  var stock = {
    name: name,
    symbol: symbol,
    exchange: exchange,
  }

  submitStock(stock);
}
