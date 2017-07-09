 /**
  *  @name invoiceProduct
  *  @overview - invoiceProduct component (directive is needed to set `replace: true`
  *              attribute )
  */
 angular.module('invoice').directive('invoiceProduct', function(Data) {

     return {

         scope: {
             productId: '<',
             quantity: '<',
             discount: '<',
             index: '<'
         },

         templateUrl: '/js/app/components/invoice/invoiceProduct.html',
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


         }
     }
 })
