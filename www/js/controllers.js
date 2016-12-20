angular.module('starter').controller('loginCtrl',
  ['$scope','$efficiencyApi', '$state', function($scope, $efficiencyApi, $state){
    $scope.login = function(){
      $efficiencyApi.login($scope.user, $scope.password).then(function(user){
      if(user.data[0]){
        $state.go('app');
      }else{
        alert('wrong user or password');
      }
      
    }, function(err){
    console.log(JSON.stringify(err))
    });
    }

}]);

angular.module('starter').controller('typeSelectionCtrl',
  ['$scope', '$state', function($scope, $state){
    $scope.go = function(state){
      $state.go(state);
    }

}]);

angular.module('starter').controller('salesAgentsListCtrl',
  ['$scope', '$efficiencyApi', '$sharedData', '$state', function($scope, $efficiencyApi, $sharedData, $state){
    $scope.persons = {}

    $efficiencyApi.getAllSalesAgents().then(function(salesAgents){
      $scope.persons = salesAgents.data;
    });

    $scope.go = function(state){
      $state.go(state);
    }

    $scope.savePerson = function(salesAgent){
      $sharedData.setSalesAgent(salesAgent);
      $state.go('app.personDashBoard');
    }

}]);

angular.module('starter').controller('addAgentCtrl',
  ['$scope', '$efficiencyApi', '$sharedData', '$state', function($scope, $efficiencyApi, $sharedData, $state){
    
    $scope.go = function(state){
      $state.go(state);
    }

    $scope.savePerson = function(){
      var person = {}
      person.name= $scope.name
      if($scope.type=='Closer'){
        person.type = 0;
      }
      if($scope.type=='Sales Agent'){
        person.type = 1;
      }
      $efficiencyApi.addAgent(person).then(function(){
        $state.go('app');
      });
    }

}]);

angular.module('starter').controller('personDashboardCtrl',
  ['$scope', '$efficiencyApi', '$sharedData', '$state', function($scope, $efficiencyApi, $sharedData, $state){
    $scope.person = $sharedData.getSalesAgent();

    $scope.go = function(state, dateLevel){
      if(dateLevel){
        $sharedData.setDateLevel(dateLevel);
      }
      $state.go(state);
    }

    $scope.delete = function(){
      $efficiencyApi.deleteAgent($scope.person._id).then(function(){
        $state.go('app');
      });
    }
}]);

angular.module('starter').controller('createReportCtrl',
  ['$scope', '$efficiencyApi', '$sharedData', '$state', function($scope, $efficiencyApi, $sharedData, $state){
    $scope.person = $sharedData.getSalesAgent();
    var date = new Date();
    $scope.data = {};
    $scope.data.answeredCalls = null;
    $scope.type;
    $efficiencyApi.getReportByDay(date.getFullYear(), date.getMonth()+1, date.getDate(), $scope.person._id).then(function(report){  
      if(report.data[0] == null){
        $scope.type = 0;
      }
      else{
        $scope.type = 1;  
        $scope._id = report.data[0]._id;      
        $scope.amount = report.data[0].amount;
        $scope.collect = report.data[0].collect;
        $scope.data.answeredCalls = report.data[0].answeredCalls;
        $scope.numberOfSales = report.data[0].numberOfSells;
        $scope.bigTotalSalesSum();
        $scope.efficiencyDiv();
      }
    })
    
    $scope.bigTotalSalesSum = function(){
      $scope.bigTotalSales = $scope.amount + $scope.collect;
    }
    $scope.efficiencyDiv = function(){
      console.log($scope.data.answeredCalls);
      $scope.efficiency = $scope.data.answeredCalls/$scope.bigTotalSales;
    }

    $scope.save = function(){
      if($scope.person.type == 1){
        if(!$scope.amount | !$scope.collect | !$scope.data.answeredCalls |!$scope.numberOfSales){
          alert("Please fill all fields")
        }
        else{
        var date = new Date();
        var report = {}
        report.name = $scope.person._id;
        report.amount = $scope.amount;
        report.collect = $scope.collect;
        report.answeredCalls = $scope.data.answeredCalls;
        report.numberOfSells = $scope.numberOfSales;
        report.day = date.getDate();
        report.month = date.getMonth() + 1;
        report.year = date.getFullYear();
        $efficiencyApi.createReport(report).then(function(){
          $state.go('app.personDashBoard'); 
        });
      }
    }
      else{
        if(!$scope.amount | !$scope.collect|!$scope.numberOfSales){
          alert("Please fill all fields")
        }
        else{
        var date = new Date();
        var report = {}
        report.name = $scope.person._id;
        report.amount = $scope.amount;
        report.collect = $scope.collect;
        report.answeredCalls = $scope.answeredCalls;
        report.numberOfSells = $scope.numberOfSales;
        report.day = date.getDate();
        report.month = date.getMonth() + 1;
        report.year = date.getFullYear();
        $efficiencyApi.createReport(report).then(function(){
          $state.go('app.personDashBoard'); 
        });
      }
      } 
    }

    $scope.go = function(state){
      $state.go(state);
    }

    $scope.update = function(){
        var date = new Date();
        var report = {}
        report._id = $scope._id;
        report.name = $scope.person._id;
        report.amount = $scope.amount;
        report.collect = $scope.collect;
        report.answeredCalls = $scope.data.answeredCalls;
        report.numberOfSells = $scope.numberOfSales;
        report.day = date.getDate();
        report.month = date.getMonth() + 1;
        report.year = date.getFullYear();
      $efficiencyApi.updateReport(report).then(function(){
        $state.go('app.personDashBoard');
      });
    }

}]);

