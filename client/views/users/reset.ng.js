angular.module("cap-meteor").controller("ResetCtrl", ['$meteor', '$scope', '$state',
  function($meteor, $scope, $state){

      $scope.credentials = {
          email: ''
      };

      $scope.error = '';

      $scope.reset = function (){
          $meteor.forgotPassword($scope.credentials.email).then(
            function(){
              $state.go('channels');
            },
            function(err){
              $scope.error = 'Error sending forgot password email - ' + err;
            }
          );
      };
  }
]);
