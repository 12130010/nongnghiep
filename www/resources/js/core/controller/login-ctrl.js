'use strict';

var loginController = function ($state, $scope, userService){
	function init(){
		//check wheather user already login or not
		if($scope.isAuthenticated()){
			$state.go("home");
		}
		
		//init user model
		$scope.user = 	{
				username: "seval@test.com",
				password: "12345"
		};
	}
	
	init();
	
	$scope.login = function login(){
		userService.login($scope.user).then(function(response){
			$state.go("home");
		}, function error(){
			 alert("Username and password were not correct!");
		});
	}
	
	$scope.refresh = function refresh(){
		userService.getRefreshToken();
	}
	
//	$scope.loadUser = function loadUser(){
//		userService
//	}
}