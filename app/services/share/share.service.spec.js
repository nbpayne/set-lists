(function () {

  'use strict';
  
  describe('ShareService', function () {

    var svc, $httpBackend;

    beforeEach(
      module('SetListApp')
    );
    
    beforeEach(
      inject(function(ShareService, _$httpBackend_) {
        jasmine.getJSONFixtures().fixturesPath = 'base/app/services';
        $httpBackend = _$httpBackend_;
        $httpBackend.whenGET('components/login/login.html').respond();
        svc = ShareService;
      })
    );

    it('should get a set list from the server', function () {
      $httpBackend.expectGET('http://localhost:8001/shares/test-1').respond(
        /* jshint -W117, -W030 */
        getJSONFixture('set-list/set-list.mock.json')
      );
      svc.getShare('test-1', function(setList) {
        expect(setList.data._id).toBe('test-1');
        expect(setList.data.songs.length).toBe(5);
      });
      $httpBackend.flush();
    });
    
  });

})();