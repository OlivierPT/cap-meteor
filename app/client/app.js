angular.module('cap-meteor',['angular-meteor', 'ui.router']);

angular.module('cap-meteor').controller("ChannelsCtrl", ['$scope', '$meteor',
    function($scope, $meteor){

		$scope.$meteorSubscribe("channels");
		$scope.$meteorSubscribe("messages");

		$scope.channels = $meteor.collection(function() {
			return Channels.find()
		});



		$scope.messages = $meteor.collection(function() {
			return Messages.find()
		});

		$scope.addChannel = function(newChannel){
			$meteor.call("addChannel", newChannel);
		};

    }]);


angular.module('cap-meteor').controller("MessagesListCtrl", ['$scope', '$stateParams', '$meteor',
    function($scope, $stateParams, $meteor){

	    $scope.partyId = $stateParams.partyId;

	    $scope.$meteorSubscribe("messages");

		$scope.messages = $meteor.collection(function() {
			return Messages.find()
		});

	}]);