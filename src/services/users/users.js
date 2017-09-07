(function(angular) {
  'use strict';

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