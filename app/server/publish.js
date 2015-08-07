
Meteor.publish('channels', function () {
    return Channels.find();
});

Meteor.publish('messages', function (channelId) {
    return Messages.find({channelId:channelId});
});

Meteor.publish('usernames', function () {
    return Meteor.users.find({}, {fields: {'username': 1}});
});
