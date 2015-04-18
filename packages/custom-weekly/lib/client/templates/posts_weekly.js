Meteor.startup(function () {

  Template[getTemplate('postsWeekly')].helpers({
    weeks: function () {
      var weeksArray = [];
      var weeks = Session.get('postsWeeks');
      for (i = 0; i < weeks * 7; i=i+7) {
        weeksArray.push({
          start: moment().subtract(i + 7, 'days').startOf('day').toDate(),
          end: moment().subtract(i, 'days').startOf('day').toDate(),
          index: i
        });
      }
      return weeksArray;
    },
    before_week: function () {
      return getTemplate('beforeWeek');
    },
    singleWeek: function () {
      return getTemplate('singleWeek');
    },
    context: function () {
      var context = this;
      context.showDateNav = false;
      return context;
    },
    after_week: function () {
      return getTemplate('afterWeek');
    },
    loadMoreWeeksUrl: function () {
      var count = parseInt(Session.get('postsWeeks')) + weeksPerPage;
      return '/weekly/' + count;
    }
  });

});
