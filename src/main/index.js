(function(angular) {
  'use strict';
  angular.module('webtrekk')
  .config(config)
  .directive('main', ()=>({
    templateUrl: '/main/main.html',
    scope: {},
    replace:true,
    controllerAs: "$ctrl",
    controller:'mainController'
  }));

  function config( $stateProvider, $urlServiceProvider) {
    "ngInject";
    // setting self as main route
    $urlServiceProvider.rules.otherwise({ state: 'customerlist' });

    $stateProvider.state('customerlist', {
      url: '/',
      template: "<main></main>",
    });
  }

})(angular);
