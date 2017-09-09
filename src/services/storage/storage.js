(function(angular) {
  /**
  * @namespace Storage
  * @desc interface for offline data fetching and persistence
  */
  angular
    .module('webtrekk')
    .constant('StorageEngine', localStorage)
    .constant('STORAGE_ID', 'webtrekk__local')
    .constant('initialState', {
        master: [{'customer_id': '1', 'first_name': 'Peter', 'last_name': 'Smith', 'birthday': '1996-10-12', 'gender': 'm', 'last_contact': '2013-06-01', 'customer_lifetime_value': '191,12'}, {'customer_id': '2', 'first_name': 'Anna', 'last_name': 'Hopp', 'birthday': '1987-05-03', 'gender': 'w', 'last_contact': '2013-07-08', 'customer_lifetime_value': '50,99'}, {'customer_id': '3', 'first_name': 'Christian', 'last_name': 'Cox', 'birthday': '1991-02-21', 'gender': 'm', 'last_contact': '2013-08-01', 'customer_lifetime_value': '0'}, {'customer_id': '4', 'first_name': 'Roxy', 'last_name': 'Fox', 'birthday': '1979-06-30', 'gender': 'w', 'last_contact': '2012-01-29', 'customer_lifetime_value': '213,12'}, {'customer_id': '5', 'first_name': 'Eric', 'last_name': 'Adam', 'birthday': '1969-11-21', 'gender': 'm', 'last_contact': '2013-03-18', 'customer_lifetime_value': '1019,91'}], // eslint-disable-line
        navi: [{'customer_id': '1', 'pages': 'A', 'timestamp': '2013-06-01 10:10:12'}, {'customer_id': '1', 'pages': 'B', 'timestamp': '2013-06-01 10:11:12'}, {'customer_id': '1', 'pages': 'A', 'timestamp': '2013-06-01 10:12:12'}, {'customer_id': '2', 'pages': 'C', 'timestamp': '2013-07-08 09:03:09'}, {'customer_id': '2', 'pages': 'A', 'timestamp': '2013-07-08 09:09:09'}, {'customer_id': '2', 'pages': 'D', 'timestamp': '2013-07-08 09:19:09'}, {'customer_id': '3', 'pages': 'B', 'timestamp': '2013-07-08 09:19:09'}, {'customer_id': '3', 'pages': 'A', 'timestamp': '2013-07-08 09:19:10'}, {'customer_id': '4', 'pages': 'D', 'timestamp': '2013-07-08 09:19:11'}, {'customer_id': '4', 'pages': 'A', 'timestamp': '2013-07-08 09:19:12'}, {'customer_id': '5', 'pages': 'X', 'timestamp': '2013-07-08 09:19:13'}, {'customer_id': '5', 'pages': 'A', 'timestamp': '2013-07-08 09:19:14'}, {'customer_id': '5', 'pages': 'B', 'timestamp': '2013-07-08 09:19:15'}], // eslint-disable-line
    })
    .factory('$wtStorage', Storage);

  /**
  * @namespace Storage
  * @desc main storage service to be consumed by other services
  * @param {Object} initialState returned if localsorage is null
  * @param {Object} StorageEngine must implement localStorage interface
  * @param {String} STORAGE_ID name space for saving
  * @return {Object} angular.service
  * @memberOf Storage
  * @todo should return a promise
  * @todo take Storage_id and return a closure !
  */
  function Storage(initialState, StorageEngine, STORAGE_ID) {
    'ngInject';

    const service = {
      get,
      set,
      reload,
    };
    return service;

    // ////////////////

    /**
    * @name get
    * @desc return stored object from StorageEngine
    * @return {Object}
    * @memberOf Storage
    */
    function get() {
      try {
        const json = JSON.parse(StorageEngine.getItem(STORAGE_ID));
        if (!json || typeof json !== typeof initialState) {
          throw Error('no intialdata');
        }
        return json;
      } catch (e) {
        this.set.call(this, initialState);
        this._error = e;
        return initialState;
      }
    }

    /**
     * @name set
     * @param {Object} data
     * @memberOf Storage
     * @return {void};
     */
    function set(data) {
      StorageEngine.setItem(STORAGE_ID, JSON.stringify(data));
    }

    /**
    * @name reload
    * @desc reset localStorage to hardcoded initialState
    * @return {Storage.get}
    * @memberOf Storage
    */
    function reload() {
      this.set(initialState);
      return this.get();
    }
  }
}(angular));
