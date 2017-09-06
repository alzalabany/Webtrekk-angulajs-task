// (function(angular) {
//   'use strict';
//   angular.module('webtrekk')
//          .controller('detailsController', detailsController);

//   function detailsController( usersStore, $stateParams ){
//     "ngInject";
//         this.$onDestroy = componentWillUnmount.bind(this);

//         this.data = usersStore.values.master;
//         this.user = usersStore.values.master[$stateParams.customerId] || {};
//         this.user.birthday = new Date(this.user.birthday);
//         this.user.last_contact = new Date();

//         this.$onInit = () => {
//           // do some init stuff
//           Object.keys($stateParams).map(key=>{
//             this[key] = $stateParams[key];
//           })
//           console.log('users component', this, $stateParams);
//         }

//   }

//     function componentWillUnmount(){
  
//     }

  
//   })(angular);