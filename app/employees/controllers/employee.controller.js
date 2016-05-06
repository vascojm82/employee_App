angular.module('employeeApp')

.controller('EmployeeController',function ($scope, $timeout, $routeParams, EmployeesService) {
       var employeeId = $routeParams.employeeId;
       
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
                 //EmployeesService.
             }
       }
    
       function setMinMax(designation){
         
         if(designation == 'consultant')
         {
           $scope.min = 30000;
           $scope.max = 35000; 
         }
         else if(designation == 'srConsultant')
         {
            $scope.min = 36000;
            $scope.max = 40000;
         }
         else if(designation == 'lead')
         {
            $scope.min = 41000;
            $scope.max = 45000;
         }
         else if(designation == 'asstManager')
         {
            $scope.min = 46000;
            $scope.max = 50000; 
         }
         else if(designation == 'manager')
         {
            $scope.min = 51000;
            $scope.max = 55000;
         }
         else if(designation == 'srManager')
         {
            $scope.min = 56000;
            $scope.max = 80000;
         }
         console.log('min: '+ $scope.min + '  max: ' + $scope.max);
       
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
                  console.log(response.data[0]);
                  $scope.employee = response.data[0];
            });
       } 
    
       function save(){
           var myJSON = '{"_id":"5728ee2c61f89af7afa8807f","empid":"8","fname":"Raul","mname":"Javier","lname":"Jimenez","designation":"Lead","age":24,"salary":55000}';
           myJSON2 = JSON.parse(myJSON);
           console.log(myJSON2);
           EmployeesService.saveEmployee(myJSON2).then(function(response){
                  console.log(response);
            });
       }
  });