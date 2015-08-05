angular.module('cap-meteor',['angular-meteor', 'ui.router']);

angular.module('cap-meteor').controller("ChannelsCtrl", ['$scope', '$meteor',
    function($scope, $meteor){

      $scope.$meteorSubscribe("channels");

      $scope.channels = $meteor.collection(function() {
        return Channels.find()
      });

      $scope.addChannel = function(newChannelLabel){
      	newChannel = {};
      	newChannel.label = newChannelLabel;
      	$meteor.call("addChannel", newChannel);
      };

    }]);


angular.module('cap-meteor').controller("MessagesListCtrl", ['$scope', '$meteor',
    function($scope, $meteor){

      $scope.$meteorSubscribe("messages");

      $scope.messages = $meteor.collection(function() {
        return Messages.find()
      });

    }]);