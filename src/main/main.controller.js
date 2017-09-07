(function(angular) {
  'use strict';
  angular.module('webtrekk')
         .controller('mainController', mainController);

  function mainController( UsersData  ){
    "ngInject";

    // load data from localStore.. just precation;
    UsersData.load();
    this.users = UsersData.ids;
    this.UsersData = UsersData;

  }
  })(angular);