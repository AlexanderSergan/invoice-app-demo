 /**
  * @ngdoc directive
  * @name invoices.edit.directive:invoiceEditProduct
  * @overview - invoiceProduct component (directive is needed to set `replace: true`
  *              attribute )
  * @requires DataService, snackbarService
  * @restrict 'A'
  **/
 angular.module('invoices.edit').directive('invoiceEditProduct', function(Data) {

     return {

         scope: {
             productId: '<',
             invoiceId: '<',
             invoiceItemId: '<',
             quantity: '<',
             discount: '<',
             index: '<',
             onDelete: '&'
         },

         templateUrl: '/js/app/components/invoiceEdit/invoiceEditProduct.html',
         restrict: 'A',
         controllerAs: '$ctrl',
         bindToController: true,
         replace: true,

         controller: function(Data, snackbar) {
             this.product = {}
             this.discount = 0

             this.$onInit = () => initProduct(this.productId)


             const initProduct = id => Data.getProducts(id).then(
                 res => {
                     this.product = res.data
                     this.product.total = this.getProductTotal()
                 },
                 err => snackbar.err()
             )

             this.getProductTotal = () =>
                 this.quantity * (this.product.price - (this.product.price / 100 * this.discount))

             this.handleProductDelete = () =>
                 Data.deleteInvoiceItem(this.invoiceId, this.invoiceItemId).then(
                     res => {
                         snackbar.show('Invoice item removed.')
                         this.onDelete()
                     },
                     err => snackbar.err()
                 )

         }
     }
 })
