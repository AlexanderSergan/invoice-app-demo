angular.module('invoices').controller('InvoicesController', ['$scope', '$q', 'Data',
 function($scope, $q, Data) {

 $scope.invoices = []


   const fetchInvoices  = () =>
    Data.getInvoices().then(data => $scope.invoices = data.data);

    fetchInvoices()

}])
