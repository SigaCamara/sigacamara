angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, Filtros) {

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

  $scope.prepararConsultarDados = function(){
    Filtros.setFilter("ver-detalhes", true);
  }

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

.controller('VereadorCtrl', function($scope, $state, Vereadores, $rootScope, $ionicHistory, DB, $timeout, Filtros, $ionicNavBarDelegate) {
  var vm = this;
  this.listaItens = [];

  Vereadores.all().then(function(data) {
    vm.listaItens = data;
  });

  this.select = function(valor){
    Filtros.setFilter("vereador", valor);
    if(Filtros.getFilter("ver-detalhes") === true){
      $state.go("app.vereador");
    }else {
      Filtros.getFilter("scope").updateFiltros();
      $ionicNavBarDelegate.back();
    }
  }
})


.controller('VereadorDetailCtrl', function($scope, Vereadores, $rootScope, $ionicHistory, DB, $timeout, Filtros, $ionicNavBarDelegate) {
  var vm = this;
  this.vereador = Filtros.getFilter("vereador");
})

.controller('MaterialDetailCtrl', function($scope, $state, Materiais, $rootScope, $ionicHistory, DB, $timeout, $ionicNavBarDelegate, Filtros,  $ionicLoading, $stateParams) {
  var vm = this;
  this.material = Filtros.getFilter("materia");
  Materiais.tramitacoes(this.material).then(function(data){
    vm.tramitacoes = data;
  });
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

  this.select = function(materia){
    Filtros.setFilter("materia", materia);
    $state.go("app.materia-detail");
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
    Filtros.setFilter("ver-detalhes", false);
    $state.go(state);
  }

  this.pesquisar = function(){
    Filtros.setFilter("assunto", vm.assunto);
    $state.go("app.materiais");
  }
})

.controller('MapCtrl', function($scope) {
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
