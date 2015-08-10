angular.module('cap-meteor').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
  function($urlRouterProvider, $stateProvider, $locationProvider){

    $locationProvider.html5Mode(true);

    $stateProvider
      .state('sign', {
        url: '/sign',
        templateUrl: 'client/views/users/sign.ng.html',
        controller: 'SignCtrl',
        controllerAs: 'sc'
      })
      .state('logout', {
        url: '/logout',
        resolve: {
        "logout": ['$meteor', '$state', function($meteor, $state) {
            return $meteor.logout().then(function(){
                    $state.go('parties');
                }, function(err){
                    console.log('logout error - ', err);
                });
            }]
       }
      }).state('channels', {
        url: '/channels',
        templateUrl: 'client/views/index.ng.html',
        resolve: {
          "currentUser": ["$meteor", function($meteor){
            return $meteor.requireUser();
          }]
        }
      })
      .state('channel', {
        url: '/channels/:channelId',
        templateUrl: 'client/views/room.ng.html',
        resolve: {
          "currentUser": ["$meteor", function($meteor){
            return $meteor.requireUser();
          }]
        }
      });

      $urlRouterProvider.otherwise('/channels');
}]);
