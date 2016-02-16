app.controller('addNewController', ['$scope','$location', function($scope, $location){

	$scope.name = "";
	$scope.phone = "";
	$scope.address = "";
	$scope.description = "";
	$scope.website = "";
	$scope.didSucceed = false;

	$scope.saveBusiness = function(){
		var Business = Parse.Object.extend("Business");
		var business = new Business();

		if($scope.name == "" || $scope.address=="" || $scope.description==""){
			alert("Please don't leave any fields blank!");
		}
		else{
			business.set('name', $scope.name);
			business.set('address', $scope.address);
			business.set('phone', $scope.phone);
			business.set('description', $scope.description);
			business.set('webURL', $scope.website);

			business.save(null, {
				success: function(){
					$scope.didSucceed = true;
					$scope.$apply();
				},

				error: function(error){
					alert("Sorry, there was an error saving your business " + error);
				}
			});
		}
			
	}

	$scope.$watch('didSucceed', function(newValue, oldValue){

		if(newValue == true){
			$location.url('/dashboard');
		}

	});

	$scope.goToDashboard = function(){
		$location.url('/dashboard');
	}


}]);


