angular.module('webtrekk')
  .filter('genderFilter', () => {
  /**
  * @name genderFilter
  * @desc return full name from gender initial m==>male etc..
  * @param {String} gender
  * @return {String}
  * @memberof Main
  */
    function genderFilter(gender) { // birthday is a date
      if (!gender) return 'N/A';
      const normalized = String(gender).toLowerCase();
      switch (['m', 'w', 'f'].indexOf(normalized)) {
        case 0:
          return 'Male';
        case 1:
        case 2:
          return 'Female';
        default:
          return 'N/A';
      }
    }

    return function(gender) {
      return genderFilter(gender);
    };
  });
