(function () {

  'use strict';
  
  describe('SetListService', function () {

    var svc, $httpBackend;

    beforeEach(
      module('SetListApp')
    );
    
    beforeEach(function () {
      localStorage.removeItem('setLists');
      localStorage.removeItem('songList_test-1');
      localStorage.removeItem('setList_test-1');
    });

    afterEach(function () {
      localStorage.removeItem('setLists');
      localStorage.removeItem('songList_test-1');
      localStorage.removeItem('setList_test-1');
    });
    
    beforeEach(
      inject(function(SetListService, _$httpBackend_) {
        jasmine.getJSONFixtures().fixturesPath = 'base/app/services';
        $httpBackend = _$httpBackend_;
        $httpBackend.whenGET('components/login/login.html').respond();
        svc = SetListService;
      })
    );

    it('should save a list of set lists to local storage', function () {
      var setLists = {};
      /* jshint -W117, -W030 */
      setLists.data = getJSONFixture('set-list/set-lists.mock.json');
      svc.saveSetLists(setLists);
      var setListsLocal = angular.fromJson(localStorage.setLists);
      expect(setListsLocal).toEqual(setLists);
    });

    it('should get a list of set lists from the server and save to local storage', function () {
      $httpBackend.expectGET('http://localhost:8001/set-lists').respond(
        /* jshint -W117, -W030 */
        getJSONFixture('set-list/set-lists.mock.json')
      );
      svc.getSetLists(function (setLists) {
        expect(setLists.data.length).toBe(2);
        expect(setLists.data[0]._id).toBe('test-1');
        expect(setLists.isDirty).toBeFalsy();
      });
      $httpBackend.flush();
      var setLists = angular.fromJson(localStorage.setLists);
      expect(setLists.data.length).toBe(2);
      expect(setLists.data[0]._id).toBe('test-1');
      expect(setLists.isDirty).toBeFalsy();
    });

    it('should get a list of sets from local storage if the server is not available', function () {
      $httpBackend.expectGET('http://localhost:8001/set-lists').
      respond(404, '');
      
      var setLists = {};
      /* jshint -W117, -W030 */
      setLists.data = getJSONFixture('set-list/set-lists.mock.json');
      localStorage.setLists = angular.toJson(setLists);
      
      svc.getSetLists(function(setLists) {
        expect(setLists.data.length).toBe(2);
        expect(setLists.data[0]._id).toBe('test-1');
      });
      $httpBackend.flush();
      expect(angular.fromJson(localStorage.setLists).data.length).toBe(2);
      expect(angular.fromJson(localStorage.setLists).data[0]._id).toBe('test-1');
    });

    it('should get an empty list of sets from local storage if the server is not available and there is no list of ' +
      'sets in local storage', function () {
      $httpBackend.expectGET('http://localhost:8001/set-lists').
        respond(404, '');
      
      svc.getSetLists(function(setLists) {
        expect(setLists.data.length).toBe(0);
      });
      $httpBackend.flush();
      expect(angular.fromJson(localStorage.setLists)).toBe(undefined);
    });
    
    it('should save a set list to local storage', function () {
      var setList = {};
      /* jshint -W117, -W030 */
      setList.data = getJSONFixture('set-list/set-list.mock.json');
      svc.saveSetList(setList);
      var setListLocal = angular.fromJson(localStorage['setList_test-1']);
      expect(setListLocal.data._id).toBe('test-1');
      expect(setListLocal.data.songs.length).toBe(5);
      expect(setListLocal.isDirty).toBe(true);
    });

    it('should get a set list from the server and save to local storage', function () {
      $httpBackend.expectGET('http://localhost:8001/set-lists/test-1').respond(
        /* jshint -W117, -W030 */
        getJSONFixture('set-list/set-list.mock.json')
      );
      svc.getSetList('test-1', function(setList) {
        expect(setList.data._id).toBe('test-1');
        expect(setList.data.songs.length).toBe(5);
      });
      $httpBackend.flush();
      var setList = angular.fromJson(localStorage['setList_test-1']);
      expect(setList.data._id).toBe('test-1');
      expect(setList.data.songs.length).toBe(5);
      expect(setList.isDirty).toBeFalsy();
    });

    it('should get a set list from local storage if the server is not available', function () {
      $httpBackend.expectGET('http://localhost:8001/set-lists/test-1').
        respond(404, '');
      
      var setList = {};
      /* jshint -W117, -W030 */
      setList.data = getJSONFixture('set-list/set-list.mock.json');
      localStorage['setList_test-1'] = angular.toJson(setList);
      
      svc.getSetList('test-1', function(setList) {
        expect(setList.data._id).toBe('test-1');
        expect(setList.data.songs.length).toBe(5);
      });
      $httpBackend.flush();
      expect(angular.fromJson(localStorage['setList_test-1']).data._id).toBe('test-1');
      expect(angular.fromJson(localStorage['setList_test-1']).data.songs.length).toBe(5);
    });
    
    it('should get an empty set list from local storage if the server is not available and there is no set list in ' +
     'local storage', function () {
      $httpBackend.expectGET('http://localhost:8001/set-lists/test-1').
        respond(404, '');
      
      svc.getSetList('test-1', function(setList) {
        expect(setList.data.length).toBe(0);
      });
      $httpBackend.flush();
      expect(angular.fromJson(localStorage['setList_test-1'])).toBe(undefined);
    });

    /*
    xit('should delete a set list from the server', function () {
      expect(false).toBeTruthy();
    });
    */
    
  });

})();