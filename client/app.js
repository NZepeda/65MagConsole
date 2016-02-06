
var app = angular.module("65MagConsole", ['ngResource', 'ngRoute']);

//initialize Parse!
Parse.initialize("pFoImqYiVW3OIWZsR4FMupZgaSami5hpwL9ckaYD", "UivpR1Ltw1rBkaZ8ilSoyIRpG5CLOGO1aystEPSx");


//configure route
app.config(function($routeProvider){

	$routeProvider
		.when('/', {

			templateUrl: 'pages/login.html',
			controller: 'loginController'

		})

		.when('/dashboard', {
			templateUrl:'pages/dashboard.html',
			controller:'dashboardController'
		})

		.when('/addnew', {
			templateUrl:'pages/addNew.html',
			controller:'addNewController'
		})


});


//service to persist parse user data
app.service('parseUserService', function(){
	this.parseUser = null;
});
