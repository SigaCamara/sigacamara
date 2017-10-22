moduleServices.factory('HtmlHelper', function() {
  
  var tag = function(tag, content){
    return "<"+tag+">"+content+"</"+tag+">";
  }
  
  return {
    strongTag: function(content){
      return tag("strong", content);
    }
  };
});
