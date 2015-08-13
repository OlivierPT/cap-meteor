Messages.allow({
  insert: function (userId, message) {
    return userId && userId === channel.user;
  },
  update: function (userId, message, fields, modifier) {
    return false;
  },
  remove: function (userId, message) {
    return userId && userId === channel.user;
  }
});
