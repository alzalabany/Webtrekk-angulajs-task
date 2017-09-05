(function(angular) {
  'use strict';

  angular.module('webtrekk')
  .config(function($urlRouterProvider) {
    "ngInject";
    // inject your route
  })
  .run(function(){
    "ngInject";
    // inject your run
    console.log('running main run block');
  })
  .controller(mainController);


  function mainController(){
    "ngInject";

  }
})(angular);

(function(angular) {
  'use strict';

  angular.module('webtrekk')
  .config(function($urlRouterProvider) {
    "ngInject";
    // inject your route
  })
  .run(function(){
    "ngInject";
    // inject your run
    console.log('running main2 run block',window.__INITIAL_STATE__);
  })
  .controller(mainController);


  function mainController(){
    "ngInject";

  }
})(angular);
