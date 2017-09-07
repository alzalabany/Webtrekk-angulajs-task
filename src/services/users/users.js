(function( angular ) {
'use strict';

  angular
    .module('webtrekk')
    .factory('CustomerClass', () => Customer)
    .service('UsersData', CustomerData);

  /**
  * Data Provider Service
  * @namespace UsersData
  */
  function CustomerData($wt_storage, CustomerClass) {
    "ngInject";

    this.load = load.bind(this);
    this.byId = {};
    this.naviById = {};
    this.ids  = [];
    this.sortBy = sortBy.bind(this);
    this.save = save.bind(this);
    this.remove = remove.bind(this);
    this.create = create.bind(this);
    this.getNavigation = id => this.naviById[id];

    ////////////////
    // for unit testing not part of UserData api
    this._dynamicSort = _dynamicSort;

    /**
    * @name Load
    * @desc load data from localstorage and set this variables
    * @returns {UsersData} to facilitate chaining
    * @memberOf UsersData
    */
    function load() {
      const data = $wt_storage.get();
      this.byId = data.master.reduce(_masterReducer,{});
      this.naviById = data.navi.reduce(_naviReducer,{});
      this.ids = Object.keys(this.byId);
      return this;
    }

    /**
    * @name Create
    * @desc Create a new Customer and save to Storage
    * @returns {UsersData} to facilitate chaining
    * @memberOf UsersData
    */
    function create(data) {
      const customer = new CustomerClass( data ); // deep clone
      customer.customer_id = customer._findNextId(this.ids);

      this.byId[customer.customer_id] = customer;
      this.naviById[customer.customer_id] = [];
      this.ids.push(customer.customer_id);

      return this.save();
    }

    /**
    * @name Save
    * @desc Save current State to Storage
    * @returns {UsersData} to facilitate chaining
    * @memberOf UsersData
    */
    function save(){
      const data = {
        master: Object.values(this.byId),
        navi  : Object.values(this.naviById).reduce((a,i)=>a.concat(i),[]),
      }
      $wt_storage.set(data);

      return this;
    }

    /**
    * @name Remove
    * @desc Remove Customer by his id
    * @returns {UsersData} to facilitate chaining
    * @memberOf UsersData
    */
    function remove(id){
      const data = {
        master: Object.values(this.byId).filter(i=>i.customer_id!==id),
        navi  : Object.values(this.naviById).reduce((a,i)=>a.concat(i),[]).filter(i=>i.customer_id!==id),
      }
      $wt_storage.set(data);

      // reload
      load.call(this);
    }

    /**
    * @name sortBy
    * @desc sort this.ids using a attr
    * @param {String} attr
    * @returns {Array} this.ids
    * @memberOf UsersData
    */
    function sortBy(attr){
      this.ids = this.ids.sort(_dynamicSort(attr, this.byId));
      return this.ids;
    }

    /**
     * @name _masterReducer
     * @desc Helper function used to build this.byId
     * @param {Object} carry
     * @param {User} item
     * @memberOf UsersData.load
     */
    const _masterReducer = (carry, item) => {
      carry[item.customer_id] = new CustomerClass(item);
      return carry;
    }
    /**
     * @name _naviReducer
     * @desc Helper function used to build this.naviById
     * @param {Object} carry
     * @param {Navi} item
     * @memberOf UsersData.load
     */
    const _naviReducer = (carry, item) => {
      item.timestamp = new Date(item.timestamp);

      if(carry[item.customer_id]){
        carry[item.customer_id].push(item);
      } else {
        carry[item.customer_id] = [item];
      }
      return carry;
    }

    /**
     * generate sort function
     * https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value-in-javascript
     * @param {String} property
     * @param {Object} $ref to be used if we are sorting array of ids
     * @todo move into utilities class..
     */
    function _dynamicSort(property, $ref) {
      var sortOrder = 1;
      if(property[0] === "-") {
          sortOrder = -1;
          property = property.substr(1);
      }
      return function (a,b) {
          if($ref){
            let a_ = $ref[a];
            let b_ = $ref[b];
            return ((a_[property] < b_[property]) ? -1 : (a_[property] > b_[property]) ? 1 : 0) * sortOrder;
          } else {
            return ((a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0) * sortOrder;
          }
      }
    }

  }

  /**
  * @namespace Customer
  * @desc Customer class can be an angular constant, value, or factory
  */
  class Customer{
    constructor(props={}) {
      this.customer_id = this._id = String(props.customer_id || '0');
      this.first_name = String(props.first_name || '');
      this.last_name = String(props.last_name || '');
      this.birthday = new Date(props.birthday);
      this.gender = String(props.gender).toLowerCase();
      this.last_contact = new Date(props.last_contact);
      this.customer_lifetime_value = String(props.customer_lifetime_value||'');

      this.isValid = this.isValid.bind(this);
    }

    /**
    * @name isValid
    * @desc validate Customer model
    * @returns {Boolean}
    * @memberOf Customer
    */
    isValid(){
      return [
        ['m','w'].indexOf(this.gender) === -1,
        isNaN(Date.parse(this.birthday)),
        isNaN(Date.parse(this.last_contact)),
      ].filter(Boolean).length === 0
    }

     /**
    * @name _findNextId private function
    * @desc search array of ids and return the next id (last_id+1)
    * @param {Array} findNextId
    * @returns {Number|NaN} NaN if provided a invalid array for ids;
    * @memberOf UsersData.create
    * @memberOf Customer
    * @todo i keep it here so that i can access it later in Tests should be moved out to Utils helper service
    */
    _findNextId(ids){

      var trials = 0;
      var search = Array.from(ids).map(Number).sort();
      var i = search[0] + 1;

      while(search.indexOf(i)!==-1 && trials < 100){
        i = i + 1;
        trials++;
      }

      return String(i);
    }
  }
})( angular );
