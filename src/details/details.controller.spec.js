describe('detailsCtrl', function() {
  var scope,
      $location,
      createController,
      UsersData,
      $stateParams,
      $state,
      CustomerClass;

  beforeEach(angular.mock.module("webtrekk"));

  beforeEach(inject(function ($rootScope, $controller, _$location_, _$stateParams_, _$state_, _CustomerClass_, _UsersData_) {
      $location = _$location_;
      scope = $rootScope.$new();
      UsersData = _UsersData_;
      $stateParams = _$stateParams_;
      $state = _$state_;
      CustomerClass = _CustomerClass_;

      createController = function() {
          return $controller('detailsController', {
              UsersData,
              $stateParams,
              $state,
              CustomerClass,
          });
      };
  }));

  it('should load on path /data/0', function() {
      var controller = createController();
      $location.path('/data/0');
      expect($location.path()).toBe('/data/0');
      expect(controller.user).toBeDefined();
      expect(controller.user.customer_id).toBe('0');
  });

  it('should load users from url', function() {
    
});

  // it('calls activate once loaded')
  // it('loads correct customer from $stateParams')
  // it('can create a new Customer')
  // it('can create a edit exsiting Customer')
  // it('will not save if customer is inValid')
  // it('return to main page after saving or creating')
});