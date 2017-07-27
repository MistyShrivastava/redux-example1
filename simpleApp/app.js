
var app = angular.module('demo', []);

angular.module('demo').directive('listDirective', function () {  
  return {
    templateUrl: './simpleApp/list.html',
    restrict: 'E',
    link: function(scope) {
      scope.list = [];
      scope.add = function() {
        scope.list.push({value: '', isAdded: false});
      }
      scope.remove = function(index) {
        scope.list.splice(index, 1);
      }
    }
  }
})

angular.module('demo').directive('listItem', function () {  
  return {
    templateUrl: './simpleApp/item.html',
    restrict: 'E',
    scope: { item: '=', remover: '=', indexToRemove: '@' },
    link: function(scope) {
      scope.remove = function() {
        scope.remover(parseInt(scope.indexToRemove));
      }
      scope.confirm = function() {
        scope.item.isAdded = true;
      }
    }
  }
})