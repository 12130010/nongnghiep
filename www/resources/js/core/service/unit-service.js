'use strict';
app.service('unitService', ['$q', 'commonService', 'connectorService', 'fileService', function($q, commonService, connectorService, fileService) {
	function UnitService(){
		this.unitDir = 'ndtt';
	};
	
	
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
	};
	
	UnitService.prototype.addHistory = function addHistory(data){
		var self = this;
    	var deferred = $q.defer();
    	
		connectorService.postForm(
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
	};
	
	UnitService.prototype.getUnitHistory = function getUnitHistory(unitId){
		var self = this;
    	var deferred = $q.defer();
    	
		connectorService.get(
				{
					actionName: "UNIT_GET_HISTORY",
					actionParams : [unitId]
				}
		).then(function success(response){
				deferred.resolve(response.data);
		}, function error(response){
			deferred.reject(response.data);
		});
		
		return deferred.promise; 
	};
	
	UnitService.prototype.addHistoryOffline = function addHistoryOffline(data){
		var self = this;
    	var deferred = $q.defer();
		
		var fileName = '/' + new Date().getTime() + '.json';
		
		fileService.isExist(self.unitDir, true).then( function (isExist) {
			if(!isExist)
				return fileService.createFile(self.unitDir, true);
		})
		.then( function afterCreateNdtt () {
			return fileService.isExist(self.unitDir + fileName);
		})
		.then( function afterCheckExistFile(isExist) {
			if(!isExist)
				return fileService.createFile(self.unitDir + fileName);
		})
		.then( function afterCreateFile () {
			return fileService.writeFile(self.unitDir + fileName, JSON.stringify(data));
		})
		.then(function afterWriteData () {
			return fileService.readFile(self.unitDir + fileName);
		})
		.then(function success (data) {
			deferred.resolve(data);
		}, function fail (e) {
			deferred.reject(e);
		});
		
		return deferred.promise; 
	};
	
	UnitService.prototype.getListHistoryOffline = function getListHistoryOffline(){
		var self = this;
		var deferred = $q.defer();
		
		fileService.listFiles(this.unitDir).then( function (listFile) {
			deferred.resolve(listFile);
		});
		
		return deferred.promise; 
	};
	
	return new UnitService();
}]);