angular.module('starter').controller('datePickerCtrl',
  ['$scope', '$efficiencyApi', '$sharedData', '$state', function($scope, $efficiencyApi, $sharedData, $state){
    $scope.person = $sharedData.getSalesAgent();
    $scope.years = [];
    $scope.months = [];
    $scope.days = [];
    $scope.date = {};
    $scope.date.days = [];
    var dateLevel = $sharedData.getDateLevel();

    switch(dateLevel){
      case 'month':
        $scope.monthDiv = true;
        break;
      case 'week':
        $scope.monthDiv = true;
        $scope.weekDiv = true;
        break;
      case 'day':
        $scope.dayDiv = true;
        $scope.monthDiv = true;
        break;

    }

    var date = new Date();
    for(var i = 1980; i < (date.getFullYear() + 50); i++){
      $scope.years.push(i);
    }

    for(var i = 1; i <= 12; i++){
      $scope.months.push(i);
    }

    $scope.dateDifference = function(){
      $scope.date.days = null;
      $scope.date.days = [];
      $scope.date.days.push($scope.date.initialDay);
      date = new Date($scope.date.year, $scope.date.month, 0);
      var days = date.getDate();
      console.log($scope.date.initialDay)
      for(var i = 0, b = $scope.date.initialDay; i <6; i++){
        if(b < days){
          b++
        }
        else
        {
          b = 1;
        }
        $scope.date.days.push(b);
        $scope.date.lastDay = b;
      } 
      console.log($scope.date.lastDay)
    }

    $scope.setDays = function(){
      $scope.days = null;
      $scope.days = [];
      date = new Date($scope.date.year, $scope.date.month, 0);
      var days = date.getDate();
      for(var i = 1; i <= days; i++){
        $scope.days.push(i);
      }
      console.log($scope.days)
    }

    $scope.save = function(){
      $sharedData.setDateReport($scope.date);
      $state.go('app.reportViewer')
    }
}]);

