(function(angular) {
  angular.module('webtrekk')
    .controller('mainController', mainController);

  /**
  * @name Controller
  * @param {UsersData} UsersData
  * @param {function} $timeout
  * @param {function} $scope
  * @return {void}
  * @memberof Webtrekk_demo.Main
  */
  function mainController(UsersData, $timeout, $scope) {
    'ngInject';

    // get sorted array of customer_id
    this.orderBy = 'last_name';
    this.reverseSort = false;

    this.read = read;
    this.remove = remove.bind(this);
    this.sort = sort.bind(this);

    activate.call(this); // Start-up

    // ///////////////////////////
    /**
    * @name Activate
    * @desc load localStorage and sort em by last_name
    * @return {void}
    * @memberof Main.Controller
    */
    function activate() {
      $scope.$watch(() => UsersData.ids, (value) => {
        this.users = value;
      });
      UsersData.load();
      UsersData.sortBy('last_name');
    }

    // return attr of a Customer by his id;
    /**
    * @name read
    * @desc rturn attr of user by his id
    * @param {Number} id
    * @param {String} attr
    * @return {String}
    * @memberof Main.controller
    */
    function read(id, attr) {
      return UsersData.byId[id][attr] || 'N/A';
    }

    /**
     * @desc Delete a Customer and his Navigation data by his id
     * @param {Number} id
     */
    function remove(id) {
      UsersData.remove(id);
      UsersData.sortBy('last_name');
      this.users = UsersData.ids;
    }

    /**
     * @desc Sort users by Attribute, if same attribute is set, will reverse order
     * @param {String} attr
     * @return {void}
     */
    function sort(attr) {
      if (this.orderBy !== attr) {
        this.orderBy = attr;
        // assure that first click is assending as per requirements
        this.reverseSort = false;
      } else {
        this.reverseSort = !this.reverseSort;
      }
      const sign = this.reverseSort ? '-' : '';
      this.users = UsersData.sortBy(sign + this.orderBy);
    }
  }
}(angular));
