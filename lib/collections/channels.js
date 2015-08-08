Channels = new Mongo.Collection("channels");

Channels.allow({
  insert: function (userId, party) {
    return true;
  },
  update: function (userId, party, fields, modifier) {
    return true;
  },
  remove: function (userId, party) {
    return true;
  }
});
