'use strict';

var loginController = function ($state, $scope, userService){
	function init(){
		//check wheather user already login or not
		if($scope.isAuthenticated()){
			$state.go("home");
		}
		
		//init user model
		$scope.user = 	{
				username: "nhuocquy@gmail.com",
				password: "1234"
		};
	}
	
	init();
	
	$scope.login = function login(){
		userService.login($scope.user).then(function(user){
			$state.go("home");
		}, function error(data){
			 navigator.notification.alert(
				data.error_msg,  // message
				function () { // callback
				},        
				'Thông báo',            // title
				'Ok'                  // buttonName
			);
		});
	}
	
	$scope.refresh = function refresh(){
		userService.getRefreshToken();
	}
	
//	$scope.loadUser = function loadUser(){
//		userService
//	}
}