angular.module('employeeApp')

.controller('EmployeeController', ['$scope', '$timeout', '$location', '$routeParams' , 'EmployeesService', function ($scope, $timeout, $location, $routeParams, EmployeesService) {
       var employeeId = $routeParams.employeeId;
       var generatedId = null; 
    
       $scope.setMinMax = setMinMax;
       $scope.chkSalaryRange = chkSalaryRange;
       $scope.save = save;  
       $scope.min=0;
       $scope.max=0;
    
       activate(employeeId);
       
       function activate(employeeId)
       {
             if(employeeId)
             {
                 console.log("I'm on update mode");
                 getEmployeeById(employeeId);
                 //EmployeesService.
             }
             else
             {
                 console.log("I'm on create mode");
                 $scope.generatedId = generateID();
                 console.log('This is the new id: ' + $scope.generatedId);
             }
       }
    
       function setMinMax(designation){
         
         if(designation == 'Consultant')
         {
           $scope.min = 30000;
           $scope.max = 35000; 
         }
         else if(designation == 'SnrConsultant')
         {
            $scope.min = 36000;
            $scope.max = 40000;
         }
         else if(designation == 'Lead')
         {
            $scope.min = 41000;
            $scope.max = 45000;
         }
         else if(designation == 'AsstManager')
         {
            $scope.min = 46000;
            $scope.max = 50000; 
         }
         else if(designation == 'Manager')
         {
            $scope.min = 51000;
            $scope.max = 55000;
         }
         else if(designation == 'SrManager')
         {
            $scope.min = 56000;
            $scope.max = 80000;
         }
         console.log('min: '+ $scope.min + '  max: ' + $scope.max);
         console.log($scope.employee.salary);
         chkSalaryRange($scope.employee.salary);
       }
       
       function chkSalaryRange(salary){
         if((salary >= $scope.min) && (salary <= $scope.max))
         {
              $scope.employeeForm.salary.$setValidity('range', true);          
            
         } 
         else
              $scope.employeeForm.salary.$setValidity('range', false);
       }
       
       function getEmployeeById(employeeId){
            var params = {
                "employeeId" : employeeId
            };
            
            EmployeesService.getEmployeeById(params).then(function(response){
                  $scope.employee = response.data[0];
            });
       } 
    
       function save(){
           EmployeesService.saveEmployee($scope.employee,$scope.generatedId).then(function(response){
               if(response)
               {
                    $location.path('/');
               }
               else
               {
                    console.log("Error!"); 
               }
            });
       }
    
        
       function generateID()
       {
           var id = "SYN" + Math.random().toString(16).slice(2);
           return id;
       }
  }]);