angular.module('employeeApp')

.controller('EmployeesController', ['$scope','$location','EmployeesService', function ($scope,$location,EmployeesService) {
         
          $scope.count = 0;
          $scope.itemsPerPage = 10;
          $scope.currentPage = 1;
          $scope.employees = [];
          $scope.emp = [];
          $scope.selectedRow = null;
          $scope.RowSelected = false;
          $scope.goToEmployee = goToEmployee;
          $scope.setWidth = setGroupWidth;
          $scope.employeeCount = employeeCount;
          $scope.employeeDelete = employeeDelete;
          $scope.selectEmployee = selectEmployee;
          $scope.getDesignationName = getDesignation;
          $scope.previousBatch = previousBatch;
          $scope.nextBatch = nextBatch;
    
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
                    $scope.emp = response.data;
                    $scope.count = response.data.length;
                    $scope.employees = $scope.emp.slice((($scope.currentPage-1)*$scope.itemsPerPage), (($scope.currentPage)*$scope.itemsPerPage));
                });      
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
                 
    
          function employeeCount(){
              return $scope.count;
          }; 
              
    
          function employeeDelete(employeeId,index) {  
            var params = {
                "employeeId" : employeeId
            };
            
            EmployeesService.deleteEmployee(params).then(function(response){
                  console.log(response);
                  var location = ($scope.currentPage * $scope.itemsPerPage) - ($scope.itemsPerPage - index);
                  console.log(location);
                  $scope.emp.splice(location, 1);
                  $scope.employees.splice(index, 1);
                  $scope.count--;
            });
          };   
    
    
          function selectEmployee(employee, index)
          {
                $scope.selectedEmployee = employee; 
                $scope.selectedRow = index;
                
                if($scope.selectedRow >=0)
                    $scope.RowSelected = true;
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
                  $scope.employees = $scope.emp.slice((($scope.currentPage-1)*$scope.itemsPerPage), (($scope.currentPage)*$scope.itemsPerPage));
              }
          }
    
          function nextBatch()
          {
              $scope.max = Math.ceil($scope.emp.length / $scope.itemsPerPage);
              console.log($scope.emp.length + ' / ' + $scope.itemsPerPage + ' = ' + $scope.max);
              
              if($scope.currentPage < $scope.max)
              {
                  $scope.currentPage++;
                  $scope.selectedRow = null;
                  $scope.RowSelected = false;
                  $scope.employees = $scope.emp.slice((($scope.currentPage-1)*$scope.itemsPerPage), (($scope.currentPage)*$scope.itemsPerPage));
              }
          }
  }]);