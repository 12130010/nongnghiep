/*
* This file is used to write pure javascript.
*/
'use strict';
  
window.onload = function() {
	var slideout = new Slideout({
		'panel': document.getElementById('panel'),
		'menu': document.getElementById('menu'),
		'padding': 256,
		'tolerance': 70
	});
	
	// document.querySelector('.js-slideout-toggle').addEventListener('click', function() {
	  // slideout.toggle();
	// });
	
	document.querySelector('.menu').addEventListener('click', function(eve) {
	  if (eve.target.nodeName === 'A') { slideout.close(); }
	});
};