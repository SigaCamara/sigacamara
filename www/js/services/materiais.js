moduleServices.factory('Materiais', function($http, $q, DB, Util, URL) {
  
    return {
      all: function(bairro, vereador) {
        id_vereador = vereador.id;
        id_bairro = bairro.id;

        var promise = $http.get(URL.endpoint("materias/consulta_materia_bairro", "?parlamentar=" + id_vereador + "&bairro=" + id_bairro)).then(function (response) {
          return response.data;
        });
        
        return promise;
      }
    };
  })