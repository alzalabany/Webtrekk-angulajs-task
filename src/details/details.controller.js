(function(angular) {
  'use strict';
  angular.module('webtrekk')
         .controller('detailsController', detailsController);

  function detailsController( UsersData, $stateParams ){
    "ngInject";
    activate.call(this);
    
    ////////////////
    function activate() {
      UsersData.load();
      this.user = UsersData.byId[$stateParams.customerId] || {};
      this.user.birthday = new Date(this.user.birthday);
    }

  }

  })(angular);