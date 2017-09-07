(function() {
'use strict';

  angular
    .module('webtrekk')
    .controller('navHistoryController', navigationController);

  function navigationController( UsersData, $scope, $stateParams ){
    "ngInject";

    this.preview = !!$scope.preview;
    UsersData.load();
    this.id = $stateParams.customerId || $scope.customer;
    this.user = UsersData.byId[this.id] || {};
    this.history = UsersData.naviById[this.id];
  }

  })(angular);