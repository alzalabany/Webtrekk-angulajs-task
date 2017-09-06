describe('webtrekk Module', function() {
  var engine;
  var engineInterface = ['getItem', 'setItem', 'removeItem'];
  // Before each test load our api.users module
  beforeEach(angular.mock.module('webtrekk'));

  // Before each test set our injected Users factory (_Users_) to our local Users variable
  beforeEach(inject(function(_engine_) {
    engine = _engine_;
  }));

  it('engine constant should exist', function() {
    expect(engine).toBeDefined();
    it('engine should have get, set and remove api', function() {
      engineInterface.map(i=>expect(i in engine).toBeTruthy());
      it('apis should be callable', function() {
        engineInterface.map(i=>expect(typeof engine[i]).toBe('function'));
      });
    });
  });

})