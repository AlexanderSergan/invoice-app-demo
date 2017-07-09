angular.module('invoice').component('invoice', {

    bindings: {
        invoice: '<'
    },
    templateUrl: '/js/app/components/invoice/invoice.html',
    controller: function(Data, $state, snackbar) {
        this.customer = {}
        this.invoiceItems = []

        this.$onInit = () => {

            Data.getCustomers(this.invoice.customer_id).then(
                res => this.customer = res.data,
                err => snackbar.err()
            )


            Data.getInvoiceItems(this.invoice.id).then(
                res =>
                this.invoiceItems = res.data,
                err => snackbar.err()
            )

        }

        this.delete = () =>
            Data.deleteInvoice(this.invoice.id).then(
              res => {
                snackbar.show('Invoice removed.')
                $state.go('invoices', {}, { 'reload' : true})
              }
            )

    }

})
