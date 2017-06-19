angular.module('sunapp').controller('CustomerController', CustomerController)

function CustomerController(customerDataFactory, $routeParams) {
    var vm = this;
    var id = $routeParams.id;
    vm.title = 'DISPLAY';
    customerDataFactory.getOneCustomer(id).then(function(response){
        console.log("DISPLAY");
        console.log(response.data);
        vm.customer = response.data;
    });
}