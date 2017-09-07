(function(angular) {
  'use strict';
  angular.module('webtrekk')
         .controller('mainController', mainController);

  function mainController( ){
    "ngInject";
        this.$onDestroy = componentWillUnmount.bind(this);
  
        this.sortUsers = sortUsers.bind(this);
  
        this.users = {};
  
        this.count = 6;

        this.$onInit = () => {
          // do some init stuff
          console.log('users component', this);
        }

        this.delete = function(row){
          console.log('should delete', row);
        }

  }

    function componentWillUnmount(){
  
    }
  
    function sortUsers(){
  
    }
  
  })(angular);
