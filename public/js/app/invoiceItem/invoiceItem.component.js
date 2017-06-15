angular.module('invoice.item').component('invoiceItem',  {

  templateUrl: '/js/app/invoiceItem/invoiceItem.html',
  bindings: {
   invoice: '=',
   customer: '='

  },
 controller: ['$scope', 'Data', 'snackbar', invoiceItemController]

})

 function invoiceItemController ($scope, Data, snackbar) {
      //
      // getItems = () =>

      this.$onInit = () => Data.getInvoiceItems(this.invoice.id).then(res => this.items = res.data)

       this.deleteInvoice = () => Data.deleteInvoice(this.invoice.id).then(
         res => snackbar.show('Invoice deleted') && $scope.$emit('invoices.update'),
         err => snackbar.err()
       )

 }
