angular.module("cap-meteor").controller("SignCtrl", ['$scope', '$meteor', '$state',
  function($scope, $meteor, $state){

    $scope.credentials = {
      email: '',
      username: '',
      password: ''
    };

    $scope.error = '';

    $scope.login = function() {
      Meteor.loginWithPassword(
        $scope.credentials.username,
        $scope.credentials.password, function(error, result) {
          if (error) {
            $scope.error = 'Login error - ' + err;
          } else {
            $state.go('channels');
          }
        })
    };

    $scope.loginGihub = function() {
      Meteor.loginWithGithub({requestPermissions: ['user', 'public_repo']}, function(error, result){
        if (error) {
            $scope.error = 'Login error - ' + err;
        } else {
          $state.go('channels');
        }
      })
    };

    $scope.register = function() {
        Meteor.createUser($scope.credentials, function(error, result){
          if (error) {
            $scope.error = 'Registration error - ' + err;
          } else {
            $state.go('channels');
          }
        })
    };
  }
]);
