'use strict';
app.service('userService', ['$q', 'commonService', 'connectorService', function($q, commonService, connectorService) {
	function UserService(){
		this.userDetail = {}; //{"name":"Nhược Quỳ","email":"nhuocquy@gmail.com","created_at":"2017-10-29 23:26:12","updated_at":null}
	}
	
	UserService.prototype.isAuthenticated = function isAuthenticated(){
		if ($.isEmptyObject(this.userDetail)) {
			if (localStorage.getItem("userDetail") ) {
				var userExist = JSON.parse(localStorage.getItem("userDetail"));
				commonService.copyValueFromOther(userExist, this.userDetail);
			}	
		}
		return !$.isEmptyObject(this.userDetail);
	}
	
	/* 
	Use to login.
	
	userLoginModel = {
				username: String,
				password: String
		}
	*/
	UserService.prototype.login = function login(userLoginModel){
		var self = this;
    	var deferred = $q.defer();
    	
		var data =
			{
				"tag": "login",
				"email" : userLoginModel.username,
				"password" : userLoginModel.password
			};
		
		connectorService.postForm(
				{
					actionName: "USER_LOGIN",
					actionParams : [],
					data : data
				}
		).then(function success(response){
			//login success: response.data = {"tag":"login","success":1,"error":0,"uid":"59a75a560d5a72.74818691","user":{"name":"seval","email":"seval@test.com","created_at":"2017-08-31 07:37:42","updated_at":null}}
			//login fail: response.data = {"tag":"login","success":0,"error":1,"error_msg":"Incorrect email or password!"}
			if(response.data.success === 1){ //login success
				commonService.copyValueFromOther(response.data.user, self.userDetail);
				localStorage.setItem("userDetail",  JSON.stringify(self.userDetail));
				deferred.resolve(self.userDetail);
			} else { // login fail
				deferred.reject(response.data);
			}
		}, function error(response){
			deferred.reject(response.data);
		});
		
		return deferred.promise; 
	}
	UserService.prototype.logout = function logout(){
		var self = this;
    	var deferred = $q.defer();
		
		commonService.cleanAllProperty(this.userDetail);
		localStorage.removeItem("userDetail");
		//TODO clean all data
		
		return $q.when({}); 
	}
	
	UserService.prototype.refresh = function refresh(){
		var self = this;
    	var deferred = $q.defer();
		
		
		return deferred.promise; 
	}
	
	//load user have login
	UserService.prototype.loadUserDetail = function loadUserDetail(){
		return {};
	}
	
	
	UserService.prototype.register = function register(user){
		var self = this;
		var deferred = $q.defer();
		
		var data = angular.copy(user);
		data.tag = "register";
		
		connectorService.postForm(
				{
					actionName: "USER_CREATE_NEW_USER",
					actionParams : [],
					data: data
				}
		).then(function success(response){
			//success {"tag":"register","success":1,"error":0,"uid":"59f60ad2652d07.94364314","user":{"name":"Nhuoc Quy2","email":"nhuocquy2@gmail.com","created_at":"2017-10-30 00:07:30","updated_at":null}}
			//fail {"tag":"register","success":0,"error":2,"error_msg":"User already existed"}
			if(response.data.success === 1){ //login success
				deferred.resolve(response.data.user);
			} else { // login fail
				deferred.reject(response.data);
			}
		}, function error(response){
			deferred.reject(response);
		});
		
		return deferred.promise; 
	};
	
	UserService.prototype.checkUserIsExist = function checkUserIsExist(username){
		var self = this;
		var deferred = $q.defer();
		
		connectorService.get(
				{
					actionName: "USER_CHECK_USER_IS_EXIST",
					actionParams : [username]
				}
		).then(function success(response){
			deferred.resolve(response);
		}, function error(response){
			deferred.reject(response);
		});
		
		return deferred.promise; 
	};
	return new UserService();
}]);