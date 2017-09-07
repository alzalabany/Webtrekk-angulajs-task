// this.get = get.bind(this);
// this.set = set;
// this.clear = clear.bind(this);
// this.reload = reload.bind(this);

// .constant('StorageEngine', localStorage)

//
describe('$wb_Storage used for data persistence', function() {
  var $storage;
  var initialState;
  var mock = {mock: 1};

  beforeEach(angular.mock.module('webtrekk'));
  beforeEach(inject(function(StorageEngine, _initialState_) {
    $storage = StorageEngine;
    initialState = _initialState_;
    jasmine.addMatchers({
      toDeepEqual: function() {
        return {
          compare: function(actual, expected) {
            if(expected===actual)return {pass: true, message: 'deep equal'};
            if(Boolean(expected) !== Boolean(actual) )return {pass: false, message:'not boolean equal'};
            if(typeof expected !== typeof actual)return {pass: false, message:'type not matching'};
            var r = Object.keys(expected)
                        .filter(key=>actual[key] !== expected[key]);
            return {pass: r.length === 0, debug:r};
          }
        }
      }
    });
  }));

  describe('Constant initialState exists', function() {
    it('should exist', function() {
      expect(initialState).toBeDefined();
    });
  });

  describe('Storage Service', function() {

    it('should have initial state', function() {
      expect( $storage.get() ).toEqual(initialState);
    })

    it('should be able to set data', function() {
      $storage.set(mock);
      expect($storage.get()).toEqual(mock);
    })

    it('should be able to clear data', function() {
      $storage.clear();
      expect($storage.get()).toEqual({});
    })

    it('should be able to reload data to initial state', function() {
      $storage.reload();
      expect($storage.get()).toEqual(initialState);
    })

  })
});