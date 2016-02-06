

//declare loginController s
app.controller("loginController", ['$scope', '$resource', '$location','parseUserService',function($scope, $resource, $location, parseUserService){

	//first check if the user already has a sesseion open,
	//if they do, reroute to the dashboard.
	checkIfUserIsLoggedIn();
	$scope.loginFail = false;

	$scope.logIn = function(form){
		Parse.User.logIn($scope.username, $scope.userpassword,{


			success: function(user){
				$scope.currentUser = user;  						//set scopes current user to the user
				$scope.$apply();									//apply the changes to the scope 
				parseUserService.parseUser = $scope.currentUser;	//set the services variable to the scope
				
				$location.url('/dashboard');
			},

			error: function(user, error){
				$scope.loginFail = true;
				$scope.username = "";
				$scope.userpassword = "";
			}
		});

	};

	$scope.logOut = function(){
		Parse.User.logOut();
		$scope.currentUser = null; //set current to null!
	};

	//HELPER FUNCTIONS
	function checkIfUserIsLoggedIn(){

		if(Parse.User.current() != null){
			console.log("Session exists!");
			console.log(Parse.User.current());
			$location.url('/dashboard');
		}

	}

}]);
