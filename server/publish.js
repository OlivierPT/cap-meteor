
Meteor.publish('channels', function () {
    return Channels.find();
});

Meteor.publish('messages', function (channelId) {
    return Messages.find({channelId:channelId}, {sort: {timestamp:1}, limit:10});
});

Meteor.publish('usernames', function () {
    return Meteor.users.find({}, {fields: {'username': 1}});
});
