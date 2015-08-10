/*****************************************************************************/
/*  Client and Server Methods */
/*****************************************************************************/
Meteor.methods({
  'addChannel': function (channel) {
    if (this.isSimulation) {
    //   // do some client stuff while waiting for
    //   // result from server.
    //   return;
    }

  	channel.timestamp = Date.now();
    channel.user = Meteor.userId();
    Channels.insert(channel);
  },

  'deleteChannel': function (channelId) {
    if (this.isSimulation) {
      Channels.delete({_id:channelId});
    }

  	Channels.delete({_id:channelId});
    Messages.delete({channelId:channelId});
  },

  'sendMessage': function (message) {
    if (this.isSimulation) {
      message.timestamp = Date.now();
      message.user = Meteor.userId();
      message.state= 'pending';
      Messages.insert(message);
    }

  	message.timestamp = Date.now();
    message.user = Meteor.userId();
    message.state= 'pending';
    Messages.insert(message);
	}

});
