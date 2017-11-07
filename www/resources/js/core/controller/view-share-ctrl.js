'use strict';

var viewShareController = ['$state', '$scope', 'commonService', 'userService', 'shareService',
				function (  $state ,  $scope ,  commonService ,  userService ,  shareService){
					
	this.$onInit = function () {	 
		init();
	};
	
	function init(){
		var self = $scope;
		
		shareService.getAllShareByEmail(userService.userDetail.email)
		.then(function (sharesData) {
			self.sharesData = sharesData;
		});
	};

}];