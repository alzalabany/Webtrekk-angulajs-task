(function(angular) {
  'use strict';
  angular.module('webtrekk')
  .config(config)
  .run(run)
  .directive('main', ()=>({
    templateUrl: '/main/main.html',
    scope: {},
    controllerAs: "$ctrl",
    replace:false,
    controller
  }))
  .directive('userRows', ()=>({
    scope: {
      user: '=user'
    },
    controllerAs: "$ctrl",
    replace: true,
    // template: "<div>\n\n</div>",
    templateUrl: '/main/row.html',
    controller: function($scope){
      "ngInject";
      console.log('Row',this,$scope);
      this.user = $scope.user;
    }
  }));

  function config( $stateProvider, $urlServiceProvider) {
    "ngInject";
    console.log('configuring users component');

    // setting self as main route
    $urlServiceProvider.rules.otherwise({ state: 'userlist' });

    $stateProvider.state('userlist', {
      url: '/',
      template: "<main></main>",
    });
  }

  function run(){
    "ngInject";
    console.log('running users component');
  }

function controller( usersStore ){

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
