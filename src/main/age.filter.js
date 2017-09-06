angular.module('webtrekk')
.filter('ageFilter', function() {
  function calculateAge(birthday) { // birthday is a date
      if(!birthday)return 'N/A';
      if(!birthday.getTime){
        birthday = new Date(birthday);
      }
      var ageDifMs = Date.now() - birthday.getTime();
      var ageDate = new Date(ageDifMs); // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  return function(birthdate) { 
        return calculateAge(birthdate);
  }; 
});