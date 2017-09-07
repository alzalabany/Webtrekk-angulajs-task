(function() {
'use strict';

  angular.module('webtrekk')
         .factory('CustomerClass', () => Customer);

  
  class Customer{
    constructor(props={}) {
      this.customer_id = this._id = String(props.customer_id || '0');
      this.first_name = String(props.first_name || '');
      this.last_name = String(props.last_name || '');
      this.birthday = new Date(props.birthday);
      this.gender = String(props.gender).toLowerCase();
      this.last_contact = new Date(props.last_contact);
      this.customer_lifetime_value = String(props.customer_lifetime_value||'');

      this.isValid = this.isValid.bind(this);
    }
    isValid(){
      return [
        ['m','w'].indexOf(this.gender) === -1,
        isNaN(Date.parse(this.birthday)),
        isNaN(Date.parse(this.last_contact)),
      ].filter(Boolean).length === 0
    }
}

})();