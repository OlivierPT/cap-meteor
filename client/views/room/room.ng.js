angular.module('cap-meteor').controller("MessagesCtrl", ['$scope', '$meteor', '$stateParams',
    function($scope, $meteor, $stateParams){

      $scope.channelId = $stateParams.channelId;

      $scope.subscribe("messages", () => {
        return [
          $scope.channelId
        ]
      });

      $scope.subscribe("usernames");

      $scope.helpers({
        messages: () => {
          return Messages.find()
        },

        channel: () => {
          return Channels.findOne($scope.channelId)
        },

        usernames: () => {
          //return Meteor.users.findOne({_id: Meteor.userId()}).username;
          return Meteor.users.find({});
        }
      });

      $scope.username = (userId) => {
        return Meteor.users.findOne({_id: userId}).username;
      }

      $scope.sendMessage = function(newMessage){
        newMessage.channelId = $scope.channelId;
  			Meteor.call("sendMessage", newMessage);
  		};

      $scope.messageSent = function(message){
  			return message.state === 'sent';
  		};

    }
]);
