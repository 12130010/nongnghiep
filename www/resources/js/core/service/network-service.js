'use strict';
app.service('networkService', ['$q', 'commonService', 'connectorService', function($q, commonService, connectorService) {
	function NetworkService(){
	};

	NetworkService.prototype.isConnected = function(){
		return navigator.connection.type !== Connection.NONE;
	};
	
	NetworkService.prototype.checkConnection = function checkConnection() {
		var networkState = navigator.connection.type;

		var states = {};
		states[Connection.UNKNOWN]  = 'Unknown connection';
		states[Connection.ETHERNET] = 'Ethernet connection';
		states[Connection.WIFI]     = 'WiFi connection';
		states[Connection.CELL_2G]  = 'Cell 2G connection';
		states[Connection.CELL_3G]  = 'Cell 3G connection';
		states[Connection.CELL_4G]  = 'Cell 4G connection';
		states[Connection.CELL]     = 'Cell generic connection';
		states[Connection.NONE]     = 'No network connection';

		alert('Connection type: ' + states[networkState]);
	};
	
	NetworkService.prototype.getVersion = function getVersion(){
		var self = this;
    	var deferred = $q.defer();
    	
		connectorService.get(
				{
					actionName: "NET_WORK_GET_VERSION",
					actionParams : []
				}
		).then(function success(response){
				deferred.resolve(response.data);
		}, function error(response){
			deferred.reject(response.data);
		});
		
		return deferred.promise; 
	};
	
	return new NetworkService();
}]);