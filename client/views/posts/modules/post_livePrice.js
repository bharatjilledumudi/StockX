Template[getTemplate('postLivePrice')].helpers({
  isLiveGreater: function (livePrice, price) {
    return livePrice >= price;
  }
});
