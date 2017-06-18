angular.module('sunapp').controller('CustomersController', CustomersController)

function CustomersController($http) {
    var vm = this;
    vm.title = 'La Perla - Sun App';
    $http.get('/api/customers').then(function(response){
        console.log(response.data);
        vm.customers = response.data;
    });
}