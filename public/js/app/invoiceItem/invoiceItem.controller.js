angular.module('invoice.item').controller('invoiceItemController', [ 'Data', function(Data) {

    this.deleteInvoice = Data.deleteInvoice(this.invoice.id)

}])
