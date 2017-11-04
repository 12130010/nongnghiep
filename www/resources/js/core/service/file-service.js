'use strict';
app.service('fileService', ['$q', 'commonService', function($q, commonService) {
	var errorCode = ['NOT_FOUND_ERR','SECURITY_ERR', 'ABORT_ERR', 'NOT_READABLE_ERR', 'ENCODING_ERR',
					'NO_MODIFICATION_ALLOWED_ERR', 'INVALID_STATE_ERR', 'SYNTAX_ERR', 'INVALID_MODIFICATION_ERR',
					'QUOTA_EXCEEDED_ERR', 'TYPE_MISMATCH_ERR', 'PATH_EXISTS_ERR'];
	
	function FileService(){
	};
	
	FileService.prototype.getFSFail = function (e) {
		console.log(errorCode[e.code-1]);
	};
	
	FileService.prototype.isExist = function (path, isDirectory) {
    	var deferred = $q.defer();
		 
		window.resolveLocalFileSystemURL(cordova.file.externalApplicationStorageDirectory, function(fileSystem){
			
		var fileExists =  function fileExists (fileEntry) {
				deferred.resolve(true);
		};
		
		var fileDoesNotExist = function fileDoesNotExist (e) {
				deferred.resolve(false);
		};
		
		if(isDirectory) {
			fileSystem.getDirectory(path, { create: false }, fileExists, fileDoesNotExist);
		} else {
			fileSystem.getFile(path, { create: false }, fileExists, fileDoesNotExist);
		}
	}, FileService.prototype.getFSFail);
		
		return deferred.promise; 
	};
	
	FileService.prototype.createFile = function (fileName, isDirectory) {
		var deferred = $q.defer();
		var self = this;
		
		var createFileSuccess = function createFileSuccess(fileEntry) {
			deferred.resolve(true);
		};
		
		var createFileFail = function createFileFail (e) {
			self.getFSFail(e);
			deferred.reject(false);
		};
		
		window.resolveLocalFileSystemURL(cordova.file.externalApplicationStorageDirectory, function successCallback (fileSystem) {
			if(isDirectory) {
				fileSystem.getDirectory(fileName, {create: true, exclusive: true}, createFileSuccess, createFileFail);
			} else {
				fileSystem.getFile(fileName, {create: true, exclusive: true}, createFileSuccess, createFileFail);
			}
		}, FileService.prototype.getFSFail);
		
		return deferred.promise; 
	};
	
	FileService.prototype.writeFile = function (filePath, data, dataType) {
		var deferred = $q.defer();
		
		window.resolveLocalFileSystemURL(cordova.file.externalApplicationStorageDirectory, successCallback, errorCallback);

		function successCallback(fs) {
		  fs.getFile(filePath, {create: true}, function(fileEntry) {

			 fileEntry.createWriter(function(fileWriter) {
				fileWriter.onwriteend = function(e) {
				   deferred.resolve(true);
				};

				fileWriter.onerror = function(e) {
				   deferred.reject(false);
				};

				var blob = new Blob([data], {type: 'text/plain'});
				fileWriter.write(blob);
			 }, errorCallback);
		  }, errorCallback);
		}

		function errorCallback(error) {
		  alert("ERROR: " + error.code)
		  deferred.reject(false);
		}
		
		return deferred.promise; 
	};
	
	FileService.prototype.readFile = function (filePath) {
		var deferred = $q.defer();
		
		window.resolveLocalFileSystemURL(cordova.file.externalApplicationStorageDirectory, successCallback, errorCallback);
		
		function successCallback(fs) {
			fs.getFile(filePath, {}, function(fileEntry) {

			fileEntry.file(function(file) {
				var reader = new FileReader();

				reader.onloadend = function(e) {
				  deferred.resolve(this.result);
				};
				
				reader.readAsText(file);
			 }, errorCallback);
			}, errorCallback);
		};

		function errorCallback(error) {
		  deferred.reject(error);
		};
		
		return deferred.promise; 
	};
	
	FileService.prototype.deleteFile = function (filePath, isDirectory) {
		var deferred = $q.defer();
		
		window.resolveLocalFileSystemURL(cordova.file.externalApplicationStorageDirectory, function(fileSystem){
			if(isDirectory) {
				fileSystem.getDirectory(filePath, {create: false}, function(fileEntry) {
					fileEntry.remove(function() {
						deferred.resolve(true);
					}, FileService.prototype.getFSFail);
				}, FileService.prototype.getFSFail);
			} else {
				fileSystem.getFile(filePath, {create: false}, function(fileEntry) {
					fileEntry.remove(function() {
						deferred.resolve(true);
					}, FileService.prototype.getFSFail);
				}, FileService.prototype.getFSFail);
		  }
		}, FileService.prototype.getFSFail);
			
		return deferred.promise; 
	};
	
	FileService.prototype.listFiles = function listFiles(myPath){
		
		window.resolveLocalFileSystemURL(cordova.file.externalApplicationStorageDirectory + myPath, function (dirEntry) {
		   var directoryReader = dirEntry.createReader();
		   directoryReader.readEntries(onSuccessCallback,onFailCallback);
		});

		function onSuccessCallback(entries){
		   for (var i=0; i<entries.length; i++) {
			   var row = entries[i];
			   var html = '';         
			   if(row.isDirectory){
					 alert('Directory' + row.nativeURL+ ' : ' +row.name);
			   }else{
					 alert('File' + row.nativeURL+ ' : ' +row.name);
			   }
		   
		   }
		};

		function onFailCallback(e){
			console.error(e);
		};
	};
	
	return new FileService();
}]);