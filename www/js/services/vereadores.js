moduleServices.factory('Vereadores', function($http, $q, DB, Util, URL, MockHelper) {

  return {
    rankeTipoMateria : function(vereador){
     
      id_parlamentar = vereador.id;
      
      // return promise with vereadores data
      var promise = $http.get(URL.endpoint("materias/rank_tipo_materia_parlamentar", "?parlamentar=" + id_parlamentar)).then(function (response) {
        return response.data;
      },(function(){
        promise.reject();
      }));

      return promise;
    },
    rankBairro: function(vereador){

      id_parlamentar = vereador.id;

      // return promise with vereadores data
      var promise = $http.get(URL.endpoint("bairros/rank_bairro_parlamentar", "?parlamentar=" + id_parlamentar)).then(function (response) {
        return response.data;
      },(function(){
        promise.reject();
      }));

      return promise;
    },
    all: function() {
      // return promise with vereadores data
      var promise = $http.get(URL.endpoint("parlamentares")).then(function (response) {
        
        var myFollowedVereadores = DB.load("vereador_follow");

        // flag nos vereadores que estou seguindo
        for (var i in response.data) {
          var vereador = response.data[i];
          vereador.follow = (Util.getIndexOfItem(vereador, myFollowedVereadores) !== false);

          vereador.biografia = vereador.biografia.replace(/<\/?\w+[^>]*\/?>/g);
          vereador.biografia = vereador.biografia.replace(/undefined/i, "");
        }

        return response.data;
      },(function(){
        promise.reject();
      }));

      // Return the promise to the controller
      return promise;
    },
    allFollowed: function() {
      // perform some asynchronous operation, resolve or reject the promise when appropriate.
      return $q(function(resolve, reject) {
          myFollowedVereadores = DB.load("vereador_follow");
          resolve(myFollowedVereadores);
      });
    },
    addFollow: function(vereador){
      return $q(function(resolve, reject) {
        setTimeout(function(){

          myFollowedVereadores = DB.load("vereador_follow");
          if(!myFollowedVereadores){
            myFollowedVereadores = [];
          }

          if(Util.getIndexOfItem(vereador, myFollowedVereadores) === false){
            myFollowedVereadores.push(vereador);
            DB.save('vereador_follow', myFollowedVereadores);
            resolve(true);
          } else {
            console.error("Tentativa de adicionar item que ja existe na lista de Follow vereadores");
          }

        }, MockHelper.timeout());
      });
    },
    removeFollow: function(vereador){
      return $q(function(resolve, reject) {
        setTimeout(function(){
          myFollowedVereadores = DB.load("vereador_follow");
          var indice = Util.getIndexOfItem(vereador, myFollowedVereadores);
          if(indice !== false){
            myFollowedVereadores.splice(indice, 1);
          }

          DB.save('vereador_follow', myFollowedVereadores);
          resolve(true);
        }, MockHelper.timeout());
      });
    },
    get: function(vereadorId) {

      myFollowedVereadores = DB.load("vereador_follow");
      if(myFollowedVereadores){
        for (var i = 0; i < myFollowedVereadores.length; i++) {
          if (myFollowedVereadores[i].id === parseInt(vereadorId)) {
            return myFollowedVereadores[i];
          }
        }
      }
      return null;
    }
  };
})
