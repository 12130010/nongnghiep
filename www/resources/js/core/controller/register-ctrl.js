'use strict';

var registerController = function ($state, $scope, commonService, userService){
	//contain information binding with register form.
	$scope.userData = {
			displayName: "Hoang Nhuoc Quy",
			email : "hoangnhuocquy1@gmail.com",
			password: "P@ssword123",
			confirmPassword: "P@ssword123"
	};
	
	$scope.register = function register(){
		
		//user variable contain information to send to server
		var user = {};
		
		commonService.copyValueFromOther($scope.userData, user);
		
		delete user.confirmPassword;
		
		userService.register(user).then(function success(){
			alert("Register success! Please check mail to verify account and login again!");
			$state.go("home");
		}, function fail(response){
			if(response.status == 400){
				//TODO create message
				alert(response.data.obj);
			}else{
				alert("Error! Please contact admin!");
			}
		});
	}
	
	$scope.checkUserIsExist = function checkUserIsExist(username){
		userService.checkUserIsExist(username).then(function success(response){
			if(response.data.isExist === "true")
				alert("Email " + username +" was used. Please choose another email!");
		}, function fail(response){
			alert("Error! Please contact admin! " + response.status);
		});
	}
}