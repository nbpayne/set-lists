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
        $httpBackend.whenGET('components/login/login.html').respond();
      })
    );

    afterEach(function() {
      localStorage.removeItem('authorization');
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    
    it('should log a user on', function () {
      $httpBackend.expectGET('http://localhost:8001/authorizations/4321');

      expect(UserService.user().isLoggedIn).toBeFalsy();
      expect(UserService.user().name).toBeUndefined();
      expect(UserService.user().band).toBeUndefined();
      expect(UserService.user().songListID).toBeUndefined();
      
      UserService.login(
        /* jshint -W117, -W030 */
        getJSONFixture('services/auth-response-mock.json'), 
        function () {
          //console.log('Yata!');
          return;
        }
      );

      $httpBackend.flush();

      expect(UserService.user().isLoggedIn).toBeTruthy();
      expect(UserService.user().name).toBe('Test User');
      expect(UserService.user().band).toBe('Test Band');
      expect(UserService.user().songListID).toBe('test-1');
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

      expect(UserService.user().isLoggedIn).toBeFalsy();
      expect(UserService.user().name).toBeUndefined();
      expect(UserService.user().band).toBeUndefined();
      expect(UserService.user().songListID).toBeUndefined();
    });
    
  });

})();
