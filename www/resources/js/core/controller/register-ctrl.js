'use strict';

var registerController = function ($state, $scope, commonService, userService){
	//contain information binding with register form.
	$scope.userData = {
			name: "",
			email : "",
			password: "",
			confirmPassword: ""
	};
	
	$scope.register = function register(){
		
		//user variable contain information to send to server
		var user = {};
		
		commonService.copyValueFromOther($scope.userData, user);
		
		delete user.confirmPassword;
		
		userService.register(user).then(function success(){
			navigator.notification.alert(
				"Tài khoản bạn đã đăng ký thành công - vui lòng kiểm tra hộp thư inbox hoặc spam để xem thông tin hướng dẫn các bước kế tiếp!",  // message
				function () { // callback
					$state.go("home");
				},        
				'Thông báo',            // title
				'Ok'                  // buttonName
			);
		}, function fail(data){
			 navigator.notification.alert(
				data.error_msg,  // message
				function () { // callback
				},        
				'Thông báo',            // title
				'Ok'                  // buttonName
			);
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