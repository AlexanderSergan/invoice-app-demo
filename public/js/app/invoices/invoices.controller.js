angular.module('invoices').controller('InvoicesController', ['$scope', '$q', 'Data', 'snackbar',
    function($scope, $q, Data, snackbar) {

        $scope.invoices = []
        $scope.customers = []
        $scope.products = []

        const fetchData = () => {
            Data.getInvoices().then(data => $scope.invoices = data.data);
            Data.getCustomers().then(data => $scope.customers = data.data);
            Data.getProducts().then(data => $scope.products = data.data);
        }

        $scope.getCustomer = id => {
            let value
            $scope.customers.map(customer => {
                if (customer.id == id)
                    value = customer
            })
            return value
        }

        $scope.getProductById = id => {
            let value
            $scope.products.map(product => {
                if (product.id == id)
                    value = product
            })
            return value

        }

        initNewInvoice = () => $scope.newInvoice = {
            newItem: {},
            items: []
        }

        $scope.modalOpenHandler = () => {
            let modalNewInvoice = angular.element('#modal-new-invoice')
            modalNewInvoice.modal()
            modalNewInvoice.on('hidden.bs.modal', e => $scope.newInvoice = {})
        }

        $scope.addInvoiceItemHandler = () => {

            let item = {
                invoice_id: $scope.newInvoice.id,
                product_id: $scope.newInvoice.newItem.product.id,
                quantity: $scope.newInvoice.newItem.quantity,
            }

            Data.saveInvoiceItem(item).then(
                res => {
                    snackbar.show('Product added');
                    if (!$scope.newInvoice.items)
                        $scope.newInvoice.items = []

                    $scope.newInvoice.items.push(res.data)

                    $scope.newInvoice.total += $scope.newInvoice.items.map( item =>
                       $scope.getProductTotal(item.product_id, item.quantity, $scope.newInvoice.discount)
                    )

                    $scope.saveInvoice()

                },
                err => snackbar.err()
            )
        }


        $scope.removePreviewItem = index => $scope.newInvoice.items.splice(index, 1)

        $scope.saveInvoice = () => {

            if (!$scope.newInvoice.id) {

                let invoice = {
                    customer_id: $scope.newInvoice.customer_id,
                    discount: $scope.newInvoice.discount || 0,
                    total: $scope.newInvoice.total || 0
                }

                Data.saveInvoice(invoice).then((res) => {
                    $scope.newInvoice = res.data
                    snackbar.show('Invoice saved')
                    fetchData()
                })

            } else {

                let invoice = {
                    id: $scope.newInvoice.id,
                    customer_id: $scope.newInvoice.customer_id,
                    discount: $scope.newInvoice.discount,
                    total: $scope.newInvoice.total
                }

                Data.editInvoice(invoice).then(
                    res => snackbar.show('Invoice changed') && fetchData(),
                    err => snackbar.err()
                )
            }
        }

        $scope.getProductTotal = (productId, quantity, discount = 0) => {
          return $scope.getProductById(productId).price * quantity / 100 * (100 - discount)
          // getProductById(item.product_id).price * item.quantity / 100* (100-newInvoice.discount)
        }

        // getTotal = () => {
        //   let total
        //   $scope.newInvoice.items.map( item => {
        //     console.log();
        //   })
        // }

        $scope.deleteInvoice = id => Data.deleteInvoice(id).then(
            res => snackbar.show('Invoice deleted'),
            err => snackbar.err()
        )




        initNewInvoice()
        fetchData()
        $scope.$on('invoices.update', e => fetchData())


    }
])
