/*****************************************************************************/
/*  Client and Server Methods */
/*****************************************************************************/
Meteor.methods({
  'addChannel': function (channel) {
    channel.timestamp = Date.now();
    channel.user = Meteor.userId();
    Channels.insert(channel);
  },

  'deleteChannel': function (channelId) {
    if (this.isSimulation) {
      Channels.remove({_id:channelId});
      return;
    }

    if (Channels.findOne({_id:channelId}).user === Meteor.userId()) {
      Channels.remove({_id:channelId});
      Messages.remove({channelId:channelId});
    } else {
      console.log("Can't delete channel");
      throw new Meteor.Error("invalid-rights",
          "User can't delete channel.");
    }

  },

  'sendMessage': function (message) {
    // Message is first stored on the client in a pending state
    if (this.isSimulation) {
      message.timestamp = Date.now();
      message.user = Meteor.userId();
      message.state= 'pending';
      Messages.insert(message);
      return;
    }

    message.timestamp = Date.now();
    message.user = Meteor.userId();
    message.state= 'sent';
    Messages.insert(message);
	}

});
