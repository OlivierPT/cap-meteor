angular.module('cap-meteor').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
  function($urlRouterProvider, $stateProvider, $locationProvider){

    $locationProvider.html5Mode(true);

    $stateProvider
      .state('sign', {
        url: '/sign',
        views: {
          "content": { templateUrl: 'client/views/users/sign.ng.html' }
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
          "main-toolbar": { templateUrl: 'client/views/mainmenu/mainMenu.ng.html' },
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
          "main-toolbar": { templateUrl: 'client/views/mainmenu/mainMenu.ng.html' },
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
