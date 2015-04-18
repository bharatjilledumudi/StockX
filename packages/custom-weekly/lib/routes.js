var coreSubscriptions = new SubsManager({
  // cache recent 50 subscriptions
  cacheLimit: 50,
  // expire any subscription after 30 minutes
  expireIn: 30
});

PostsWeeklyController = RouteController.extend({

  template: function() {
    // use a function to make sure the template is evaluated *after* any template overrides
    return getTemplate('postsWeekly');
  },

  data: function () {
    this.weeks = this.params.weeks ? this.params.weeks : weeksPerPage;
    Session.set('postsWeeks', this.weeks);
    return {
      weeks: this.weeks
    };
  },

  getTitle: function () {
    return i18n.t('weekly') + ' - ' + getSetting('title', "Telescope");
  },

  getDescription: function () {
    return i18n.t('week_by_day_view');
  },

  fastRender: true
});

Meteor.startup(function () {

  Router.route('/weekly/:weeks?', {
    name: 'postsWeekly',
    controller: PostsWeeklyController
  });

});
