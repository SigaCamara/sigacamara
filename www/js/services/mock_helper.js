moduleServices.factory('MockHelper', function($http, $q, DB, Util) {
    return {
      timeout: function() {
        return 500;
      }
    };
  });
