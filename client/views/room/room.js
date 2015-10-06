angular.module('cap-meteor').controller("MessagesCtrl", ['$scope', '$meteor', '$stateParams',
    function($scope, $meteor, $stateParams){

      $scope.channelId = $stateParams.channelId;
  	  $scope.$meteorSubscribe("messages", $scope.channelId);

      $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');

  		$scope.messages = $meteor.collection(function() {
  			return Messages.find()
  		});

      $scope.channel = $meteor.object(Channels, $scope.channelId);

      $scope.sendMessage = function(newMessage){
        newMessage.channelId = $scope.channelId;
  			$meteor.call("sendMessage", newMessage);
  		};

      $scope.username = function(userId){
  			return Meteor.users.findOne({_id:userId}).username;
  		};

      $scope.messageSent = function(message){
  			return message.state === 'sent';
  		};

    }]);
