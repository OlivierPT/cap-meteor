angular.module('cap-meteor').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
  function($urlRouterProvider, $stateProvider, $locationProvider){

    $locationProvider.html5Mode(true);

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'client/views/users/login.ng.html',
        controller: 'LoginCtrl',
        controllerAs: 'lc'
      })
      .state('register',{
        url: '/register',
        templateUrl: 'client/views/users/register.ng.html',
        controller: 'RegisterCtrl',
        controllerAs: 'rc'
      })
      .state('resetpw', {
        url: '/resetpw',
        templateUrl: 'client/views/users/reset-password.ng.html',
        controller: 'ResetCtrl',
        controllerAs: 'rpc'
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
      });

      $urlRouterProvider.otherwise('/channels');
}]);
