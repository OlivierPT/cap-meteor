angular.module('cap-meteor').controller("ChannelCtrl", ['$scope', '$meteor', '$stateParams',
    function($scope, $meteor, $stateParams){

      $scope.channelId = $stateParams.channelId;
  	  $scope.$meteorSubscribe("messages", $scope.channelId);
      $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');

  		$scope.messages = $meteor.collection(function() {
  			return Messages.find()
  		});

      $scope.sendMessage = function(newMessage){
        newMessage.channelId = $scope.channelId;
  			$meteor.call("sendMessage", newMessage);
  		};

      $scope.username = function(userId){
  			return Meteor.users.findOne({_id:userId}).username;
  		};

    }]);