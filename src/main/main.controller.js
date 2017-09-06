(function(angular) {
  'use strict';
  angular.module('webtrekk')
         .controller('mainController', mainController);

  function mainController( usersStore ){
  
        this.$onDestroy = componentWillUnmount.bind(this);
  
        this.sortUsers = sortUsers.bind(this);
  
        this.users = usersStore;
  
        this.demo = {
          'customer_id': '1',
          'first_name': 'Peter',
          'last_name': 'Smith',
          'birthday': '1996-10-12',
          'gender': 'm',
          'last_contact': '2013-06-01',
          'customer_lifetime_value': '191,12'
        };
  
        this.$onInit = () => {
          // do some init stuff
          console.log('users component', this);
        }

  }
  
    function componentWillUnmount(){
  
    }
  
    function sortUsers(){
  
    }
  
  })(angular);
