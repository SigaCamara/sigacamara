moduleServices.factory('Bairros', function($http, $q, DB, Util, URL) {
  
    return {
      all: function() {
        // return promise with bairros data
        var promise = $http.get(URL.endpoint("bairros")).then(function (response) {
          var myFollowedBairros = DB.load("bairros_follow");
         
          // flag nos bairros que estou seguindo
          for(var i in response.data){

            // Adiciona o campo ID para os Bairros
            response.data[i] = {
              id: response.data[i],
              nome:  response.data[i]
            }
            
            var bairro = response.data[i];
            bairro.follow = (Util.getIndexOfItem(bairro, myFollowedBairros) !== false);
          }
          
          return response.data;
        });
  
        // Return the promise to the controller
        return promise;
      },
      allFollowed: function() {
        // perform some asynchronous operation, resolve or reject the promise when appropriate.
        return $q(function(resolve, reject) {
          // DB.clear("bairros_follow");
          myFollowedBairros = DB.load("bairros_follow");
          if(!myFollowedBairros){
            myFollowedBairros = [];
          }
          resolve(myFollowedBairros);
        });
      },
      addFollow: function(bairro){
        myFollowedBairros = DB.load("bairros_follow");
        if(!myFollowedBairros){
          myFollowedBairros = [];
        }
  
        if(Util.getIndexOfItem(bairro, myFollowedBairros) === false){
          myFollowedBairros.push(bairro);
          DB.save('bairros_follow', myFollowedBairros);
        } else {
          console.log("Tentativa de adicionar item que ja existe na lista de Follow bairros");
        }
      },
      removeFollow: function(bairro){
        myFollowedBairros = DB.load("bairros_follow");
        var indice = Util.getIndexOfItem(bairro, myFollowedBairros);
        if(indice !== false){
          myFollowedBairros.splice(indice, 1);
        }
       
        DB.save('bairros_follow', myFollowedBairros);
      },
      get: function(bairroId) {
        myFollowedBairros = DB.load("bairros_follow");
        if(myFollowedBairros){
          for (var i = 0; i < myFollowedBairros.length; i++) {
            if (myFollowedBairros[i].id === bairroId) {
              return myFollowedBairros[i];
            }
          }
        }
        return null;
      }
    };
  });
