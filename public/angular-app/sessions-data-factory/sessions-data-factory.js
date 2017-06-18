angular.module('sunApp').factory('SessionsFactory', SessionsFactory);

function SessionsFactory($http){
    return {
        getAllSessions : getAllSessions,
        getOneSession  : getOneSession
    };

    function getAllSessions(customerId) {
        return $http.get('http://localhost:3000/customers/' + customerId + '/sessions').then(complete).catch(failed);
    }
    
    function getOneSession(customerId, sessionId) {
        return $http.get('http://localhost:3000/customers/' + customerId + '/sessions/' + sessionId).then(complete).catch(failed);
    }
    
    function getAllCustomers(response) {
        return response.data;
    }
    
    function getAllCustomers(error) {
        return error.statusText;
    }
}