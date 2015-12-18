angular.module('cap-meteor').directive('room', function() {
  return {
    restrict: 'E',
    templateUrl: 'client/views/room/room.ng.html',
    controllerAs: 'roomCtrl',
    controller: function($scope, $reactive, $stateParams, $state) {
      $reactive(this).attach($scope);

      this.channelId = $stateParams.channelId;
      this.newMessage = {};

      this.subscribe("messages", () => {
        return [
          this.channelId
        ]
      });

      this.subscribe("usernames");

      this.helpers({
        messages: () => {
          return Messages.find({}, {sort: {timestamp:1}})
        },

        channel: () => {
          return Channels.findOne(this.channelId)
        },

        usernames: () => {
          return Meteor.users.find({});
        }
      });

      this.username = (userId) => {
        return Meteor.users.findOne({_id: userId}).username;
      }

      this.sendMessage = () => {
        this.newMessage.channelId = this.channelId;
        Meteor.call("sendMessage", this.newMessage);
        this.newMessage = {};
  		};

      this.messageSent = (message) => {
  			return message.state === 'sent';
  		};

    }
  }
});
