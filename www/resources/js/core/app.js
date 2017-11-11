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
		.state('home.view-share', {
			url: 'view-share',
			views: {
				'main@': {
					templateUrl: 'views/view-share.html',
					controller: viewShareController
				}
			},
			ncyBreadcrumb: {
				label: "Chia sẻ"
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
		 
		 $scope.baseURL = baseURL;
		
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
	 
	$scope.openNewLinkExternal = function (link) {
		// navigator.app.loadUrl(baseURL + "/" + link, {openExternal : true});
		if (!link.startsWith("/")){
			link = "/" + link;
		}
		window.open( baseURL + link, '_system');
	};
	
	$scope.openNewLinkInternal = function (path) {
		if (!path.startsWith("/")){
			path = "/" + path;
		}
		cordova.InAppBrowser.open(baseURL + path, '_blank', 'location=no,zoom=no');
	};
	
	$scope.showImage = function (path) {
		if (!path.startsWith("/")){
			path = "/" + path;
		}
		cordova.InAppBrowser.open(baseURL + path, '_blank', 'location=no,zoom=yes');
	};
	 
	 function init(){
		if(userService.isAuthenticated()){
			 userService.loadUserDetail();
		}
		networkService.getVersion()
		.then(function (versionData) {
			if(version.localeCompare(versionData.version) < 0){ // have new version
				var message = "Phần mềm đã có phiên bản mới, vui lòng cập nhật phiên bản mới để có đầy đủ các tính năng mới.";
				var buttonLabels = ["Cập nhật"];
			
				navigator.notification.confirm(message, function (indexButton) {
					if (indexButton > 0) {
						$scope.openNewLinkExternal(versionData.link);
					}
				}, "Cập nhật phiên bản mới", buttonLabels);	
			}
		});
	 }
	 
	 init();
});