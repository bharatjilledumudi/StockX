Meteor.startup(function () {
  Template[getTemplate('stockItem')].helpers({
    formId: function () {
      return 'updateStock-'+ this._id
    }
  });

  Template[getTemplate('stockItem')].events({
    'click .delete-link': function(e, instance){
      e.preventDefault();
      if (confirm("Delete stock?")) {
        Stocks.remove(instance.data._id);
      }
    }
  });
});
