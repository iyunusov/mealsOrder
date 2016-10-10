
/**
 *@name localData
 *@desc Save orders in localStorage
 */

function localData($log, $exceptionHandler) {
    var service = {
        getStorage: getStorage,
        UpdateStorage: UpdateStorage
    };

    return service;

    function getStorage () {
        var orders = [];
        try {
            if ( Object.prototype.toString.call( angular.fromJson(localStorage.orders)) === '[object Array]' ) {
                orders = angular.fromJson(localStorage.orders);
            }
        } catch (e) {
            $exceptionHandler(e, "localStorage.orders should be in array format");
        } finally {
            $log.warn('!NOTE: localStorage.orders should be in [..,{..},{..},..] format');
        }
        return orders;
    }

    function UpdateStorage (orders) {
        localStorage.orders = angular.toJson(orders);
    }
}

angular.module("app.services").factory("localData", ['$log', '$exceptionHandler', localData]);
