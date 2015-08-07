angular.module('cap-meteor').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
  function($urlRouterProvider, $stateProvider, $locationProvider){

    $locationProvider.html5Mode(true);

    $stateProvider
      .state('channels', {
        url: '/channels',
        templateUrl: 'client/views/room.ng.html',
        controller: 'RoomCtrl',
        resolve: {
          "currentUser": ["$meteor", function($meteor){
            return $meteor.requireUser();
          }]
        }
      })
      .state('channel', {
        url: '/channels/:channelId',
        templateUrl: 'client/views/room.ng.html',
        controller: 'ChannelCtrl',
        resolve: {
          "currentUser": ["$meteor", function($meteor){
            return $meteor.requireUser();
          }]
        }
      })
      .state('signInOrUp', {
        url: '/signInOrUp',
        templateUrl: 'client/views/signInOrUp.ng.html',
        controller: 'SignInOrUpCtrl'
      });

      $urlRouterProvider.otherwise('/channels');
}]);
