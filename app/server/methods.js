/*****************************************************************************/
/*  Server Methods */
/*****************************************************************************/

Meteor.methods({
  'addChannel': function (channel) {
  	channel.timestamp = Date.now();
    //channel.user = Meteor.userId();
    Channels.insert(channel);
  },

  newMessage: function (message) {
  	message.timestamp = Date.now();
    message.user = Meteor.userId();
    Messages.insert(message);
	}
});