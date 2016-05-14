(function() {

  'use strict';

  describe('Share controller', function () {

    var $controller, $httpBackend, scope, UserService,  vm;

    beforeEach(
      module('SetListApp')
    );

    beforeEach(function () {
      
      inject(function (_$httpBackend_, _$controller_, $stateParams, $rootScope) {
        jasmine.getJSONFixtures().fixturesPath = 'base/app/services';
        $httpBackend = _$httpBackend_;
        $httpBackend.whenGET('components/login/login.html').respond();
        $httpBackend.expectGET('http://localhost:8001/shares/test-1').respond(
          getJSONFixture('set-list/set-list.mock.json')
        );

        $stateParams.shareID = 'test-1';
        scope = $rootScope.$new();
        $controller = _$controller_;
      });

       vm = $controller('Share as vm', {
        $scope: scope
      });

    });

    // There should be a set list!
    it('should load a set list', function() {
      $httpBackend.flush();
      expect(vm.setList.data.date).toBe('2013-12-11T20:30:00');
      expect(vm.setList.data.venue).toBe('The Newsagency');
      expect(vm.setList.data.songs.length).toBe(5);
    });

  });

})();