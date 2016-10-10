function DialogController($mdDialog, User, OrderService) {
    var dialog = this;
    dialog.addOrder = addOrder;
    dialog.closeDialog = closeDialog;

    function addOrder () {
        OrderService.addOrder(User.picture, dialog.restaurant, dialog.mealName,
            dialog.mealPrice, User.name);
        // home.content = OrderService.orders;
    }

    function closeDialog () { $mdDialog.cancel(); }
}

angular.module('app.core').controller('DialogController', ['$mdDialog', 'User', 'OrderService', DialogController]);
