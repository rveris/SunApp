angular.module('sunapp').factory('customerDataFactory', customerDataFactory);

function customerDataFactory($http){
    return {
        getAllCustomers : getAllCustomers,
        getOneCustomer : getOneCustomer,
        addOneCustomer : addOneCustomer 
    };

    function getAllCustomers() {
        return $http.get('/api/customers').then(complete).catch(failed);
    }
    
    function getOneCustomer(customerId) {
        return $http.get('/api/customers/' + customerId).then(complete).catch(failed);
    }

    function addOneCustomer(customer){
        
    }
    
    function complete(response) {
        return response;
    }
    
    function failed(error) {
        console.log(error.statusText);
    }
}