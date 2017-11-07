'use strict';
app.service('shareService', ['$q', 'commonService', 'connectorService',
					function( $q,   commonService ,  connectorService) {
	
	function ShareService(){
		
	};
	
	ShareService.prototype.getAllShareByEmail = function (email) {
		var self = this;
    	var deferred = $q.defer();
    	
		connectorService.get(
				{
					actionName: "UNIT_SHARE_BY_EMAIL",
					actionParams : [email]
				}
		).then(function success(response){
				deferred.resolve(response.data);
		}, function error(response){
			deferred.reject(response.data);
		});
		
		return deferred.promise; 
	}
	
	return new ShareService();
}]);