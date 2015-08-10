angular.module("cap-meteor").controller("SignCtrl", ['$meteor', '$state',
  function($meteor, $state){
    var vm = this;

    vm.credentials = {
      email: '',
      username: '',
      password: ''
    };

    vm.error = '';

    vm.login = function (){
      $meteor.loginWithPassword(vm.credentials.username, vm.credentials.password).then(
        function(){
          $state.go('channels');
        },
        function(err){
          vm.error = 'Login error - ' + err;
        }
      );
    };

    vm.loginGihub = function (){
      $meteor.loginWithGithub({
        requestPermissions: ['user', 'public_repo']
      }).then(
        function(){
          $state.go('channels');
        },
        function(err){
          vm.error = 'Login error - ' + err;
        }
      );
    };

    vm.register = function (){
        $meteor.createUser(vm.credentials).then(
      function(){
        $state.go('channels');
      },
      function(err){
        vm.error = 'Registration error - ' + err;
      }
    );
    };

  }
]);
