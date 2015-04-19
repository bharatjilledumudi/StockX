Template[getTemplate('postsLoadMore')].helpers({
  postsReady: function () {
    return this.postsReady;
  },
  hasPosts: function () {
    return !!this.postsCursor.count();
  },
  showSubmit : function() {
    return Router.current().location.get().path == '/' || Router.current().location.get().path.startsWith('/new')
    || Router.current().location.get().path.startsWith('/top') || Router.current().location.get().path.startsWith('/perform')
    || Router.current().location.get().path.startsWith('/category') || Router.current().location.get().path.startsWith('/search');
  }
});

Template[getTemplate('postsLoadMore')].events({
  'click .more-button': function (event, instance) {
    event.preventDefault();
    if (this.controllerInstance) {
      // controller is a template
      this.loadMoreHandler(this.controllerInstance);
    } else {
      // controller is router
      this.loadMoreHandler();
    }
  }
});