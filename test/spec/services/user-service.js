(function () {

  'use strict';

  xdescribe('UserService', function () {

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
      })
    );

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    
    xit('should log a user on', function () {
      $httpBackend.expectGET('http://localhost:8001/authorizations/4321');

      expect(UserService.isLoggedIn).toBeFalsy();
      expect(UserService.name).toBeUndefined();
      expect(UserService.band).toBeUndefined();
      
      UserService.login(
        /* jshint -W117, -W030 */
        getJSONFixture('services/auth-response-mock.json'), 
        function () {
          console.log('Yata!');
          return;
        }
      );

      $httpBackend.flush();

      expect(UserService.isLoggedIn).toBeTruthy();
      expect(UserService.name).toBe('Test User');
      expect(UserService.band).toBe('Test Band');
    });

    xit('should log a user off', function () {
      UserService.login(function () {
        return;
      });
      UserService.logout(function () {
        return;
      });
      expect(UserService.isLoggedIn).toBeFalsy();
      expect(UserService.name).toBeUndefined();
      expect(UserService.band).toBeUndefined();
    });
    
  });

})();
