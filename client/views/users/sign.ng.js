angular.module('cap-meteor').directive('signInUp', function() {
    return {
      restrict: 'E',
      templateUrl: 'client/views/users/sign.ng.html',
      controllerAs: 'signInUpCtrl',
      controller: function($scope, $reactive, $state) {
        $reactive(this).attach($scope);

        this.credentials = {
          email: '',
          username: '',
          password: ''
        };

        this.error = '';

        this.login = function() {
          Meteor.loginWithPassword(
            this.credentials.username,
            this.credentials.password, function(error, result) {
              if (error) {
                this.error = 'Login error - ' + err;
              } else {
                $state.go('channels');
              }
            })
        };

        this.loginGihub = function() {
          Meteor.loginWithGithub({requestPermissions: ['user', 'public_repo']}, function(error, result){
            if (error) {
                this.error = 'Login error - ' + err;
            } else {
              $state.go('channels');
            }
          })
        };

        this.register = function() {
            Meteor.createUser(this.credentials, function(error, result){
              if (error) {
                this.error = 'Registration error - ' + err;
              } else {
                $state.go('channels');
              }
            })
        };

      }
    }
  });
