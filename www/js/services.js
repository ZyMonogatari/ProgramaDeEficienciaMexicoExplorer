angular.module('starter')
.factory('$efficiencyApi', function($http){
    var baseUrl = 'http://localhost:8080';

    var post = function(url, body){
      body = body || {};
      return $http.post(baseUrl+url, body);
    }

    var get = function(url){
      return $http.get(baseUrl+url);
    }

    var del = function(url){
      return $http.delete(baseUrl+url);
    }

    return {
      login : function(user, password){
       return get('/login/'+user+'/'+password);
      },
      getAllSalesAgents : function(){
        return get('/salesAgent/findAllSalesAgents/')
      },
      getAllClosers: function(){
        return get('/salesAgent/findAllClosers/')
      },
      createReport: function(report){
        return post('/reports/addReport', report)
      },
      getReportByYear: function(year, id){
        return get('/reports/'+id+'/findReportByYear/'+year)
      },
      getReportByMonth: function(year, month, id){
        return get('/reports/'+id+'/findReportByMonth/'+year+'/'+month)
      },
      getReportByDay: function(year, month, day, id){
        return get('/reports/'+id+'/findReportByDay/'+year+'/'+month+'/'+day)
      }, 
      updateReport: function(report){
        return post('/reports/updateReport/'+ report._id, report)
      },
      deleteAgent : function(id){
        return get('/salesAgent/deleteSalesAgent/'+id);
      },
      addAgent : function(person){
        console.log('/salesAgent/addSalesAgent/')
        return post('/salesAgent/addSalesAgent/', person)
      }

    }
  });



angular.module('starter')
.factory('$sharedData', function () {
var salesAgent = {};
var closer = [];
var dateLevel;
var date = {};
return {
    getSalesAgent: function () {
        return salesAgent;
    },
    setSalesAgent: function (salesAgentParameter) {
        salesAgent = salesAgentParameter;
    },
    setDateLevel : function(dateLevelParameter){
      dateLevel = dateLevelParameter;
    },
    getDateLevel : function(){
      return dateLevel;
    },
    setDateReport : function(dateParameter){
      date =  dateParameter;
    },
    getDateReport :  function(){
      return date;
    }
};
})



angular.module('starter')
.factory('$years', function () {
return {
    getYears: function () {
      var years = [];
      
      return years;
    }
};
})