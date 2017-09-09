(function(angular) {
  angular.module('webtrekk')
    .config(config)
    .directive('details', detailsDirectionConfig);

  function config($stateProvider, $urlServiceProvider) {
    'ngInject';

    $stateProvider.state('customerDetails', {
      url: '/data/{customerId:[0-9]{1,8}}',
      template: '<details></details>',
    });
  }

  function detailsDirectionConfig() {
    return {
      templateUrl: '/details/details.html',
      scope: {},
      replace: true,
      controllerAs: '$ctrl',
      controller: 'detailsController',
    };
  }
}(angular));
