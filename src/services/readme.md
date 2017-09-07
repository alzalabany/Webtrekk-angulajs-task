# StyleGuide

- all services are prefixed by `$wt_` to be clear in controller its a webtrekk service not 3rd parties

- service name should be same as folder name

- use JsDoc to document services and namespace them, this can help clarify intentions and generate documentations

```js
/**
* Title
* @namespace NameSpace
* @name if child of namespace use name
* @desc
* @param {String} // if it takes any params
* @returns {String} // if return value
* @memberOf UsersFactory // use dot notation for nesed namespaced
*/
```

## Templates & StyleGuide

Ref:
[johnpapa style-guide](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#data-services)

example service
```js
(function() {
'use strict';

  angular
    .module('Module')
    .service('Service', Service);

  function Service(dependency1) {
    "ngInject";

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
  - this helps exposing your consants to other modules
  - also help in easier mocking data during testing

- Define interfaces inside your .spec files.

- this folder should be vanilla js as much as possible;

- do not rely on any browser/env capibilities
  - for better modularity we define those capibilities as constants then inject them in service that need them.
  - .spec.js test must clearly state the interface you expect from this injectable; so that it can be clear for dev's who might need to polyfill/encapsulate native implementation.
  - example : look @ storage service