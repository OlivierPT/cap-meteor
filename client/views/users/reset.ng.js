angular.module("cap-meteor").controller("ResetCtrl", ['$meteor', '$scope', '$state',
  function($meteor, $scope, $state){

      $scope.credentials = {
          email: ''
      };

      $scope.error = '';

      $scope.reset = function (){
          $meteor.forgotPassword($scope.credentials.email, function(error, result) {
            if (error) {
              $scope.error = 'Error sending forgot password email - ' + err;
            } else {
              $state.go('channels');
            }
          });
      };
  }
]);
