angular.module('invoices').controller('InvoicesController', ['$scope', '$q', 'Data', 'snackbar', '$filter',
    function($scope, $q, Data, snackbar, $filter) {

        $scope.invoices = []
        $scope.customers = []
        $scope.products = []

        $scope.snackbar = snackbar

        const fetchData = () => {
            Data.getInvoices().then(data => $scope.invoices = data.data);
            Data.getCustomers().then(data => $scope.customers = data.data);
            Data.getProducts().then(data => $scope.products = data.data);
        }

        initNewInvoice = () => $scope.newInvoice = {
            newItem: {},
            items: []
        }

        /*
            Value `Getter` helpers
        */

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

        $scope.getById = (arr, id) => {
          let value
          arr.map(item => {
            if (item.id == id)
              value = item
          })
          return value
        }

        $scope.getProductTotal = (productId, quantity, discount = 0) =>
          $scope.getProductById(productId).price * quantity / 100 * (100 - discount)




        /*
          Button handlers
        */

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

                    $scope.updateNewInvoiceTotal()

                },
                err => snackbar.err()
            )
        }

        $scope.$on('invoices.edit', (e, data) => {
          editInvoiceHandler(data)
        })

        editInvoiceHandler = (data) => {
            $scope.newInvoice = $scope.getById($scope.invoices, data.id)
            $scope.newInvoice.customer = $scope.getById($scope.customers, $scope.newInvoice.customer_id)
            $scope.newInvoice.items = data.products
            $scope.modalOpenHandler()
        }

        $scope.updateNewInvoiceTotal = () => {

          $scope.newInvoice.total = 0

          $scope.newInvoice.items.map( item =>
            $scope.newInvoice.total += $scope.getProductTotal(item.product_id, item.quantity, $scope.newInvoice.discount)
          )

           $scope.saveInvoice()
        }


        /*
            DB interactors
        */

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

        $scope.deleteInvoice = id => Data.deleteInvoice(id).then(
            res => snackbar.show('Invoice deleted'),
            err => snackbar.err()
        )

        $scope.deleteInvoiceItem = (item, index) => {

            console.log(item);

            Data.deleteInvoiceItem($scope.newInvoice.id, item.id).then(
              res => {
                snackbar.show('Item removed')
                // let index = $scope.newInvoice.items.indexOf(item)
                $scope.newInvoice.items.splice(index, 1)
                $scope.updateNewInvoiceTotal()
              },
              err => snackbar.err()
            )
          }


        /*
            Event handlers
        */

        $scope.$on('invoices.update', e => fetchData())

        /*
            Init functions
        */

        initNewInvoice()
        fetchData()


    }
])
