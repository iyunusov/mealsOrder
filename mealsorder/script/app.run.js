function runFunction (User, $window, $location, $route, faceBookService) {

    (function(doc, s, id) {
        var js, scripts = doc.getElementsByTagName(s)[0];
        if (doc.getElementById(id)) { return; }
        js = doc.createElement(s); js.id = id;
        js.type = "text/javascript"; js.async = "true";
        js.src = "https://connect.facebook.net/en_US/all.js";
        scripts.parentNode.insertBefore(js, scripts);
    } (document, 'script', 'facebook-jssdk'));

    $window.fbAsyncInit = function() {
        FB.init({
            appId      : '1016409591760619',
            cookie     : true,  // enable cookies to allow the server to access
            xfbml      : true,  // parse social plugins on this page
            version    : 'v2.5' // use graph api version 2.5
        });
        // faceBookService.checkLoginState();
    };
    // if (!User.id) {
    //     window.location.pathname = '/login';
        // window.location.reload();
    // }
}

angular.module('app.run', []).run(['User', '$window', '$location', '$route', 'faceBookService', runFunction]);
