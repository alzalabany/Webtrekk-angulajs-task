/* eslint-disable */
describe('detailsCtrl', () => {
  let scope,
    $q,
    $location,
    createController,
    UsersData,
    $templateCache,
    $stateParams,
    $state,
    makeController,
    vm,
    vm2,
    CustomerClass;

  function services($injector) {
    $q = $injector.get('$q');
    $state = $injector.get('$state');
    $templateCache = $injector.get('$templateCache');
    $location = $injector.get('$location');
    UsersData = $injector.get('UsersData');
    CustomerClass = $injector.get('CustomerClass');
    scope = $injector.get('$rootScope').$new();
    UsersData.load();
    UsersData.sortBy('last_name');

    makeController = function(id) {
      $location.path(`/data/${id}`);
      return $injector.get('$controller')('detailsController', {
        '$scope': scope,
        '$stateParams': {customerId: id},
        $state,
      });
    };
    spyOn(UsersData, 'load');
    vm = makeController(2);
    vm2 = makeController(0);
  }

  beforeEach(angular.mock.module('webtrekk'));
  beforeEach(inject(services));

  describe('once loaded', () => {
    it('calls UsersData.load & set vm.user defined', () => {
      expect(UsersData.load).toHaveBeenCalled();
      expect(vm.user).toBeDefined();
      expect(vm.user instanceof CustomerClass).toBeTruthy();
    });
    it('read user_id from $stateParams', () => {
      expect(`${vm.user._id}`).toBe('2');
    });
  });

  describe('on updating am exsistent user', () => {
    it('validate model', () => {
      spyOn(vm.user, 'isValid');
      vm.save();
      expect(vm.user.isValid).toHaveBeenCalled();
    });
    it('redirect to home page', () => {
      spyOn($state, 'go');
      vm.save();
      expect($state.go).toHaveBeenCalledWith('customerlist');
    });
  });

  describe('on Create a new user', () => {
    it('user id should be 0', () => {
      expect(`${vm2.user._id}`).toBe('0');
    });
    it('when triggering save, it will not validate', () => {
      expect(vm2.user.isValid()).toBe(false);
    });

    it('and will not save', () => {
      spyOn($state, 'go');
      spyOn(UsersData, 'save');
      spyOn(UsersData, 'create');
      vm2.save();
      expect($state.go).toHaveBeenCalledTimes(0);
      expect(UsersData.save).toHaveBeenCalledTimes(0);
      expect(UsersData.create).toHaveBeenCalledTimes(0);
    });

    describe('after user fill form', () => {
      const mock = {
        'first_name': 'Mock',
        'last_name': 'Mock',
        'birthday': '1996-10-12',
        'gender': 'm',
        'last_contact': '2013-06-01',
        'customer_lifetime_value': '',
      };

      it('will be valid', () => {
        vm2.user = new CustomerClass(mock);
        expect(vm2.user.isValid).toBeTruthy();
      });
      it('save will trigger create & redirect to home', () => {
        vm2.user = new CustomerClass(mock);
        spyOn($state, 'go');
        spyOn(UsersData, 'save');
        spyOn(UsersData, 'create');
        vm2.save();
        expect(vm2.user.isValid).toBeTruthy();
        expect($state.go).toHaveBeenCalledWith('customerlist');
        expect(UsersData.save).toHaveBeenCalledTimes(0);
        expect(UsersData.create).toHaveBeenCalledTimes(1);
      });
    });
  });
});
