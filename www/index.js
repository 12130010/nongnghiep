/*
* This file is used to write pure javascript.
*/
'use strict';
var slideout;
window.onload = function() {
	slideout = new Slideout({
		'panel': document.getElementById('panel'),
		'menu': document.getElementById('menu'),
		'padding': 256,
		'tolerance': 70
	});
	
	// document.querySelector('.js-slideout-toggle').addEventListener('click', function() {
	  // slideout.toggle();
	// });
	
	document.addEventListener("deviceready", onDeviceReady, false);
	function onDeviceReady() {				
		angular.bootstrap(document, ['app']);
	}
	
	document.addEventListener("offline", function () {
		$('#noInternet').css("display","block");
	}, false);
	
	document.addEventListener("online", function () {
		$('#noInternet').css("display","none");
	}, false);
};