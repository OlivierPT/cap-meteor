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
      $state.go('signInOrUp');
    }
  });

}]);

angular.module('cap-meteor').controller("RoomCtrl", ['$scope', '$meteor', '$stateParams',
    function($scope, $meteor, $stateParams){

      $scope.channelActive = '';
  		$scope.$meteorSubscribe("channels");

  		$scope.channels = $meteor.collection(function() {
  			return Channels.find();
  		});

  		$scope.addChannel = function(newChannel){
  			$meteor.call("addChannel", newChannel);
  		};

      $scope.deleteChannel = function(channelId){
        $meteor.call("deleteChannel", channelId);
      };

      $scope.channelActive = function(channelId){
  			$scope.channelActive = '';
  		};

    }]);

angular.module('cap-meteor').controller("ChannelCtrl", ['$scope', '$meteor', '$stateParams',
    function($scope, $meteor, $stateParams){


      $scope.channelId = $stateParams.channelId;

  		$scope.$meteorSubscribe("channels");
      $scope.$meteorSubscribe("messages", $scope.channelId);
      $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');

  		$scope.channels = $meteor.collection(function() {
  			return Channels.find()
  		});

  		$scope.messages = $meteor.collection(function() {
  			return Messages.find()
  		});

  		$scope.addChannel = function(newChannel){
  			$meteor.call("addChannel", newChannel);
  		};

      $scope.deleteChannel = function(channelId){
  			$meteor.call("deleteChannel", channelId);
  		};

      $scope.sendMessage = function(newMessage){
        newMessage.channelId = $scope.channelId;
  			$meteor.call("sendMessage", newMessage);
  		};

      $scope.channelActive = function(channelId){
  			if ($scope.channelId === channelId) {
          return 'active';
        } else {
          return '';
        }
  		};

      $scope.username = function(userId){
  			return Meteor.users.findOne({_id:userId}).username;
        //return userId;
  		};

    }]);

angular.module('cap-meteor').controller("SignInOrUpCtrl", ['$scope', '$state', '$meteor',
    function($scope, $state, $meteor){

      $scope.signIn = function(login, passwd){
  			$meteor.loginWithPassword(login, passwd).then(function(){
          console.log('Login success');
          $scope.username = '';
          $scope.passwd = '';

          $state.go('channels');
        }, function(err){
          console.log('Login error - ', err);
        });
  		};

      $scope.signUp = function(username, email, passwd){
        $meteor.createUser({
              username: $scope.username,
              email: $scope.email,
              password: $scope.passwd
            }).then(function(){
              $scope.username = '';
              $scope.email = '';
              $scope.passwd = '';

              $state.go('channels');
              console.log('Signup success');
          }, function(err){
            console.log('Login error - ', err);
          });
  		};

      $scope.signOut = function(){
        $meteor.logout().then(function(){
            console.log('Logout success');
          }, function(err){
            console.log('logout error - ', err);
          });
        };
	}]);

  angular.module('cap-meteor').controller("NavBarCtrl", ['$scope', '$state', '$meteor',
      function($scope, $state, $meteor){

        $scope.signOut = function(){
          $meteor.logout().then(function(){
              console.log('Logout success');
              $state.go('signInOrUp');
            }, function(err){
              console.log('logout error - ', err);
            });
          };
  	}]);
