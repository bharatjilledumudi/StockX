adminMenu.push({
  route: 'stocks',
  label: 'Stocks',
  description: 'add_and_remove_stocks'
});

// // push "stocks" modules to postHeading
// postHeading.push({
//   template: 'postStock',
//   order: 30
// });

// push "stocksMenu" template to primaryNav
// primaryNav.push({
//   template: 'stocksMenu',
//   order: 50
// });

// we want to wait until stocks are all loaded to load the rest of the app
preloadSubscriptions.push('stocks');
