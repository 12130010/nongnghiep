'use strict';

var leftMenuController = function ($state, $scope, userService){
	function init(){
		// registry event when slide menu was clicked, we close slide menu.
		document.querySelector('.menu').addEventListener('click', function(eve) {
		  if (eve.target.nodeName === 'A') { 
			slideout.close();
		  }
		});
	}
	init();
}