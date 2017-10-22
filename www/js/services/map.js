moduleServices.factory('Maps', function($http, $q, DB, Util, URL) {
    return {
      mapa_calor: function() {
        var promise = $http.get(URL.endpoint("bairros/mapa_calor")).then(function (response) {
          console.log(response.data);
          return response.data;
        });

        return  promise;
      }
    }
});
