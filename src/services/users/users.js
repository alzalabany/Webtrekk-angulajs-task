(function(angular) {
  angular
    .module('webtrekk')
    .factory('CustomerClass', () => Customer)
    .service('UsersData', UsersData);

  /**
  * Data Provider Service
  *
  * @param {Object} $wtStorage
  * @param {Customer} CustomerClass
  * @namespace UsersData
  */
  function UsersData($wtStorage, CustomerClass) {
    'ngInject';

    this.load = load.bind(this);
    this.byId = {};
    this.naviById = {};
    this.ids = [];
    this.sortBy = sortBy.bind(this);
    this.save = save.bind(this);
    this.remove = remove.bind(this);
    this.create = create.bind(this);

    // //////////////

    /**
    * @name Load
    * @desc load data from localstorage and set this variables
    * @return {UsersData} to facilitate chaining
    * @memberOf UsersData
    */
    function load() {
      const data = $wtStorage.get();
      this.byId = data.master.reduce(_masterReducer, {});
      this.naviById = data.navi.reduce(_naviReducer, {});
      this.ids = Object.keys(this.byId);
      return this;
    }

    /**
    * @name Create
    * @desc Create a new Customer and save to Storage
    * @param {Object} data Raw data loaded from localStorage
    * @return {UsersData} to facilitate chaining
    * @memberOf UsersData
    */
    function create(data) {
      const customer = new CustomerClass(data); // deep clone
      customer.customer_id = customer._findNextId(this.ids);

      this.byId[customer.customer_id] = customer;
      this.naviById[customer.customer_id] = [];
      this.ids.push(customer.customer_id);

      return this.save();
    }

    /**
    * @name Save
    * @desc Save current State to Storage
    * @return {UsersData} to facilitate chaining
    * @memberOf UsersData
    */
    function save() {
      const data = {
        master: Object.values(this.byId),
        navi: Object.values(this.naviById).reduce((a, i) => a.concat(i), []),
      };
      $wtStorage.set(data);

      return this;
    }

    /**
    * @name Remove
    * @desc Remove Customer by his id
    * @param {Number} id
    * @return {UsersData};
    * @memberOf UsersData
    */
    function remove(id) {
      const _id = `${id}`.toLocaleLowerCase();

      const data = {
        master: Object.values(this.byId)
          .filter((i) => `${i.customer_id}`.toLocaleLowerCase() !== _id),
        navi: Object.values(this.naviById)
          .reduce((a, i) => a.concat(i), [])
          .filter((i) => `${i.customer_id}`.toLocaleLowerCase() !== _id),
      };
      $wtStorage.set(data);
      // reload
      return this.load();
    }

    /**
    * @name sortBy
    * @desc sort this.ids using a attr
    * @param {String} attr
    * @return {Array} this.ids
    * @memberOf UsersData
    */
    function sortBy(attr) {
      this.ids = this.ids.sort(_dynamicSort(attr, this.byId));
      return this.ids;
    }

    /**
     * @name _masterReducer
     * @desc Helper function used to build this.byId
     * @param {Object} carry
     * @param {User} item
     * @return {Object}
     * @memberOf UsersData.load
     */
    const _masterReducer = (carry, item) => {
      carry[item.customer_id] = new CustomerClass(item);
      return carry;
    };
    /**
     * @name _naviReducer
     * @desc Helper function used to build this.naviById
     * @param {Object} carry
     * @param {Navi} item
     * @return {Object}
     * @memberOf UsersData.load
     */
    const _naviReducer = (carry, item) => {
      item.timestamp = new Date(item.timestamp);

      if (carry[item.customer_id]) {
        carry[item.customer_id].push(item);
      } else {
        carry[item.customer_id] = [item];
      }
      return carry;
    };

    /**
     * generate sort function
     * https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value-in-javascript
     * @param {String} property
     * @param {Object} $ref to be used if we are sorting array of ids
     * @todo move into utilities class..
     * @return {functions}
     */
    function _dynamicSort(property, $ref) {
      let sortOrder = 1;
      if (property[0] === '-') {
        sortOrder = -1;
        property = property.substr(1);
      }
      return function(a, b) {
        if ($ref) {
          const a_ = $ref[a];
          const b_ = $ref[b];
          return (a_[property] < b_[property] ? -1 :
            (a_[property] > b_[property]) ? 1 : 0
          ) * sortOrder;
        }
        return ((a[property] < b[property]) ? -1 :
          (a[property] > b[property]) ? 1 : 0
        ) * sortOrder;
      };
    }
  }

  /**
  * @namespace Customer
  * @desc Customer class can be an angular constant, value, or factory
  */
  class Customer {
    /**
     * Creates a Customer
     * @param {Object} props to be transformed into a standard customer object
     */
    constructor(props = {}) {
      this.customer_id = this._id = String(props.customer_id || '0');
      this.first_name = String(props.first_name || '');
      this.last_name = String(props.last_name || '');
      this.birthday = new Date(props.birthday);
      this.gender = String(props.gender).toLowerCase();
      this.last_contact = new Date(props.last_contact);
      this.customer_lifetime_value = String(props.customer_lifetime_value || '');

      this.isValid = this.isValid.bind(this);
    }

    /**
    * @name isValid
    * @desc validate Customer model
    * @return {Boolean}
    * @memberOf Customer
    * @todo this is just a seed,
            should be turned into actual validation with error messages
    */
    isValid() {
      return [
        ['m', 'w'].indexOf(this.gender) === -1,
        isNaN(Date.parse(this.birthday)),
        isNaN(Date.parse(this.last_contact)),
      ].filter(Boolean).length === 0;
    }

    /**
    * @name _findNextId
    * @desc search array of ids and return the next id (last_id+1)
    * @param {Array} ids
    * @return {Number} NaN if provided a invalid array for ids;
    * @memberOf Customer
    * @todo should be moved out to Utils helper service
    */
    _findNextId(ids) {
      let trials = 0;
      const search = Array.from(ids).map(Number).sort();
      let i = search[0] + 1;

      while (search.indexOf(i) !== -1 && trials < 100) {
        i += 1;
        trials++;
      }

      return String(i);
    }
  }
}(angular));
