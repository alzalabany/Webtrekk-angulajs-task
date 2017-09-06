# style guide and developer xperince

to create a new component / route / factory / service, just include `angular.module('webtrekk')` and setup your component config and run blocks.

our build system will scan all folders and include them all in _app.js file

this inversion of Ioc allow us to develope new componente without having to update main app.js file.

more importnatly it promote consistency and limit dev. ability to import 3rd parties that whole team do not agree upon.

also it safeguard app from failling if one module fail, it will do so silently without affecting whole app.

main module that we inherite from have all Global variables/configs/3rd party libraries loaded there, so you can inject them into you components without worries.

since we all share same namespace/ inherite from same parent module we can also inject other components into ours, etc.

## Template for components
```js
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
```

- to define a new route, add route configurtion into config block of your component.
- note all config blocks for all components will run first, then all run blocks of all components will run after.
- order of execution is not guranteed so its prefereed to delay any work that depend on other modules into .run block; while expose your api in .config block
- for testing Karma will automaticly pick up all ,spec files and run them.