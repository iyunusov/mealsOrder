function faceB () {
    if (FB) {
        FB.getLoginStatus(function(response) {
            if (response.status == 'connected') {
                FB.api('/me', {
                    fields: 'id, name, picture'
                }, function(resp) {
                    console.log(resp);
                });
            }
        });
    }
}

function faceBookController ($scope, $location, $route, User, faceBookService) {
    var facebook = this;
    facebook.checkLoginState = checkLoginState;
    facebook.user = User;
    facebook.login = checkLoginState;
    function checkLoginState () {
        faceBookService.checkLoginState();
        $location.path('/');
        console.log("logged");
        // $route.reload();
    }
}

angular.module('app.facebook').controller('faceBookController', ['$scope', '$location', '$route', 'User', 'faceBookService', faceBookController]);
// .directive("fbLogin", function($rootScope) {
//     return function (scope, iElement, iAttrs) {
//         if (FB) {
//             console.log(iElement);
//             FB.XFBML.parse(iElement[0]);
//         }
//     };
// });
