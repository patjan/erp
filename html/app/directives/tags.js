var tags = angular.module('tags', []);

tags.directive('namer', function() {
	return {
		scope:{},
		restrict: 'C',
		link: function(scope, e, attr) {
			scope.fullName = attr.first + ' ' + attr.last;
			scope.first = attr.first;
			scope.last  = attr.last ;
		},
		template:"{{last}}, {{first}}"
	}
})

tags.directive('pane', function() {
	return {
		require: '^tabs',
		restrict: 'E',
		transclude: true,
		scope: {title: '#'},
		link: function(scope, element, attr, tabsCtrl) {
			tabsCtrl.addPane(scope);
		},
		template:
			'<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
			'</div>',
		replace: true
	}
})

