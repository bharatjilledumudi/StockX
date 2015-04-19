Template[getTemplate('tabsNav')].helpers({
  showTabsNav: function () {
    return Router.current().location.get().path == '/' || Router.current().location.get().path.startsWith('/new')
    || Router.current().location.get().path.startsWith('/top') || Router.current().location.get().path.startsWith('/perform');
  },
  top: function () {
    return Router.path('posts_top');
  },
  best: function () {
    return Router.path('posts_perform');
  },
  new: function () {
    return Router.path('posts_new');
  }
});
