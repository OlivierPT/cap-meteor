
Meteor.publish('channels', function () {
    return Channels.find();
});

Meteor.publish('messages', function (channelId) {
    return Messages.find({channelId:channelId});
});
