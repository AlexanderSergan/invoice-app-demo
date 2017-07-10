/**
 * @ngdoc component
 * @name product.edit:productEdit
 * @param {string|id} productId
 * @description
 *
 *    Customer edit component
 *
 */
angular.module('product.edit').component('productEdit', {

    bindings: {
        productId: '<'
    },
    templateUrl: '/js/app/components/productEdit/productEdit.html',
    controller: function(Data, snackbar, $state) {

        this.$onInit = () => {
            this.showModal()
            if (this.productId == 'new') return;

            this.initProduct()
        }



        /**
         * Methods
         */

        this.initProduct = () => Data.getProducts(this.productId).then(
            res => this.product = res.data,
            err => snackbar.err()
        )

        this.saveProduct = () => {
            this.product.price = this.product.price ?
                parseFloat(this.product.price).toFixed(2) :
                0
            Data.saveProduct(this.product).then(
                res => {
                    if (this.productId == 'new') {
                        snackbar.show('New product saved.')
                        $state.go('products.edit', {
                            productId: res.data.id
                        }, {
                            reload: true
                        })
                    } else {
                        snackbar.show('Product updated.')
                        this.product = res.data
                    }
                }
            )
        }

        this.showModal = () => {
            this.modalNewInvoice = angular.element('#modal-product-edit')
            this.modalNewInvoice.modal()
            this.modalNewInvoice.on('hidden.bs.modal', e => this.handleClose())
        }


        /**
         * Handlers
         */

        this.handleClose = () => {
            $state.go('products', {}, {
                'reload': true
            })
            setTimeout(() => { // modal quick fix; TODO: needs investigation
                $('.modal-backdrop.fade.in').hide()
            }, 100)
        }


    }
})
