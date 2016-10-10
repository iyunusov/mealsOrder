function OrderService (localData) {

    var orders = localData.getStorage(),
    date = new Date (),
    time = date.toLocaleDateString() + " " + date.toLocaleTimeString();

    var service = {
        orders: orders,
        addOrder: addOrder,
        removeOrder: removeOrder,
    };

    return service;

    function addOrder(thumb, restaurant, name, price, person) {
        orders.push({thumb: thumb, restaurant: restaurant, name: name, price: price,
            person: person, status: "finalized", last_modified: time});
        localData.UpdateStorage(orders);
    }

    function removeOrder (item) {
        orders.splice(orders.indexOf(item), 1);
        localData.UpdateStorage(orders);
    }
}

angular.module("app.services").factory("OrderService", ["localData", OrderService]);
