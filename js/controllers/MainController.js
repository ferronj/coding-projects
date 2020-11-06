app.controller('MainController', ['$scope', function($scope){
	$scope.list = ["Do the dishes", "Go to the store", "Read 'The Vital Question'"];
	$scope.addItem = function() {
		$scope.list.push($scope.addToDo);
	}
}])