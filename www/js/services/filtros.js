
moduleServices.factory('Filtros', function(HtmlHelper) {
  
  var filtros = {
    "bairro" : "",
    "vereador" : "",
    "assunto" : ""
  };

  return {
    getFilterDescription: function(){
      description = " Pesquisando registros ";

      if (filtros.vereador !== ""){
        description += " de " + HtmlHelper.strongTag(filtros.vereador.nome_parlamentar);
      }

      if (filtros.bairro !== ""){
        description += " no bairro " + HtmlHelper.strongTag(filtros.bairro.nome);
      }
            
      if (filtros.assunto !== ""){
        description += " onde tenha o assunto '"+ HtmlHelper.strongTag(filtros.assunto) +"'" ;
      }

      return description;
    },
    getFilter: function(name) {
      return filtros[name]
    },
    setFilter: function(name, value) {
      return filtros[name] = value;
    }
  };
})