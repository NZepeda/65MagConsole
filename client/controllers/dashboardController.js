
app.controller("dashboardController", ['$scope', '$resource', '$location', function($scope, $resource, $location){
	
	var userInfo = Parse.User.current().toJSON();
	var businessFromParse = {};

	$scope.username  = userInfo.username;
	$scope.businessArray = [];
	$scope.editingData = {};

	var BusinessObject = function(name, phone, address, description, id){
		this.name = name;
		this.phone = phone;
		this.address = address;
		this.description = description;
		this.id = id;
	};
	//get the businesses from parse
	getBusinessesFromParse();


	//on clicks
	$scope.logOut = function(){
		console.log("got called!");
		Parse.User.logOut();
		$scope.currentUser = null;
		$location.url('/');
		
	}

	function getBusinessesFromParse(){

		var Business = Parse.Object.extend("Business");
		var query = new Parse.Query(Business);
		query.select("name", "phone", 'address', 'description');
		query.find({
			success: function(results){
				console.log("Successfully retrieved " + results.length + " businesses.");
				businessFromParse = results;
				console.log(businessFromParse);
				//Make the results equal to the business array.
				for(var i = 0; i < results.length; i++){

					var business = new BusinessObject(results[i].attributes.name, results[i].attributes.phone, results[i].attributes.address, results[i].attributes.description, results[i]._objCount);

					$scope.businessArray.push(business);

				}
				$scope.$apply();
				setEditingDataToArray();

			},
			error: function(error){
				alert("Error: " + error.code + " " + error.message);
			}

		});

	}

	//used for proper editing functionality
	function setEditingDataToArray(){
		for(var i = 0; i < $scope.businessArray.length; i++){

			$scope.editingData[$scope.businessArray[i]._objCount] = false;
		
		}
	}

	//begin editing the contents of the cell
	$scope.modify = function(tableData){
    	$scope.editingData[tableData._objCount] = true;
	};


	//cancel the function
	$scope.cancel = function(tableData){
		$scope.editingData[tableData._objCount] = false;
		location.reload(); //if user hits cancel, it reloads the entire page. FIX THIS, NOT THE BEST WAY TO HANDLE

	};

	$scope.update = function(tableData){

		var objectToUpdate = businessFromParse[tableData.id - 1];

		console.log(objectToUpdate);

		//check if any of the fields are empty
		if(tableData.address == '' || tableData.name == '' || tableData.description == ''){

			alert("Please don't leave any blank fields");
		}
		else{
			objectToUpdate.set("name", tableData.name);
			objectToUpdate.set("phone", tableData.phone);
			objectToUpdate.set('address', tableData.address);
			objectToUpdate.set("description", tableData.description);

			objectToUpdate.save(null, {
				success: function(){
					alert("Your record has been saved!");
				}, 
				error: function(error){
					alert("Sorry, there was an error: " + error);
				}
			});
		}

	};

	$scope.addNewBusiness = function(){
		$location.url('/addnew');
	}







}]);


