describe('age filter', function() {

  var $filter;
  var date = new Date();
  var ageFilter;
  date.setFullYear(date.getFullYear() - 10);

  beforeEach(angular.mock.module("webtrekk"));
  beforeEach(inject(function(_$filter_){
    $filter = _$filter_;
    ageFilter = $filter('ageFilter');
  }));

  it('can return N/A if no data provided', function() {
    expect(ageFilter(false)).toEqual('N/A');
    expect(ageFilter(null)).toEqual('N/A');
    expect(ageFilter(undefined)).toEqual('N/A');
  });
  it('can calculate age from date object', function() {
    expect(ageFilter(new Date)).toEqual(0);
    expect(ageFilter(date)).toEqual(10);
  });
  // 2013-06-01 10:12:12
  it('can calculate age from MM-DD-YYYY string', function() {
    expect(ageFilter(`${date.getMonth()}-18-${date.getFullYear()}`)).toEqual(10);
  });
  it('can calculate age from YYYY-MM-DD string', function() {
    expect(ageFilter(`${date.getFullYear()}-${date.getMonth()}-18`)).toEqual(10);
  });
  it('can calculate age from YYYY-MM-DD 10:12:12 string', function() {
    expect(ageFilter(`${date.getFullYear()}-${date.getMonth()}-18 10:12:12`)).toEqual(10);
  });

});