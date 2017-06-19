angular.module('sunapp', ['ngRoute']).config(config);

function config($routeProvider){
    $routeProvider      
        .when('/', {
            templateUrl : 'angular-app/customer-list/customers.html',
            controller : CustomersController,
            controllerAs : 'vm'
        })
        .when('/customer/:id', {
            templateUrl : 'angular-app/customer-display/customer.html',
            controller : CustomerController,
            controllerAs : 'vm'
        })
        .when('/newCustomer', {
            templateUrl : 'angular-app/customer-new/newCustomer.html',
            controller : NewCustomerController,
            controllerAs : 'vm'
        });
}