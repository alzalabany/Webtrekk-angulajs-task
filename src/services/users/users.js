(function() {
'use strict';

  angular
    .module('webtrekk')
    .service('UsersData', UsersData);

  /**
  * Data Provider Service
  * @namespace UsersData
  */
  function UsersData($wt_storage) {
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
      const customer = JSON.parse( JSON.stringify( data ) ); // deep clone
      customer.customer_id = _findNextId(this.ids);
      console.log('customer ready', customer);
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
      console.log('removing id',id);
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
      item.birthday = new Date(item.birthday);
      item.last_contact = new Date(item.last_contact);
      carry[item.customer_id] = item;
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

    /**
    * @name _findNextId private function
    * @desc search array of ids and return the next id (last_id+1)
    * @param {Array} findNextId
    * @returns {Number|NaN} NaN if provided a invalid array for ids;
    * @memberOf UsersData.create
    */
    function _findNextId(ids){

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
})();

(function(angular) {
  'use strict';
/**
* @namespace UsersFactory
* @name UsersFactory
* @desc
* @param {String} UsersFactory
* @returns {String}
* @memberOf UsersFactory
*/
  // angular.module('webtrekk')
  // .service('$wt_users', dataService)
  // .factory('$wt', $dataProvider)

  // function $dataProvider(initialState) {
  //   "ngInject";

  //   return function factory(engine, name, id){
  //     if(!initialState[name]){
  //       throw 'invlaid data requested'
  //     }
  //     if( !('setItem' in engine) || !('getItem' in engine) ){
  //       throw 'invlaid engine provided';
  //     }

  //     const STORAGE_ID = 'webtrekk_'+name;
  //     const normalize = s => String(s).toLowerCase();
  //     return {
  //       name: STORAGE_ID,
  //       get: function () {
  //         try{
  //           var json = JSON.parse(engine.getItem(STORAGE_ID));
  //           if(!json || typeof json !== typeof initialState[name]){
  //             throw 'no intialdata';
  //           }
  //           return json;
  //         }catch(e) {
  //           this.set(initialState[name]);
  //           return initialState[name];
  //         }
  //       },
  //       getBy: function(val, primary_key){
  //         let data = this.get();
  //         let _id = primary_key || 'customer_id';
  //         val = normalize(val);

  //         return Array.from(data).filter(i=>normalize(i[_id])===val);
  //       },
  //       put: function(id, Or){
  //         let data = this.get();
  //         return id in data ? data[id] : (Or || null);
  //       },
  //       set: function (data) {
  //         engine.setItem(STORAGE_ID, JSON.stringify(data));
  //       },
  //       delete: function(){
  //         engine.put(STORAGE_ID, []);
  //       }
  //     }
  //   }
  // }

  // function usersStore($wt_storage){
  //   "ngInject";
  //   const master = $dataProvider(localStorage, 'master');
  //   const navi = $dataProvider(localStorage, 'navi');

  //   const data = {
  //     navi: navi.get(),
  //     master: master.get(),
  //   };

  //   const getNavigations = function(id){
  //     return data.navi.filter(i=>i.customer_id===this.customer_id);
  //   };

  //   data.byId = data.master.reduce((carry, item)=>Object.assign(
  //     carry, {
  //       [item.customer_id]: Object.assign({
  //         getNavigations: getNavigations.bind(item)
  //       },item)
  //     }),{});
  //   data.ids = Object.keys(data.byId);
  //   data.sortBy = function(key){
  //     this.ids = this.ids.sort((a, b)=>data[a][key] === data[b][key] ? 0 : data[a][key] < data[b][key] );
  //     return this.ids;
  //   }.bind(data);


  //   console.log('userfactory Init', data);

  //   return data;
  // }
})(angular);