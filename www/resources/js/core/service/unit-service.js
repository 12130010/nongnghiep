'use strict';
app.service('unitService', ['$q', 'commonService', 'connectorService', function($q, commonService, connectorService) {
	function UnitService(){
	}
	
	
	UnitService.prototype.getUnit = function getUnit(unitId){
		var self = this;
    	var deferred = $q.defer();
    	
		connectorService.get(
				{
					actionName: "UNIT_GET",
					actionParams : [unitId]
				}
		).then(function success(response){
				deferred.resolve(response.data);
		}, function error(response){
			deferred.reject(response.data);
		});
		
		return deferred.promise; 
	}
	
	UnitService.prototype.addHistory = function addHistory(data){
		var self = this;
    	var deferred = $q.defer();
    	
		connectorService.postResource(
				{
					actionName: "UNIT_ADD_HISTORY",
					actionParams : [],
					data : data
				}
		).then(function success(response){
				deferred.resolve(response.data);
		}, function error(response){
			deferred.reject(response.data);
		});
		
		return deferred.promise; 
	}
	
	return new UnitService();
}]);