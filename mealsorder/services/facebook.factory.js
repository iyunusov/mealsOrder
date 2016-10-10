function faceBookService ($q, $rootScope, User) {

    resolve = function(errval, retval, deferred) {
        $rootScope.$apply(function() {
            if (errval) {
                deferred.reject(errval);
            } else {
                retval.connected = true;
                deferred.resolve(retval);
            }
        });
    };

    var service = {
        getUserData: getUserData,
        checkLoginState: checkLoginState
    };

    return service;


    function getUserData () {
        var deferred = $q.defer();
        FB.getLoginStatus(function(response) {
            if (response.status == 'connected') {
                FB.api('/me', {
                    fields: 'id, name, picture'
                },
                function(response) {
                    resolve(null, response, deferred);
                });
            }
            else if (response.status == 'not_authorized') {
                FB.login(function(response) {
                    if (response.authResponse) {
                        FB.api('/me', {
                            fields: 'id, name, picture'
                        }, function(response) {
                            resolve(null, response, deferred);
                        });
                    } else {
                        resolve(response.error, null, deferred);
                    }
                });
            }
        });
        promise = deferred.promise;
        promise.connected = false;
        return promise;
    }

    function checkLoginState () {
        getUserData().then(function(response) {
            User.id = response.id;
            User.name = response.name;
            User.picture = response.picture.data.url;
        });
        console.log(User);
    }
}

angular.module("app.services").factory('faceBookService', ['$q', '$rootScope', 'User', faceBookService]);
