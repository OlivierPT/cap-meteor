Meteor.startup(function () {
  // If there no Channel in the database, General has to be created
  if (Channels.find({}).count() === 0) {
    Channels.insert({label:"General",user:"System", timestamp:Date.now()})
  }
});
