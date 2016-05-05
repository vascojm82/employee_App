//Routing config for employeeApp

angular.module('employeeApp')
    .factory('EmployeesService', EmployeesService);

function EmployeesService($http)
{
    var employeeService = {};
    var BASE_URL = 'http://localhost:3000/';
    
    //API methods
    function _getEmployees()
    {
        var employees = $http.get(BASE_URL + 'employees').then(function(response){
            return response;
        });
        
        return employees;
    }
    
    function _getEmployeeById(params)
    { 
        var employee = $http.get(BASE_URL + 'employee', {params: params} ).then(function(response){
            return response;
        });
        
        return employee;
    }
    
    //Assign API methods to service objects
    employeeService.getEmployees = _getEmployees;
    employeeService.getEmployeeById = _getEmployeeById;
    
    //Make service object accessible to controllers
    return employeeService;
}