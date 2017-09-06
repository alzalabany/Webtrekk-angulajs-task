# StyleGuide

- use services and constants when-ever its possible
- don't use factory unless its a real factory.

- all services are prefixed by `$wt_` to be clear in controller its a webtrekk service not 3rd parties

## Template

Ref:
[johnpapa style-guide](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#data-services)

example service
```js
(function() {
'use strict';

  angular
    .module('Module')
    .service('Service', Service);

  Service.inject = ['dependency1'];
  function Service(dependency1) {
    this.exposedFn = exposedFn;

    ////////////////
    function exposedFn() { }
  }
})();
```

we follow john-papas' guide as close as possible for best developer experince and consistency.

- Services
- Factories
- Data Services

template can be found in refrence above.

## Notes

- define all constants and variables your service depend on top of your module.

- Define interfaces inside your .spec files.

- this folder should be vanilla js as much as possible;

- do not rely on any browser/env capibilities
  - for better modularity we define those capibilities as constants then inject them in service that need them.
  - .spec.js test must clearly state the interface you expect from this injectable; so that it can be clear for dev's who might need to polyfill/encapsulate native implementation.
  - example : look @ storage service
