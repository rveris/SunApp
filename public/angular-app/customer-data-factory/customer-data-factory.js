angular.module('sunApp').factory('CustomerFactory', CustomerFactory);

function CustomerFactory($http){
    return {
        getAllCustomers : getAllCustomers,
        getOneCustomer  : getOneCustomer
    };

    function getAllCustomers() {
        return $http.get('http://localhost:3000/customers').then(complete).catch(failed);
    }
    
    function getOneCustomer(customerId) {
        return $http.get('http://localhost:3000/customers/' + customerId).then(complete).catch(failed);
    }
    
    function getAllCustomers(response) {
        return response.data;
    }
    
    function getAllCustomers(error) {
        return error.statusText;
    }
}