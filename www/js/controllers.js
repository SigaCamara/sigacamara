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

  Vereadores.rankBairro(this.vereador).then(function(data){
    vm.rankBairro = data;
  });

  Vereadores.rankeTipoMateria(this.vereador).then(function(data){
    vm.rankeTipoMateria = data;
  });
})


.controller('BairroDetailCtrl', function($scope, Bairros, $rootScope, $ionicHistory, DB, $timeout, Filtros, $ionicNavBarDelegate) {
  var vm = this;
  this.bairro = Filtros.getFilter("bairro_item");
  Bairros.rank(this.bairro).then(function(data){
    vm.rank = data;
  });
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

  this.bairro = Filtros.getFilter("bairro_item");
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

.controller('BairroCtrl', function($scope, $state, Bairros, $rootScope, $ionicHistory, DB, $timeout, Filtros, $ionicNavBarDelegate) {
  var vm = this;
  this.listaItens = [];

  Bairros.all().then(function(data) {
    vm.listaItens = data;
  });

  this.select = function(valor){
    Filtros.setFilter("bairro_item", valor);
    if(Filtros.getFilter("ver-detalhes") === true){
      $state.go("app.bairro");
    }else {
      Filtros.getFilter("scope").updateFiltros();
      $ionicNavBarDelegate.back();
    }
  }

  this.searchResults = function(searchValue){
    console.log(searchValue);
  }

})

.controller('SearchCtrl', function($scope, Vereadores, $rootScope, $ionicHistory, DB, $timeout, Filtros, $state) {
  var vm = this;

  this.updateFiltros = function(){
    vm.bairro = Filtros.getFilter("bairro_item");
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

.controller('MapCtrl', function($scope, Maps) {
  Maps.mapa_calor().then(function(data) {

    // var data = [{
    //   "latitude": "41.000400",
    //   "longitude": "-74.102500",
    //   "weight": 1,
    //   "zip": "07423-1307"
    // }];


    var styles = [{
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [{
        "lightness": 100
      }, {
        "visibility": "on"
      }]
    }, {
      "featureType": "road",
      "elementType": "labels",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "poi",
      "elementType": "labels",
      "stylers": [{
        "visibility": "off"
      }]
    }];

    $.getScript("https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&libraries=visualization,geometry&key=AIzaSyDiSbeJ5PvIWg9kcBrXbx622gMl-mlZ5-o")
      .done(function(script, textStatus) {
        var myLatlng = new google.maps.LatLng(-22.895226371608913, -47.03026079999995);

        var map = new google.maps.Map(document.getElementById("map-canvas"), {
          zoom: 12,
          center: myLatlng,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          styles: styles
        });

        $.each(data, function(i, e) {
          e.location = new google.maps.LatLng(e.latitude, e.longitude);
          console.log(e);
        });

        var heatmap = new google.maps.visualization.HeatmapLayer({
          data: data
        });

        var gradient = [
          'rgba(0, 255, 255, 0)',
          'rgba(0, 255, 255, 1)',
          'rgba(0, 191, 255, 1)',
          'rgba(0, 127, 255, 1)',
          'rgba(0, 63, 255, 1)',
          'rgba(0, 0, 255, 1)',
          'rgba(0, 0, 223, 1)',
          'rgba(0, 0, 191, 1)',
          'rgba(0, 0, 159, 1)',
          'rgba(0, 0, 127, 1)',
          'rgba(63, 0, 91, 1)',
          'rgba(127, 0, 63, 1)',
          'rgba(191, 0, 31, 1)',
          'rgba(255, 0, 0, 1)'
        ]

        heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
        heatmap.set('radius', heatmap.get('radius') ? null : 50);

        heatmap.setMap(map);
        // console.log(data);
      });

      return data;
    });
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
