'use strict';

var viewLogController = ['$state', '$scope', 'commonService', 'qrscannerService', 'captureService', 'unitService', 'fileService',
				function ( $state ,  $scope ,  commonService ,  qrscannerService ,  captureService , unitService ,  fileService ){
					
	this.$onInit = function () {
		document.removeEventListener("backbutton", $scope.onBackKeyDown); 	 
		init();
	};
	
	function init(){
		if (window.cordova) {
			qrscannerService.scan().then(function (result) {
				 if(!result.cancelled){
					if(result.format == "QR_CODE"){
						$scope.qrData = {text : result.text};
						$scope.getUnitHistory(result.text);
					}
				 } else { //result.cancelled
					document.addEventListener("backbutton", $scope.onBackKeyDown, false); 
					$state.go('home');
				 }
			}, function (error) { 
				alert("Scanning failed: " + error);
			});
			
		} else { // mock data
			$scope.qrData = {text : '59eb3ba8e4e29a1fb810fd7d'};
			$scope.getUnitHistory('7');
		}
		
		
	};
	
	$scope.getUnitHistory = function (unitId) {
		var self = $scope;
		
		unitService.getUnitHistory(unitId).then(function (unitHistory) {
			self.unitHistory = unitHistory;
		});
	};
	
}];