'use strict';

var mdwiki = angular.module('mdwiki', [
  'ngRoute',
  'ngSanitize',
  'ngAnimate',
  'jmdobry.angular-cache',
  'mdwiki.controllers',
  'mdwiki.services',
  'mdwiki.directives'
]).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider, $angularCacheProvider) {
  $routeProvider
    .when('/git/clone', {
      templateUrl: './views/gitclone.html',
      controller: 'GitCloneCtrl'
    })
    .when('/', {
      templateUrl: './views/content.html',
      controller: 'ContentCtrl'
    })
    .when('/search', {
      templateUrl: './views/searchResult.html',
      controller: 'SearchCtrl'
    })
    .when('/:page', {
      templateUrl: './views/content.html',
      controller: 'ContentCtrl'
    }).otherwise({
      redirectTo: '/index'
    });

  $locationProvider.html5Mode(true);
}]);
