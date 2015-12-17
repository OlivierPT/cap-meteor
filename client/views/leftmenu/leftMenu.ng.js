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
          },

          status() {
            Meteor.status();
          }
        });

        this.channelActive = (channelId) => {
          return ($stateParams.channelId === channelId);
        };

        this.enterChannel = (channelId) => {
          $state.go('channel', {'channelId':channelId});
        };

      }
    }
  });
