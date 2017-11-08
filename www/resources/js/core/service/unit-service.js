'use strict';
app.service('unitService', ['$q', 'commonService', 'connectorService', 'fileService', function($q, commonService, connectorService, fileService) {
	function UnitService(){
		this.unitDir = 'ndtt';
		
		this.unitDB = window.sqlitePlugin.openDatabase({name: "unitDB.db", location: 'default'},
		function success (db) {
			db.transaction(function(transaction) {
				transaction.executeSql('CREATE TABLE IF NOT EXISTS unit (id integer primary key, value text, lastTimeLoaded integer)', [],
				function(tx, result) {
					console.log("Create table unit");
				},
				function(error) {
					console.log("Cannot create table unit");
				});
			});
		}, 
		function fail () {
			console.log("Open Unit DB unsuccess!");
		});
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
	
	UnitService.prototype.addUnitToDB = function (unit) {
		this.unitDB.transaction(function(transaction) {
			var executeQuery = "insert into unit (id, value, lastTimeLoaded) values (?,?,?)";
			transaction.executeSql(executeQuery, [ unit.id, JSON.stringify(unit), new Date().getTime()],
			function(tx, result) {
			//Success
				console.log("Save Unit success with id: " + unit.id);
			},
			function(error){
			// Error
				console.log("Save Unit fail with id: " + unit.id);
			});
		});
	};
	
	UnitService.prototype.updateUnitToDB = function (unit) {
		this.unitDB.transaction(function(transaction) {
			var executeQuery = "update unit set value = ?, lastTimeLoaded = ? where id = ?";
			transaction.executeSql(executeQuery, [ JSON.stringify(unit), new Date().getTime(), unit.id],
			function(tx, result) {
			//Success
				console.log("Update Unit success with id: " + unit.id);
			},
			function(error){
			// Error
				console.log("Update Unit fail with id: " + unit.id);
			});
		});
	};
	
	UnitService.prototype.addOrUpdateUnit = function (unit) {
		var self = this;
		self.isExistUnitOnDB(unit.id).then(function success(isExist) {
			if(isExist){
				self.updateUnitToDB(unit);
			} else {
				self.addUnitToDB(unit);
			}
		});
	};
	
	UnitService.prototype.isExistUnitOnDB = function (unitId) {
		var deferred = $q.defer();
		this.unitDB.transaction(function(transaction) {
			var executeQuery = "select id from unit where id = ?";
			transaction.executeSql(executeQuery, [ unitId],
			function(tx, results) {
			//Success
				console.log("Unit " + unitId + " is exist: " + results.rows.length);
				deferred.resolve(results.rows.length > 0);
			},
			function(error){
			// Error
				console.log("Save Unit fail with id: " + unit.id);
				deferred.reject();
			});
		});
		return deferred.promise; 
	};
	
	UnitService.prototype.getAllUnitFromDB = function () {
		var deferred = $q.defer();
		this.unitDB.transaction(function(transaction) {
			var executeQuery = "select value from unit";
			transaction.executeSql(executeQuery, [],
			function(tx, result) {
				var units = [];
				for(var i = 0, len = result.rows.length; i < len ; i++) {
					units.push(JSON.parse(result.rows.item(i).value));
				}
				console.log(units);
				deferred.resolve(units);
			},
			function(error){
			// Error
				console.log(error);
			});
		});
		return deferred.promise; 
	};
	
	return new UnitService();
}]);