(function(angular) {
  'use strict';
  angular.module('webtrekk')
  .config(config)
  .directive('navi', detailsDirectionConfig);

  function config( $stateProvider, $urlServiceProvider) {
    "ngInject";

    $stateProvider.state('navi', {
      url: '/navi/{customerId:[0-9]{1,8}}',
      template: "<navi></navi>",
    });
  }

  function detailsDirectionConfig(){
    return {
      templateUrl: '/navi/navi.html',
      scope: {
        customer: '<',
        preview: '<',
      },
      replace:true,
      controllerAs: "$ctrl",
      controller:'navHistoryController'
    }
  }

})(angular);
