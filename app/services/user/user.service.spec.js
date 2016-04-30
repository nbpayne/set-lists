(function () {

  'use strict';

  describe('UserService', function () {

    var UserService, $httpBackend;

    beforeEach(
      module('SetListApp')
    );

    beforeEach(
      inject(function (_UserService_, _$httpBackend_) {
        UserService = _UserService_;
        $httpBackend = _$httpBackend_;

        jasmine.getJSONFixtures().fixturesPath = 'base/test/mock';
        $httpBackend.whenGET('http://localhost:8001/authorizations/4321')
        .respond(
          /* jshint -W117, -W030 */
          getJSONFixture('services/authorization-mock.json')
        );
        $httpBackend.whenDELETE('http://localhost:8001/authorizations/4321')
        .respond();
      })
    );

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    
    it('should log a user on', function () {
      $httpBackend.expectGET('http://localhost:8001/authorizations/4321');

      expect(UserService.isLoggedIn).toBeFalsy();
      expect(UserService.name).toBeUndefined();
      expect(UserService.band).toBeUndefined();
      expect(UserService.songListID).toBeUndefined();
      
      UserService.login(
        /* jshint -W117, -W030 */
        getJSONFixture('services/auth-response-mock.json'), 
        function () {
          //console.log('Yata!');
          return;
        }
      );

      $httpBackend.flush();

      expect(UserService.isLoggedIn).toBeTruthy();
      expect(UserService.name).toBe('Test User');
      expect(UserService.band).toBe('Test Band');
      expect(UserService.songListID).toBe('test-1');
    });

    it('should log a user off', function () {
      $httpBackend.expectGET('http://localhost:8001/authorizations/4321');
      UserService.login(
        /* jshint -W117, -W030 */
        getJSONFixture('services/auth-response-mock.json'), 
        function () {
          //console.log('Yata!');
          return;
        }
      );
      $httpBackend.flush();

      $httpBackend.expectDELETE('http://localhost:8001/authorizations/4321');
      UserService.logout(function () {
        return;
      });
      $httpBackend.flush();

      expect(UserService.isLoggedIn).toBeFalsy();
      expect(UserService.name).toBeUndefined();
      expect(UserService.band).toBeUndefined();
      expect(UserService.songListID).toBeUndefined();
    });
    
  });

})();
