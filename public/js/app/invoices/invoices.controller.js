angular.module('invoices').controller('InvoicesController', ['$scope', '$q', 'Data',
    function($scope, $q, Data) {

        $scope.invoices = []
        $scope.customers = []
        $scope.products = []


        const fetchData = () => {
          Data.getInvoices().then(data => $scope.invoices = data.data);
          Data.getCustomers().then(data => $scope.customers = data.data);
          Data.getProducts().then(data => $scope.products = data.data);

        }

        initNewInvoice = () => $scope.newInvoice = {
            newItem : {},
            items: []
          }

        $scope.modalOpenHandler = () => {
            let modalNewInvoice = angular.element('#modal-new-invoice')
            modalNewInvoice.modal()
            modalNewInvoice.on('hidden.bs.modal', e => $scope.newInvoice = {})
        }

        $scope.addInvoiceItemHandler = () => {
          $scope.newInvoice.items.push($scope.newInvoice.newItem)
          $scope.newInvoice.newItem = {}
        }

        $scope.saveInvoiceHandler = () => {
          // $scope.invoices.push($scope.newInvoice)
          // initNewInvoice()
        }

        $scope.removePreviewItem = index => $scope.newInvoice.items.splice(index, 1)

        $scope.saveInvoice = () => {

          let invoice = {
            customer_id: $scope.newInvoice.customer.id,
            discount: $scope.newInvoice.discount || 0,
            total: $scope.newInvoice.total || 0
          }

          Data.saveInvoice(invoice).then((res)=>{
            console.log(res)
            fetchData()
          })
        }

        $scope.deleteInvoice = id => Data.deleteInvoice(id) 

        /**
         * ## Invoices

         - id (integer)
         - customer_id (integer)
         - discount (decimal)
         - total (decimal)

         *
         * */






        initNewInvoice()
        fetchData()


    }
])
