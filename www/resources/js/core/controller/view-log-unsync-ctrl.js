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
			$scope.isUploading = false;
		});
	};
	
	$scope.upload  = function () {
		$scope.i = 0;
		$scope.isUploading = true;
		$scope.listHistoryOffline.forEach(function (historyFileName) {
			unitService.uploadHistoryOffline(historyFileName).then(function () {
				$scope.i++;
				if($scope.i == $scope.listHistoryOffline.length) {
					unitService.getListHistoryOffline().then(function (listHistoryOffline) {
						$scope.listHistoryOffline = listHistoryOffline;
						$scope.isUploading = false;
					});
				}
			});
		});
	}

}];