angular.module('employeeApp')

.controller('EmployeesController', ['$scope','$location','EmployeesService', function ($scope,$location,EmployeesService) {
         
          $scope.count = 0;
          $scope.selectedRow = null;
          $scope.goToEmployee = goToEmployee;
          $scope.setWidth = setGroupWidth;
          $scope.employeeCount = employeeCount;
          $scope.employeeDelete = employeeDelete;
          $scope.selectEmployee = selectEmployee;
          $scope.getDesignationName = getDesignation;
    
          var hashDesignation = {
                SnrConsultant: "Snr. Consultant",
                AsstManager: "Asst. Manager",
                SrManager: "Sr. Manager",
                Lead: "Lead",
                Consultant: "Consultant",
                Manager: "Manager"
          }
          
          activate();
    
          function activate()
          {
              getEmployees();
              
          }
    
          function getEmployees()
          {
                EmployeesService.getEmployees().then(function(response){
                    $scope.employees = response.data;
                    $scope.count = response.data.length;
                })          
          }
    
          function goToEmployee(employeeId){
              if(employeeId)
                  $location.path('/employee/' + employeeId);
              else
                  $location.path('/employee');
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
                 
    
          function employeeCount(){
              
              alert('The total employee count is: ' +  $scope.count);
          }; 
              
    
          function employeeDelete(employeeId) {  
            var params = {
                "employeeId" : employeeId
            };
            
            EmployeesService.deleteEmployee(params).then(function(response){
                  console.log(response);
            });
              
            $scope.count--;
          };   
    
    
          function selectEmployee(employee, index)
          {
                $scope.selectedEmployee = employee; 
                $scope.selectedRow = index;
          }
        
    
          function getDesignation(designation){
                return hashDesignation[designation];
          }
  }]);