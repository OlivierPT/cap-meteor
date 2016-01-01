angular.module('cap-meteor').directive('leftMenu', function() {
    return {
      restrict: 'E',
      templateUrl: 'client/views/leftmenu/leftMenu.ng.html',
      controllerAs: 'leftMenu',
      controller: function($scope, $reactive, $stateParams, $state) {
        $reactive(this).attach($scope);

        this.subscribe("channels");

        this.helpers({
          channels() {
            return Channels.find();
          }
        });

        this.addChannel = function(newChannel){
          Meteor.call("addChannel", newChannel, function(error, result) {
            if (error) {
              console.log('Channel creation error - ', err);
              $scope.$emit('notification.rised','Error while Channel creation.');
            } else {
              $scope.$emit('notification.rised','Channel '+newChannel.label+' created!');
            }
          })
        };

        this.deleteChannel = function(channelId){
          Meteor.call("deleteChannel", channelId, function(error, result) {
            if (error) {
              console.log('Error while Channel deletion. Error - ', err);
              $scope.$emit('notification.rised',err.reason);
            } else {
              $scope.$emit('notification.rised','Channel deleted!');
            }
          })
        };

        this.channelActive = (channelId) => {
          return ($stateParams.channelId === channelId);
        };

        this.enterChannel = (channelId) => {
          $state.go('channel', {'channelId':channelId});
        };

      }
    }
  });
