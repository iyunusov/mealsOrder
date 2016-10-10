function homeController ($log, $location, $mdDialog, User, OrderService, orders) {
    var home = this;
    home.user          = User;
    home.content       = OrderService.orders;
    home.isDisabled    = false;
    home.showDialog    = showDialog;
    // list of `state` value/display objects
    home.states        = loadAll();
    home.newState      = newState;
    home.querySearch   = querySearch;
    home.simulateQuery = false;
    home.selectedItemChange = selectedItemChange;
    // home.searchTextChange   = searchTextChange;
    // if (!home.user.id) { $location.path('/login'); }
    function showDialog() {
        $mdDialog.show({
            controller: DialogController,
            controllerAs: "dialog",
            parent: angular.element(document.body),
            templateUrl: "components/dialog/orderDialog.template.html",
            locals: {
                restaurant: home.selectedItem.display
            },
            clickOutsideToClose: true
        });
    }

    function newState(state) {
        home.states.push({value: state.toLowerCase(), display: state});
    }

    function querySearch (query) {
        var results = query ? home.states.filter( createFilterFor(query) ) : home.states,
            deferred;
        if (home.simulateQuery) {
            deferred = $q.defer();
            $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
            return deferred.promise;
        }
        return results;
    }

    function selectedItemChange(item) {
        home.states.forEach( function (obj) {
            if (obj.display == home.searchText) { home.showDialog(); }
        });
    }

    function loadAll() {
        var restaurants = 'Geek Restaurant, Geek Pizza, Geek Fish, Lazy Coders';
        return restaurants.split(/, +/g).map( function (restaurant) {
            return {
                value: restaurant.toLowerCase(),
                display: restaurant
            };
        });
    }

    function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(state) {
            return (state.value.indexOf(lowercaseQuery) === 0);
        };
    }
    home.toggleSearch = false;
    home.headers = [
      {
        name:'',
        field:'thumb'
      },
      {
        name: 'Meal Name',
        field: 'name'
      },
      {
        name:'Price',
        field: 'price'
      },
      {
          name:'Restaurant',
          field:'restaurant'
      },
      {
          name:'Person',
          field:'person'
      },
      {
        name: 'Last Modified',
        field: 'last_modified'
      }
    ];
    home.custom = {name: 'bold', description:'grey',last_modified: 'grey'};
    home.sortable = ['name', 'price', 'restaurant', 'person', 'last_modified'];
    home.thumbs = 'thumb';
    home.count = 3;
    // function searchTextChange(text) {
    //     $log.info('Text changed to ' + text);
    // }
}

angular.module('app.core').controller('homeController', ['$log', '$location', '$mdDialog', 'User', 'OrderService', 'orders', homeController]);








// app.controller('AppCtrl', ['$scope', function($scope){
//   $scope.toggleSearch = false;
//   $scope.headers = [
//     {
//       name:'',
//       field:'thumb'
//     },
//     {
//       name: 'Name',
//       field: 'name'
//     },
//     {
//       name:'Description',
//       field: 'description'
//     },
//     {
//       name: 'Last Modified',
//       field: 'last_modified'
//     }
//   ];
//
//   $scope.content = [
//     {
//       thumb:'https://lh3.googleusercontent.com/-5NfcdlvGQhs/AAAAAAAAAAI/AAAAAAAAABY/ibGrApGYTuQ/photo.jpg',
//       name: 'Bruno Mars',
//       description: 'Human',
//       last_modified: 'Jun 5, 2014'
//     },{
//       thumb:'http://www.otakia.com/wp-content/uploads/V_1/article_3573/7405.jpg',
//       name: 'AT-AT',
//       description: 'Robot',
//       last_modified: 'Jun 5, 2014'
//     },{
//       thumb:'https://speakerdata.s3.amazonaws.com/photo/image/774492/Mark-Ronson-r24.jpg',
//       name: 'Mark Ronson',
//       description: 'Human',
//       last_modified: 'Jun 5, 2014'
//     },{
//       thumb:'http://25.media.tumblr.com/61ebf04c3cc7a84944aa0246e902f2a7/tumblr_mm35b87dGz1qmwrnuo1_1280.jpg',
//       name: 'Daft Punk',
//       description: 'Human-Robot',
//       last_modified: 'Jun 5, 2014'
//     },{
//       thumb:'http://thatgrapejuice.net/wp-content/uploads/2014/03/lady-gaga-that-grape-juice-televisionjpg.jpg',
//       name: 'Lady Gaga',
//       description: 'Undefined',
//       last_modified: 'Jun 5, 2014'
//     }
//   ];
//
//   $scope.custom = {name: 'bold', description:'grey',last_modified: 'grey'};
//   $scope.sortable = ['name', 'description', 'last_modified'];
//   $scope.thumbs = 'thumb';
//   $scope.count = 3;
// }]);

//UNCOMMENT BELOW TO BE ABLE TO RESIZE COLUMNS OF THE TABLE
/*
app.directive('mdColresize', function ($timeout) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      scope.$evalAsync(function () {
        $timeout(function(){ $(element).colResizable({
          liveDrag: true,
          fixed: true

        });},100);
      });
    }
  }
});
*/

angular.module('app.core').filter('startFrom',function (){
    return function (input,start) {
        start = +start;
        return input.slice(start);
    };
});
