(function(angular) {
  angular.module('webtrekk')
    .controller('detailsController', detailsController);

  function detailsController(UsersData, $stateParams, $state, CustomerClass) {
    'ngInject';

    activate.call(this);

    // //////////////
    function activate() {
      UsersData.load();
      this.user = UsersData.byId[$stateParams.customerId] || new CustomerClass();
    }

    this.save = () => {
      if (!this.user.isValid()) return alert('please complete information');
      if (this.user.customer_id == '0') {
        UsersData.create(this.user);
      } else {
        UsersData.save();
      }
      $state.go('customerlist');
    };
  }
}(angular));
