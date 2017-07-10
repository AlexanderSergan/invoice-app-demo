/**
 * @ngdoc component
 * @name customer.edit:customerEdit
 * @param {string|id} customerId
 * @description
 *
 *    Customer edit component
 *
 */
angular.module('customer.edit').component('customerEdit', {

  bindings: {
    customerId: '<'
  },
  templateUrl: 'js/app/components/customerEdit/customerEdit.html',
  controller: function(Data, snackbar, $state) {

    this.$onInit = () => {
        this.initCustomer()
        this.showModal()
    }



    /**
     * Methods
     */

    this.initCustomer = () => Data.getCustomers(this.customerId).then(
        res => this.customer = res.data,
        err => snackbar.err()
    )

    this.saveCustomer = () => Data.saveCustomer(this.customer).then(
        res => {
            this.customer = res.data
            if ( this.customerId == 'new' ) {
              snackbar.show('New customer saved.')
              $state.go('customers.edit', {customerId: res.data.id}, {reload: true})

            } else {
              snackbar.show('Customer updated.')
              this.customer = res.data
            }
        },
        err => snackbar.err()
    )

    this.deleteCustomer = () => Data.deleteCustomer(this.customer.id).then(
      res => {
        snackbar.show('Customer successfully deleted.')
        this.handleClose()
      }
    )

    this.showModal = () => {
        this.modalNewInvoice = angular.element('#modal-customer-edit')
        this.modalNewInvoice.modal()
        this.modalNewInvoice.on('hidden.bs.modal', e => this.handleClose()
        )
    }


    /**
     * Handlers
     */

    this.handleClose = () =>{
        $state.go('customers', {}, { 'reload' : true})

        setTimeout(()=> {                             // modal quick fix; TODO: needs investigation
            $('.modal-backdrop.fade.in').hide()
        }, 100)
    }


  }


})
