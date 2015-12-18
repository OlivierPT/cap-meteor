angular.module('cap-meteor').directive('mainMenu', function() {
    return {
      restrict: 'E',
      templateUrl: 'client/views/mainmenu/mainMenu.ng.html',
      controllerAs: 'mainMenuCtrl',
      controller: function($scope, $reactive) {
        $reactive(this).attach($scope);

        this.helpers({
          status() {
            Meteor.status();
          }
        });

        this.connected = () => {
          console.log("status: "+this.status.status);
          return this.status();
        }

      }
    }
  });
