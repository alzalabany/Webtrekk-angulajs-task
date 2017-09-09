/* eslint-disable */
describe('navHistoryController', function() {
  let UsersData,
  $stateParams,
  $state,
  $injector,
  makeController,
  vm,
  CustomerClass;

  function services(_$injector_) {
    $injector = _$injector_;
    $q = $injector.get('$q');
    UsersData = $injector.get('UsersData');
    CustomerClass = $injector.get('CustomerClass');
    scope = $injector.get('$rootScope').$new();
    makeController = function(scope, param) {
      return $injector.get('$controller')('navHistoryController', {
        '$scope': scope,
        '$stateParams': param,
      });
    };
  }

  beforeEach(angular.mock.module('webtrekk'));
  beforeEach(inject(services));


  it('should assure UserData is loaded', function() {
    spyOn(UsersData, 'load');
    vm = makeController({}, {});
    expect(UsersData.load).toHaveBeenCalled();
  });
  it('set can id from scope', function() {
    vm = makeController({customer: 1}, {});
    expect(vm.id).toBe(1);
  });
  it('or from stateParams', function() {
    vm = makeController({}, {customerId: 1});
    expect(vm.id).toBe(1);
  });
  it('then load navi history', function() {
    vm = makeController({customer: 1}, {});
    expect(vm.history).toBe(UsersData.naviById[1]);
  });
  // UsersData.load();
  // this.id = $stateParams.customerId || $scope.id;
  // this.user = UsersData.byId[id] || {};
  // this.history = UsersData.naviById[id];
});
