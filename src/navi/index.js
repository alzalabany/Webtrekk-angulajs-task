(function(angular) {
  /**
   * @namespace NaviController
   */
  angular.module('webtrekk')
    .config(config)
    .directive('navi', detailsDirectionConfig);

  /**
  * @name Config
  * @desc configure routes for navi page
  * @param {Object} $stateProvider
  * @return {void}
  * @memberOf NaviController
  */
  function config($stateProvider) {
    'ngInject';

    $stateProvider.state('navi', {
      url: '/navi/{customerId:[0-9]{1,8}}',
      template: '<navi></navi>',
    });
  }

  /**
   * @name DetailsDirectiveConfig
   * @desc config for navi directives
   * @param {Number} customer id of the customer, if not in url
   * @param {Boolean} preview if true it will not render headrs
   * @return {Object}
   */
  function detailsDirectionConfig() {
    return {
      templateUrl: '/navi/navi.html',
      scope: {
        customer: '<',
        preview: '<',
      },
      replace: true,
      controllerAs: '$ctrl',
      controller: 'navHistoryController',
    };
  }
}(angular));
