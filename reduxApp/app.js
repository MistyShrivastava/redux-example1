
var app = angular.module('demo', []);

//Wrapping Redux into an Angular Service for ease of use

angular.module('demo').service('MyRedux', function (){
  return Redux;
});


// Reducer - The reducer is a pure function that takes the previous state (payload) and an action, and returns the next state

angular.module('demo').service('listReducer', function () {
  return function(state = {list: []}, action) {
    switch (action.type) {
      case 'ADD_FRIEND':
        state.list.push({value: '', isAdded: false});
        return state;
      case 'REMOVE_FRIEND':
        state.list.splice(action.index, 1);
        return state;
      case 'CONFIRM':
        state.list[action.index].isAdded = true
        return state;
      default:
        return state;
    }
  }
});

// Store - A store holds the whole state tree of your application. The only way to change the state inside it is to dispatch an action on it.

angular.module('demo').service('appStore', ['MyRedux', 'listReducer', function (Redux, listReducer) {
  var initialState = {
    list: []
  };
  return Redux.createStore(listReducer, initialState);
}]);


angular.module('demo').directive('listDirective', function (appStore) {
  return {
    templateUrl: './reduxApp/list.html',
    restrict: 'E',
    link: function(scope) {
      
      // This would get us the instance of store 

      appStore.subscribe(function (state) {
        scope.list = appStore.getState().list;
      })
      
      // When an action is performed we notify the reducer to take necessary action on the payload 
      
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
    templateUrl: './reduxApp/item.html',
    restrict: 'E',
    scope: {
      item: '=',
      indexToRemove: '@'
    },
    link: function(scope) {
      // When an action is performed we notify the reducer to take necessary action on the payload 

      scope.remove = function() {
        appStore.dispatch({
          type: 'REMOVE_FRIEND',
          index: scope.indexToRemove
        });
      }
      
      // When an action is performed we notify the reducer to take necessary action on the payload 
      scope.confirm = function() {
        appStore.dispatch({
          type: 'CONFIRM',
          index: scope.indexToRemove
        });
      }
    }
  }
})