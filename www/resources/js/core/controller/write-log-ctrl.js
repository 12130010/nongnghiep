'use strict';

var writeLogController = ['$state', '$scope', 'commonService', 'qrscannerService', 'captureService', 'unitService',
				function ( $state ,  $scope ,  commonService ,  qrscannerService ,  captureService ,  unitService){
	function init(){
		if (window.cordova) {
			qrscannerService.scan().then(function (result) {
				 if(!result.cancelled){
					if(result.format == "QR_CODE"){
						$scope.qrData = {text : result.text};
						$scope.getUnitInfo($scope.qrData.text);
					}
				 } else { //result.cancelled
					$state.go('home');
				 }
			}, function (error) { 
				alert("Scanning failed: " + error);
			});
		} else { // mock data
			$scope.qrData = {text : '59eb3ba8e4e29a1fb810fd7d'};
			$scope.getUnitInfo($scope.qrData.text);
		}
		
		$scope.note = "";
	};
	
	$scope.getActionByUnitType = function (unitType) {
		var self = this;
		return commonService.dataConfig.action[unitType];
	};
	
	$scope.chooseAcction = function (action) {
		var self = $scope;
		
		if (self.action) {
			if (action == self.action) //choose action again => do not thing.
				return;
			// clear old data.
			self.showImage=false;
			self.imageFile = undefined;
		}
		
		self.action = action;
		
		if(action.hasOwnProperty('needImage') && action.needImage) {
			self.captureImage();
		};
	};
	
	$scope.captureImage = function (message) {
		var self = $scope;
		
		var buttonLabels = ["Chụp ảnh", "Thư viện", "Hủy chọn"];
		var typeCapture = [Camera.PictureSourceType.CAMERA, Camera.PictureSourceType.PHOTOLIBRARY];
		
		message = message || "Bạn muốn chọn ảnh từ?";
		
		navigator.notification.confirm(message, function (indexButton) {
			if (indexButton > 0 && indexButton < buttonLabels.length) {
				
				captureService.capture(typeCapture[indexButton-1], 25).then( function (imageURI) {
					self.showImage=true;
					var image = document.getElementById('capturedImage');
					image.src ="data:image/png;base64," + imageURI;
					
					self.imageFile = commonService.convertURIToFiles(imageURI, "capture.jpg");
				}, function (errorMessage) {
					alert(errorMessage);
				});
			}
		}, "Chọn ảnh", buttonLabels);	
	}
	
	$scope.getUnitInfo = function (unitId) {
		var self = $scope;
		//unitService.getUnit(unitId).then(function (unit) {
		//	self.unit = unit;
		//	self.actions = self.getActionByUnitType(unit.type);
		//});
		
		var unit = {name:"Nong trai", type : "cn"};
		self.unit = unit;
		self.actions = self.getActionByUnitType(unit.type);
	};
	
	$scope.addHistory = function () {
		var self = $scope;
		var data = [
			{
				key : "userId",
				value : "nhuocquy"
			},
			{
				key : "unitId",
				value : self.qrData.text
			},
			{
				key : "actionType",
				value : self.action.key
			},
			{
				key : "note",
				value : self.note
			},
			{
				key : "longtitude",
				value : "123"
			},
			{
				key : "latitude",
				value : "234"
			},
			{
				key : "files",
				value : self.imageFile
			}
		];
		
		unitService.addHistory(data).then( function () {
			alert("Thêm thành công");
		});
	};
	
	init();
}];