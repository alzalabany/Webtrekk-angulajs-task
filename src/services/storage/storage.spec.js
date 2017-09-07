// this.get = get.bind(this);
// this.set = set;
// this.clear = clear.bind(this);
// this.reload = reload.bind(this);

// .constant('StorageEngine', localStorage)

//
describe("validate interfaces and constants of $storage service", function() {
  var initialState;
  var StorageEngine;
  var STORAGE_ID;
  beforeEach(angular.mock.module("webtrekk"));
  beforeEach(
    inject(function(_StorageEngine_, _initialState_,_STORAGE_ID_) {
      StorageEngine = _StorageEngine_;
      initialState = _initialState_;
      STORAGE_ID = _STORAGE_ID_;
    })
  );

  it("initialState should exist", function() {
    expect(initialState).toBeDefined();
  });

  it("storage engine should exist", function() {
    expect(StorageEngine).toBeDefined();
  });

  it("STORAGE_ID should be a string > 3 char", function() {
    expect(typeof STORAGE_ID).toBe('string');
    expect(STORAGE_ID.length).toBeGreaterThan(3);
  });

  it("storage engine should implement getItem, setItem, removeItem", function() {
    expect(typeof StorageEngine.getItem).toBe('function');
    expect(typeof StorageEngine.setItem).toBe('function');
    expect(typeof StorageEngine.removeItem).toBe('function');
  })

})

describe("$wb_Storage", function() {
  var $storage;
  var initialState;
  var STORAGE_ID;
  var mock = { mock: 1 };

  beforeEach(angular.mock.module("webtrekk"));
  beforeEach(
    inject(function($wt_storage,_initialState_, _STORAGE_ID_) {
      $storage = $wt_storage;
      initialState = _initialState_;
      STORAGE_ID = _STORAGE_ID_;
    })
  );



  it("should have initial state", function() {
    const data = $storage.get();
    for(i in initialState){
      expect(data[i]).toBeDefined();
      expect(typeof data[i]).toBe( typeof initialState[i] );
    }
  });

  it("should be able to set data", function() {
    $storage.set(mock);
    expect($storage.get()).toEqual(mock);
    expect(localStorage.getItem(STORAGE_ID)).toBe(JSON.stringify(mock));
  });

  it("should be able to clear localStorage", function() {
    $storage.set({});
    expect(localStorage.getItem(STORAGE_ID)).toBe(JSON.stringify({}));
  });

  it("if cleared should remain empty", function() {
    const actual = JSON.stringify($storage.get());
    const expected = JSON.stringify({});
    expect(actual).toEqual(expected);
  });

  it("should throw if no initalState and call set", function() {
    localStorage.removeItem(STORAGE_ID);
    spyOn($storage, "set");
    expect($storage.get()).toEqual(initialState);
    expect($storage.set).toHaveBeenCalled();
  });

  it("should be able to reload data to initial state", function() {
    $storage.reload();
    const actual = JSON.stringify($storage.get());
    const expected = JSON.stringify(initialState);
    expect(actual).toEqual(expected);
  });
});
