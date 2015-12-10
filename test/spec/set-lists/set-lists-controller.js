(function() {

  'use strict';

  describe('SetLists controller', function () {

    var $controller, $httpBackend, scope, UserService,  vm;

    beforeEach(
      module('SetListApp')
    );
    
    beforeEach(function () {
      // Inject mock UserService
      module('UserServiceMock');

      inject(function (_$httpBackend_, _$controller_, $rootScope, _UserService_) {
        $httpBackend = _$httpBackend_;
        $httpBackend.whenGET('scripts/set-lists/set-lists.html').respond();
        $httpBackend.expectGET('http://localhost:8001/set-lists').respond(
          /* jshint -W117, -W030 */
          getJSONFixture('services/set-lists-mock.json')
        );

        UserService = _UserService_;
        scope = $rootScope.$new();
        //ctrl = $controller('SetLists', { $scope: scope });
        $controller = _$controller_;

        jasmine.getJSONFixtures().fixturesPath = 'base/test/mock';
      });

      vm = $controller('SetLists as vm', {
        $scope: scope
      });
    });

    it('should create a new set list', function () {
      vm.setLists.data = [];
      vm.reallyCreateSetList({ venue: 'A', date: new Date() });
      expect(vm.setLists.data[0]._id).not.toBe(null);
      expect(vm.setLists.data[0]._id.length).toBe(24);
    });

    xit('should save a new set list', function () {
      //$httpBackend.flush();
      //var setListsLength = vm.setLists.data.length;
      vm.reallyCreateSetList();
      expect(vm.setList.data._id.length).toBe(24);
      //scope.saveSetList();
      //expect(scope.setLists.data.length).toBe(setListsLength + 1);
      //expect(scope.setLists.data[setListsLength]._id.length).toBe(24);
    });

    it('should delete a set list', function () {
      $httpBackend.flush();
      var setListsLength = vm.setLists.data.length;
      /* jshint -W117, -W030 */
      vm.setList = getJSONFixture('services/set-lists-mock.json')[0];
      vm.deleteSetList(0);
      expect(vm.setLists.data.length).toBe(setListsLength - 1);
    });

  });

})();
