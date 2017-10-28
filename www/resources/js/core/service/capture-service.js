'use strict';
app.service('captureService', ['$q', 'commonService', function($q, commonService) {
	function CaptureService(){
	}

	CaptureService.prototype.capture = function scan(quality){
		var self = this;
		var deferred = $q.defer();
		
		if(navigator.camera){
			var onSuccess = function (imageUri) {
				deferred.resolve(imageUri);
			};
			var onFail = function (message) {
				deferred.reject(message);
			};
			navigator.camera.getPicture(onSuccess, onFail, { quality: quality || 100,
				destinationType: Camera.DestinationType.DATA_URL
			});
		} else{
		   deferred.reject("camera not found");
		}		
		return deferred.promise; 
	}
	return new CaptureService();
}]);