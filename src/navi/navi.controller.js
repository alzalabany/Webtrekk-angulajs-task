(function() {
'use strict';

  angular
    .module('webtrekk')
    .controller('navHistoryController', navigationController);

  function navigationController( UsersData, $stateParams ){
    "ngInject";
    activate.call(this);

    ////////////////
    function activate() {
      UsersData.load();
      this.user = UsersData.byId[$stateParams.customerId] || {};
      this.history = UsersData.getNavigation($stateParams.customerId);
      console.log(this.history);
    }

  }

  })(angular);