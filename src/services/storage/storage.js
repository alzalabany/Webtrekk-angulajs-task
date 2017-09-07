(function(angular) {
'use strict';

  angular
    .module('webtrekk')
    .constant('StorageEngine', localStorage)
    .constant('STORAGE_ID', 'webtrekk__local')
    .constant('initialState', {
        master: [{"customer_id":"1","first_name":"Peter","last_name":"Smith","birthday":"1996-10-12","gender":"m","last_contact":"2013-06-01","customer_lifetime_value":"191,12"},{"customer_id":"2","first_name":"Anna","last_name":"Hopp","birthday":"1987-05-03","gender":"w","last_contact":"2013-07-08","customer_lifetime_value":"50,99"},{"customer_id":"3","first_name":"Christian","last_name":"Cox","birthday":"1991-02-21","gender":"m","last_contact":"2013-08-01","customer_lifetime_value":"0"},{"customer_id":"4","first_name":"Roxy","last_name":"Fox","birthday":"1979-06-30","gender":"w","last_contact":"2012-01-29","customer_lifetime_value":"213,12"},{"customer_id":"5","first_name":"Eric","last_name":"Adam","birthday":"1969-11-21","gender":"m","last_contact":"2013-03-18","customer_lifetime_value":"1019,91"}],
        navi  : [{"customer_id":"1","pages":"A","timestamp":"2013-06-01 10:10:12"},{"customer_id":"1","pages":"B","timestamp":"2013-06-01 10:11:12"},{"customer_id":"1","pages":"A","timestamp":"2013-06-01 10:12:12"},{"customer_id":"2","pages":"C","timestamp":"2013-07-08 09:03:09"},{"customer_id":"2","pages":"A","timestamp":"2013-07-08 09:09:09"},{"customer_id":"2","pages":"D","timestamp":"2013-07-08 09:19:09"},{"customer_id":"3","pages":"B","timestamp":"2013-07-08 09:19:09"},{"customer_id":"3","pages":"A","timestamp":"2013-07-08 09:19:10"},{"customer_id":"4","pages":"D","timestamp":"2013-07-08 09:19:11"},{"customer_id":"4","pages":"A","timestamp":"2013-07-08 09:19:12"},{"customer_id":"5","pages":"X","timestamp":"2013-07-08 09:19:13"},{"customer_id":"5","pages":"A","timestamp":"2013-07-08 09:19:14"},{"customer_id":"5","pages":"B","timestamp":"2013-07-08 09:19:15"}],
    })
    .service('$wt_storage', $wt_storage);

  // @@todo should return a promise
  function $wt_storage(initialState, StorageEngine, STORAGE_ID) {
    "ngInject";

    this.get = get.bind(this);
    this.set = set;
    this.clear = clear.bind(this);
    this.reload = reload.bind(this);

    ////////////////
    function get() {
        try{
          var json = JSON.parse(StorageEngine.getItem(STORAGE_ID));
          if(!json || typeof json !== typeof initialState){
            throw 'no intialdata';
          }
          this._error = null; // clear _error;
          return json;
        }catch(e) {
          if(this._error){
            // there has been a previous error, here is a loop of calling this.get();
            this._error = null;
            console.warn('it looks like StorageEngine has failed... returning vanilla JS');
            return initialState;
          }
          this.set.call(this, initialState);
          this._error = e;
          return this.get();
        }
    }
    function set(data) {
      StorageEngine.setItem(STORAGE_ID, JSON.stringify(data));
    }
    function clear(){
      StorageEngine.set(STORAGE_ID, {});
    }
    function reload(){
        this.set(initialState);
        return this.get();
    }
  }

})(angular);
