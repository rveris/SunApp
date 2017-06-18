angular.module('sunapp', ['ngRoute']).config(config);

function config($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl : 'angular-app/customers-list/customers.html',
            controller : CustomersController,
            controllerAs : 'vm'
        });
}

