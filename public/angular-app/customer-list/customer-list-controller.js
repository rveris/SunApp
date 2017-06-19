angular.module('sunapp').controller('CustomersController', CustomersController)

function CustomersController(customerDataFactory) {
    var vm = this;
    vm.title = 'La Perla - Sun App';
    customerDataFactory.getAllCustomers().then(function(response){
        console.log(response.data);
        vm.customers = response.data;
    });
}