angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('VereadorCtrl', function($scope, Vereadores, $rootScope, $ionicHistory, DB, $timeout, Filtros, $ionicNavBarDelegate) {
  var vm = this;
  this.listaItens = [];
  
  Vereadores.all().then(function(data) {
    vm.listaItens = data;
  });

  this.select = function(valor){
    Filtros.setFilter("vereador", valor);
    Filtros.getFilter("scope"). updateFiltros();
    $ionicNavBarDelegate.back();
  }
})



.controller('MaterialDetailCtrl', function($scope, $state, Materiais, $rootScope, $ionicHistory, DB, $timeout, $ionicNavBarDelegate, Filtros,  $ionicLoading, $stateParams) {
  var vm = this;
  this.material = {"id":326492,"tipo_materia_id":9,"numero":3541,"ano":2017,"ementa":"SOLICITA PROVIDÊNCIAS DA SANASA PARA AUMENTAR OS \"CAVALETES COLETIVOS\", VISANDO AMPLIAÇÃO DO NÚMERO DE AGRUPADORES/REAGRUPAMENTO DA DISTRIBUIÇÃO DE ÁGUA NA RUA MANOEL THOMAZ, VILA LUNARDI (PORTELINHA).","indexacao":"","autores_parlamentares":[{"id":316,"nome_parlamentar":"Nelson Hossri","url_foto":"http://sagl.campinas.sp.leg.br/sapl_documentos/parlamentar/fotos/316_foto_parlamentar","biografia":"\u003cdiv id=\"form-widgets-biografia\" class=\"richTextWidget richtext-field\"\u003e\u003cp\u003eNatural\n de Campinas, Nelson Hossri é formado em Direito pela Universidade de \nRibeirão Preto (Unaerp) e obteve ainda título de especialista em \nDependência Química pela Unifesp. Possui formação em\u0026nbsp;vários cursos na \nárea de Políticas Públicas de Prevenção às Drogas.\u0026nbsp;Antes de ser eleito \nvereador, Hossri sempre participou ativamente dos movimentos sociais e \nentidades do município, tendo inclusive criado o Movimento “Sou Feliz \nsem Drogas”, com apadrinhamento de Padre Haroldo, onde inúmeras famílias\n foram atendidas e vidas foram salvas.\u003c/p\u003e\n\u003cp\u003eDe 2012 a 2016, Hossri esteve à frente da Coordenadoria de Prevenção \nàs Drogas de Campinas, onde idealizou e coordenou inúmeras ações que se \ntornaram referência, como o Programa Recomeço (tratamento gratuito para \ndependentes do álcool e outras drogas), Pet Terapia (uso do cachorro no \ntratamento), a campanha “Não dê esmola, dê cidadania” (conscientização \njunto à população acerca dos prejuízos da atitude de dar esmola para as \npessoas em situação de rua), a Bolsas de Cursos gratuitos e a \nCoordenadoria Itinerante (atendimento em todas as regiões da cidade) e o\n Grupo de Amparo às Famílias, entre outras.\u003c/p\u003e\n\u003cp\u003eHossri se candidatou a vereador pela primeira vez em 2012 e ficou \ncomo primeiro suplente. Em 2016 se elegeu vereador com 4.335 votos.\u003c/p\u003e\u003c/div\u003e","partido_atual":"PODE","links":[{"rel":"self","uri":"/parlamentares/316"}]}],"ind_tramitacao":1,"regime_tramitacao":"Ordinária","links":[{"rel":"self","uri":"/materias/326492"}],"tipo":{"data":{"id":9,"sigla":"IND","descricao":"Indicação"}}};
  
})

.controller('MateriaisCtrl', function($scope, $state, Materiais, $rootScope, $ionicHistory, DB, $timeout, $ionicNavBarDelegate, Filtros,  $ionicLoading) {
  var vm = this;
  this.listaItens = [];
  
  this.bairro = Filtros.getFilter("bairro");
  this.vereador = Filtros.getFilter("vereador");
  this.assunto = Filtros.getFilter("assunto");
  
  if(!this.bairro && !this.vereador && !this.assunto ){
    $state.go("app.search");
    return;
  }

  $ionicLoading.show({template: '<ion-spinner></ion-spinner>'});
  Materiais.all(this.bairro, this.vereador, this.assunto).then(function(data) {
    vm.listaItens = data;
    $ionicLoading.hide();
  }, function(response){
    $ionicLoading.hide();
  });

  this.filterDescription = Filtros.getFilterDescription();

  this.select = function(valor){

  }
})

.controller('BairroCtrl', function($scope, Bairros, $rootScope, $ionicHistory, DB, $timeout, Filtros, $ionicNavBarDelegate) {
  var vm = this;
  this.listaItens = [];
  
  Bairros.all().then(function(data) {
    vm.listaItens = data;
  });

  this.select = function(valor){
    Filtros.setFilter("bairro", valor);
    Filtros.getFilter("scope").updateFiltros();
    $ionicNavBarDelegate.back();
  }

  this.searchResults = function(searchValue){
    console.log(searchValue);
  }

})

.controller('SearchCtrl', function($scope, Vereadores, $rootScope, $ionicHistory, DB, $timeout, Filtros, $state) {
  var vm = this;

  this.updateFiltros = function(){
    vm.bairro = Filtros.getFilter("bairro");
    vm.vereador = Filtros.getFilter("vereador");
    vm.assunto = Filtros.getFilter("assunto");
  }

  this.redirect = function(state){
    Filtros.setFilter("scope", vm);
    $state.go(state);
  }

  this.pesquisar = function(){
    Filtros.setFilter("assunto", vm.assunto);
    $state.go("app.materiais");
  }
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
