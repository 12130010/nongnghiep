/*
 * //*******************************************************************************
 * // * Online Judge - Hiep Le
 * // ******************************************************************************
 */
'use strict';

var onlinejudgeApp = angular.module('onlinejudgeApp', 
							[
							  'ui.router',
							  'ui.router.state',
							  'angular-oauth2',
							  'ngCookies',
							  'ncy-angular-breadcrumb',
							  'commonModule',
							  'angularUtils.directives.dirPagination',
							  'ngMaterial',
							  'pascalprecht.translate'
							]);
onlinejudgeApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/");
		$stateProvider
		.state('home', {
			url: '/',
			views: {
				'main@': {
					templateUrl: 'views/home.html',
				}
			},
			ncyBreadcrumb: {
				label: "Trang chủ"
			}
		})
		.state('login', {
			url: '/login',
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
		.state('register', {
			url: '/register',
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
.controller('mainController', function($rootScope, $scope, $state, userService) {
	 
	 $rootScope.userDetail = userService.userDetail;
	 
	 var loaddingBarCounter = 0;
	 
	 $rootScope.logout = function logout(){
		 userService.logout().then(function success(){
			 $state.go("login");
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