angular.module('sunapp').controller('NewCustomerController', NewCustomerController)

function NewCustomerController(NewCustomerController) {
    var vm = this;
    var customer = vm.customer;
    vm.title = 'La Perla - Sun App';
    customerDataFactory.addOneCustomer(customer).then(function(response){
        console.log("Customer Added" + customer._id);
    });
}