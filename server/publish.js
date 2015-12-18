
Meteor.publish('channels', function () {
    return Channels.find();
});

Meteor.publish('messages', function (channelId) {
    var limit = 5;
    return Messages.find({channelId:channelId}, {sort: {timestamp:-1}, limit:limit});
});

Meteor.publish('usernames', function () {
    return Meteor.users.find({}, {fields: {'username': 1}});
});
