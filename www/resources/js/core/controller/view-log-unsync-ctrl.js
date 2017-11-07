'use strict';

var viewLogUnsyncController = ['$state', '$scope', 'commonService', 'qrscannerService', 'captureService', 'unitService', 'fileService',
				function ( $state ,  $scope ,  commonService ,  qrscannerService ,  captureService , unitService ,  fileService ){
					
	this.$onInit = function () {
		document.removeEventListener("backbutton", $scope.onBackKeyDown); 	 
		init();
	};
	
	function init(){
		unitService.getListHistoryOffline().then(function (listHistoryOffline) {
			$scope.listHistoryOffline = listHistoryOffline;
		});
	};

}];