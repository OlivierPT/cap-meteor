angular.module('cap-meteor',['angular-meteor', 'ui.router']);

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

		$scope.$meteorSubscribe("channels");


		$scope.channels = $meteor.collection(function() {
			return Channels.find();
		});

		$scope.addChannel = function(newChannel){
			$meteor.call("addChannel", newChannel);
		};

    }]);

    angular.module('cap-meteor').controller("ChannelCtrl", ['$scope', '$meteor', '$stateParams',
        function($scope, $meteor, $stateParams){

        $scope.channelId = $stateParams.channelId;

    		$scope.$meteorSubscribe("channels");
    		$scope.$meteorSubscribe("messages", $scope.channelId);

    		$scope.channels = $meteor.collection(function() {
    			return Channels.find()
    		});

    		$scope.messages = $meteor.collection(function() {
    			return Messages.find()
    		});

    		$scope.addChannel = function(newChannel){
    			$meteor.call("addChannel", newChannel);
    		};

        $scope.sendMessage = function(newMessage){
          newMessage.channelId = $scope.channelId;
    			$meteor.call("sendMessage", newMessage);
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
