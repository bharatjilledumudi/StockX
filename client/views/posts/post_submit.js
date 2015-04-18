AutoForm.hooks({
  submitPostForm: {

    before: {
      submitPost: function(doc) {

        this.template.$('button[type=submit]').addClass('loading');

        var post = doc;

        // ------------------------------ Checks ------------------------------ //

        if (!Meteor.user()) {
          flashMessage(i18n.t('you_must_be_logged_in'), 'error');
          return false;
        }

        // ------------------------------ Callbacks ------------------------------ //

        // run all post submit client callbacks on properties object successively
        post = postSubmitClientCallbacks.reduce(function(result, currentFunction) {
            return currentFunction(result);
        }, post);

        return post;
      }
    },

    onSuccess: function(operation, post) {
      this.template.$('button[type=submit]').removeClass('loading');
      trackEvent("new post", {'postId': post._id});
      Router.go('post_page', {_id: post._id});
      if (post.status === STATUS_PENDING) {
        flashMessage(i18n.t('thanks_your_post_is_awaiting_approval'), 'success');
      }
    },

    onError: function(operation, error) {
      this.template.$('button[type=submit]').removeClass('loading');
      flashMessage(error.message.split('|')[0], 'error'); // workaround because error.details returns undefined
      clearSeenMessages();
      // $(e.target).removeClass('disabled');
      if (error.error == 603) {
        var dupePostId = error.reason.split('|')[1];
        Router.go('post_page', {_id: dupePostId});
      }
    }

  }
});

Meteor.startup(function () {
  Template[getTemplate('post_submit')].helpers({
    settings: function() {
      return {
        position: "bottom",
        limit: 30,
        rules: [
          {
            subscription: 'autocompleteStocks',
            collection: 'autocompleteStocks',
            matchAll: true,
            field: "name",
            template: Template.post_autocomplete
          }
        ]
      };
    }
  })
});

Template[getTemplate('post_submit')].events({
  "autocompleteselect input": function(event, template, doc) {
    $('input[name="companyName"]').val(doc.name);
    $('input[name="symbol"]').val(doc.symbol);
    $('select[name=categories] option').filter(function() { return $(this).text() == doc.exchange; }).prop('selected', true);
  }
  // 'click .fetch-stock': function () {
  //     var data = $('.stockData').val();
  //     var stocks = Stocks.findOne({name:data});
  //     $('input[name="companyName"]').val(stocks.name);
  //     $('input[name="symbol"]').val(stocks.symbol);
  //     $('select[name=categories] option').filter(function() { return $(this).text() == stocks.exchange; }).prop('selected', true);
  //     // add to database
  // }
});
