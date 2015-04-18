addToPostSchema.push(
  {
    propertyName: 'categories',
    propertySchema: {
      type: String,
      optional: false,
      editable: true,
      autoform: {
        editable: true,
        options: function () {
          var categories = Categories.find().map(function (category) {
            return {
              value: category._id,
              label: category.name
            }
          });
          return categories;
        }
      }
    }
  }
);
