moduleServices.factory('Util', function($http, $q) {
  return {
    getIndexOfItem: function(item, lista){
      var itemEncontrado = false;
      for(var i in lista){
        var itemLista = lista[i];
        if(itemLista.id === item.id){
          itemEncontrado = i; 
        }
      }

      return itemEncontrado;
    }
  }
})