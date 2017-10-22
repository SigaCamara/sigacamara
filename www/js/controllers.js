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

.controller('MateriaisCtrl', function($scope, Materiais, $rootScope, $ionicHistory, DB, $timeout, $ionicNavBarDelegate, Filtros) {
  var vm = this;
  this.listaItens = [];
  
  this.bairro = Filtros.getFilter("bairro");
  this.vereador = Filtros.getFilter("vereador");
 
  Materiais.all(this.bairro, this.vereador).then(function(data) {
    vm.listaItens = data;
    debugger;
  });

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
    this.bairro = Filtros.getFilter("bairro");
    this.vereador = Filtros.getFilter("vereador");
    this.assunto = Filtros.getFilter("assunto");
  }

  this.redirect = function(state){
    Filtros.setFilter("scope", vm);
    $state.go(state);
  }

  this.pesquisar = function(){
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
