(function(angular) {
  'use strict';
  angular.module('webtrekk')
         .controller('detailsController', detailsController);

  function detailsController( UsersData, $stateParams, $state ){
    "ngInject";
    activate.call(this);
    
    ////////////////
    function activate() {
      UsersData.load();
      this.user = UsersData.byId[$stateParams.customerId] || {};
      this.user.birthday = new Date(this.user.birthday);
    }

    this.save = function(){
      UsersData.save();
      $state.go('customerlist()');
    }

  }

  })(angular);