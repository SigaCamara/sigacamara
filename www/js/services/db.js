moduleServices.factory('DB', function($http, $q) {
  return {
    save: function (key, value){
      localStorage.setItem(key, JSON.stringify(value));
    },
    load: function(key){
      var jsonString = localStorage.getItem(key);
      return JSON.parse(jsonString);
    },
    clear: function(key){
      localStorage.removeItem(key);
    }
  }
})