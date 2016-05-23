angular.module('employeeApp')

.controller('EmployeesController', ['$scope','$location','EmployeesService', function ($scope,$location,EmployeesService) {
         
          var pageSize = 10;
          $scope.count = 0;
          $scope.itemsPerPage = 10;
          $scope.currentPage = 1;
          $scope.employees = [];
          $scope.selectedRow = null;
          $scope.RowSelected = false;
          $scope.goToEmployee = goToEmployee;
          $scope.setWidth = setGroupWidth;
          $scope.getEmployeeCount = getEmployeeCount;
          $scope.employeeDelete = employeeDelete;
          $scope.selectEmployee = selectEmployee;
          $scope.getDesignationName = getDesignation;
          $scope.previousBatch = previousBatch;
          $scope.nextBatch = nextBatch;
          $scope.delete = false;
    
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
                var params = {"currentPage" : $scope.currentPage,
                              "pageSize" : pageSize};
              
                console.log(params);
                EmployeesService.getEmployees(params).then(function(response){
                    $scope.employees = response.data;
                    if($scope.employees.length <1)
                      previousBatch();
                });
                getEmployeeCount();
                console.log($scope.max);
          }
          
          
    
          function goToEmployee(employeeId){
              if(employeeId)
                  $location.path('/employee/' + employeeId);
              else
                  $location.path('/employee');
          }
    

          function setGroupWidth(){
                if($scope.RowSelected)
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
                 
    
          function getEmployeeCount(){
              EmployeesService.getEmployeeCount().then(function(response){
                  $scope.count = response;
              }).catch(function(err){
                  console.log(err);
              });
              
              return $scope.count;
          }; 
              
    
          function employeeDelete(employeeId,index) {  
            var params = {
                "employeeId" : employeeId
            };
            
            EmployeesService.deleteEmployee(params).then(function(response){
                  $scope.employees.splice(index, 1);
                  $scope.count--;
                  getEmployees();
                  $scope.delete = true;
            });
          };   
    
    
          function selectEmployee(employee, index, operation)
          {
                $scope.selectedEmployee = employee; 
                var old_index = $scope.selectedRow;
                $scope.selectedRow = index;
                
                if(operation == 'select')
                {
                    if($scope.selectedRow >=0)
                    {
                        $scope.RowSelected = true;
                        $scope.delete= false;
                    }
                }
                else if(operation == 'deselect')
                {
                    if(index == old_index)
                    {    
                        $scope.RowSelected = false;   
                        $scope.selectedRow = -1;
                        $scope.delete= false;
                    }
                    else
                    {
                        selectEmployee(employee, index, 'select');
                    }
                }
          }
    
          
       
        
    
          function getDesignation(designation){
                return hashDesignation[designation];
          }
    
          function previousBatch()
          {
              if($scope.currentPage != 0)
              {
                  $scope.currentPage--;
                  $scope.selectedRow = null;
                  $scope.RowSelected = false;
                  getEmployees();
              }
          }
    
          function nextBatch()
          {
              $scope.max = Math.ceil($scope.count / $scope.itemsPerPage);
              console.log($scope.count + ' / ' + $scope.itemsPerPage + ' = ' + $scope.max);
              
              if($scope.currentPage < $scope.max)
              {
                   $scope.currentPage++;
                   $scope.selectedRow = null;
                   $scope.RowSelected = false;
                   getEmployees();
              }
          }
  }]);