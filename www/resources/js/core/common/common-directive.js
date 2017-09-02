'use strict';
angular.module('commonModule')
.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}])
.directive('maskInput', ['$parse', function ($parse) {
	return {
		restrict:'A',
		link: function(scope, element, attrs, model) {
			element.mask(attrs.maskInput,{placeholder:attrs.maskInputPlaceholder});
		}
	}
}]);