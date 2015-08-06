angular.module('cap-meteor').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
  function($urlRouterProvider, $stateProvider, $locationProvider){

    $locationProvider.html5Mode(true);

    $stateProvider
      .state('channels', {
        url: '/channels',
        templateUrl: 'client/index.ng.html',
        controller: 'ChannelsCtrl'
      });

      $urlRouterProvider.otherwise('/channels');
}]);