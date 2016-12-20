(function(){
var app = angular.module('starter', ['ionic'])

app.config(function($stateProvider, $urlRouterProvider){
    $stateProvider.state('login',{
      url:'/login',
      views: {
          'content@': {
            templateUrl: 'templates/login.html',
            controller: 'loginCtrl'
          }
        }
    })
     .state('app',{
      url:'/app',
      views: {
        'content@':{
          templateUrl:'templates/typeSelection.html', 
          controller: 'typeSelectionCtrl'
        }
      }
    })
     .state('app.addAgent',{
      url:'/addAgent',
      views: {
        'content@':{
          templateUrl:'templates/addAgent.html', 
          controller: 'addAgentCtrl'
        }
      }
    })
    .state('app.salesAgents',{
      url:'/salesAgents',
      views: {
        'content@':{
          templateUrl:'templates/personList.html',
          controller: 'salesAgentsListCtrl'
        }
      }
    })
    .state('app.personDashBoard',{
      url:'/personDashboard',
      views: {
        'content@':{
          templateUrl:'templates/personDashboard.html',
          controller: 'personDashboardCtrl'
        }
      }
    })
    .state('app.dailyReport',{
      url:'/dailyRerpot',
      views: {
        'content@':{
          templateUrl:'templates/createReport.html',
          controller: 'createReportCtrl'
        }
      }
    })
    .state('app.datePicker',{
      url:'/datePicker',
      views: {
        'content@':{
          templateUrl:'templates/datePicker.html',
          controller: 'datePickerCtrl'
        }
      }
    })
    .state('app.reportViewer',{
      url:'/reportViewer',
      views: {
        'content@':{
          templateUrl:'templates/reportViewer.html',
          controller: 'reportViewerCtrl'
        }
      }
    })
    .state('app.closers',{
      url:'/closers',
      views: {
        'content@':{
          templateUrl:'templates/personList.html',
          controller: 'closersListCtrl'
        }
      }
    });
     /*.state('addNewIngredient',{
      url:'/addNewIngredient',
      templateUrl:'templates/addNewIngredient.html'
    });*/
    $urlRouterProvider.otherwise('/login')
  });

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
}());