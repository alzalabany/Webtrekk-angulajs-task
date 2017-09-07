(function(angular) {
  'use strict';
  angular.module('webtrekk')
         .controller('mainController', mainController)

  function mainController( UsersData , $timeout, $scope ){
    "ngInject";

    // get sorted array of customer_id
    this.orderBy = 'last_name';
    this.reverseSort = false;

    this.read = read;
    this.remove = remove.bind(this);
    this.sort = sort.bind(this);

    activate.call(this);

    /////////////////////////////
    function activate(){
      // Load Customers Data from Storage
      // Set initial Sorting by last_name
      var unWatch = $scope.$watch(function(){return UsersData.ids},(value)=>{
        this.users = value;
      });
      UsersData.load();
      UsersData.sortBy('last_name');
      // $scope.$$destroy(function(){
      //   unWatch();
      // })
    }

    // return attr of user by his id;
    function read(id, attr) {
      return UsersData.byId[id][attr] || 'N/A';
    }

    // Delete a Customer and all his navi data;
    function remove(id) {
      console.log('deleting', id);
      UsersData.remove(id);
      this.users = UsersData.ids;
    }

    // Sort ids array by attr;
    function sort(attr) {
      if(this.orderBy !== attr){
        this.orderBy = attr;
        // assure that first click is assending as per requirements
        this.reverseSort = false;
      } else {
        this.reverseSort = !this.reverseSort;
      }
      let sign = this.reverseSort ? '-' : '';
      this.users = UsersData.sortBy(sign+this.orderBy);
    }

  }
  })(angular);
