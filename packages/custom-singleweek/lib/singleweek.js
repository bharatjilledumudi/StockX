viewsMenu.push({
  route: 'postsSingleWeekDefault',
  label: 'singleweek',
  description: 'posts_of_a_single_week'
});

viewParameters.singleweek = function (terms) {
  return {
    find: {
      postedAt: {
        $gte: terms.after,
        $lt: terms.before
      }
    },
    options: {
      sort: {sticky: -1, score: -1}
    }
  };
};

getWeekURL = function(moment){
  return Router.path('postsSingleWeek', {
    year: moment.year(),
    month: moment.month() + 1,
    start: moment.date() - 7,
    end: moment.date()
  });
};
