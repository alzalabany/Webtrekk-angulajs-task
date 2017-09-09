angular.module('webtrekk')
  .filter('ageFilter', () => {
  /**
  * @name AgeFilter
  * @desc calcualte age from string or date
  * @param {Date|String} birthday
  * @return {String}
  * @memberof Main
  */
    function calculateAge(birthday) { // birthday is a date
      if (!birthday) return 'N/A';
      if (!birthday.getTime) {
        birthday = new Date(birthday);
      }
      const ageDifMs = Date.now() - birthday.getTime();
      const ageDate = new Date(ageDifMs); // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    return function(birthdate) {
      return calculateAge(birthdate);
    };
  });
