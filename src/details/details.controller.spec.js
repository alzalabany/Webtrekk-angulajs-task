describe('detailsCtrl', function() {
  var scope,
      $q,
      $location,
      createController,
      UsersData,
      $templateCache,
      $stateParams,
      $state,
      makeController,
      vm,vm2,
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

          makeController = function(id){
            $location.path('/data/'+id);
            return $injector.get('$controller')('detailsController', {
              '$scope': scope,
              '$stateParams': {customerId: id},
              $state,
            });
          }
          spyOn(UsersData, "load");
          vm = makeController(2);
          vm2 = makeController(0);
      }

      beforeEach(angular.mock.module("webtrekk"))
      beforeEach(inject(services));

      describe('once loaded',function(){
        it('calls UsersData.load & set vm.user defined',function(){
          expect(UsersData.load).toHaveBeenCalled();
          expect(vm.user).toBeDefined();
          expect(vm.user instanceof CustomerClass).toBeTruthy();
        })
        it('read user_id from $stateParams',function(){
          expect(vm.user._id+'').toBe('2');
        })
      })

      describe('on updating am exsistent user',function(){
        it('validate model',function(){
          spyOn(vm.user, "isValid");
          vm.save();
          expect(vm.user.isValid).toHaveBeenCalled();
        })
        it('redirect to home page',function(){
          spyOn($state, "go");
          vm.save();
          expect($state.go).toHaveBeenCalledWith('customerlist');
        })
      })

      describe('on Create a new user',function(){
        it('user id should be 0',function(){
          expect(vm2.user._id+'').toBe('0');
        })
        it('when triggering save, it will not validate',function(){
          expect(vm2.user.isValid()).toBe(false);
        })

        it('and will not save',function(){
          spyOn($state, "go");
          spyOn(UsersData, "save");
          spyOn(UsersData, "create");
          vm2.save();
          expect($state.go).toHaveBeenCalledTimes(0);
          expect(UsersData.save).toHaveBeenCalledTimes(0);
          expect(UsersData.create).toHaveBeenCalledTimes(0);
        })

        describe('after user fill form',function(){
          var mock = {
            'first_name': 'Mock',
            'last_name': 'Mock',
            'birthday': '1996-10-12',
            'gender': 'm',
            'last_contact': '2013-06-01',
            'customer_lifetime_value': '',
          };

          it('will be valid',function(){
            vm2.user = new CustomerClass(mock);
            expect(vm2.user.isValid).toBeTruthy();
          })
          it('save will trigger create & redirect to home',function(){
            vm2.user = new CustomerClass(mock);
            spyOn($state, "go");
            spyOn(UsersData, "save");
            spyOn(UsersData, "create");
            vm2.save()
            expect(vm2.user.isValid).toBeTruthy();
            expect($state.go).toHaveBeenCalledWith('customerlist');
            expect(UsersData.save).toHaveBeenCalledTimes(0);
            expect(UsersData.create).toHaveBeenCalledTimes(1);
          })

          });

        })

});