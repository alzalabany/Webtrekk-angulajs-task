// this.get = get.bind(this);
// this.set = set;
// this.clear = clear.bind(this);
// this.reload = reload.bind(this);

// .constant('StorageEngine', localStorage)

//
describe('validate interfaces and constants of $storage service', () => {
  let initialState;
  let StorageEngine;
  let STORAGE_ID;
  beforeEach(angular.mock.module('webtrekk'));
  beforeEach(inject((_StorageEngine_, _initialState_, _STORAGE_ID_) => {
    StorageEngine = _StorageEngine_;
    initialState = _initialState_;
    STORAGE_ID = _STORAGE_ID_;
  }));

  it('initialState should exist', () => {
    expect(initialState).toBeDefined();
  });

  it('storage engine should exist', () => {
    expect(StorageEngine).toBeDefined();
  });

  it('STORAGE_ID should be a string > 3 char', () => {
    expect(typeof STORAGE_ID).toBe('string');
    expect(STORAGE_ID.length).toBeGreaterThan(3);
  });

  it('storage engine should implement get,set, & removeItem', () => {
    expect(typeof StorageEngine.getItem).toBe('function');
    expect(typeof StorageEngine.setItem).toBe('function');
    expect(typeof StorageEngine.removeItem).toBe('function');
  });
});

describe('$wb_Storage', () => {
  let $storage;
  let initialState;
  let STORAGE_ID;
  const mock = {mock: 1};

  beforeEach(angular.mock.module('webtrekk'));
  beforeEach(inject(($wtStorage, _initialState_, _STORAGE_ID_) => {
    $storage = $wtStorage;
    initialState = _initialState_;
    STORAGE_ID = _STORAGE_ID_;
  }));


  it('should have same shape as initial state', () => {
    const data = $storage.get();
    Object.keys(initialState).map((i) => {
      expect(data[i]).toBeDefined();
      expect(typeof data[i]).toBe(typeof initialState[i]);
    });
  });

  it('should be able to set data', () => {
    $storage.set(mock);
    expect($storage.get()).toEqual(mock);
    expect(localStorage.getItem(STORAGE_ID)).toBe(JSON.stringify(mock));
  });

  it('should be able to clear localStorage', () => {
    $storage.set({});
    expect(localStorage.getItem(STORAGE_ID)).toBe(JSON.stringify({}));
  });

  it('if cleared should remain empty', () => {
    const actual = JSON.stringify($storage.get());
    const expected = JSON.stringify({});
    expect(actual).toEqual(expected);
  });

  it('should throw if no initalState and call set', () => {
    localStorage.removeItem(STORAGE_ID);
    spyOn($storage, 'set');
    expect($storage.get()).toEqual(initialState);
    expect($storage.set).toHaveBeenCalled();
  });

  it('should be able to reload data to initial state', () => {
    $storage.reload();
    const actual = JSON.stringify($storage.get());
    const expected = JSON.stringify(initialState);
    expect(actual).toEqual(expected);
  });
});
