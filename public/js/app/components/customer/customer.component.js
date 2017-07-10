angular.module('customer').component('customer', {

  bindings: {
      customerId: '<'
  },
  templateUrl: '/js/app/components/customer/customer.html',

  controller: function(Data, snackbar) {

    this.$onInit = () => this.init()


    this.init = () => Data.getCustomers(this.customerId).then(
        res => this.customer = res.data,
        err => snackbar.err()
    )

  }

})
