'use strict';
app.service('qrscannerService', ['$q', 'commonService', function($q, commonService) {
	function QRScannerService(){
	}

	QRScannerService.prototype.scan = function scan(){
		var self = this;
		var deferred = $q.defer();
		
		cordova.plugins.barcodeScanner.scan(
			function (result) {
				deferred.resolve(result);
			},
			function (error) {
				deferred.reject(error);
			}
	   );
		
		return deferred.promise; 
	}
	return new QRScannerService();
}]);