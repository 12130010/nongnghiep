'use strict';

var writeLogController = ['$state', '$scope', 'commonService', 'qrscannerService', 'captureService', 'unitService', 'fileService', 'userService',
				function ( $state ,  $scope ,  commonService ,  qrscannerService ,  captureService ,  unitService ,  fileService ,  userService){
					
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
						$scope.getUnitInfo(result.text);
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
			$scope.getUnitInfo('7');
		}
		
		$scope.note = "";
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
		
		if(action.actionName.indexOf('*') == 0) {
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
				
				captureService.capture(typeCapture[indexButton-1], 50).then( function (imageURI) {
					self.showImage=true;
					var image = document.getElementById('capturedImage');
					image.src ="data:image/png;base64," + imageURI;
					
					//self.imageFile = commonService.convertURIToFiles(imageURI, "capture.jpg");
					self.imageFile = imageURI;
				}, function (errorMessage) {
					alert(errorMessage);
				});
			}
		}, "Chọn ảnh", buttonLabels);	
	}
	
	$scope.getUnitInfo = function (unitId) {
		var self = $scope;
		
		//unitId = unitId.substring(unitId.indexOf("=")+1);
		
		var promise;
		if (navigator.connection.type != Connection.NONE) {
			promise = unitService.getUnit(unitId, userService.userDetail.email);
		} else {
			promise = unitService.getUnitFromDB(unitId);
		}
		
		promise.then(function (unit) {
			if(unit && unit.id && unit.hd){
				self.unit = unit;
				self.actions = unit.hd;
				
				unitService.addOrUpdateUnit(unit);
			} else {
				navigator.notification.alert(
					'Mã vạch không phù hợp',  // message
					function () { // callback
						document.addEventListener("backbutton", $scope.onBackKeyDown, false); 
						$state.go('home');
					},        
					'Thông báo',            // title
					'Xong'                  // buttonName
				);
			}
		});
	};
	
	$scope.addHistory = function () {
		var self = $scope;
		var data =
			{
				"userid": self.userDetail.email,
				"maqr" : self.unit.id,
				"hd" : self.action.actionName.replace('*',''),
				"gctext" : self.note,
				"gcpic" : self.imageFile
			};
		var promise;
		if (navigator.connection.type != Connection.NONE) { // connected
			promise = unitService.addHistory(data);
		} else {
			promise = unitService.addHistoryOffline(data);
		}
		promise.then( function (data) { //data == true => write data offline
			var message;
			
			if (data === true) {
				message = "Bạn đang offline. Dữ liệu đã được lưu trữ tạm. Vui lòng upload dữ liệu khi có kết nối mạng.";
			} else {
				message = "Thêm nhật ký thành công";
			}
		
			navigator.notification.alert(
				message,  // message
				function () { // callback
					document.addEventListener("backbutton", $scope.onBackKeyDown, false); 
					$state.go('home');
				},        
				'Thông báo',            // title
				'Xong'                  // buttonName
			);
		});
	};
	
}];