'Use Strict';
angular.module('App', ['ionic', 'ngStorage', 'ngCordova', 'firebase',
    'ngMessages'
  ])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'loginController'
      })
      .state('forgot', {
        url: '/forgot',
        templateUrl: 'templates/forgot.html',
        controller: 'forgotController'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'templates/register.html',
        controller: 'registerController'
      })
      .state('app', {
        url: '/app',
        abstract:true,
        templateUrl: 'templates/app.html'
      })
      .state('app.home', {
        url: '/home',
        views:{
          'home-app':{
            templateUrl: 'templates/home.html'
          }
        }

      })
      .state('app.devices', {
        url: '/devices',
        views:{
          'devices-app':{
            templateUrl: 'templates/devices.html',
            controller: 'devicesController'
          }
        }

      });

  })

  .constant('FURL', 'https://callpal.firebaseio.com/')
  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  });
