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
    
    function _deleteEmployee(params)
    {
        var result = $http.delete(BASE_URL + 'employees', {params: params} ).then(function(response){
            return response;
        });
        
        return result;
    }
    
    function _saveEmployee(data,id)
    {
        console.log('This is the new id: ' + id);
        if(!data.empid && id)
        {
            console.log("I'm in.");
            data.empid = id;
        }
        console.log(data);
        
        var result = $http.post(BASE_URL + 'employee', data ).then(function(response){
            console.log(response);
            return response;
        });
        
        return result;
    }
    
    //Assign API methods to service objects
    employeeService.getEmployees = _getEmployees;
    employeeService.getEmployeeById = _getEmployeeById;
    employeeService.deleteEmployee = _deleteEmployee;
    employeeService.saveEmployee = _saveEmployee;
    
    //Make service object accessible to controllers
    return employeeService;
}