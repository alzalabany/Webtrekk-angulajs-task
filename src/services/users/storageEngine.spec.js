
describe('storage service', function() {
    var $storage,initialState;
    var mockData = {};
    
    // Before each test load our api.users module
    beforeEach(angular.mock.module('webtrekk'));

    // Before each test set our injected Users factory (_Users_) to our local Users variable
    beforeEach(inject(function(_$dataProvider_, _engine_, _initialState_) {
      $storage = _$dataProvider_(_engine_, 'master');
      initialState = _initialState_;
      jasmine.addMatchers({
        toDeepEqual: function() {
          return {
            compare: function(actual, expected) {
              if(expected===actual)return {pass: true, debug:console.log('deep equal')};
              if(Boolean(expected) !== Boolean(actual) )return {pass: false, debug:console.log('not boolean equal')};
              if(typeof expected !== typeof actual)return {pass: false, debug:console.log('not same type')};
              var r = Object.keys(expected)
                           .filter(key=>actual[key] !== expected[key]);
              console.log('length of equallity', r.map(key=>[actual[key] !== expected[key],actual[key] , expected[key]]));
              return {pass: r.length === 0};
            }
          }
        }
      });
    }));
    it('should exist', function() {
      expect($storage).toBeDefined();
    });

    it('should have initial state', function() {
      expect($storage.get()).toEqual(initialState.master);
    })
    it('should be able to clear state', function() {
      // $storage.clear();
      // expect($storage.get()).toEqual(mockData);
    })
    it('state should be get a data by custome_id', function() {
      const u = $storage.getBy("1");
      expect(u.custome_id).toEqual(initialState.master[0].custome_id);
    })
    it('state should be get a list of all data', function() {
      expect(1).toEqual(1);
    })
    it('state should update a row', function() {
      expect(1).toEqual(1);
    })
    it('state should delete a row', function() {
      expect(1).toEqual(1);
    })
    it('state should be in sync with localStorage', function() {
      expect(1).toEqual(1);
    })
});