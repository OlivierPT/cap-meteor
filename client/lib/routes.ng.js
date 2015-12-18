angular.module('cap-meteor').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
  function($urlRouterProvider, $stateProvider, $locationProvider){

    $locationProvider.html5Mode(true);

    $stateProvider
      .state('sign', {
        url: '/sign',
        views: {
          "content": { template: '<sign-in-up></sign-in-up>' }
        }
      })
      .state('logout', {
        url: '/logout',
        resolve: {
        "logout": ['$meteor', '$state', function($meteor, $state) {
            return $meteor.logout().then(function(){
                    $state.go('sign');
                }, function(err){
                    console.log('logout error - ', err);
                });
            }]
       }
      }).state('channels', {
        url: '/channels',
        views: {
          "left-toolbar": { template: '<left-menu></left-menu>' },
          "main-toolbar": { template: '<main-menu></main-menu>' },
          "content": { templateUrl: 'client/views/home/home.ng.html' }
        },
        resolve: {
          "currentUser": ["$meteor", function($meteor){
            return $meteor.requireUser();
          }]
        }
      })
      .state('channel', {
        url: '/channels/:channelId',
        views: {
          "left-toolbar": { template: '<left-menu></left-menu>' },
          "main-toolbar": { template: '<main-menu></main-menu>' },
          "content": { template: '<room></room>' }
        },
        resolve: {
          "currentUser": ["$meteor", function($meteor){
            return $meteor.requireUser();
          }]
        }
      });

      $urlRouterProvider.otherwise('/channels');
}]);
