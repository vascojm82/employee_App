//Routing config for employeeApp

angular.module('employeeApp')
    .factory('EmployeesService', EmployeesService);

function EmployeesService($http)
{
    var employeeService = {};
    var BASE_URL = 'http://localhost:3000/';
    
    //API methods
    function _getEmployees(params)
    { 
        var employees = $http.get(BASE_URL + 'employees', {params: params} ).then(function(response){
            return response;
        });
        
        return employees;
    }
    
    function _getEmployeeCount()
    {
        var employeeCount = $http.get(BASE_URL + 'employees/recordCount').then(function(response){
            return response.data.count;
        }).catch(function(err){
            console.log("Service error ocurred: ", err );
        });
        
        return employeeCount;
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
        if(!data.empid && id)
        {
            data.empid = id;
        }
        
        var result = $http.post(BASE_URL + 'employee', data ).then(function(response){
            return response;
        });
        
        return result;
    }
    
    //Assign API methods to service objects
    employeeService.getEmployees = _getEmployees;
    employeeService.getEmployeeCount = _getEmployeeCount;
    employeeService.getEmployeeById = _getEmployeeById;
    employeeService.deleteEmployee = _deleteEmployee;
    employeeService.saveEmployee = _saveEmployee;
    
    //Make service object accessible to controllers
    return employeeService;
}