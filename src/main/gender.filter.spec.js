describe('gender filter', function() {
  
    var $filter;
    var genderFilter;

    beforeEach(angular.mock.module("webtrekk"));
    beforeEach(inject(function(_$filter_){
      $filter = _$filter_;
      genderFilter = $filter('genderFilter');
    }));
  
    it('return N/A if given a bad value', function() {
      expect(genderFilter(null)).toEqual('N/A');
      expect(genderFilter(false)).toEqual('N/A');
      expect(genderFilter('UNKOWN')).toEqual('N/A');
    });

    it('return Female for w or f and Male for m', function() {
      expect(genderFilter('m')).toEqual('Male');
      expect(genderFilter('w')).toEqual('Female');
      expect(genderFilter('f')).toEqual('Female');
    });

  
  });