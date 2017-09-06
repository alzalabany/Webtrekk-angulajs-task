
describe('Users factory', function() {
    var Users;
    
    // Before each test load our api.users module
    beforeEach(angular.mock.module('webtrekk'));

    // Before each test set our injected Users factory (_Users_) to our local Users variable
    beforeEach(inject(function(usersStore) {
      Users = usersStore;
    }));
    it('should exist', function() {
      expect(Users).toBeDefined();
    });

    it('should have actions and store values', function() {
      expect(Users.actions).toBeDefined();
      expect(Users.values).toBeDefined();
      expect(Users.store).toBeDefined();

    });

});