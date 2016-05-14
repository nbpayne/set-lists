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

      inject(function (_$httpBackend_, _$controller_, $stateParams, $rootScope) {
        jasmine.getJSONFixtures().fixturesPath = 'base/app/services';
        $httpBackend = _$httpBackend_;
        $httpBackend.whenGET('components/set-lists/set-lists.html').respond();
        $httpBackend.expectGET('http://localhost:8001/set-lists/test-1').respond(
          getJSONFixture('set-list/set-list.mock.json')
        );
        $httpBackend.expectGET('http://localhost:8001/song-lists/test-1').respond(
          getJSONFixture('song-list/song-list.mock.json')
        );

        $stateParams.setListID = 'test-1';
        scope = $rootScope.$new();
        $controller = _$controller_;
      });

       vm = $controller('SetList as vm', {
        $scope: scope
      });

    });

    // There should be a song list!
    it('should load a song list', function() {
      expect(vm.songList).toBe(undefined);
      $httpBackend.flush();
      expect(vm.songList.data.songs.length).toBe(7);
    });

    // There should be a set list!
    it('should load a set list', function() {
      $httpBackend.flush();
      expect(vm.setList.data.date).toBe('2013-12-11T20:30:00');
      expect(vm.setList.data.venue).toBe('The Newsagency');
      expect(vm.setList.data.songs.length).toBe(5);
    });

    // Add song
    it('should add a song from the songlist', function () {
      $httpBackend.flush();
      expect(vm.setList.data.songs.length).toBe(5);
      vm.addSong();
      expect(vm.setList.data.songs.length).toBe(6);
    });

    // Add new song
    it('should add a song from the search box of the song list', function () {
      $httpBackend.flush();
      expect(vm.setList.data.songs.length).toBe(5);
      vm.search = 'Queensland';
      vm.addNewSong();
      expect(vm.setList.data.songs.length).toBe(6);
      expect(vm.setList.data.songs[5].name).toBe('Queensland');
      expect(vm.search).toBe(undefined);
    });

    // Remove a song
    it('should remove a song from the songlist', function () {
      $httpBackend.flush();
      expect(vm.setList.data.songs.length).toBe(5);
      vm.removeSong();
      expect(vm.setList.data.songs.length).toBe(4);
    });

    // Move a song
    it('should move a song', function() {
      $httpBackend.flush();
      expect(vm.setList.data.songs[0]._id).toBe('7');
      vm.moveSong(4, 0);
      expect(vm.setList.data.songs[0]._id).toBe('1');
    });

    // Share set-list
    it('should share a set list', function () {
      $httpBackend.flush();
      vm.shareSetList();
      expect(vm.setList.data.share).toBe('test-1');
    })

  });

})();