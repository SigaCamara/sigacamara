moduleServices.factory('Materiais', function($http, $q, DB, Util, URL) {

    return {
      tramitacoes: function(materia){
        //  materia.id = "322193"; // mock
        var promise = $http.get(URL.endpoint("tramitacoes/" + materia.id)).then(function (response) {
          return response.data;
        });

        return promise;
      },
      all: function(bairro, vereador, assunto) {

        queryParameteres = [];

        id_vereador = id_bairro = pattern_assunto = "";

        if(vereador){
          id_vereador = vereador.id;
          queryParameteres.push("parlamentar=" + id_vereador);
        }

        if(bairro){
          id_bairro = bairro.id;
          queryParameteres.push("bairro=" + id_bairro) ;
        }

        if(assunto){
          pattern_assunto = assunto;
          queryParameteres.push("assunto=" + pattern_assunto) ;
        }

        var promise = $http.get(URL.endpoint("materias/consulta_materia", "?" + queryParameteres.join("&"))).then(function (response) {
          return response.data;
        });

        return promise;
      }
    };
  })
