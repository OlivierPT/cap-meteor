angular.module('cap-meteor').directive('notification', function() {
    return {
      restrict: 'E',
      controllerAs: 'notifcationCtrl',
      controller: function($scope, $mdToast, $animate) {

        this.toastPosition = {
          bottom: true,
          top: false,
          left: false,
          right: true
        };

        this.getToastPosition = function() {
          return Object.keys(this.toastPosition)
            .filter(function(pos) { return this.toastPosition[pos]; })
            .join(' ');
        };

        $rootScope.$on("notification.rised",
            function(event, message) {
                console.log( "Notification event %s.", someService.count() );
                $mdToast.show($mdToast.simple()
                  .content('Error while Channel creation.')
                  .position(this.getToastPosition())
                  .hideDelay(3000));
            }
        );

      }
    }
  });
