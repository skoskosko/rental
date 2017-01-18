var app = angular.module('myApp', ['ngRoute','ngCookies']);


app.config(function($routeProvider) {
  $routeProvider

  .when('/', {
    templateUrl : 'rentarat/states/route.htm',
    controller  : 'HomeController'
  })

  .when('/rental', {
    templateUrl : 'rentarat/states/rental.htm',
    controller  : 'RentalController'
  })

  .when('/profile', {
    templateUrl : 'rentarat/states/profile.htm',
    controller  : 'ProfileController'
  })

  .when('/login', {
    templateUrl : 'rentarat/states/login.htm',
    controller  : 'LoginController'
  })
  .when('/admin', {
      templateUrl : 'rentarat/states/admin.htm',
      controller  : 'AdminController'
    })



  .otherwise({redirectTo: '/'});
});
