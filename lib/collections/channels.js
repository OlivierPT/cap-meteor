Channels = new Mongo.Collection("channels");

Channels.allow({
  insert: function (userId, channel) {
    return true;
  },
  update: function (userId, channel, fields, modifier) {
    return userId === channel.user;
  },
  remove: function (userId, channel) {
    return userId === channel.user;
  }
});
