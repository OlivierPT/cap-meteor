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

  'sendMessage': function (message) {
  	message.timestamp = Date.now();
    message.user = Meteor.userId();
    Messages.insert(message);
	}

});
