Channels.allow({
  insert: function (userId, channel) {
    console.log('ALLOW Insert channel');
    return userId && userId === channel.user;
  },
  update: function (userId, channel, fields, modifier) {
    return userId && userId === channel.user;
  },
  remove: function (userId, channel) {
    console.log('ALLOW Remove channel');
    return userId && userId === channel.user;
  }
});

Channels.deny({
  remove: function (userId, channel) {
    return true;
  }
});
