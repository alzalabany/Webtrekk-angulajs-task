(function(angular) {
  angular.module('webtrekk')
    .config(config)
    .directive('main', () => ({
      templateUrl: '/main/main.html',
      scope: {},
      replace: true,
      controllerAs: '$ctrl',
      controller: 'mainController',
    }));

  /**
   * @namespace Main
   * @param {*} $stateProvider
   * @param {*} $urlServiceProvider
   * @memberof Webtrekk_demo
   */
  function config($stateProvider, $urlServiceProvider) {
    'ngInject';

    // setting self as main route
    $urlServiceProvider.rules.otherwise({state: 'customerlist'});

    $stateProvider.state('customerlist', {
      url: '/',
      template: '<main></main>',
    });
  }
}(angular));
