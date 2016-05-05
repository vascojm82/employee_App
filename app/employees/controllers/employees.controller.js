angular.module('employeeApp')

.controller('EmployeesController', ['$scope','$location','EmployeesService', function ($scope,$location,EmployeesService) {
         
          $scope.goToEmployee = goToEmployee;
          $scope.setWidth = setGroupWidth;
          $scope.employeeCount = empCount;
          $scope.employeeDelete = empDelete;
          $scope.selectEmployee = selectEmployee;
    
          activate();
    
          function activate()
          {
              getEmployees();
              
          }
    
          function getEmployees()
          {
                EmployeesService.getEmployees().then(function(response){
                    
                    $scope.employees = response.data;
                })          
          }
    
          function goToEmployee(employeeId){
              if(employeeId)
                  $location.path('/employee/' + employeeId);
              else
                  $location.path('/employee');
              //console.log(employeeId);
          }
    

          function setGroupWidth(){
                if($scope.rowSelected)
                {
                    var domElem = document.getElementById("buttons");
                    $(domElem).css({"width":"320"});
                }
                else
                {
                    var domElem = document.getElementById("buttons");
                    $(domElem).css({"width":"200"});
                }    
          };    
                 
    
          function empCount(){
              alert('The total employee count is: ' +  $scope.employeeCount);
          }; 
           
          
          function empDelete() {
            var index = $scope.index;
            $scope.gridOptions.data.splice(index, 1);
            $scope.employeeCount--;
          };   
    
          function selectEmployee(employee)
          {
                $scope.selectedEmployee = employee;    
          }
  }]);