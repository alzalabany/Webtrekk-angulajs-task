(function() {
  angular
    .module('webtrekk')
    .controller('navHistoryController', navigationController);
  /**
   * @name NavigationController
   * @param {UsersData} UsersData
   * @param {Object} $scope
   * @param {Object} $stateParams
   * @memberof Webtrekk_Demo
  */
  function navigationController(UsersData, $scope, $stateParams) {
    'ngInject';

    this.preview = !!$scope.preview;
    UsersData.load();
    this.id = $stateParams.customerId || $scope.customer;
    this.user = UsersData.byId[this.id] || {};
    this.history = UsersData.naviById[this.id];
  }
}(angular));
