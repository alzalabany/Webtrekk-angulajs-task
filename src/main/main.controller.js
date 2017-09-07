(function(angular) {
  'use strict';
  angular.module('webtrekk')
         .controller('mainController', mainController);

  function mainController( UsersData , $timeout, $scope ){
    "ngInject";

    // load data from localStore.. just precation;
    UsersData.load();
    UsersData.sortBy('last_name');
    this.users = UsersData.ids;
    this.UsersData = UsersData;

    this.orderBy = 'last_name';
    this.reverseSort = false;

    this.remove = id => {
      UsersData.remove(id);
      this.users = UsersData.ids;
    }

    this.sort = (attr) => {
      if(this.orderBy !== attr){
        this.orderBy = attr;
        // assure that first click is assending as per requirements
        this.reverseSort = false;
      } else {
        this.reverseSort = !this.reverseSort;
      }
      let sign = this.reverseSort ? '-' : '';
      this.users = this.UsersData.sortBy(sign+this.orderBy);
    }

  }
  })(angular);