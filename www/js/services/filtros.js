moduleServices.factory('Filtros', function() {
  
  var filtros = {
    "bairro" : "",
    "vereador" : "",
    "assunto" : ""
  };

  return {
    getFilter: function(name) {
      return filtros[name]
    },
    setFilter: function(name, value) {
      return filtros[name] = value;
    }
  };
})