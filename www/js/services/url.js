moduleServices.factory('URL', function($http, $q, DB, Util) {

  var mocking = true;

  var config = {
    server: "http://10.1.96.202",
    port: "3000",
    version: "1"
  }
  
  var getServerPath = function(){
    if(mocking){
      return getMockFor();
    }

    return config.server + ":" + config.port + "/api/v" + config.version + "/"
  }
 
  var getMockFor = function(){
    return "/mock/";
  }
  
  return {
    endpoint: function(service) {
      var endpointPath = getServerPath() + service + ".json";
      return endpointPath;
    }
  };
})