moduleServices.factory('Materiais', function($http, $q, DB, Util, URL) {
  
    return {
      all: function(bairro, vereador, assunto) {
        id_vereador = vereador.id;
        id_bairro = bairro.id;
        pattern_assunto = assunto;

        var promise = $http.get(URL.endpoint("materias/consulta_materia_bairro", "?parlamentar=" + id_vereador + "&bairro=" + id_bairro + "&assunto=" + pattern_assunto)).then(function (response) {
          return response.data;
        });
        
        return promise;
      }
    };
  })