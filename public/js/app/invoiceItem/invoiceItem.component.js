angular.module('invoice.item').component('invoiceItem',  {

  templateUrl: '/js/app/invoiceItem/invoiceItem.html',
  bindings: {
   invoice: '=',
   customer: '='
 },
 controller: ['Data', invoiceItemController]

})

 function invoiceItemController (Data) {

       this.deleteInvoice = () => Data.deleteInvoice(this.invoice.id)

 }
