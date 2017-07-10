angular.module('customers.list').component('customersList', {

  bindings: {
    customers: '<'
  },
  templateUrl: '/js/app/components/customersList/customersList.html',
  controller: function() {

      // this.$onInit = () =>
      //   console.log('customers: ', this.customers)

  }
})
