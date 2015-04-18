Template[getTemplate('singleWeekNav')].created = function(){

  $(document).unbind('keyup'); //remove any potential existing bindings to avoid duplicates

  var currentDate = moment(Session.get('currentWeek')).startOf('day');
  var thisweek = moment(new Date()).startOf('day');

  $(document).bind('keyup', 'left', function(){
    Router.go($('.prev-link').attr('href'));
  });

  $(document).bind('keyup', 'right', function(){
    if(isAdmin(Meteor.user()) || thisweek.diff(currentDate, 'days') > 0)
      Router.go($('.next-link').attr('href'));
  });

};

Template[getTemplate('singleWeekNav')].helpers({
  currentWeek: function(){
    var endOfWeek = moment(Session.get('currentWeek'));
    var startOfWeek = moment(Session.get('currentWeek')).subtract( 7, 'days');
    var thisweek = moment(new Date());
    var diff = thisweek.diff(endOfWeek, 'days');
    if (diff === 0) {
      return i18n.t("thisweek");
    }
    if (diff === 1) {
      return i18n.t("lastweek");
    }
    return startOfWeek.format("MMMM Do YYYY") + '-' + endOfWeek.format("MMMM Do YYYY");
  },
  previousWeekURL: function(){
    var currentWeek = moment(Session.get('currentWeek'));
    var newDate = currentWeek.subtract(7, 'days');
    return getWeekURL(newDate);
  },
  showPreviousWeek: function(){
    // TODO
    return true;
  },
  nextWeekURL: function(){
    var currentWeek = moment(Session.get('currentWeek'));
    var newDate = currentWeek.add(7, 'days');
    return getWeekURL(newDate);
  },
  showNextWeek: function(){
    var currentWeek = moment(Session.get('currentWeek')).startOf('day');
    var thisweek = moment(new Date()).startOf('day');
    return isAdmin(Meteor.user()) || (thisweek.diff(currentWeek, 'days') > 0);
  }
})