angular.module('starter').controller('reportViewerCtrl',
  ['$scope', '$efficiencyApi', '$sharedData', '$state', function($scope, $efficiencyApi, $sharedData, $state){
    var person = $sharedData.getSalesAgent();
    $scope.person = person;
    var dateLevel = $sharedData.getDateLevel();
    var date = $sharedData.getDateReport();
    var reports = [];
    $scope.totalNumberSales = 0;
    $scope.totalAmount = 0;
    $scope.totalCollect = 0;
    $scope.totalAnsweredCalls = 0;
    switch(dateLevel){
      case 'year':
        $efficiencyApi.getReportByYear(date.year, person._id).then(function(report){
          reports = report.data;
          for(var i = 0; i < reports.length; i++){
            $scope.totalNumberSales = $scope.totalNumberSales + reports[i].numberOfSells;
            $scope.totalAmount = $scope.totalAmount + reports[i].amount;
            $scope.totalCollect = $scope.totalCollect + reports[i].collect;
            $scope.totalAnsweredCalls = $scope.totalAnsweredCalls + reports[i].answeredCalls;
          }
          $scope.totalBigTotalSales = $scope.totalAmount + $scope.totalCollect;
          $scope.totalEfficiency = $scope.totalAnsweredCalls/$scope.totalBigTotalSales;
        });
      break;
      case 'month':
        $efficiencyApi.getReportByMonth(date.year, date.month, person._id).then(function(report){
          reports = report.data;
          for(var i = 0; i < reports.length; i++){
            $scope.totalNumberSales = $scope.totalNumberSales + reports[i].numberOfSells;
            $scope.totalAmount = $scope.totalAmount + reports[i].amount;
            $scope.totalCollect = $scope.totalCollect + reports[i].collect;
            $scope.totalAnsweredCalls = $scope.totalAnsweredCalls + reports[i].answeredCalls;
          }
          $scope.totalBigTotalSales = $scope.totalAmount + $scope.totalCollect;
          $scope.totalEfficiency = $scope.totalAnsweredCalls/$scope.totalBigTotalSales;
        });
        break;
      case 'week':
        for(var i = 0; i < date.days.length; i++){
          if(date.days[i-1] > date.days[i]){
            if(date.month + 1 > 13){
              date.month=1;
              date.year++;
            }else{
              date.month++;
            }
          }
          $efficiencyApi.getReportByDay(date.year, date.month, date.days[i], person._id).then(function(report){
          reports = report.data;
          for(var i = 0; i < reports.length; i++){
            $scope.totalNumberSales = $scope.totalNumberSales + reports[i].numberOfSells;
            $scope.totalAmount = $scope.totalAmount + reports[i].amount;
            $scope.totalCollect = $scope.totalCollect + reports[i].collect;
            $scope.totalAnsweredCalls = $scope.totalAnsweredCalls + reports[i].answeredCalls;
          }
          $scope.totalBigTotalSales = $scope.totalAmount + $scope.totalCollect;
          $scope.totalEfficiency = $scope.totalAnsweredCalls/$scope.totalBigTotalSales;
        });
        }
        break;
      case 'day':
        $efficiencyApi.getReportByDay(date.year, date.month, date.day, person._id).then(function(report){
          reports = report.data;
          for(var i = 0; i < reports.length; i++){
            $scope.totalNumberSales = $scope.totalNumberSales + reports[i].numberOfSells;
            $scope.totalAmount = $scope.totalAmount + reports[i].amount;
            $scope.totalCollect = $scope.totalCollect + reports[i].collect;
            $scope.totalAnsweredCalls = $scope.totalAnsweredCalls + reports[i].answeredCalls;
          }
          $scope.totalBigTotalSales = $scope.totalAmount + $scope.totalCollect;
          $scope.totalEfficiency = $scope.totalAnsweredCalls/$scope.totalBigTotalSales;
        });
        break;
    }


    $scope.go = function(state, dateLevel){
      if(dateLevel){
        $sharedData.setDateLevel(dateLevel);
      }
      $state.go(state);
    }

}]);

angular.module('starter').controller('closersListCtrl',
  ['$scope', '$efficiencyApi', '$sharedData', '$state', function($scope, $efficiencyApi, $sharedData, $state){
    $scope.persons = {}

    $efficiencyApi.getAllClosers().then(function(salesAgents){
      $scope.persons = salesAgents.data;
    });

    $scope.go = function(state){
      $state.go(state);
    }

    $scope.savePerson = function(salesAgent){
      $sharedData.setSalesAgent(salesAgent);
      $state.go('app.personDashBoard');
    }

}]);
