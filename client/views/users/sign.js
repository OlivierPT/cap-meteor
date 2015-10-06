angular.module("cap-meteor").controller("SignCtrl", ['$scope', '$meteor', '$state',
  function($scope, $meteor, $state){

    $scope.credentials = {
      email: '',
      username: '',
      password: ''
    };

    $scope.error = '';

    $scope.login = function (){
      $meteor.loginWithPassword($scope.credentials.username, $scope.credentials.password).then(
        function(){
          $state.go('channels');
        },
        function(err){
          $scope.error = 'Login error - ' + err;
        }
      );
    };

    $scope.loginGihub = function (){
      $meteor.loginWithGithub({
        requestPermissions: ['user', 'public_repo']
      }).then(
        function(){
          $state.go('channels');
        },
        function(err){
          $scope.error = 'Login error - ' + err;
        }
      );
    };

    $scope.register = function (){
        $meteor.createUser($scope.credentials).then(
      function(){
        $state.go('channels');
      },
      function(err){
        $scope.error = 'Registration error - ' + err;
      }
    );
    };

  }
]);
