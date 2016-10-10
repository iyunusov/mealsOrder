function orderController (User, OrderService) {
    var vm = this;
    vm.orders = OrderService.orders;
    vm.user = User;
}

angular.module("app.core").controller("orderController", ["User", "OrderService", orderController]);
