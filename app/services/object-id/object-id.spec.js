(function () {

  'use strict';

  fdescribe('Service: ObjectIdService', function () {

    // load the service's module
    beforeEach(module('SetListApp'));

    // instantiate service
    var ObjectIdService;
    beforeEach(inject(function (_ObjectIdService_) {
      ObjectIdService = _ObjectIdService_;
    }));

    it('should return a valid ObjectIdService', function () {
      expect(ObjectIdService.getObjectId()).toMatch(/^[0-9a-fA-F]{24}$/);
    });

  });
      
})();
