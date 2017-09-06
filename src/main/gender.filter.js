angular.module('webtrekk')
.filter('genderFilter', function() {
  function genderFilter(gender) { // birthday is a date
      if(!gender)return 'N/A';
      let normalized = String(gender).toLowerCase();
      switch (['m','w'].indexOf(normalized)) {
        case 0:
          return 'Male';
        case 1:
          return 'Female';
        default:
          return 'N/A';
      }
  }

  return function(gender) {
        return genderFilter(gender);
  }; 
});