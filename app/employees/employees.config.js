//Routing config for employeeApp

angular.module('employeeApp')
    .config(function ($routeProvider) {
      $routeProvider.
      when('/',{
         templateUrl: '/app/employees/views/employees.html',
         controller: 'EmployeesController' 
      }).
      when('/employee/:employeeId', {
          templateUrl: '/app/employees/views/employee.html',
          controller: 'EmployeeController'
      }).
      when('/employee', {
          templateUrl: '/app/employees/views/employee.html',
          controller: 'EmployeeController'
      }).
      otherwise({
          redirectTo: '/'
      });
});