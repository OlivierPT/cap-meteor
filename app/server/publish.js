
Meteor.publish('channels', function () {
    return Channels.find();
});

Meteor.publish('messages', function () {
    return Messages.find();
});