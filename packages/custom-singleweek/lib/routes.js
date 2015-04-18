// Controller for post digest

PostsSingleWeekController = RouteController.extend({

  template: getTemplate('singleWeek'),

  data: function() {
    var currentWeek = this.params.end ? new Date(this.params.year, this.params.month - 1, this.params.end) : Session.get('today');
    Session.set('currentWeek', currentWeek);
  },

  getTitle: function () {
    return i18n.t('single_week') + ' - ' + getSetting('title', 'Telescope');
  },

  getDescription: function () {
    return i18n.t('posts_of_a_single_week');
  },

  fastRender: true

});

Meteor.startup(function () {

  // Digest

  Router.route('/week/:year/:month/:start/:end', {
    name: 'postsSingleWeek',
    controller: PostsSingleWeekController
  });

  Router.route('/week', {
    name: 'postsSingleWeekDefault',
    controller: PostsSingleWeekController
  });

});
