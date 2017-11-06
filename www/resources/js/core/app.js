/*
 * //*******************************************************************************
 * // * Online Judge - Hiep Le
 * // ******************************************************************************
 */
'use strict';

var app = angular.module('app', 
							[
							  'ui.router',
							  'ui.router.state',
							  'angular-oauth2',
							  'ngCookies',
							  'ncy-angular-breadcrumb',
							  'commonModule',
							  'angularUtils.directives.dirPagination',
							  'ngMaterial'
							]);
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/");
		$stateProvider
		.state('home', {
			url: '/',
			views: {
				'main@': {
					templateUrl: 'views/home.html',
				},
				'left-menu': {
					templateUrl: 'views/left-menu.html',
					controller: leftMenuController
				}
			},
			ncyBreadcrumb: {
				label: "Trang chủ"
			}
		})
		.state('home.login', {
			url: 'login',
			views: {
				'main@': {
					templateUrl: 'views/login.html',
					controller: loginController
				}
			},
			ncyBreadcrumb: {
			    label: "Đăng nhập"
			}
		})
		.state('home.register', {
			url: 'register',
			views: {
				'main@': {
					templateUrl: 'views/register.html',
					controller: registerController
				}
			},
			ncyBreadcrumb: {
				label: "Đăng ký"
			}
		})
		.state('home.writelog', {
			url: 'writelog',
			views: {
				'main@': {
					templateUrl: 'views/write-log.html',
					controller: writeLogController
				}
			},
			ncyBreadcrumb: {
				label: "Ghi nhật ký"
			}
		})
		.state('home.viewlog', {
			url: 'viewlog',
			views: {
				'main@': {
					templateUrl: 'views/view-log.html',
					controller: viewLogController
				}
			},
			ncyBreadcrumb: {
				label: "Xem nhật ký"
			}
		})
		.state('home.viewlog-unsync', {
			url: 'viewlog-unsync',
			views: {
				'main@': {
					templateUrl: 'views/view-log-unsync.html',
					controller: viewLogUnsyncController
				}
			},
			ncyBreadcrumb: {
				label: "Upload nhật ký"
			}
		})
	}
])
.config(function($sceDelegateProvider) { //TODO check whether it necesary or not.
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'http://localhost:8180/chatboxapp/**'
  ]);

  $sceDelegateProvider.resourceUrlBlacklist([
  ]);
}) 
.controller('mainController', function($rootScope, $scope, $state, userService, networkService) {
	 
	 $rootScope.userDetail = userService.userDetail;
	 
	 var loaddingBarCounter = 0;
	 
	 $scope.onBackKeyDown = function onBackKeyDown(e) {
		if ($state.is('home')) {
		   e.preventDefault(); 
		   navigator.app.exitApp();
		} else {
			return true;
		}
	 };
		
	 this.$onInit = function () {
		 //document.addEventListener("backbutton", $scope.onBackKeyDown, false);  
		
	 };
	 
	 $rootScope.logout = function logout(){
		 userService.logout().then(function success(){
			 $state.go("home.login");
		 });
	 }
	 
	 $rootScope.isAuthenticated = function isAuthenticated(){
		return userService.isAuthenticated();
	 }
	 
	 $scope.parseInt = parseInt;
	 
	 function init(){
		if(userService.isAuthenticated()){
			 userService.loadUserDetail();
		}
		
	 }
	 
	 init();
});