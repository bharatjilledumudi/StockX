Template[getTemplate('postCategory')].helpers({
  name: function(categories){
    return Categories.findOne(this.categories).name;
  },
  slug: function(categories){
    return Categories.findOne(this.categories).slug;
  },
  categoryLink: function(categories){
    return getCategoryUrl(Categories.findOne(this.categories).slug);
  }
});
