angular.module('cap-meteor',['angular-meteor', 'ui.router', 'ngMaterial']);

// Icon configuration
var themeIcons = function ($mdIconProvider) {
  $mdIconProvider
    .iconSet("social",
             "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-social.svg")
    .iconSet("action",
             "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-action.svg")
    .iconSet("communication",
             "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-communication.svg")
    .iconSet("content",
             "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-content.svg")
    .iconSet("toggle",
             "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-toggle.svg")
    .iconSet("navigation",
             "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-navigation.svg")
    .iconSet("image",
             "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-image.svg");
};

angular.module('cap-meteor').config(themeIcons);

// Module configuration for Cordova compatibility
function onReady() {
  angular.bootstrap(document, ['cap-meteor']);
}

if (Meteor.isCordova) {
  angular.element(document).on("deviceready", onReady);
} else {
  angular.element(document).ready(onReady);
}

// Authentication Checking
angular.module("cap-meteor").run(["$rootScope", "$state", function($rootScope, $state) {
  $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireUser promise is rejected
    // and redirect the user back to the main page
    if (error === "AUTH_REQUIRED") {
      $state.go('sign');
    }
  });

}]);

angular.module("cap-meteor").controller('AppCtrl', ['$scope', '$mdToast', '$animate', '$mdSidenav', '$meteor',
  function($scope, $mdToast, $animate, $mdSidenav, $meteor) {

    $scope.toastPosition = {
      bottom: true,
      top: false,
      left: false,
      right: true
    };

    $scope.getToastPosition = function() {
      return Object.keys($scope.toastPosition)
        .filter(function(pos) { return $scope.toastPosition[pos]; })
        .join(' ');
    };

    $scope.channelActive = '';
    $scope.$meteorSubscribe("channels");

    $scope.channels = $meteor.collection(function() {
      return Channels.find();
    });

    $scope.addChannel = function(newChannel){
      $meteor.call("addChannel", newChannel).then(function(){
        
        $mdToast.show($mdToast.simple()
          .content('Channel '+newChannel.label+' created!')
          .position($scope.getToastPosition())
          .hideDelay(3000));

          }, function(err){
              console.log('logout error - ', err);
          });
    };

    $scope.deleteChannel = function(channelId){
      $meteor.call("deleteChannel", channelId);
    };

    $scope.channelActive = function(channelId){
      $scope.channelActive = '';
    };

    $scope.toogleLeftMenu = function() {
      $mdSidenav('left').toggle();
    };

}]);
