
var app = angular.module('demo', []);

angular.module('demo').service('MyRedux', function (){
  return Redux;
});

angular.module('demo').service('listReducer', function () {
  return function(state = {list: []}, action) {
    switch (action.type) {
      case 'ADD_FRIEND':
       state.list = state.list.push(Immutable.Map({value: '', isAdded: false}));
        return state;
      case 'REMOVE_FRIEND':
       state.list = state.list.setIn([action.index, 'isAdded'] ,true);
        return state;
      case 'CONFIRM':
        state.list = state.list.setIn([action.index, 'isAdded'] ,true)
        return state;
      case 'MODIFY':
        state.list = state.list.setIn([action.index, 'value'], action.value);
        return state;
      default:
        return state;
    }
  }
});

angular.module('demo').service('appStore', ['MyRedux', 'listReducer', function (Redux, listReducer) {
  var initialState = { list: Immutable.List([]) };  
  return Redux.createStore(listReducer, initialState);
}]);

angular.module('demo').directive('listDirective', function (appStore) {
  return {
    templateUrl: './immutableReduxApp/list.html',
    restrict: 'E',
    link: function(scope) {
      appStore.subscribe(function (state) {
       scope.list = appStore.getState().list.toJS(); 
      })
      
      scope.add = function() {
        appStore.dispatch({
          type: 'ADD_FRIEND'
        });
      } 
    }
  }
})


angular.module('demo').directive('listItem', function (appStore) {
  return {
    templateUrl: './immutableReduxApp/item.html',
    restrict: 'E',
    scope: {
      item: '=',
      indexToRemove: '@'
    },
    link: function(scope) {
      scope.remove = function() {
        appStore.dispatch({
          type: 'REMOVE_FRIEND',
          index: scope.indexToRemove
        });
      }
      
      scope.confirm = function() {
        appStore.dispatch({
          type: 'CONFIRM',
          index: scope.indexToRemove
        });
      }

      scope.change = function(localValue) {
        appStore.dispatch({
          type: 'MODIFY',
          index: scope.indexToRemove,
          value: localValue
        })
      }
    }
  }
})