(function () {

  'use strict';

  describe('SongListService', function () {

    var SongListService, $httpBackend;

    beforeEach(
      module('SetListApp')
    );

    beforeEach(function () {
      localStorage.removeItem('songList_test-1');
      localStorage.removeItem('setList_test-1');
    });

    afterEach(function () {
      localStorage.removeItem('songList_test-1');
      localStorage.removeItem('setList_test-1');
    });

    beforeEach(
      inject(function (_SongListService_, _$httpBackend_) {
        $httpBackend = _$httpBackend_;
        //$httpBackend.whenGET('components/login/login.html').respond();
        SongListService = _SongListService_;
        /* jshint -W117, -W030 */
        jasmine.getJSONFixtures().fixturesPath = 'base/test/mock';
      })
    );

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    
    it('should save a song list to local storage', function () {
      var songList = {};
      /* jshint -W117, -W030 */
      songList.data = getJSONFixture('services/song-list-mock.json');
      SongListService.saveSongList(songList);
      expect(angular.fromJson(localStorage['songList_test-1']).data.songs.length).toBe(7);
    });

    it('should get a song list from the server and save to local storage', function () {
      $httpBackend.expectGET('http://localhost:8001/song-lists/test-1').respond(
        /* jshint -W117, -W030 */
        getJSONFixture('services/song-list-mock.json')
      );
      SongListService.getSongList('test-1', function(songList) {
        expect(songList.data.songs.length).toBe(7);
      });
      $httpBackend.flush();
      expect(angular.fromJson(localStorage['songList_test-1']).data.songs.length).toBe(7);
    });

    it('should get a song list from local storage if the server is not available', function () {
      $httpBackend.expectGET('http://localhost:8001/song-lists/test-1').respond(404, '');
      
      localStorage['songList_test-1'] = angular.toJson(
        /* jshint -W117, -W030 */
        getJSONFixture('services/song-list-mock.json')
      );

      
      SongListService.getSongList('test-1', function(songList) {
        expect(songList.songs.length).toBe(7);
      });
      $httpBackend.flush();
      expect(angular.fromJson(localStorage['songList_test-1']).songs.length).toBe(7);
    });

    it('should get an empty song list from local storage if the server is not available and there is no song list in local storage', function () {
      $httpBackend.expectGET('http://localhost:8001/song-lists/test-1').
        respond(404, '');
      
      SongListService.getSongList('test-1', function(songList) {
        expect(songList.data.length).toBe(0);
      });
      $httpBackend.flush();
      expect(angular.fromJson(localStorage['songList_test-1'])).toBe(undefined);
    });

  });

})();