/**
 *@name orderItem
 *@desc makes an order directive
 */

function mdTable () {
    var directive = {
        controller: ordersController,
        controllerAs: 'vm',
        bindToController: {
            headers: '=',
            content: '=',
            sortable: '=',
            filters: '=',
            customClass: '=customClass',
            thumbs:'=',
            count: '='
        },
        scope: {},
        restrict: 'EA',
        templateUrl: 'components/order/order.template.html'
    };
    return directive;
}

function ordersController ($filter, $window, OrderService) {
    var vm = this;
    var orderBy = $filter('orderBy');
    vm.removeOrder = OrderService.removeOrder;
    vm.tablePage = 0;
    vm.nbOfPages = nbOfPages;
    vm.handleSort = handleSort;
    vm.order = order;
    vm.getNumber = getNumber;
    vm.goToPage = goToPage;
    console.log(vm.content);

    vm.order(vm.sortable[0], false);

    function nbOfPages () {
        return Math.ceil(vm.content.length / vm.count);
    }

    function handleSort (field) {
        if (vm.sortable.indexOf(field) > -1) { return true; } else { return false; }
    }

    function order (predicate, reverse) {
        vm.content = orderBy(vm.content, predicate, reverse);
        vm.predicate = predicate;
    }

    function getNumber (num) {
	    return new Array(num);
    }

    function goToPage (page) {
        vm.tablePage = page;
    }
}


// app.directive('mdTable', function () {
//   return {
//     restrict: 'E',
//     scope: {
//       headers: '=',
//       content: '=',
//       sortable: '=',
//       filters: '=',
//       customClass: '=customClass',
//       thumbs:'=',
//       count: '='
//     },
//     controller: function (vm,$filter,$window) {
//       var orderBy = $filter('orderBy');
//       vm.tablePage = 0;
//       vm.nbOfPages = function () {
//         return Math.ceil(vm.content.length / vm.count);
//       },
//       vm.handleSort = function (field) {
//           if (vm.sortable.indexOf(field) > -1) { return true; } else { return false; }
//       };
//       vm.order = function(predicate, reverse) {
//           vm.content = orderBy(vm.content, predicate, reverse);
//           vm.predicate = predicate;
//       };
//       vm.order(vm.sortable[0],false);
//       vm.getNumber = function (num) {
//       			    return new Array(num);
//       };
//       vm.goToPage = function (page) {
//         vm.tablePage = page;
//       };
//     },
//     template: angular.element(document.querySelector('#md-table-template')).html()
//   }
// });


angular.module('app.core').directive('mdTable', ['$filter', '$window', 'OrderService', mdTable]);
