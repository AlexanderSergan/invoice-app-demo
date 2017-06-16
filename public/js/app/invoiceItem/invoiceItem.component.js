angular.module('invoice.item').component('invoiceItem',  {

  templateUrl: '/js/app/invoiceItem/invoiceItem.html',
  bindings: {
   invoice: '=',
   customer: '=',
   products: '='

  },
 controller: ['$scope', 'Data', 'snackbar', invoiceItemController]

})

 function invoiceItemController ($scope, Data, snackbar) {


      /*
        TODO: this data flow will be refactored
      */



      this.$onInit = () => {
        Data.getInvoiceItems(this.invoice.id).then(
          res => {
            this.items = res.data

            this.items.map( item => {
              angular.merge(item, this.getProductById(item.product_id))

              item.total = item.price * item.quantity / 100 * (100 - this.invoice.discount)
              // debugger;
            })
          })
      }

       this.deleteInvoice = () => Data.deleteInvoice(this.invoice.id).then(
         res => snackbar.show('Invoice deleted') && $scope.$emit('invoices.update'),
         err => snackbar.err()
       )


       this.getProductById = id => {
           let value
           this.products.map(product => {
               if (product.id == id)
                   value = product
           })
           return value

       }

 }
