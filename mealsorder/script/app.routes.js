function config($routeProvider, $locationProvider) {
    $routeProvider
        .when('/login',{
                templateUrl: 'sections/facebook/facebook.template.html',
                controller: 'faceBookController',
                controllerAs: 'facebook'
        })
        .when('/', {
            templateUrl: 'sections/home/home.template.html',
            controller: 'homeController',
            controllerAs: 'home',
            resolve: {
                orders: function (OrderService) {
                    return OrderService.orders;
                }
            }
        })
        .otherwise({
            redirectTo: '/'
        });

        // $locationProvider.html5Mode(true);
}

angular.module('app.routes', ['ngRoute']).config(config);
